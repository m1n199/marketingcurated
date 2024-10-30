import { defineEventHandler } from "#imports";
import { useFeatureCollection } from "~/composables/database/useFeatureCollection";

export default defineEventHandler(async (event) => {
  const {getFeatureItems} = useFeatureCollection();
  return await getFeatureItems();
});
