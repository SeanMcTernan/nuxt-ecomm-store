<script setup lang="ts">
import { computed } from 'vue';
import { getProductsQuery } from '../graphql/getProductsQuery';

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

const variables = { first: 8 }
const { data } = await useAsyncQuery<QueryData>(getProductsQuery, variables)

const formattedProducts = computed(() => 
  data.value?.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: parseFloat(node.priceRange.maxVariantPrice.amount),
    image: node.images.edges[0].node.src,
    link: `products/${node.handle}`
  })) || []
);
</script>

<template>
  <div>
    <HeroBanner />
    <div class="my-20 px-8">
      <ProductCarousel
        title="BEST SELLERS"
        :products="formattedProducts"
      />
    </div>
  </div>
</template>