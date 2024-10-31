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
  const query = getQuery(event) as Query;
  let browseItems: BrowseItem[] = [];
  if (typeof query.index !== "number" || query.index < 0) query.index = 0;
  if (query.index === 0 || event.context.isAuthenticated) {
    if (query.feature) {
      if (query.filter) {
        browseItems = await getBrowseItemsByFeatureAndFilter(
          query.feature,
          query.filter,
          query.index || 0
        );
      } else {
        browseItems = await getBrowseItemsByFeature(
          query.feature,
          query.index || 0
        );
      }
    }
  }
  return { browseItems };
});
