<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <main class="flex-1">
      <!-- <HeroSection /> -->
      <div className="flex flex-col gap-y-5 pt-8 marge-x">
        <h1 className="text-heading">Browse {{ $route.params.feature }}</h1>
        <slot></slot>
      </div>
    </main>
    <!-- <Footer />  -->
  </div>
</template>

<style scoped></style>
