<template>
  <section class="relative min-h-[80vh] overflow-hidden">
    <div class="container mx-auto px-4 md:px-6 pt-24 pb-12 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Athletes Images -->
        <div class="relative w-full md:w-2/3 flex justify-center items-end">
          <NuxtImg
            src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt011e5dcc2888ffd2/67f81e9f22edb05d2c80493a/Man_Running.png"
            alt="Man Running"
            class="w-[40%] h-auto object-contain relative z-10 -mr-8 max-h-[70vh]"
            format="webp"
          />
          <NuxtImg
            src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt8490ef9609b3ca36/67f81da8c969c96cf4dd50d6/Woman_Running.png"
            alt="Woman Running"
            class="w-[40%] h-auto object-contain relative z-20 max-h-[70vh]"
            format="webp"
          />
        </div>

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
      </div>
    </div>
  </section>
</template>

<script setup>
const shopLinks = [
  { to: '/womens', text: 'Shop Womens' },
  { to: '/mens', text: 'Shop Mens' },
  { to: '/accessories', text: 'Shop Accessories' },
];
</script>