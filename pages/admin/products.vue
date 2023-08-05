<!-- Page overview
    CRUD products
-->
<template>
    <ModalCreateProduct
        :visible="isOpenCreateProductDialog"
        v-on:set-visible="setOpenCreateProductDialog"
    />

    <ModalImportProduct
        :visible="isOpenImportProductDialog"
        v-on:set-visible="setOpenImportProductDialog"
    />
    <ModalEditProduct
        v-if="isOpenEditDialog"
        :visible="isOpenEditDialog"
        v-bind:model-value="edittingProduct"
        v-on:set-visible="setOpenEditDialog"
    />
    <a-table
        :columns="PRODUCTS_TABLE_COLUMN"
        :data-source="products?.data"
        :row-key="(record:IProduct) => record.id"
        :loading="pending"
        :pagination="false"
        @change="handleTableChange"
        bordered
    >
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'category'">
                <a-tag
                    :color="
                        text == 'men'
                            ? 'volcano'
                            : text == 'women'
                            ? 'geekblue'
                            : 'green'
                    "
                >
                    {{ upper(text) }}
                </a-tag>
            </template>
            <template v-if="column.key === 'image'">
                <a-image :width="100" :src="text" />
            </template>
            <template v-if="column.key === 'action'">
                <span class="flex">
                    <a-button
                        type="primary"
                        class="mr-2"
                        @click="handleEdit(record)"
                        >Edit</a-button
                    >
                    <a-button type="default" @click="handleDelete(record.id)"
                        >Delete</a-button
                    >
                </span>
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
            <a-button type="primary" @click="setOpenCreateProductDialog(true)">
                <template #icon><PlusOutlined /></template>
                Add
            </a-button>
            <a-button type="primary" @click="setOpenImportProductDialog(true)"
                ><template #icon><VerticalAlignTopOutlined /></template
                >Import</a-button
            >
            <a-popconfirm
                title="Export product to .xlsx file?"
                @confirm="handleExportData"
            >
                <a-button type="primary"
                    ><template #icon><VerticalAlignBottomOutlined /></template
                    >Export</a-button
                >
            </a-popconfirm>
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

import { PRODUCTS_TABLE_COLUMN } from "~/constants";
import { IProduct } from "~/types";

// meta
definePageMeta({
    layout: "admin",
    middleware: ["auth-admin"],
    // or middleware: 'auth'
});

// states
const isOpenEditDialog = ref<boolean>(false);
const isOpenCreateProductDialog = ref<boolean>(false);
const isOpenImportProductDialog = ref<boolean>(false);
const page = ref(1);
const pageSize = ref(4);
const edittingProduct = ref<IProduct | undefined>(undefined);

// listener & side effect
watch(page, (n, o) => {
    refresh();
});

const {
    pending,
    data: products,
    refresh,
} = await useLazyFetch(() => `/api/product?page=${page.value}`, {
    method: "get",
});

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
const setOpenEditDialog = (value: boolean) => {
    isOpenEditDialog.value = value;
};

// open import product by uploaf file excel
const setOpenImportProductDialog = (value: boolean) => {
    isOpenImportProductDialog.value = value;
};

// set product data to dialog
const handleEdit = async (product: IProduct) => {
    edittingProduct.value = product;
    setOpenEditDialog(true);
};

// call service to delete product and noti after deleted
const handleDelete = async (id: string) => {
    try {
        const { data: res } = await useFetch(`/api/product/${id}`, {
            method: "delete",
        });
        if (res.value?.status == 200) {
            message.success("Delete product!");
            refresh();
            return;
        }
        message.error(res.value?.message + "");
    } catch (e: unknown) {
        if (e instanceof Error) {
            message.success(e.message);
        }
    }
};

const handleExportData = async () => {
    try {
        const { data: res } = await useFetch("/api/product/all", {
            method: "get",
        });
        if (res.value?.data) {
            exportToXLSX(res.value.data.map(({ id, ...rest }) => rest));
            message.success("Data exported!");
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            message.success(e.message);
        }
    }
};
</script>
