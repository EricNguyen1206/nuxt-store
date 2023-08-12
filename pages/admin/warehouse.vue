<!-- Page overview
    CRUD products
-->
<template>
  <modal-add-receipt-product
    :visible="isOpenAddReceiptProductDialog"
    v-bind:model-value="addingProduct"
    v-on:set-visible="setOpenAddReceiptProductDialog"
  />

  <!-- <ModalImportProduct
    :visible="isOpenImportProductDialog"
    v-on:set-visible="setOpenImportProductDialog"
  /> -->

  <a-table
    :columns="INVENTORIES_TABLE_COLUMN"
    :data-source="inventories?.data"
    :row-key="(record: IInventoryDto) => record.inventoryId"
    :loading="pending"
    :pagination="false"
    @change="handleTableChange"
    bordered
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'categoryId'">
        <a-tag
          :color="
            text == 'men' ? 'volcano' : text == 'women' ? 'geekblue' : 'green'
          "
        >
          {{ upper(text) }}
        </a-tag>
      </template>
      <template v-if="column.key === 'tagId'">
        <a-tag color="purple">
          {{ upper(text) }}
        </a-tag>
      </template>
      <template v-if="column.key === 'colorId'">
        <a-tag :color="text">
          {{
            upper(
              assetsStore.colors.find((color) => color.colorId === text)
                ?.color ?? "black"
            )
          }}
        </a-tag>
      </template>
      <template v-if="column.key === 'sizeId'">
        <a-tag color="default">
          {{
            upper(
              assetsStore.sizes.find((size) => size.sizeId === text)?.size ??
                "L"
            )
          }}
        </a-tag>
      </template>
      <template v-if="column.key === 'image'">
        <a-image :width="100" :src="text" />
      </template>
      <template v-if="column.key === 'updated'">
        <p>{{ new Date(text.seconds * 1000).toLocaleDateString() ?? "" }}</p>
      </template>
      <template v-if="column.key === 'action'">
        <a-button
          type="primary"
          class="mr-2"
          @click="handleOpenAddReceiptProductDialog(record)"
          >Nhập sản phẩm</a-button
        >
      </template>
    </template>
  </a-table>

  <div class="mt-2 flex justify-between">
    <a-pagination
      v-model:current="page"
      :total="products?.total"
      v-model:pageSize="pageSize"
      :show-total="(total: number) => `Total ${total} items`"
    />
    <div class="flex gap-1">
      <a-popconfirm title="Tạo phiếu nhập?" @confirm="handleCreateReceipt">
        <a-button type="primary">
          <template #icon><plus-outlined /></template>
          Tạo phiếu nhập
        </a-button>
      </a-popconfirm>
      <!-- <a-button type="primary" @click="setOpenImportProductDialog(true)"
        ><template #icon><VerticalAlignTopOutlined /></template>Import</a-button
      >
      <a-popconfirm
        title="Export product to .xlsx file?"
        @confirm="handleExportData"
      >
        <a-button type="primary"
          ><template #icon><vertical-align-bottom-outlined /></template
          >Export</a-button
        >
      </a-popconfirm> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { TableProps, message } from "ant-design-vue";
import _ from "lodash";
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

import { INVENTORIES_TABLE_COLUMN } from "~/constants";
// import { IProduct } from "~/types";
import { useAssetsStore } from "~/store/assetsStore";
import { IInventoryDto } from "~/types/dto/inventory";
import { useReceiptStore } from "~/store/receiptStore";

// meta
definePageMeta({
  layout: "admin",
  middleware: ["auth-admin"],
  // or middleware: 'auth'
});

// states
const isOpenAddReceiptProductDialog = ref<boolean>(false);
const isOpenCreateProductDialog = ref<boolean>(false);
const page = ref(1);
const addingProduct = ref<IInventoryDto | undefined>(undefined);
const assetsStore = useAssetsStore();
const receiptStore = useReceiptStore();
// listener & side effect
watch(page, (n, o) => {
  refresh();
});

const {
  pending,
  data: inventories,
  refresh,
} = await useFetch(() => `/api/inventory?page=${page.value}`, {
  method: "get",
});

console.log("inventories", inventories);

// event handler & methods
const handleTableChange: TableProps["onChange"] = (pagination) => {
  pagination.current && (page.value = pagination.current);
};
// return string uppercase
const upper = (s: string) => _.toUpper(s);

// open create product dialog
const setOpenCreateProductDialog = (value: boolean) => {
  isOpenCreateProductDialog.value = value;
};

// open edit product dialog
const handleOpenAddReceiptProductDialog = (product: IInventoryDto) => {
  console.log("product adding", product);
  addingProduct.value = product;
  isOpenAddReceiptProductDialog.value = true;
};

const handleCreateReceipt = async () => {
  const result = await receiptStore.createReceipt();
  if (result) {
    message.success("Tạo phiếu nhập thành công");
    return;
  }
  message.success("Tạo phiếu nhập không thành công");
};

// open import product by uploaf file excel
const setOpenAddReceiptProductDialog = (value: boolean) => {
  isOpenAddReceiptProductDialog.value = value;
};
</script>
