<script lang="tsx" setup>
import { computed, h, ref } from 'vue';
import { BookMarked as BookMarkedIcon } from 'lucide-vue-next'
import { useFeatureAndFilterList } from '~/composables/useFeatureAndFilterList';
const props = defineProps(['CloseModel'])
const { fetchFeatureAndFilterList, features, selectedFeature, setSelectedFeature } = useFeatureAndFilterList()
await fetchFeatureAndFilterList();
// const activeFeature = computed(() => features.value[slectedFeatureIndex.value].title)
// const filters = computed(() => features.value[slectedFeatureIndex.value].filters)
const Wrap = (_: any, { slots }: any) => h('div', {
  class: [
    'mt-4',
    'rounded-3xl',
    'flex flex-col sm:flex-row',
    'bg-zinc-800 bg-op-30',
    'flex-grow',
    'overflow-hidden'
  ]
}, slots.default())

const FeatureWrap = (_: any, { slots }: any) => h('div', {
  class: [
    'overflow-auto',
    'flex sm:flex-col whitespace-nowrap',
    'sm:w-70',
    'bg-zinc-900 bg-op-30',
    'p-4 gap-4 mb-4 sm:mb-0 sm:mr-4',
    'max-h-30 min-h-20 sm:max-h-none sm:min-h-0 sm:h-auto',
    'text-lg'
  ]
}, slots.default())
const FeatureIcon = () => h(BookMarkedIcon, { class: 'size-5 hidden sm:flex mx-4 justify-center items-center h-full' })
const FeatureListItem = (params: any) => {
  const feature = params.feature
  const label = feature.name
  const active = selectedFeature.value?.name === label
  return h('div', {
    class: [
      'text-black sm:text-white font-bold',
      'px-4 sm:py-2',
      'rounded-full',
      'flex justify-center items-center sm:justify-start',
      active ? 'bg-zinc-300 sm:bg-zinc-600' : 'sm:hover:bg-zinc-600 bg-white sm:bg-transparent'
    ],
    onClick: () => setSelectedFeature(feature)
  }, [
    h(FeatureIcon),
    h('div', {}, label)
  ])
}

const SelectedFeatureFilters = () => {
  const filters = selectedFeature.value?.filters || []
  return h('div', {
    class: [
      'flex-grow flex flex-col',
      'sm:w-70',
      'sm:mr-4',
      // 'bg-green',
      'p-4',
      'overflow-auto',
    ]
  }, [
    filters.map((filter, i) => h('div', {
      class: 'hover:bg-zinc-700 px-4 sm:px-10 rounded-full py-2 text-lg font-bold',
      onClick() {
        props.CloseModel()
      }
    },
      <nuxt-link to={{ params: { feature: selectedFeature.value?.name }, query: { filter: filter.name } }} class="h-full w-full flex justify-between items-center">
        <div class="border-b">{filter.name}</div>
        <div class="border-b">{filter.count}</div>
      </nuxt-link>
    ))
  ])
}
</script>
<template>
  <Wrap>
    <FeatureWrap>
      <FeatureListItem v-for="(feature, i) in features" :key="i" :feature="feature" />
    </FeatureWrap>
    <SelectedFeatureFilters />
  </Wrap>
</template>