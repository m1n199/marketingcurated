<script setup lang="ts">
import { useAuthentication } from '#imports';
const { isAuthenticated } = useAuthentication();
const heading1 = "Find Reference for Your Next Project";
const heading2 = "Save hours of UI & UX research with our library of 100,000+ fully searchable mobile & web screenshots."
</script>
<template>
  <div v-if="!isAuthenticated" class="min-h-md hero-section flex justify-center items-center px-4 flex-col text-center gap-10 mb-10 browse-hero-section">
    <h1 class="text-4xl md:text-6xl font-extrabold">{{ heading1 }}</h1>
    <h2 class="text-xl font-bold max-w-md text-zinc-700">{{ heading2 }}</h2>
    <div class="flex max-w-md">
       <nuxt-link to="/signup" class="px-4 py-2 rounded-full browse-hero-section-btn">Try For Free</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background-image: url("/images/hero-banner-3.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
}
</style>
