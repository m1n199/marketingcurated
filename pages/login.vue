<script setup lang="tsx">
import { h, ref, useAuth, useAuthentication, type Ref } from "#imports";
import Apple from "~/assets/icons/AppleLogo.vue";
import Google from "~/assets/icons/Google.vue";
import Mobbin from "~/assets/icons/Mobbin.vue";
import Hr from "~/components/Hr.vue";

const { LogIn, SignIn } = useAuthentication();

const SignUpWith = (params: any, { slots }: any) => {
  return h(
    "div",
    {
      class:
        "border-2 border-zinc-600 text-black bg-white rounded-full w-full py-3 mb-2 px-4 flex items-center cursor-pointer",
      onClick: () => SignIn(params.provider),
    },
    [h("span", "Continue With " + params.text), slots?.default?.()]
  );
};
// const Button = (params: any) => {
//   return h(
//     "button",
//     { class: "font-bold rounded-full w-full py-3 text-center mb-2 px-4" },
//     params.text
//   );
// };

const Heading1 = () =>
  h(
    "h1",
    { class: "text-4xl md:text-5xl font-900 mb-16 text-center" },
    "Welcome back"
  );

const email = ref("");
const password = ref("");
</script>
<template>
  <div h="screen" bg="cover center no-repeat" class="flex">
    <div class="w-full md:w-3/5 lg:w-1/2 flex justify-center items-center">
      <div class="max-w-md mx-10">
        <Heading1 />
        <SignUpWith text="Google" provider="google">
          <Google class="ml-auto h-6 w-6" />
        </SignUpWith>
        <component :is="Hr" label="or" class="my-5" />
        <form
          @submit.prevent="() => LogIn(email, password)"
          class="flex flex-col gap-3 mb-5"
        >
          <label class="block text-sm font-bold mb-2" for="email">Email</label>
          <input
            class="w-full p-3 border border-gray-300 rounded"
            type="email"
            v-model="email"
            required
          />
          <label class="block text-sm font-bold mb-2" for="password"
            >Password</label
          >
          <input
            class="w-full p-3 border border-gray-300 rounded"
            type="password"
            v-model="password"
            required
            minlength="6"
          />
          <button
            class="font-bold rounded-full w-full py-3 text-center mb-2 px-4 bg-blue-500 text-white"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p class="text-xs tracking-wider">
          By continuing, you agree to the
          <NuxtLink to="/tos" class="text-blue-500">Terms of Service</NuxtLink>
          and
          <NuxtLink to="/privacy-policy" class="text-blue-500"
            >Privacy Policy</NuxtLink
          >, including
          <NuxtLink to="/cookie-rules-and-policies" class="text-blue-500"
            >Cookie Use</NuxtLink
          >.
        </p>
        <br />
        <h3 class="text-lg md:text-xl mb-2">Don't have an account?</h3>
        <nuxt-link
          to="/signup"
          class="font-bold rounded-full w-full py-3 text-center mb-2 px-4 bg-green-600 text-white"
          type="submit"
        >
          Sign Up
        </nuxt-link>
      </div>
    </div>
    <section class="flex-grow hidden md:flex lg:1/2"></section>
  </div>
</template>

<style scoped>
section {
  background-image: url("https://i.giphy.com/3ohhwfsweRaKsZo17W.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
