<script lang="tsx" setup>
import { useAuthentication } from '#imports';
const { isAuthenticated, LogOut } = useAuthentication();
</script>

<template>
  <div class="w-full h-full justify-end  justify-end items-center gap-2 hidden md:flex">
    <!-- <button v-if="!isAuthenticated" class="bg-white text-black px-4 py-2 rounded-full font-bold whitespace-nowrap">Join for free</button> -->
    <!-- <button v-if="!isAuthenticated" class="bg-blue-500 text-white px-4 py-2 rounded-full font-bold" @click="() => SignIn('google')">Login</button>
    -->
    <button v-if="isAuthenticated" class="bg-white text-black px-4 py-2 rounded-full font-bold whitespace-nowrap" @click="() => LogOut()">Logout</button>
    <nuxt-link v-else="isAuthenticated" class="bg-white text-black px-4 py-2 rounded-full font-bold whitespace-nowrap" to="/login">Login</nuxt-link>
  </div>
</template>
