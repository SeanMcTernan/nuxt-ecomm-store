<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="mx-2">
    <div class="relative rounded-lg shadow-lg">
      <NuxtLink :to="link">
        <NuxtImg
          :src="image"
          class="shadow-lg rounded-lg opacity-1 hover:opacity-75 transition duration-300 ease-in-out w-full"
          format="webp"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          width="320,480,640"
          height="480"
          quality="85"
          loading="lazy"
          placeholder
        />
      </NuxtLink>
      <div class="p-6">
        <h5 class="font-bold text-lg mb-3">{{ title }}</h5>
        <pre class="text-gray-500 mb-4">{{ price }}</pre>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>
