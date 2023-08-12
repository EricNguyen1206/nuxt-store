<!-- Component overview
  get product to edit
  update data to firebase
  send noti update done
-->
<template>
  <div>
    <a-modal
      v-model:visible="props.visible"
      title="Basic Modal"
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
        <a-form-item has-feedback label="Quantity" name="quantity">
          <a-input-number v-model:value="form.quantity" />
        </a-form-item>
        <a-form-item name="price" label="Price">
          <a-input prefix="₫" suffix="VND" v-model:value="form.price" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { Rule } from "ant-design-vue/lib/form";
import { useReceiptStore } from "~/store/receiptStore";
import { IInventoryDto } from "~/types/dto/inventory";

interface FormState {
  quantity: number;
  price: number;
}
const props = defineProps({
  visible: {
    type: Boolean,
  },
  modelValue: {
    type: Object,
  },
});

const emit = defineEmits(["set-visible"]);
const receiptStore = useReceiptStore();
const form = reactive<FormState>({
  quantity: 10,
  price: 0,
});
const rule: Record<string, Rule[]> = {
  quantity: [{ min: 10, message: "Số lượng tối thiểu là 10", trigger: "blur" }],
  price: [{ min: 0, message: "Giá tối thiểu là 0", trigger: "blur" }],
};

/**
 * shut down edit dialog
 */
const handleCancel = () => {
  emit("set-visible", false);
};

/**
 * handle submit edit form
 */
const handleOk = async () => {
  try {
    console.log("props.modelValue", props.modelValue);
    if (props.modelValue) {
      receiptStore.addProduct({
        ...props.modelValue,
        price: form.price,
        quantity: form.quantity,
      } as IInventoryDto);

      emit("set-visible", false);
      message.success("Đã thêm sản phẩm vào phiếu nhập");
    } else {
      message.error("Thêm sản phẩm thất bại!");
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      message.error(e.message);
    }
  }
};
</script>
