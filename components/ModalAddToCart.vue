<template>
  <div>
    <a-modal
      :visible="props.visible"
      title="Add products"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        :model="form"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="Color" name="colorId">
          <a-select v-model:value="form.colorId" style="width: 120px">
            <a-select-option v-for="color in colors" :key="color" :value="color"
              >[
              <span
                :style="{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: color,
                }"
              ></span>
              ]</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="Size" name="sizeId">
          <a-select v-model:value="form.sizeId" style="width: 120px">
            <a-select-option
              v-for="size in sizes"
              :key="size.sizeId"
              :value="size.sizeId"
              >{{ size.size }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="quantity" label="Quantity">
          <a-input-number
            id="inputNumber"
            v-model:value="form.quantity"
            :min="1"
            :max="
              currentInventory?.quantity -
                (cartStore.details.filter(
                  (item) => item?.inventoryId === currentInventory?.inventoryId
                )[0]?.quantity ?? 0) ?? 9999
            "
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { useAssetsStore } from "~/store/assetStore";
import { useCartStore } from "~/store/cartStore";
import { useUserStore } from "~/store/userStore";
import { IInventoryDto } from "~/types/dto/inventory";

interface FormState {
  colorId: string;
  sizeId: string;
  quantity: number;
}

const props = defineProps<{ visible: boolean; inventories: IInventoryDto[] }>();
const emit = defineEmits(["set-visible"]);
const form = reactive<FormState>({
  colorId: "",
  sizeId: "",
  quantity: 1,
});
const assetsStore = useAssetsStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const activeInventory = computed(() =>
  props.inventories?.filter((inv) => inv.quantity > 0)
);
const colors = computed(() => [
  ...new Set(activeInventory.value.map((inv) => inv.colorId)),
]);
const activeSizes = computed(() =>
  activeInventory.value
    .filter((inv) => inv.colorId === form.colorId)
    .map((inv) => inv.sizeId)
);
const sizes = computed(() =>
  assetsStore.sizes.filter((size) => activeSizes.value.includes(size.sizeId))
);
const currentInventory = computed(
  () =>
    props.inventories?.filter(
      (invent: any) =>
        invent.colorId === form.colorId && invent.sizeId === form.sizeId
    )[0] as IInventoryDto
);
onMounted(() => {
  console.log("Modal inventories: ", props.inventories);
});
const handleCancel = () => {
  emit("set-visible", false);
};
const handleOk = async () => {
  try {
    if (currentInventory.value.inventoryId) {
      const { data: res } = await useFetch("/api/cart", {
        method: "post",
        body: {
          userId: userStore.userData?.userId,
          cartId: cartStore.cartId,
          inventoryId: currentInventory.value.inventoryId,
          quantity: form.quantity,
        },
      });
      if (res.value?.status == 200) {
        await cartStore.getUserCart(userStore.userData?.userId ?? "");
        emit("set-visible", false);
        message.success("Add product successfully!");
        return;
      }
      message.error(res.value?.message + "");
    }
  } catch (e: any) {
    message.error(e.message);
  }
};
</script>
~/store/assetStore
