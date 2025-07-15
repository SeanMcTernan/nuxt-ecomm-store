<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <Head>
      <Title>Velocity - Labour Day Launch | Your Store</Title>
      <Meta
        name="description"
        content="The future of running is here. Get early access to Velocity - launching Labour Day 2025."
      />
    </Head>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />

      <!-- Floating Particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="i in 20"
          :key="i"
          class="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }"
        />
      </div>

      <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <!-- Launch Date Badge -->
        <div
          :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-1000',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          ]"
        >
          <Icon name="lucide:calendar" class="w-4 h-4 text-blue-400" />
          <span class="text-sm font-medium">Launching Labour Day 2025</span>
        </div>

        <!-- Main Headline -->
        <h1
          :class="[
            'text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent transition-all duration-1000 delay-200',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          ]"
        >
          VELOCITY
        </h1>

        <h2
          :class="[
            'text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide transition-all duration-1000 delay-400',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          ]"
        >
          The future of running is here
        </h2>

        <!-- Featured Product -->
        <div
          :class="[
            'relative mx-auto mb-12 transition-all duration-1000 delay-600',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          ]"
        >
          <div class="flex justify-center items-center animate-float">
            <img
              src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt0a15f70f0303531c/68756dedcb1936be4d371ed2/hoka.png"
              alt="Hoka Running Shoe - Velocity Collection"
              class="max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="text-center mt-6">
            <span class="text-white/80 text-lg font-medium backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full">
              Velocity - Hoka Collection
            </span>
          </div>
        </div>

        <!-- CTA Section -->
        <div
          :class="[
            'space-y-6 transition-all duration-1000 delay-800',
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          ]"
        >
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div class="relative flex-1 w-full">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                @focus="emailFocus = true"
                @blur="emailFocus = false"
                @keyup.enter="handleEarlyAccess"
              />
              <div
                :class="[
                  'absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 transition-opacity',
                  emailFocus ? 'opacity-100' : 'opacity-0',
                ]"
              />
            </div>

            <button
              class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
              @click="handleEarlyAccess"
            >
              <span class="relative z-10 flex items-center gap-2">
                Get Early Access
                <Icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          <button
            class="group flex items-center gap-3 mx-auto px-6 py-3 text-gray-300 hover:text-white transition-all duration-300"
            @click="handleWatchReveal"
          >
            <div
              class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all"
            >
              <Icon name="lucide:play" class="w-5 h-5 ml-1" />
            </div>
            <span class="font-medium">Watch the reveal</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { getProductsQuery } from '../graphql/getProductsQuery';

  interface EmailValidation {
    isValid: boolean;
    message: string;
  }

  interface ProductNode {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          src: string;
        };
      }>;
    };
  }

  interface QueryData {
    products: {
      edges: Array<{
        node: ProductNode;
      }>;
    };
  }

  const isLoaded = ref<boolean>(false);
  const emailFocus = ref<boolean>(false);
  const email = ref<string>('');

  // Fetch a single product for the hero display
  const variables = { first: 1 };
  const { data, error } = await useAsyncQuery<QueryData>(getProductsQuery, variables);

  // Debug logging
  console.log('GraphQL data:', data.value);
  console.log('GraphQL error:', error.value);

  const featuredProduct = computed(() => {
    const productNode = data.value?.products.edges[0]?.node;
    if (!productNode) {
      return null;
    }

    return {
      id: productNode.id,
      title: productNode.title,
      handle: productNode.handle,
      price: parseFloat(productNode.priceRange.maxVariantPrice.amount),
      image: productNode.images.edges[0]?.node.src || '',
      link: `/products/${productNode.handle}`,
    };
  });

  const validateEmail = (emailValue: string): EmailValidation => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      return { isValid: false, message: 'Email is required' };
    }

    if (!emailRegex.test(emailValue)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true, message: '' };
  };

  const handleEarlyAccess = (): void => {
    const validation = validateEmail(email.value);

    if (!validation.isValid) {
      // In a real app, you'd show this validation message to the user
      // For now, we'll just focus the input
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
      }
      return;
    }

    // Handle successful email submission
    // In a real app, this would send the email to your backend
    console.warn('Early access signup:', email.value);

    // Reset form
    email.value = '';
    emailFocus.value = false;
  };

  const handleWatchReveal = (): void => {
    // Handle watch reveal action
    // This could open a modal, navigate to a video, etc.
    console.warn('Watch reveal clicked');
  };

  onMounted(() => {
    setIsLoaded(true);
  });

  const setIsLoaded = (value: boolean): void => {
    isLoaded.value = value;
  };
</script>

<style scoped>
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(-2deg);
    }
    50% {
      transform: translateY(-15px) rotate(2deg);
    }
  }
</style>
