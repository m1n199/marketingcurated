import { defineEventHandler, getQuery } from "#imports";
import {
  useBrowseCollection,
  type BrowseItem,
} from "~/composables/database/useBrowseCollection";

const { getBrowseItemsByFeature, getBrowseItemsByFeatureAndFilter } =
  useBrowseCollection();

interface Query {
  feature: string;
  filter?: string;
  index?: number;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<Query>(event);
  let browseItems: BrowseItem[] = [];
  if (query.feature) {
    if (query.filter) {
      browseItems = await getBrowseItemsByFeatureAndFilter(
        query.feature,
        query.filter,
        query.index || 0
      );
    } else {
      browseItems = await getBrowseItemsByFeature(query.feature, query.index || 0);
    }
  }
  return { browseItems };
});
