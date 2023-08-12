// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-lodash"],
  app: {
    head: {
      title: "Nuxt Store",
      meta: [{ name: "description", content: "Nuxt Store" }],
    },
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
  },
  runtimeConfig: {
    apiKey: "AIzaSyAdvQTxQUXG2RuDiwAWagLtr0lxzBD3RKg",
    authDomain: "nuxt-store-4c385.firebaseapp.com",
    projectId: "nuxt-store-4c385",
    storageBucket: "nuxt-store-4c385.appspot.com",
    messagingSenderId: "514393926820",
    appId: "1:514393926820:web:ecb355313495d9aca9ca31",
  },
  plugins: [
    { src: "~/plugins/firebase.client.ts", mode: "client" },
    { src: "~/server/plugins/firebase.server.ts", mode: "server" },
    "~/plugins/pinia.ts",
  ],
});
