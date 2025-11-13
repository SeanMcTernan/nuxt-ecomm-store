<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const showModal = ref(false);

  onMounted((): void => {
    const dismissed = localStorage.getItem('discountModalDismissed') === 'true';
    if (!dismissed) {
      showModal.value = true;
    }
  });

  function dismissModal(): void {
    localStorage.setItem('discountModalDismissed', 'true');
    showModal.value = false;
  }
</script>

<template>
  <div
    v-if="showModal"
    data-test="discount-modal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 relative max-w-md mx-4 text-center">
      <button
        aria-label="Close modal"
        data-test="close-button"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        @click="dismissModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-2xl font-bold text-gray-900 mb-4">30% Off Your First Order!</h2>
      <p class="text-gray-700 mb-4">
        Use code
        <span class="font-mono bg-gray-100 px-2 py-1 rounded text-lg">BFCM30</span>
        at checkout for 30% off any product.
      </p>
      <button
        data-test="confirm-button"
        class="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        @click="dismissModal"
      >
        Got it!
      </button>
    </div>
  </div>
</template>
