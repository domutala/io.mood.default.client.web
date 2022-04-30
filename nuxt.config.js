export default {
  server: {
    port: 6050
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SINNOV GLOBAL BUSINESS',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: 'init',
    linkActiveClass: 'active-link'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/mixins/index.scss',
    '~/assets/components/index.scss',
    '~/assets/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/style.ts', mode: 'client' },
    { src: '~/plugins/server.ts', mode: 'client' },
    { src: '~/plugins/utils/index.ts', mode: 'client' },
    { src: '~/plugins/firebase.ts', mode: 'client' },

    // services
    { src: '~/plugins/services/index.ts', mode: 'client' },
    { src: '~/plugins/services/user.ts', mode: 'client' },


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},


  ssr: false
};
