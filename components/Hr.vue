<script lang="ts" setup>
const props = defineProps(['label'])
</script>

<template>
  <div class="flex items-center">
    <hr class="flex-grow border-t border-gray-300" />
    <span class="mx-2">{{ props.label }}</span>
    <hr class="flex-grow border-t border-gray-300" />
  </div>
</template>