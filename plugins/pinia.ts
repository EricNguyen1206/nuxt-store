import { createPinia } from "pinia";
import { App } from "vue";
export const pinia = createPinia();

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(pinia);
});
