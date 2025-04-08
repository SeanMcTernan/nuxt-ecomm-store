<template>
    <nav class="py-4 relative w-full">
      <div class="container mx-auto px-6 flex items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex-shrink-0">
            <img class="h-20 w-20" src="/logo.svg" alt="Store logo" />
          </NuxtLink>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8 ml-16">
            <NuxtLink to="/mens" class="text-gray-700 hover:text-gray-900 font-bold">Mens</NuxtLink>
            <NuxtLink to="/womens" class="text-gray-700 hover:text-gray-900 font-bold">Womens</NuxtLink>
            <NuxtLink to="/accessories" class="text-gray-700 hover:text-gray-900 font-bold">Accessories</NuxtLink>
            <NuxtLink to="/sale" class="text-gray-700 hover:text-gray-900 font-bold">Sale</NuxtLink>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative flex items-center">
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <input 
              v-if="isSearchVisible"
              ref="searchInput"
              v-model="searchQuery"
              type="text" 
              placeholder="Search products..."
              class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500 mr-2"
              @keyup.enter="handleSearch"
              @keyup.esc="hideSearch"
            >
          </Transition>
          <button 
            class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            @click="toggleSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const searchInput = ref<HTMLInputElement | null>(null);
const isSearchVisible = ref(false);
const searchQuery = ref('');

const toggleSearch = async () => {
  isSearchVisible.value = !isSearchVisible.value;
  if (isSearchVisible.value) {
    await nextTick();
    searchInput.value?.focus();
  }
};

const hideSearch = () => {
  isSearchVisible.value = false;
  searchQuery.value = '';
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
    // TODO: Implement actual search functionality
  }
  hideSearch();
};
</script>