<script lang="tsx" setup>
import { h, onMounted, ref, watch } from '#imports';
import { Search as SearchIcon } from 'lucide-vue-next'
import NavbarSearchModel from '~/components/Navbar/Search/Model.vue'

const open = ref(false)
const toggle = () => open.value = !open.value
onMounted(() => {
  watch(
    () => open.value,
    (value) => {
      if (value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  )
})
const SearchBarButton = (_: any, { slots }: any) => h('button', {
  class: [
    'max-w-2xl',
    'h-12 md:h-14 w-full',
    'rounded-full',
    'bg-gray-3 bg-op-20',
    'cursor-pointer',
    'overflow-hidden',
    'px-1 flex'
  ],
  onClick: toggle
}, slots.default())
const SearchBarChild = h('div', { class: 'h-full aspect-ratio-1 flex items-center' })
const SearchBarSearchIcon = () => h(SearchBarChild, { class: 'justify-center' }, h(SearchIcon, { class: 'size-5 md:size-6' }))
const SearchBarSearchText = () => h(SearchBarChild, { class: 'justify-start' }, h('span', {
  class: [
    'text-white',
    'text-lg',
    'md:text-xl',
    'tracking-wide',
    'text-op-50'
  ]
}, 'Search...'))
</script>
<template>
  <SearchBarButton>
    <SearchBarSearchIcon />
    <SearchBarSearchText />
  </SearchBarButton>
  <NavbarSearchModel v-if="open" :CloseModel="toggle" />
</template>