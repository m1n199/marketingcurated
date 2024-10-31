<script setup lang="tsx">
import {
  computed,
  h,
  onMounted,
  onUnmounted,
  ref,
  useAuthentication,
  useBrowse,
  useRoute,
  watch,
} from "#imports";
import HeroSection from "~/components/HeroSection.vue";
import ImageCopyButton from "~/components/ImageCopyButton.vue";
import ImageDownloadButton from "~/components/ImageDownloadButton.vue";
import { useFeatureAndFilterList } from "~/composables/useFeatureAndFilterList";
import { useHorizontalScrolling } from "~/composables/useHorizontalScrolling";
const { isAuthenticated } = useAuthentication();
const route = useRoute();
const { fetchFeatureAndFilterList, features } = useFeatureAndFilterList();
await fetchFeatureAndFilterList();
const { isThereMore, browseItems, fetchInitBrowseItems, fetchMoreBrowseItems } =
  useBrowse();
const isLandscape = computed(() => route.params.feature !== "Color");
await fetchInitBrowseItems(
  route.params.feature as string,
  route.query.filter as string
);

const count = Array.from({ length: 9 }, (_, i) => i + 1);
const fetchMorePointerRef = ref<HTMLElement | null>(null);
const activeFeatureFilters = computed(
  () =>
    features.value.find((feature) => feature.name === route.params.feature)
      ?.filters || []
);

watch(
  () => route.query.filter,
  (newFilter) => {
    fetchInitBrowseItems(route.params.feature as string, newFilter as string);
    // window.scrollTo(0, 0);
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
            fetchMoreBrowseItems(
              route.params.feature as string,
              route.query.filter as string
            );
          }, 10);
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
        "hover:hover_browse-feature-label py-1 border-b-2",
        params.active
          ? "active_browse-feature-label"
          : "browse-feature-label border-transparent",
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
const handleWheel = useHorizontalScrolling();
const FilterLabels = (params: any) => {
  return h(
    "button",
    {
      class: [
        "border-1 px-4 py-2 rounded-full font-bold",
        params.active ? "active_browse-filter-label" : "browse-filter-label",
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
  )
}
const ImageWrap = (params: any) => {
  return h(
    "div",
    {
      class: [
        "bg-blur-shiny w-full rounded-3xl overflow-hidden border-1 border-white relative",
        isLandscape.value ? "aspect-ratio-[1.78]" : "aspect-ratio-[0.56]",
      ],
    },
    [
      h("img", {
        src: params.item.url, // Assuming params includes the `item`
        class: "w-full h-full object-cover rounded-lg",
      }),
      h(
        "div",
        {
          class:
            "op-0 hover:op-100 w-full h-full bg-transparent hover:bg-zinc-300/70 absolute top-0 left-0",
        },
        [
          <div
            class="absolute top-0 left-0 w-full h-full z-10"
          />,
            <ImageCopyButton url={params.item.url} />,
            <ImageDownloadButton url={params.item.url} />
        ]
      ),
    ]
  );
};

const ImageGrid = (_: any, { slots }: any) =>
  h(
    "div",
    {
      class: [
        "grid grid-cols-1 gap-4",
        isLandscape.value
          ? "xl:grid-cols-2"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      ],
    },
    [
      browseItems.value.map((item: any, i: number) => {
        return h(ImageWrap, {
          key: i,
          item,
        });
      }),
      isAuthenticated.value && isThereMore.value ? slots.default() : <></>,
    ]
  );
</script>
<template>
  <div class="mx-4 sm:mx-10 md:mx-20 mt-5 browse">
    <HeroSection />
    <h1 class="text-4xl md:text-5xl font-bold">Browse</h1>
    <div
      class="flex gap-4 my-4 text-lg md:text-xl w-full overflow-auto pb-2 scrollbar-hide whitespace-nowrap scroll-smooth"
      @wheel="handleWheel"
    >
      <FeatureLabels
        v-for="(feature, i) of features"
        :key="i"
        :name="feature.name"
        :active="feature.name === $route.params.feature"
      />
    </div>
    <div
      class="flex gap-4 my-4 text-lg md:text-xl w-full overflow-auto pb-2 scrollbar-hide whitespace-nowrap scroll-smooth"
      @wheel="handleWheel"
    >
      <FilterLabels
        v-for="(filter, i) of activeFeatureFilters"
        :key="i"
        :name="filter.name"
        :feature="$route.params.feature"
        :active="filter.name === $route.query.filter"
      />
    </div>
    <ImageGrid>
      <div
        ref="fetchMorePointerRef"
        :class="[
          'w-full rounded-3xl overflow-hidden border-1 relative bg-moving',
          isLandscape ? 'aspect-ratio-[1.78]' : 'aspect-ratio-[0.56]',
        ]"
      >
        <div class="w-full h-full flex justify-center items-center bg-blur">
        </div>
      </div>
      <div
        v-for="i in count"
        :key="i"
        :class="[
          'bg-blur-shiny w-full rounded-3xl overflow-hidden border-1 relative bg-moving',
          isLandscape ? 'aspect-ratio-[1.78]' : 'aspect-ratio-[0.56]',
        ]"
      >
        <div class="w-full h-full flex justify-center items-center bg-blur">
        </div>
      </div>
    </ImageGrid>
  </div>
  <div class="h-50 w-full bg-zinc/50 mt-10"></div>
</template>
<style>
.bg-blur {
  backdrop-filter: blur(100px); /* Adjust the blur intensity */
  background: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
  animation: colorBlur 5s infinite alternate; /* Apply the animation */
}
@keyframes colorBlur {
  0% {
    background: rgba(200, 200, 200, 0.1);
  }
  25% {
    background: rgba(255, 0, 0, 0.1); /* Red */
  }
  50% {
    background: rgba(0, 255, 0, 0.1); /* Green */
  }
  75% {
    background: rgba(0, 0, 255, 0.1); /* Blue */
  }
  100% {
    background: rgba(200, 200, 200, 0.1);
  }
}
</style>
<style scoped>
.bg-blur-shiny {
  backdrop-filter: blur(10px); /* Adjust the blur intensity */
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.219); /* Adjust the shadow for shiny effect */
  background: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Slightly transparent border */
}
</style>
