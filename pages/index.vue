<template>
    <div class="block">
        <h2
            class="max-w-full md:max-w-[1024px] mx-auto flex justify-between text-lg text-black"
        >
            Men
            <p class="m-0">
                <NuxtLink to="/products?category=men">
                    <span class="text-sm text-[#12b488] font-bold"
                        >More >></span
                    >
                </NuxtLink>
            </p>
        </h2>
        <div
            class="max-w-full md:max-w-[1024px] mx-auto grid grid-cols-4 gap-5"
        >
            <div v-for="p in men?.data">
                <ProductCard :product="p" />
            </div>
        </div>

        <h2
            class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black"
        >
            Women
            <p class="m-0">
                <NuxtLink to="/products?category=women">
                    <span class="text-sm text-[#12b488] font-bold"
                        >More >></span
                    >
                </NuxtLink>
            </p>
        </h2>
        <div
            class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-4 gap-5"
        >
            <div v-for="p in women?.data">
                <ProductCard :product="p" />
            </div>
        </div>

        <h2
            class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black"
        >
            Kid
            <p class="m-0">
                <NuxtLink to="/products?category=kid">
                    <span class="text-sm text-[#12b488] font-bold"
                        >More >></span
                    >
                </NuxtLink>
            </p>
        </h2>
        <div
            class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-4 gap-5"
        >
            <div v-for="p in kid?.data">
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
            <div v-for="c in PRODUCTS_CATEGORY">
                <CategoryCard
                    :title="c.title"
                    :image="c.image"
                    :link="c.link"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PRODUCTS_CATEGORY } from "~/constants";
const [men, women, kid] = await Promise.all([
    useFetch("/api/product?category=men"),
    useFetch("/api/product?category=women"),
    useFetch("/api/product?category=kid"),
]).then((values) => values.map((res) => res.data));
</script>
