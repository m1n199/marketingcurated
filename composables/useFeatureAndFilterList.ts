import { ref } from "#imports";
import type { FeatureListItem } from "./database/useFeatureCollection";

const features = ref<FeatureListItem[]>([]);
const selectedFeature = ref<FeatureListItem | null>(null);
const setSelectedFeature = (feature: FeatureListItem) => {
  selectedFeature.value = feature;
}

async function fetchFeatureAndFilterList() {
  if (features.value.length) return;
  const data = await $fetch<{ featureAndFilterList: FeatureListItem[] }>('/api/feature-and-filter-list');
  if (data && data.featureAndFilterList) features.value = data.featureAndFilterList;
}
export function useFeatureAndFilterList() {
  return { 
    fetchFeatureAndFilterList,
    features,
    selectedFeature,
    setSelectedFeature
  };
}
