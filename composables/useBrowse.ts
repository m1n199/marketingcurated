import { computed, ref, type Ref } from "vue"
import type { BrowseItem } from "./database/useBrowseCollection"
import type { FeatureListItem } from "./database/useFeatureCollection"
import { useRoute } from "vue-router"

export function useBrowse(features: Ref<FeatureListItem[]>) {
  const isThereMore = ref(true)
  const browseItems = ref<BrowseItem[]>([])
  const activeFeature = ref('')
  const activeFilter = ref('')
  const browseItemLength = computed(() => {
    if (features.value.length === 0) return 0
    const feature = features.value.find((feature) => feature.name === activeFeature.value)
    if (!feature) return 0
    if (activeFilter) {
      return feature.filters.find((filter) => filter.name === activeFilter.value)?.count || 0
    } else {
      return feature.filters.reduce((acc, filter) => acc + filter.count, 0)
    }
  })
  


  const fetchInitBrowseItems = async (feature: string, filter: string) => {
    activeFeature.value = feature
    activeFilter.value = filter
    const data = await $fetch<{ browseItems: BrowseItem[] }>('/api/browse', {
      query: {
        feature,
        filter,
        index: 0
      }
    })
    // check if data.browseItems is defined and is array with length > 0
    if (!data?.browseItems || !Array.isArray(data.browseItems) || data.browseItems.length === 0) return
    browseItems.value = data.browseItems
  }

  const fetchMoreBrowseItems = async (feature: string, filter: string) => {
    if (browseItems.value.length >= browseItemLength.value) return
    const data = await $fetch<{ browseItems: BrowseItem[] }>('/api/browse', {
      query: {
        feature,
        filter,
        index: browseItems.value.length
      }
    })
    // check if data.browseItems is defined and is array with length > 0
    if (!data?.browseItems || !Array.isArray(data.browseItems) || data.browseItems.length === 0) return
    browseItems.value = [
      ...browseItems.value,
      ...data.browseItems
    ]
    if (browseItems.value.length >= browseItemLength.value) isThereMore.value = false
  }
  return {
    isThereMore,
    browseItems,
    fetchInitBrowseItems,
    fetchMoreBrowseItems
  }
}