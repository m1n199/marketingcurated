<script setup>
const svgContent = `
<svg width="128" height="60" viewBox="0 0 128 60" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M128 28H96V60H128V28Z" fill="black" /> <path d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z" fill="black" /> <path d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z" fill="black" /> </svg>`;

const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
</script>

<template>
  <img :src="svgDataUrl" alt="Twitter Logo" />
</template>