<template>
  <div>
    <Head>
      <Title>Nuxt Store | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>

    <ProductDetails :product="product" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const uri = "/api/product/" + id;
const urlInventory = "/api/inventory/" + id;

//  fetch the products
const { data: product } = await useFetch(uri);
const { data: inventories } = await useFetch(urlInventory);
console.log(inventories);

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: "Product not found" });
}
</script>
