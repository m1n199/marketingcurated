import { defineEventHandler, getQuery } from "#imports";
import Fuse from "fuse.js";
import { useFeatureCollection } from "~/composables/database/useFeatureCollection";

async function getTransformedData() {
  const { Feature } = useFeatureCollection();
  const pipeline = [
    {
      $unwind: "$filters",
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        feature: "$name",
        filter: "$filters.name",
      },
    },
  ];

  const result = await Feature.aggregate(pipeline).exec();
  if (!result || Array.isArray(result) && result.length === 0) return [];
  return result as Array<{ name: string; filter: string }>;
}

let fuse: any = null;
async function isFuseAvilable() {
  if (fuse) return true;
  const data = await getTransformedData();
  if (!data.length) return false;
  console.log("data:", JSON.stringify(data[0]));
  fuse = new Fuse(data, {
    // isCaseSensitive: false,
    // includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["feature", "filter"],
  });
}

export default defineEventHandler(async (event) => {
  const query = getQuery<{ q: string }>(event).q;
  let suggestions: { item: { feature: string; filter: string } }[] = [];
  if (query.length === 0 || !(await isFuseAvilable())) {
    // console.log("not fetching suggestions for empty query");
  } else {
    suggestions = fuse.search(query);
    console.log("suggestions:", JSON.stringify(suggestions));
  }
  // if (suggestions.length > 10) suggestions = suggestions.slice(0, 10);
  return { suggestions };
});
