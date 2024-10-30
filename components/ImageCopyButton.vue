<script lang="tsx" setup>
import { ref } from 'vue';

interface ImageCopyButtonProps {
  url: string;
}

const props = defineProps<ImageCopyButtonProps>();

const copied = ref(false);

const handleClick = async () => {
  try {
    // Fetch the image from the provided URL
    const response: Response = await fetch(props.url);

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) throw new Error("Network response was not ok");

    // Convert the response to a blob
    const blob: Blob = await response.blob();

    // Create a new ClipboardItem holding the image blob
    // TypeScript might require a custom type declaration for ClipboardItem
    const clipboardItem = new ClipboardItem({ "image/png": blob });

    // Write the ClipboardItem to the clipboard
    await navigator.clipboard.write([clipboardItem]);

    console.log("Image copied to clipboard successfully!");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy image: ", error);
  }
};
</script>

<template>
  <button
    :class="[
      'z-20 absolute bottom-0 py-2 px-4 rounded-3xl tracking-wider left-[50%] translate-x-[-50%] mb-10',
      copied ? 'bg-green-500 text-white' : 'bg-white text-black'
    ]"
    @click="handleClick"
  >
    <span>{{ copied ? 'Copied!' : 'Copy Image' }}</span>
  </button>
</template>

<style scoped>
/* Add any additional styles here */
</style>