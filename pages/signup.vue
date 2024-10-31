<script setup lang="tsx">
import { h, useAuthentication } from "#imports";
import Apple from "~/assets/icons/AppleLogo.vue";
import Google from "~/assets/icons/Google.vue";
import Mobbin from "~/assets/icons/Mobbin.vue";
import Hr from "~/components/Hr.vue";

const { SignIn } = useAuthentication();

const SignUpWith = (params: any, {slots }: any) => {
  return h(
    "div",
    {
      class: "border-2 border-zinc-600 text-black bg-white rounded-full w-full py-3 mb-2 px-4 flex items-center cursor-pointer",
      onClick: () => SignIn(params.provider),
    },
    [
      h("span", "Continue With " + params.text),
      slots?.default?.(),
    ]
  );
};

const Button = (text: string) => {
  return h(
    "button",
    { class: "font-bold rounded-full w-full py-3 text-center mb-2 px-4" },
    text
  );
};

const Heading1 = () =>
  h(
    "h1",
    { class: "text-4xl md:text-5xl font-900 mb-16 text-center" },
    "Create your free account"
  );
const Heading2 = () =>
  h(
    "h3",
    { class: "text-xl md:text-3xl font-500 mb-5 text-center" },
    "Join Us Today"
  );
</script>
<template>
  <div h="screen" bg="cover center no-repeat" class="flex">
    <div class="w-full md:w-3/5 lg:w-1/2 flex justify-center items-center">
      <div class="max-w-md mx-10">
        <Heading1 />
        <Heading2 />
        <SignUpWith
          text="Google"
          provider="google"
        >
          <Google class="ml-auto h-6 w-6" />
      </SignUpWith>
        <!-- <component :is="SignUpWith('Apple', Apple)" /> -->
        <component :is="Hr" label="or" class="my-5" />
        <nuxt-link to="/register">
          <component
          :is="Button('Create Account')"
          class="bg-blue-500 text-white"
          />
        </nuxt-link>
        <p class="text-xs tracking-wider">
          By signing up, you agree to the
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
        <h3 class="text-lg md:text-xl mb-2">Already have an account?</h3>
        <nuxt-link to="/login">
          <component :is="Button('Log In')" class="bg-green-600 text-white" />
        </nuxt-link>
      </div>
    </div>
    <section class="flex-grow hidden md:flex lg:1/2"></section>
  </div>
</template>

<style scoped>
/* header {
  background-image: url("https://placehold.co/600x400/orange/white");
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
} */
 section {
  background-image: url("https://i.giphy.com/3ohhwfsweRaKsZo17W.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

 }
</style>
