<script lang="ts" setup>
import LoadingScreen from './components/LoadingScreen.vue';
import Navbar from './components/Navbar/index.vue';
</script>
<template>
  <LoadingScreen />
  <Navbar />
  <NuxtPage />
</template>
<style>
body {
  background: #000;
  color: #fff;
 
}
/* Target Webkit browsers (e.g., Chrome, Safari) */
::-webkit-scrollbar {
    width: 4px;              /* Adjust the width for vertical scrollbars */
    height: 4px;             /* Adjust the height for horizontal scrollbars */
}

::-webkit-scrollbar-thumb {
    background-color: #888;  /* Color of the scrollbar thumb */
    border-radius: 10px;     /* Rounds the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #555;  /* Color on hover */
}

::-webkit-scrollbar-track {
    background: transparent;     /* Background of the scrollbar track */
    border-radius: 10px;     /* Rounds the scrollbar track */
}

</style>
