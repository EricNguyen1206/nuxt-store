<!-- Page overview 
    Login admin account
    Notice: firebase require use real email
    If u don't have, create one at /admin/register
-->
<template>
  <div class="mt-4 relative flex flex-col justify-center overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t border-primary-dark rounded shadow-lg shadow-primary-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-primary">LOGO</h1>

      <form class="mt-6">
        <div>
          <label for="username" class="block text-sm text-gray-800"
            >Username</label
          >
          <input
            v-model="creds.email"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800"
              >Password</label
            >
            <input
              type="password"
              v-model="creds.password"
              class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" class="text-xs text-gray-600 hover:underline"
            >Forget Password?</a
          >
          <div class="mt-6 flex justify-center">
            <button @click="handleSubmit" class="btn">Login</button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Don't have an account?
        <NuxtLink
          to="/admin/register"
          class="font-medium text-primary-dark hover:underline"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";

// Page meta
definePageMeta({
  layout: "auth",
});

// States
const { login } = useFirebaseAuth();
const creds = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  creds.email = localStorage.getItem("email") ?? "";
  creds.password = localStorage.getItem("password") ?? "";
});

// handler
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (
    String(creds.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    await login(creds.email, creds.password);
    localStorage.setItem("email", creds.email);
    localStorage.setItem("password", creds.password);
  } else {
    message.warning("Plese enter a valid email!");
  }
};
</script>
