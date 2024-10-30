// provide a list of top 5 suggestions based on the user's input in the search bar
import { ref, useAsyncData } from "#imports";
import type { FeatureListItem } from "./database/useFeatureCollection";

const searchQuery = ref("");
interface Suggestion {
  item: {
    feature: string,
    filter: string
  }
}
const suggestions = ref<Suggestion[]>([]);
let timer: NodeJS.Timeout | null = null;
function fetchSuggestions() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    if (searchQuery.value.length === 0) {
      // console.log("not fetching suggestions for empty query");
    } else {
      // console.log("fetching suggestions for:", searchQuery.value);
      $fetch<{ suggestions: Suggestion[] }>(
        "/api/search?q=" + searchQuery.value
      ).then((data) => {
        // console.log("suggestions:", data, data.suggestions);
        console.log("suggestions:", data.suggestions);
        suggestions.value = data.suggestions;
      });
    }
  }, 1000);
}
export function useSearchSuggestions(match: number = 0.5) {
  return {
    setSearchQuery: (query: string) => {
      searchQuery.value = query;
      fetchSuggestions();
    },
    searchQuery,
    suggestions,
  };
}
