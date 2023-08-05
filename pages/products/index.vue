<template>
    <div>
        <div
            class="max-w-full md:max-w-[1024px] mx-auto mb-2 grid grid-cols-4 gap-5"
        >
            <div v-for="p in products?.data">
                <ProductCard :product="p" />
            </div>
        </div>
        <div class="h-[25px]">
            <a-spin size="small" v-show="pending" />
        </div>
        <BasePagination v-model="page" :limit="4" :total="products?.total" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const page = ref(1);
const {
    pending,
    data: products,
    refresh,
} = await useLazyFetch(
    () =>
        `/api/product?page=${page.value}${
            route.query.category ? "&category=" + route.query.category : ""
        }`
);

watch(page, (n, o) => {
    refresh();
});

useHead({
    title: `Nuxt Store | ${route.query.category}`,
    meta: [{ name: "description", content: "Nuxt Store" }],
});
</script>
