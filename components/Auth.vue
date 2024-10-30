<script setup lang="ts">
import Apple from '~/assets/icons/AppleLogo.vue';
import Google from '~/assets/icons/Google.vue';
import Mobbin from '~/assets/icons/Mobbin.vue';

const SignUpWith = (text: string, IconComponent: any) => {
  return h('div', { class: 'bg-white text-black rounded-full w-full py-3 mb-2 px-4 flex items-center' }, [
    h('span', 'Sign in With' + text),
    h(IconComponent, { class: 'ml-auto h-6 w-6' }),
  ]);
}
const Button = (text: string) => {
  return h('button', { class: 'font-bold rounded-full w-full py-3 text-center mb-2 px-4' }, text);
}
const params = useRoute().params
// const forLogin = computed(() => params.)
</script>
<template>
  <header h="full" w="full" bg="cover center no-repeat" grid="~ rows-[20%_80%] md:rows-1 md:cols-[50%_50%] lg:cols-[60%_40%]">
    <div p="4" bg="black op-60">
      <div h="full" flex justify-center items-center>
        <component :is="Mobbin" class="h-full max-h-lg text-white" />
      </div>
    </div>
    <div bg="black op-60" class="flex justify-center items-center p-4 h-full md:h-auto overflow-y-scroll">
      <div class="max-w-2xl w-full text-white flex flex-col justify-center items-center md:items-start">
        <h1 class="text-4xl md:text-7xl font-900 mb-16">Happening now</h1>
        <h3 class="text-xl md:text-3xl font-500 mb-1">Join today.</h3><br />
        <div class="w-xs">
          <component :is="SignUpWith('Google', Google)" />
          <component :is="SignUpWith('Apple', Apple)" />
          <Hr label="or" />
          <component :is="Button('Create Account')" class="bg-blue-500 text-white" />
            <p class="text-xs tracking-wider">
            By signing up, you agree to the
            <NuxtLink to="/tos" class="text-blue-500">Terms of Service</NuxtLink> and
            <NuxtLink to="/privacy-policy" class="text-blue-500">Privacy Policy</NuxtLink>, including
            <NuxtLink to="/cookie-rules-and-policies" class="text-blue-500">Cookie Use</NuxtLink>.
            </p>
          <br mb-5 />
          <h3 class="text-lg md:text-xl mb-2">Already have an account?</h3>
          <component :is="Button('Sign In')" class="bg-green-600 text-white" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-image: url("https://placehold.co/600x400/orange/white");
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
