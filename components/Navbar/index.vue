<script lang="tsx" setup>

import LogoIcon from '~/assets/icons/Mobbin.vue';
import Search from '~/components/Navbar/Search/index.vue';
import NavMenu from '~/components/Navbar/Menu/index.vue';
import { h } from 'vue';

const NavChild = h('div', { class: 'w-1/3 h-full flex items-center' })
</script>

<template>
  <nav v-if="$route.path.startsWith('/browse')" class="z-50 sticky top-0 h-18 border-b-2 lg:border-transparent flex sm:px-4 xl:px-20 navbar">

    <component :is="NavChild" class="justify-start">
      <component :is="LogoIcon" class="h-full px-2 py-6 navbar-logo" />
    </component>

    <component :is="NavChild" class="lg:w-2/4 justify-center">
      <Search />
    </component>
    
    <component :is="NavChild" class="justify-end">
      <NavMenu />
    </component>

  </nav>
</template>