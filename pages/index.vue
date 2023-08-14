<template>
  <div class="block">
    <h2
      class="max-w-full md:max-w-[1024px] mx-auto flex justify-between text-lg text-black"
    >
      Men
      <p class="m-0">
        <NuxtLink to="/products?category=men">
          <span class="text-sm text-[#12b488] font-bold">More >></span>
        </NuxtLink>
      </p>
    </h2>
    <div class="max-w-full md:max-w-[1024px] mx-auto grid grid-cols-4 gap-5">
      <div v-for="p in men?.data" :key="p.id">
        <ProductCard :product="p" />
      </div>
    </div>

    <h2
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black"
    >
      Women
      <p class="m-0">
        <NuxtLink to="/products?category=women">
          <span class="text-sm text-[#12b488] font-bold">More >></span>
        </NuxtLink>
      </p>
    </h2>
    <div
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-4 gap-5"
    >
      <div v-for="p in women?.data" :key="p.id">
        <ProductCard :product="p" />
      </div>
    </div>

    <h2
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black"
    >
      Kid
      <p class="m-0">
        <NuxtLink to="/products?category=kid">
          <span class="text-sm text-[#12b488] font-bold">More >></span>
        </NuxtLink>
      </p>
    </h2>
    <div
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-4 gap-5"
    >
      <div v-for="p in kid?.data" :key="p.id">
        <ProductCard :product="p" />
      </div>
    </div>

    <h2
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black"
    >
      Category
    </h2>
    <div
      class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-3 gap-5"
    >
      <div v-for="c in PRODUCTS_CATEGORY" :key="c.title">
        <CategoryCard :title="c.title" :image="c.image" :link="c.link" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS_CATEGORY } from "~/constants";
import { useAssetsStore } from "~/store/assetStore";
import { useCartStore } from "~/store/cartStore";
import { useUserStore } from "~/store/userStore";

const assetsStore = useAssetsStore();
const userStore = useUserStore();
const cartStore = useCartStore();
onMounted(() => {
  if (userStore.userData?.userId) {
    cartStore.getUserCart(userStore.userData?.userId);
  }
  console.log("cart:", cartStore);
});
const [men, women, kid] = await Promise.all([
  useFetch("/api/product?categoryId=men"),
  useFetch("/api/product?categoryId=women"),
  useFetch("/api/product?categoryId=kid"),
]).then((values) => values.map((res) => res.data));
onBeforeMount(() => {
  Promise.all([
    assetsStore.getColors(),
    assetsStore.getSizes(),
    assetsStore.getCategories(),
    assetsStore.getTags(),
  ]);
});
</script>
