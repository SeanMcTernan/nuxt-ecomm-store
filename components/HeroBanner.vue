<template>
  <section class="relative h-screen flex items-center overflow-hidden">
    <div class="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
      <!-- Rotating Shoe (NEW PART) -->
      <div class="w-full md:w-2/3 flex justify-center items-center h-full py-10 md:py-20">
        <RotatingShoe class="w-full max-w-full max-h-full aspect-[4/3]" />
        </div>
        <!-- Shop Buttons -->
        <div class="w-full md:w-1/3 flex flex-col gap-4">
          <NuxtLink
            v-for="link in shopLinks"
            :key="link.to"
            :to="link.to"
            class="bg-black text-white text-xl font-bold py-4 px-8 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-center min-h-[48px] min-w-[48px] block my-2"
            :aria-label="`Navigate to ${link.text.toLowerCase()} section`"
            role="button"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'; // ref might still be used by shopLinks or other parts if they exist
  import RotatingShoe from './RotatingShoe.vue';

  // manImageLoaded and womanImageLoaded should be removed if they were only for the images
  // const manImageLoaded = ref(false); // REMOVE
  // const womanImageLoaded = ref(false); // REMOVE

  const shopLinks = [
    { to: '/mens', text: 'Shop Mens' },
    { to: '/womens', text: 'Shop Womens' },
    { to: '/accessories', text: 'Shop Accessories' },
  ];
</script>
