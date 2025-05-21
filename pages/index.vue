<script setup lang="ts">
  import { computed } from 'vue';

  import { getProductsQuery } from '../graphql/getProductsQuery';

  useHead({
    title: 'Athletic Shoe Store | High Performance Running Shoes',
    meta: [
      {
        name: 'description',
        content:
          'Shop our collection of high-performance athletic and running shoes. Find the perfect fit for your active lifestyle.',
      },
    ],
  });

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

  // Fetch best sellers (most popular products)
  const bestSellersVariables = { first: 8, query: 'tag:best-seller' };
  const { data: bestSellersData } = await useAsyncQuery<QueryData>(getProductsQuery, bestSellersVariables);

  // Fetch new arrivals (sort by created_at)
  const newArrivalsVariables = { first: 8, query: 'tag:new-arrival' };
  const { data: newArrivalsData } = await useAsyncQuery<QueryData>(getProductsQuery, newArrivalsVariables);

  const formatProducts = (data: any) => 
    data?.products.edges.map(({ node }: { node: ProductNode }) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.priceRange.maxVariantPrice.amount),
      image: node.images.edges[0].node.src,
      link: `products/${node.handle}`,
    })) || [];

  const bestSellers = computed(() => formatProducts(bestSellersData.value));
  const newArrivals = computed(() => formatProducts(newArrivalsData.value));
</script>

<template>
  <div>
    <HeroBanner />
    <div class="space-y-32 px-8">
      <LazyProductCarousel title="BEST SELLERS" :products="bestSellers" />
      <LazyProductCarousel title="NEW ARRIVALS" :products="newArrivals" />
      <LazyShoeFinder />
    </div>
  </div>
</template>
