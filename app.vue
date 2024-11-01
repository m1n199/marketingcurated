<script lang="ts" setup>
import LoadingScreen from './components/LoadingScreen.vue';
import Navbar from './components/Navbar/index.vue';
</script>
<template>
  <NuxtRouteAnnouncer />
  <LoadingScreen />
  <Navbar />
  <NuxtPage />
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

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
