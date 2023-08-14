<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- Component overview
    Display product detail: image, title, description
    and add to card button
-->
<template>
  <ModalAddToCart
    :visible="showModalAddToCard"
    :inventories="inventories ?? []"
    @set-visible="setOpenDialog"
  />

  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img
          :src="`${product?.image ?? product?.colors?.[0]?.image}`"
          class="mx-auto my-7"
        />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ product.title }}</h2>
        <p class="text-xl my-7">{{ product?.price?.toLocaleString() }} VND</p>
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
import ModalAddToCart from "./ModalAddToCart.vue";
import { useUserStore } from "~/store/userStore";
import { IInventoryDto } from "~/types/dto/inventory";
import { IApiListResponse } from "~/types/common/response";

// eslint-disable-next-line vue/require-prop-types
const { product } = defineProps(["product"]);
const userStore = useUserStore();
const { data: inventories } = await useFetch(
  "/api/inventory/" + product.productId
).then((res) => res.data.value as IApiListResponse<IInventoryDto>);
const router = useRouter();
const showModalAddToCard = ref<boolean>(false);

onMounted(async () => {
  // const res = await useFetch("/api/inventory/" + product.productId);
  // console.log("inventory data: ", res.data.value);
  // inventories.value = res.data.value as IInventoryDto[];
  console.log("inventory data: ", inventories);
});

// Handle add to cart context
const handleClick = () => {
  if (!userStore.userData) {
    message.warning("Plese login to get product!");
    router.push("/auth/login");
  } else {
    showModalAddToCard.value = true;
  }
};

const setOpenDialog = (value: boolean) => {
  showModalAddToCard.value = value;
};
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
