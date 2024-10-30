<script lang="tsx" setup>
import {h, ref } from 'vue'
import { Search as SearchIcon, X as CloseIcon } from 'lucide-vue-next'
import NavbarSearchFeatues from '~/components/Navbar/Search/Featues.vue'
import { useSearchSuggestions } from '~/composables/useSearchSuggestions';
const props = defineProps(['CloseModel'])
const { searchQuery, setSearchQuery, suggestions } = useSearchSuggestions();
setSearchQuery('')
const Overlay = (_: any, { slots }: any) => h('div', {
  class: [
    'absolute top-0 left-0',
    'h-screen w-screen',
    'bg-black bg-op-80',
    'z-150',
    'p-1'
  ], onClick(e) {
    if (e.target === e.currentTarget) props.CloseModel()
  }
}, slots.default())

const SearchModelWrap = (_: any, { slots }: any) => h('div', {
  class: [
    'max-w-4xl',
    'bg-zinc-800',
    'mx-auto p-4',
    'rounded-3xl',
    'h-full max-h-lg',
    'flex flex-col'
  ]
}, slots.default())

// Search Bar Components
const SearchBarWrap = (_: any, { slots }: any) => h('div', {
  class: [
    'h-full max-h-14 sm:max-h-16 w-full',
    'rounded-full',
    'bg-gray-3 bg-op-20',
    'cursor-pointer',
    'overflow-hidden',
    'px-1 flex'
  ],
}, slots.default())
const SearchChild = h('div', { class: 'h-full aspect-ratio-1 flex items-center' })
const SearchBarSearchIcon = () => h(SearchChild, { class: 'justify-center' }, h(SearchIcon, { class: 'size-5 md:size-6' }))
const SearchBarCloseIconButton = () => h(SearchChild, { class: 'justify-center', onClick: props.CloseModel }, h(CloseIcon, { class: 'size-5 md:size-6' }))
const SearchBarInputField = () => h(SearchChild, {
  class: 'flex-grow',
}, h('input', {
  class: [
    'text-white',
    'text-lg',
    'md:text-xl',
    'tracking-wide',
    'text-op-50',
    'w-full h-full',
    'bg-transparent',
    'outline-none',
    'placeholder-white',
  ],
  type: 'text',
  value: searchQuery.value,
  onInput: (e: any) => setSearchQuery(e.target.value),
  placeholder: 'Search...'
}))
const SearchBar = () => (
  <SearchBarWrap>
    <SearchBarSearchIcon />
    <SearchBarInputField />
    <SearchBarCloseIconButton />
  </SearchBarWrap>
)
// const Features = () => (
//   <></>
// )
const SearchSuggetionWrap = (_: any, { slots }: any) => h('div', { class: 'm-4 h-full overflow-auto' }, slots.default())
const SearchSuggetion = (params: any) =>  h('div', {
  class: [
    'h-12 md:h-14 w-full',
    'hover:bg-gray-3 hover:bg-op-20',
    // 'rounded-full',
    // 'my-1',
    'cursor-pointer',
    'flex items-center',
    'px-4',
    'flex items-center px-4 text-white text-lg md:text-xl tracking-wide'
  ],
  onClick: () => {
    props.CloseModel(); 
    // setSearchQuery('') 
  },
},
  <nuxt-link to={{ params: { feature: params.feature }, query: { filter: params.filter } }} class="w-full">
    {params.filter} <br />
    <span class='text-sm translate-y-10 text-zinc-500'>{params.feature}</span>
  </nuxt-link>
)

</script>
<template>
  <Overlay>
    <SearchModelWrap>
      <SearchBar />
      <SearchSuggetionWrap v-if="searchQuery">
        <SearchSuggetion v-for="({ item }, i) of suggestions" :key="i" :feature="item.feature" :filter="item.filter" />
        <div v-if="suggestions.length === 0" class="text-white text-lg md:text-xl tracking-wide text-center">No Results Found</div>
      </SearchSuggetionWrap>
      <NavbarSearchFeatues v-else :CloseModel="CloseModel" />
    </SearchModelWrap>
  </Overlay>
</template>