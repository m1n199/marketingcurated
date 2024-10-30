import { defineEventHandler } from "#imports";
import { useFeatureCollection } from "~/composables/database/useFeatureCollection";
const { getFeatureItems } = useFeatureCollection();

export default defineEventHandler(async (event) => {
  const features = await getFeatureItems();
  return features;
});
