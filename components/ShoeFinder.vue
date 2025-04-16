<template>
    <section class="relative min-h-[60vh] overflow-hidden">
      <div class="container mx-auto px-4 md:px-6 pt-24 pb-6 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">  
          <!-- Shop Buttons -->
          <div class="w-full md:w-1/3 flex flex-col gap-4">
            <NuxtLink
              v-for="link in shopLinks"
              :key="link.to"
              :to="link.to"
              class="bg-black text-white text-xl font-bold py-4 px-8 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-center"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
          <!-- Athletes Images -->
          <div class="relative w-full md:w-2/3 flex justify-center items-end">
            <img
              src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt7c9621cb952ade1c/67ffdd339ca9d00e1552133f/Shoe_Selector.gif"
              alt="Woman Running"
              class="w-[40%] h-auto object-contain relative z-20 max-h-[70vh]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const shopLinks = [
    { to: '/shoe-finder', text: 'Shoe Finder' },
  ];
  </script>