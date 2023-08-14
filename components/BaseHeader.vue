<template>
  <a-layout-header style="display: flex; justify-content: space-between">
    <div class="h-8 w-32 m-4 ml-0 bg-gray-500 float-left">
      <p class="text-white text-lg pl-2">Logo</p>
    </div>
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <NuxtLink to="/"><a-menu-item key="1">Home</a-menu-item></NuxtLink>
      <NuxtLink to="/products">
        <a-menu-item key="2"> Products </a-menu-item>
      </NuxtLink>
      <NuxtLink v-if="userData" to="/profile">
        <a-menu-item key="3">
          <a-badge :count="totalItems">
            <p id="cart" class="text-white text-lg font-semibold">
              <ShoppingFilled />
            </p> </a-badge
        ></a-menu-item>
      </NuxtLink>
      <NuxtLink v-else to="/auth/login">
        <a-menu-item key="3"> Login </a-menu-item>
      </NuxtLink>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ShoppingFilled } from "@ant-design/icons-vue";
import { useCartStore } from "~/store/cartStore";
import { useUserStore } from "~/store/userStore";
const { userData } = useUserStore();
const { totalItems } = useCartStore();
</script>

<style>
.ant-layout-content {
  min-height: calc(100vh - 134px);
}
.router-link-exact-active {
  background: #1890ff;
}
.router-link-exact-active span {
  color: white;
}
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#cart {
  margin: 0;
  display: flex;
  align-items: flex-start;
}
#cart span {
  font-size: large;
}
.ant-badge-count {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  line-height: 16px;
}
</style>
