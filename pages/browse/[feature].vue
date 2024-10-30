<script setup lang="tsx">
import {
  computed,
  h,
  onMounted,
  onUnmounted,
  ref,
  useBrowse,
  useRoute,
  watch,
} from "#imports";
import ImageCopyButton from "~/components/ImageCopyButton.vue";
import { useFeatureAndFilterList } from "~/composables/useFeatureAndFilterList";
const route = useRoute();
const { fetchFeatureAndFilterList, features } = useFeatureAndFilterList();
await fetchFeatureAndFilterList();
const { isThereMore, browseItems, fetchInitBrowseItems, fetchMoreBrowseItems } =
  useBrowse(features);

await fetchInitBrowseItems(
  route.params.feature as string,
  route.query.filter as string
);

const count = Array.from({ length: 2 }, (_, i) => i + 1);
const fetchMorePointerRef = ref<HTMLElement | null>(null);
const activeFeatureFilters = computed(() => {
  const activeFeature = features.value.find(
    (feature) => feature.name === route.params.feature
  );
  return activeFeature?.filters || [];
});

watch(
  () => route.query.filter,
  (newFilter) => {
    fetchInitBrowseItems(route.params.feature as string, newFilter as string);
    window.scrollTo(0, 0);
  }
);

onMounted(() => {
  let debounceTimeout: NodeJS.Timeout | null = null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            console.log("fetch more");
            fetchMoreBrowseItems(
              route.params.feature as string,
              route.query.filter as string
            );
          }, 1000);
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 1.0, // Trigger when 100% of the element is in view
    }
  );

  if (fetchMorePointerRef.value) {
    observer.observe(fetchMorePointerRef.value);
  }

  // Clean up the observer when the component is unmounted
  onUnmounted(() => {
    if (fetchMorePointerRef.value) {
      observer.unobserve(fetchMorePointerRef.value);
    }
  });
});

const FeatureLabels = (params: any) =>
  h(
    "button",
    {
      class: [
        "hover:text-white py-1 border-b-2",
        params.active
          ? "text-white  border-white"
          : "text-zinc-400 border-transparent",
      ],
    },
    <nuxt-link
      class="w-full h-full flex justify-center items-center"
      to={{
        name: "browse-feature",
        params: { feature: params.name },
      }}
    >
      {params.name}
    </nuxt-link>
  );
const FilterLabels = (params: any) =>
  h(
    "button",
    {
      class: [
        "border-1 border-zinc-400 px-4 py-2 rounded-full font-bold",
        params.active ? "bg-white text-black" : "text-white ",
      ],
    },
    <nuxt-link
      class="w-full h-full flex justify-center items-center"
      to={{
        name: "browse-feature",
        params: { feature: params.feature },
        query: { filter: params.name },
      }}
    >
      {params.name}
    </nuxt-link>
  );
</script>
<template>
  <div class="mx-4 sm:mx-10 md:mx-20 mt-5">
    <h1 class="text-4xl md:text-5xl font-bold">Browse</h1>
    <div
      class="flex gap-4 my-4 text-zinc-400 text-lg md:text-xl w-full overflow-auto pb-2 scrollbar-hide whitespace-nowrap scroll-smooth"
      @wheel="
        (event) => {
          const target = event.currentTarget as HTMLElement;
          // Check if the event is vertical scrolling
          if (event.deltaY !== 0) {
            // Adjust the scrollLeft property by a factor (50 in this case)
            target.scrollLeft += event.deltaY * 50;

            // Prevent the default vertical scroll behavior
            event.preventDefault();
          }
        }
      "
    >
      <FeatureLabels
        v-for="(feature, i) of features"
        :key="i"
        :name="feature.name"
        :active="feature.name === $route.params.feature"
      />
    </div>
    <div
      class="flex gap-4 my-4 text-zinc-400 text-lg md:text-xl w-full overflow-auto pb-2 scrollbar-hide whitespace-nowrap"
      @wheel="
        (event) => {
          const target = event.currentTarget as HTMLElement;
          // Check if the event is vertical scrolling
          if (event.deltaY !== 0) {
            // Adjust the scrollLeft property by a factor (50 in this case)
            target.scrollLeft += event.deltaY * 50;

            // Prevent the default vertical scroll behavior
            event.preventDefault();
          }
        }
      "
    >
      <FilterLabels
        v-for="(filter, i) of activeFeatureFilters"
        :key="i"
        :name="filter.name"
        :active="filter.name === $route.query.filter"
        :feature="$route.params.feature"
      />
    </div>
    <!-- <ActiveFeatureFilters /> -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div
        v-for="(item, i) of browseItems"
        :key="i"
        class="bg-blur-shiny w-full aspect-ratio-[1.78] rounded-3xl overflow-hidden border-1 border-white relative"
      >
        <img :src="item.url" class="w-full h-full object-cover rounded-lg" />
        <div
          class="op-0 hover:op-100 w-full h-full bg-transparent hover:bg-zinc-900 hover:bg-op-50 absolute top-0 left-0"
        >
          <nuxt-link
            class="absolute top-0 left-0 w-full h-full z-10 bg-transparent"
            :to="item.url"
          />
          <ImageCopyButton :url="item.url" />
        </div>
      </div>
      <div
        ref="fetchMorePointerRef"
        v-if="isThereMore"
        class="bg-blur-shiny w-full aspect-ratio-[1.78] rounded-3xl overflow-hidden border-1 border-white"
      >
        <!-- <img :src="item.url" class="w-full h-full object-cover rounded-lg" /> -->
        <div class="w-full h-full flex justify-center items-center">
          <div class="">
            <div
              class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-if="isThereMore"
        v-for="i in count"
        :key="i"
        class="bg-blur-shiny w-full aspect-ratio-[1.78] rounded-3xl overflow-hidden border-1 border-white"
      >
        <!-- <img :src="item.url" class="w-full h-full object-cover rounded-lg" /> -->
        <div class="w-full h-full flex justify-center items-center">
          <div class="">
            <div
              class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-blur-shiny {
  backdrop-filter: blur(10px); /* Adjust the blur intensity */
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.219); /* Adjust the shadow for shiny effect */
  background: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Slightly transparent border */
}
</style>
