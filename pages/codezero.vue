<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-4xl font-bold text-gray-800">
        CodeZero Data Test
      </h1>

      <div class="rounded-lg bg-white p-6 shadow-lg">
        <button
          @click="fetchCodezeroData"
          :disabled="loading"
          class="mb-6 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {{ loading ? 'Loading...' : 'Fetch CodeZero Data' }}
        </button>

        <div v-if="data" class="mb-4">
          <h2 class="mb-2 text-2xl font-semibold text-gray-700">
            Response Data:
          </h2>
          <pre class="overflow-auto rounded bg-gray-100 p-4 text-sm">{{ JSON.stringify(data, null, 2) }}</pre>
        </div>

        <div v-if="error" class="mb-4">
          <h2 class="mb-2 text-2xl font-semibold text-red-600">
            Error:
          </h2>
          <div class="rounded bg-red-100 p-4 text-red-700">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref<any>(null);
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

// Function to fetch data from the Netlify function
const fetchCodezeroData = async (): Promise<void> => {
  loading.value = true;
  data.value = null;
  error.value = null;

  try {
    const response = await $fetch('/.netlify/functions/codezero-data');
    
    // Console log the data as requested
    console.log('CodeZero data received:', response);
    
    data.value = response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
    console.error('Error fetching CodeZero data:', errorMessage);
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
};

// Set up page meta
useHead({
  title: 'CodeZero Data Test',
  meta: [
    {
      name: 'description',
      content: 'Test page for CodeZero agent data fetching via Netlify Functions',
    },
  ],
});

// Auto-fetch data when the page loads
onMounted(() => {
  fetchCodezeroData();
});
</script>
