<template>
  <a-layout class="admin-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="h-8 m-4 bg-gray-500">
        <p class="text-white text-lg pl-2">Logo</p>
      </div>
      <a-menu theme="dark" mode="inline">
        <NuxtLink to="/admin">
          <a-menu-item key="1">
            <bar-chart-outlined />
            <span>Dashboard</span>
          </a-menu-item>
        </NuxtLink>
        <NuxtLink to="/admin/products">
          <a-menu-item key="2">
            <skin-outlined />
            <span>Products</span>
          </a-menu-item>
        </NuxtLink>
        <NuxtLink to="/admin/warehouse">
          <a-menu-item key="3">
            <skin-outlined />
            <span>Warehouse</span>
          </a-menu-item>
        </NuxtLink>
        <NuxtLink to="/admin/users">
          <a-menu-item key="4">
            <user-outlined />
            <span>Users</span>
          </a-menu-item>
        </NuxtLink>
        <a href="/admin/login">
          <a-menu-item key="5">
            <logout-outlined />
            <span>Logout</span>
          </a-menu-item>
        </a>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0"
        class="admin-layout__header"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  SkinOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const collapsed = ref(false);
const { logout } = useFirebaseAuth();
</script>

<style>
.admin-layout {
  min-height: 100vh;
}
.admin-layout__header .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.router-link-exact-active li {
  background: #1890ff;
}
.router-link-exact-active span {
  color: white;
}

.admin-layout__header .trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
