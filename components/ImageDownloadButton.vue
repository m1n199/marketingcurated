<script lang="tsx" setup>
import { useAuthentication } from "#imports";
import { Download } from "lucide-vue-next";
import { ref } from "vue";

interface Props {
  url: string;
}

const props = defineProps<Props>();

const { isAuthenticated } = useAuthentication();

const downloaded = ref(false);

const WaterMark = {
  text: "Curated by Placehold",
  bg: "000000",
  color: "ffffff",
  font: "Oswald",
  h: "100",
};

const generateWaterMark = (width: number) => {
  // return `https://placehold.co/${width}x100/000000/ff0000.png?text=Water+Mark&font=roboto`;
  return `https://placehold.co/${width}x${WaterMark.h}/${WaterMark.bg}/${WaterMark.color}.png?text=${WaterMark.text}&font=${WaterMark.font}`;
};

const handleClick = async () => {
  if (!isAuthenticated.value) {
    console.log("User is not authenticated");
    return;
  }
  try {
    // Fetch the image from the provided URL
    const response = await fetch(props.url);

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) throw new Error("Network response was not ok");

    // Convert the response to a blob
    const imageBlob = await response.blob();

    // Create an image element and load the original image
    const originalImage = new Image();
    originalImage.src = URL.createObjectURL(imageBlob);

    originalImage.onload = async () => {
      // Fetch watermark image
      const watermarkUrl = generateWaterMark(originalImage.width);
      const watermarkResponse = await fetch(watermarkUrl);
      const watermarkBlob = await watermarkResponse.blob();
      const watermarkImage = new Image();
      watermarkImage.src = URL.createObjectURL(watermarkBlob);

      watermarkImage.onload = async () => {
        // Create a canvas to combine the images
        const canvas = document.createElement("canvas");
        canvas.width = originalImage.width;
        canvas.height = originalImage.height + watermarkImage.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Draw the original image
          ctx.drawImage(originalImage, 0, 0);

          // Draw the watermark at the bottom
          ctx.drawImage(watermarkImage, 0, originalImage.height);

          // Convert canvas to blob
          canvas.toBlob(async (canvasBlob) => {
            if (canvasBlob) {
              // Create a download link
              const url = window.URL.createObjectURL(canvasBlob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "image_with_watermark.png";
              a.click();
              window.URL.revokeObjectURL(url);
              downloaded.value = true;
              setTimeout(() => {
                downloaded.value = false;
              }, 2000);
            }
          }, "image/png");
        }
      };
    };
  } catch (error) {
    console.error("Failed to download image: ", error);
  }
};
</script>

<template>
  <button
    :disabled="!isAuthenticated"
    :class="[
      'z-20 absolute bottom-0 py-2 px-4 rounded-3xl tracking-wider left-[75%] mb-10 flex justify-center items-center',
      downloaded
        ? 'bg-green-500 text-white'
        : !isAuthenticated
        ? 'bg-gray-400 text-zinc-800'
        : 'bg-white text-black',
      !isAuthenticated ? 'cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="handleClick"
  >
    <Download class="w-6 h-6 inline-block mr-2" />
  </button>
</template>

<style scoped>
/* Add any additional styles here */
</style>
