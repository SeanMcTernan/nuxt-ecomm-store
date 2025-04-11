<template>
  <div class="w-full">
    <h2 class="text-center text-xl font-bold uppercase tracking-wider mb-8">{{ props.title }}</h2>
    <div class="relative">
      <!-- Previous Button -->
      <button 
        @click="() => scrollLeft()"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Products Container -->
      <div 
        ref="scrollContainer"
        class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar"
      >
        <div 
          v-for="product in props.products" 
          :key="product.id" 
          class="flex-none w-64 snap-start"
        >
          <NuxtLink :to="product.link" class="block">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <NuxtImg
                :src="product.image"
                :alt="product.title"
                class="w-full h-48 object-cover hover:opacity-75 transition duration-300"
                format="webp"
              />
              <div class="p-4">
                <h3 class="font-bold text-lg mb-1">{{ product.title }}</h3>
                <p class="text-gray-600 font-medium">${{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Next Button -->
      <button 
        @click="() => scrollRight()"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Product {
  id: number | string;
  title: string;
  price: number;
  image: string;
  link: string;
}

const props = defineProps<{
  title: string;
  products: Product[];
}>();

const scrollContainer = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollContainer.value.offsetWidth,
      behavior: 'smooth'
    });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollContainer.value.offsetWidth,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
