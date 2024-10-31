<script lang="tsx" setup>
import { navigateTo } from "#app";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useVerificationOTP } from "~/composables/useVerificationOTP";
const { sendOTP, verifyOTP } = useVerificationOTP();
const username = ref("");
const email = ref("");
const password = ref("");
const otp = ref("");
const verify = ref(false);
const register = async () => {
  const res = await $fetch<{
    message: string;
    success: boolean;
  }>("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username: username.value,
      email: email.value,
      password: password.value,
    }
  });
  if (res.success) verify.value = true;
};
const handleOTPVerification = async () => {
  const res = await $fetch<{
    message: string;
    success: boolean;
  }>("/api/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      otp: otp.value,
      email: email.value,
    }
  });
  if (res.success) {
    setTimeout(() => {
      navigateTo("/login");
    }, 2000);
  }
};
</script>

<template>
  <div
   v-if="!verify"
    class="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black"
  >
    <h1 class="text-5xl font-bold mb-10">Register</h1>
    <form
      @submit.prevent="register"
      class="bg-white p-10 rounded shadow-md w-full max-w-md"
    >
      <div class="mb-6">
        <label for="username" class="block text-lg font-medium text-gray-700"
          >Username:</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
        />
      </div>
      <div class="mb-6">
        <label for="email" class="block text-lg font-medium text-gray-700"
          >Email:</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
        />
      </div>
      <div class="mb-8">
        <label for="password" class="block text-lg font-medium text-gray-700"
          >Password:</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
        />
      </div>
      <button
        type="submit"
        class="w-full py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  </div>
  <div
    v-else
    class="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
    <h1 class="text-5xl font-bold mb-10">Verify OTP</h1>
    <form
      @submit.prevent="handleOTPVerification"
      class="bg-white p-10 rounded shadow-md w-full max-w-md"
    >
      <div class="mb-6">
        <label for="otp" class="block text-lg font-medium text-gray-700"
          >OTP:</label
        >
        <input
          type="text"
          id="otp"
          v-model="otp"
          required
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
        />
      </div>
      <button
        type="submit"
        class="w-full py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Verify
      </button>
    </form>
    </div>
</template>
