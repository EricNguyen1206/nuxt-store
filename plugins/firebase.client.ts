import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
    const firebaseConfig = {
        apiKey: "AIzaSyAdvQTxQUXG2RuDiwAWagLtr0lxzBD3RKg",
        authDomain: "nuxt-store-4c385.firebaseapp.com",
        projectId: "nuxt-store-4c385",
        storageBucket: "nuxt-store-4c385.appspot.com",
        messagingSenderId: "514393926820",
        appId: "1:514393926820:web:ecb355313495d9aca9ca31",
    };
    const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
    } = useRuntimeConfig();
    const app = initializeApp(firebaseConfig);

    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    nuxtApp.vueApp.provide("auth", auth);
    nuxtApp.provide("auth", auth);
    nuxtApp.vueApp.provide("firestore", firestore);
    nuxtApp.provide("firestore", firestore);
    nuxtApp.vueApp.provide("storage", storage);
    nuxtApp.provide("storage", storage);
});
