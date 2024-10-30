import { ref } from "vue"

const isLoading = ref(true)
const loadingMessage = ref('')
const setLoading = (loading: boolean) => (isLoading.value = loading)
const setLoadingMessage = (message: string) => (loadingMessage.value = message)
export const useLoading = () => {
  return { 
    isLoading, 
    loadingMessage,
    setLoading,
    setLoadingMessage
  }
}
