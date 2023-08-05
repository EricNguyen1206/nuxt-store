<!-- Component overview
    Display product detail: image, title, description
    and add to card button
-->
<template>
    <div class="card">
        <div class="grid grid-cols-2 gap-10">
            <div class="p-7">
                <img :src="`${product.image}`" class="mx-auto my-7" />
            </div>
            <div class="p-7">
                <h2 class="text-4xl my-7">{{ product.title }}</h2>
                <p class="text-xl my-7">
                    {{ product.price.toLocaleString() }} VND
                </p>
                <h3 class="font-bold border-b-2 mb-4 pb-2">Mô tả sản phẩm:</h3>
                <p class="mb-7">{{ product.description }}</p>

                <a-button type="primary" @click="handleClick">
                    <template #icon>
                        <PlusCircleOutlined />
                    </template>
                    Add to cart
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
const { product } = defineProps(["product"]);
const { addToCard } = useCart();
const { user } = useAuth();
const router = useRouter();

// Handle add to cart context
const handleClick = () => {
    if (!user.value) {
        message.warning("Plese login to get product!");
        router.push("/auth/login");
    } else {
        addToCard(product);
        message.success("Product added!");
    }
};
</script>

<style scoped>
img {
    max-width: 400px;
}
</style>
