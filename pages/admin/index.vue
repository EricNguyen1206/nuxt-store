<!-- Component overview
    display overview about database
    percent user create today
    number of product by category
    new item in list user & products
-->
<template>
  <!-- Statistic carts -->
  <div style="background: #ececec; padding: 30px">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="Account created today"
            :value="diff"
            :precision="2"
            suffix="%"
            :value-style="{
              color: `${diff > 0 ? '#52c41a' : '#f5222d'}`,
            }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <ArrowUpOutlined v-if="diff > 0" />
              <ArrowDownOutlined v-else />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="Kid"
            :value="kid?.length"
            suffix="products"
            class="demo-class"
            :value-style="{ color: '#faad14' }"
          >
            <template #prefix>
              <AliwangwangOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="Men"
            :value="men?.length"
            suffix="products"
            class="demo-class"
            :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <ManOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="Women"
            :value="women?.length"
            suffix="products"
            class="demo-class"
            :value-style="{ color: '#f5222d' }"
          >
            <template #prefix>
              <WomanOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>

  <!-- Data list -->
  <div style="background: #ececec; padding: 0 30px; padding-bottom: 30px">
    <a-row :gutter="16">
      <a-col :span="18">
        <h2 class="flex justify-between">
          New products
          <NuxtLink to="/admin/products" style="color: #1890ff"
            >Read more >></NuxtLink
          >
        </h2>
        <a-skeleton v-if="productPending" avatar :paragraph="{ rows: 4 }" />
        <a-list
          v-else
          item-layout="horizontal"
          :data-source="products?.data.slice(0, 4)"
          style="background-color: white; padding: 0 8px"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <p>{{ item.title }}</p>
                </template>
                <template #avatar>
                  <a-avatar :src="item.image" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
      <a-col :span="6">
        <h2 class="flex justify-between">
          New users
          <NuxtLink to="/admin/products" style="color: #1890ff"
            >Read more >></NuxtLink
          >
        </h2>
        <a-skeleton v-if="userPending" avatar :paragraph="{ rows: 4 }" />
        <a-list
          v-else
          item-layout="horizontal"
          :data-source="users?.data.slice(0, 4)"
          style="background-color: white; padding: 0 8px"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="stringMinify(item.email, 20)">
                <template #title>
                  <p>{{ item.username }}</p>
                </template>
                <template #avatar>
                  <a-avatar :src="item.avatar" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  AliwangwangOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons-vue";
import { useAssetsStore } from "~/store/assetsStore";

const assetsStore = useAssetsStore();

// Page meta
definePageMeta({
  layout: "admin",
  middleware: ["auth-admin"],
});
onBeforeMount(() => {
  Promise.all([
    assetsStore.getColors(),
    assetsStore.getSizes(),
    assetsStore.getCategories(),
    assetsStore.getTags(),
  ]);
});

const { pending: productPending, data: products } = await useLazyFetch(
  "/api/product/all"
);

const { pending: userPending, data: users } = await useLazyFetch(
  "/api/user/all"
);
const kid = computed(() =>
  products.value?.data.filter((item) => item.category == "kid")
);
const men = computed(() =>
  products.value?.data.filter((item) => item.category == "men")
);
const women = computed(() =>
  products.value?.data.filter((item) => item.category == "women")
);
// Get the current date
const now = new Date();

// Get the date for the previous day
const yesterday = new Date();
yesterday.setDate(now.getDate() - 1);
const timestampToDate = (ts: any) => {
  return new Date(ts.seconds * 1000);
};

// Filter the users created today and yesterday
const usersToday = computed(() =>
  users.value?.data.filter(
    (user) =>
      now.toDateString() === timestampToDate(user.created).toDateString()
  )
);
const usersYesterday = computed(() =>
  users.value?.data.filter(
    (user) =>
      yesterday.toDateString() === timestampToDate(user.created).toDateString()
  )
);

// Calculate the percentage difference
const diff = computed(() => {
  if (usersToday.value && usersYesterday.value) {
    return (
      ((usersToday.value.length - usersYesterday.value.length) /
        (usersYesterday.value.length || 1)) *
      100
    );
  }
  return 0;
});
</script>

<style scoped>
.anticon {
  transform: translateY(-20%) !important;
}
</style>
