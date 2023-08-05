<!-- Page overview
    CRUD users
-->
<template>
    <ModalCreateUser
        :visible="isOpenCreateDialog"
        v-on:update:visible="isOpenCreateDialog = $event"
    />
    <ModalEditUser
        v-if="isOpenEditDialog"
        :visible="isOpenEditDialog"
        v-on:update:visible="isOpenEditDialog = $event"
        v-bind:model-value="edittingUser"
    />
    <a-table
        :columns="USER_TABLE_COLUMN"
        :data-source="users?.data"
        :row-key="(record:IUser) => record.email"
        :loading="pending"
        :pagination="false"
        bordered
    >
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'avatar'">
                <a-avatar shape="square" :size="64" :src="text">
                    <template #icon><user-outlined /></template>
                </a-avatar>
            </template>
            <template v-if="column.key === 'isAdmin'">
                <a-tag :color="text ? 'volcano' : 'green'">
                    {{ text ? "Admin" : "User" }}
                </a-tag>
            </template>
            <template v-if="column.key === 'action'">
                <span class="flex">
                    <a-button
                        type="primary"
                        class="mr-2"
                        @click="handleEdit(record)"
                        >Edit</a-button
                    >
                    <a-button type="default" @click="handleDelete(record.email)"
                        >Delete</a-button
                    >
                </span>
            </template>
        </template>
    </a-table>
    <div class="mt-2 flex justify-between">
        <a-pagination
            v-model:current="page"
            :total="users?.total"
            v-model:pageSize="pageSize"
            :show-total="(total: number) => `Total ${total} items`"
        />
        <a-button type="primary" @click="handleCreate">Add</a-button>
    </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { USER_TABLE_COLUMN } from "~/constants";
import { IUser } from "~/types";

// meta
definePageMeta({
    layout: "admin",
    middleware: ["auth-admin"],
    // or middleware: 'auth'
});

// states
const page = ref(1);
const pageSize = ref(4);
const isOpenCreateDialog = ref<boolean>(false);
const isOpenEditDialog = ref<boolean>(false);
const edittingUser = ref<IUser | undefined>(undefined);

// computed , watcher, call services
const {
    pending,
    data: users,
    refresh,
} = await useLazyFetch(() => `/api/user?page=${page.value}`);
watch(isOpenCreateDialog, (n, o) => {
    if (!n) {
        refresh();
    }
});
watch(page, () => {
    refresh();
});

// handler
const handleDelete = async (email: string) => {
    try {
        await useFetch(`/api/user/${email}`, {
            method: "DELETE",
        });
        message.success("User deleted");
        refresh();
    } catch (e) {
        message.error("Cannot delete this User");
    }
};
const handleEdit = (user: IUser) => {
    edittingUser.value = user;
    isOpenEditDialog.value = true;
};
const handleCreate = () => {
    isOpenCreateDialog.value = true;
};
</script>
