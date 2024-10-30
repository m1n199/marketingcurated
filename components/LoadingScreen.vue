<script lang="ts" setup>
import { useLoading, useNuxtApp } from '#imports';
const { isLoading, loadingMessage, setLoading } = useLoading()
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {setLoading(true)})
nuxtApp.hook('page:finish', () => {setLoading(false)})

</script>
<template>
  <div v-if="isLoading" class="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-black z-100">
    <div class="">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mx-auto"></div>
      <div class="text-white text-center mt-4 my-2">{{ loadingMessage || 'Loading...' }}</div>
    </div>
  </div>
  <slot></slot>
</template>