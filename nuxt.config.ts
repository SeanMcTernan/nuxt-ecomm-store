// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@nuxtjs/apollo'],

  image: {
    provider: 'netlify',
    domains: ['mdbootstrap.com', 'cdn.shopify.com']
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.SHOPIFY_STOREFRONT_HOST,
        httpLinkOptions: {
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
          },
        }
      }
    },
  },

  compatibilityDate: '2025-04-06'
})