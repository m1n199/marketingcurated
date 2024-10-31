import { ref } from "vue"
import type { BrowseItem } from "./database/useBrowseCollection"

export function useBrowse() {
  const isThereMore = ref(true)
  const browseItems = ref<BrowseItem[]>([])
  const activeFeature = ref('')
  const activeFilter = ref('') 

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

  const fetchMoreBrowseItems = async (feature: string, filter?: string) => {
    if (!isThereMore.value) return
    const data = await $fetch<{ browseItems: BrowseItem[] }>('/api/browse', {
      query: {
        feature,
        filter,
        index: browseItems.value.length
      },
    })
    if (!data?.browseItems || !Array.isArray(data.browseItems) || data.browseItems.length < 10) {
      isThereMore.value = false
      return
    }
    
    if (!data?.browseItems || !Array.isArray(data.browseItems) || data.browseItems.length === 0) return
    browseItems.value = [
      ...browseItems.value,
      ...data.browseItems
    ]
  }
  return {
    isThereMore,
    browseItems,
    fetchInitBrowseItems,
    fetchMoreBrowseItems
  }
}