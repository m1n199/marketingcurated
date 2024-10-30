import { defineEventHandler } from "#imports";
import { useFeatureCollection } from "~/composables/database/useFeatureCollection";
const { getFeatureItems}  = useFeatureCollection()

export default defineEventHandler(async (event) => {
  const featureAndFilterList = await getFeatureItems()
  return { featureAndFilterList }
})