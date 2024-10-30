<script lang="tsx" setup>
import { computed, ref, useAuth } from "#imports";

const { signIn, data, signOut } = useAuth();
const isSignedIn = computed(() => !!data.value);
const username = ref("");
const password = ref("");
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="h-screen w-screen bg-black flex justify-center items-center text-white">
    <div v-if="isSignedIn" class="max-w-md">
      <p>Welcome, {{ data?.user?.name }}!</p>
      <button class="bg-white rounded-full px-6 py-3" @click="() => signOut()">Sign Out</button>
    </div>
    <div class="max-w-md">
      <label for="username">Username</label>: 
      <input class="text-black" type="text" id="username" name="username" v-model="username" /> <br /> <br />
      <label for="password">Password</label>: 
      <input class="text-black" type="password" id="password" name="password" v-model="password" /> <br /> <br />
      <button class="bg-white rounded-full px-6 py-3" @click="() => signIn('credentials', { callbackUrl: '/', username, password })">Sign In</button>
    </div>
  </div>
  <NuxtPage />
</template>
