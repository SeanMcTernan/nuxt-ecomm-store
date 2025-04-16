// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Athletic Shoe Store',
      titleTemplate: '%s | Athletic Shoe Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Shop our collection of high-performance athletic and running shoes.' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/apollo'],

  image: {
    provider: 'netlify',
    domains: [
      'cdn.shopify.com',
      'images.contentstack.io'
    ]
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.SHOPIFY_STOREFRONT_HOST,
        httpLinkOptions: {
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN
          },
        }
      }
    },
  },

  compatibilityDate: '2025-04-06'
})