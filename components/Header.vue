<template>
    <nav class="py-2 md:py-4 relative w-full">
      <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex-shrink-0 fixed top-2 left-4 z-[60] md:static md:top-auto md:left-auto md:z-auto">
            <img 
              class="h-12 w-12 md:h-20 md:w-20 spin-animation" 
              src="/logo.svg" 
              alt="Store logo" 
              ref="logo"
              @mouseenter="handleLogoHover"
            />
          </NuxtLink>
          
          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8 ml-16">
            <NuxtLink to="/mens" class="text-gray-700 hover:text-gray-900 font-bold">Mens</NuxtLink>
            <NuxtLink to="/womens" class="text-gray-700 hover:text-gray-900 font-bold">Womens</NuxtLink>
            <NuxtLink to="/accessories" class="text-gray-700 hover:text-gray-900 font-bold">Accessories</NuxtLink>
            <NuxtLink to="/sale" class="text-gray-700 hover:text-gray-900 font-bold">Sale</NuxtLink>
          </div>
        </div>

        <!-- Desktop Search Bar -->
        <div class="hidden md:flex relative items-center">
          <Transition
            enter-active-class="transition ease-out duration-700"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="relative w-64">
              <input 
                v-if="isSearchVisible"
                ref="searchInput"
                v-model="searchQuery"
                type="text" 
                placeholder="Search products..."
                class="w-full px-4 py-2 rounded-full border-0 ring-1 ring-[var(--custom-blue)] ring-opacity-30 focus:outline-none focus:ring-2 focus:ring-[var(--custom-blue)] focus:ring-opacity-10 mr-2 shadow-sm bg-white/50 backdrop-blur-sm"
                @keyup.enter="handleSearch"
                @keyup.esc="hideSearch"
              >
              <div v-if="searchQuery && isSearchVisible" class="absolute top-full left-0 right-0 mt-2 backdrop-blur-sm rounded-lg overflow-hidden">
                <div class="p-4 text-gray-600">Search products...</div>
              </div>
            </div>
          </Transition>
          <button 
            class="p-2 rounded-full transition-all duration-200 hover:bg-[var(--custom-pink)]/10 hover:backdrop-blur-sm hover:shadow-[0_0_15px_rgba(238,130,238,0.4)] group"
            @click="toggleSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 transition-all duration-200 group fixed top-2 right-4 z-[60]"
          @click="toggleMobileMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
            :class="[
              'h-6 w-6 transition-all duration-200',
              isMobileMenuOpen 
                ? 'text-gray-600 group-hover:text-gray-800 rotate-90' 
                : 'text-gray-500 group-hover:text-gray-700'
            ]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      >
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[100] mobile-menu">
          <div class="container mx-auto px-6 py-20">
            <!-- Mobile Search -->
            <div class="mb-8">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search products..."
                class="w-full px-4 py-2 rounded-full border-0 ring-1 ring-[var(--custom-blue)] ring-opacity-30 focus:outline-none focus:ring-2 focus:ring-[var(--custom-blue)] focus:ring-opacity-10 shadow-sm"
                @keyup.enter="handleMobileSearch"
              >
            </div>

            <!-- Mobile Navigation Links -->
            <div class="flex flex-col space-y-6">
              <NuxtLink 
                v-for="link in navigationLinks" 
                :key="link.to" 
                :to="link.to" 
                class="text-xl text-gray-700 hover:text-gray-900 font-bold"
                @click="closeMobileMenu"
              >
                {{ link.text }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

interface NavigationLink {
  to: string;
  text: string;
}

const searchInput = ref<HTMLInputElement | null>(null);
const isSearchVisible = ref(false);
const searchQuery = ref('');
const logo = ref<HTMLImageElement | null>(null);
const isMobileMenuOpen = ref(false);

const navigationLinks: NavigationLink[] = [
  { to: '/mens', text: 'Mens' },
  { to: '/womens', text: 'Womens' },
  { to: '/accessories', text: 'Accessories' },
  { to: '/sale', text: 'Sale' }
];

const handleLogoHover = () => {
  if (logo.value) {
    const style = window.getComputedStyle(logo.value);
    const transform = style.transform;
    const match = transform.match(/rotate\(([-\d.]+)deg\)/);
    if (match) {
      const currentRotation = parseFloat(match[1]);
      logo.value.style.setProperty('--current-rotation', currentRotation.toString());
    }
  }
};

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    searchQuery.value = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  searchQuery.value = '';
};

const handleMobileSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Mobile searching for:', searchQuery.value);
    // TODO: Implement actual search functionality
    closeMobileMenu();
  }
};</script>