import { ref } from "#imports";
import type { FeatureItem } from "./database/useFeatureCollection";

const features = ref<FeatureItem[]>([]);

async function fetchFeatures() {
  if (features.value.length) return;
  const data = await $fetch<{ browseLabels: Features[] }>('/api/browse-labels');
  if (data && data.browseLabels) features.value = data.browseLabels;
}

export async function useFeatureFilterLabels() {
  await fetchFeatures();
  return { features };
}
