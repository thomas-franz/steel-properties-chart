const isProd = process.env.NODE_ENV == 'production';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  modules: ['nuxt-highcharts'],
  compatibilityDate: '2025-01-09',
  ssr: false,
  app: {
    baseURL: isProd ? '/wv-bb' : '',
  },
});
