<script setup lang="ts">
import {
    EditOutlined,
    WalletOutlined,
    DeleteOutlined,
    LogoutOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { IProduct, IUser } from "~/types";
// Page meta
definePageMeta({
    middleware: "auth",
});
// State
const { user, logout } = useAuth();
const { cart, removeCartItem, getTotal, clearCart } = useCart();
const isOpenEditDialog = ref<boolean>(false);
const edittingUser = ref<IUser | undefined>(undefined);
const visible = ref<boolean>(false);
const pagination = {
    onChange: (_page: number) => {},
    pageSize: 3,
};

// Listener
onMounted(() => {
    if (user.value) {
        edittingUser.value = user.value;
    }
});

// Handler
const handleEdit = () => {
    isOpenEditDialog.value = true;
};

const showDrawer = () => {
    visible.value = true;
};

const onClose = () => {
    visible.value = false;
};

const handleCheckout = () => {
    clearCart();
    message.success("Thank's for your purchase!");
    onClose();
};
</script>

<template>
    <div>
        <!-- Modal edit user infomation -->
        <ModalEditUser
            v-if="isOpenEditDialog"
            :visible="isOpenEditDialog"
            v-on:update:visible="isOpenEditDialog = $event"
            v-bind:model-value="edittingUser"
        />

        <!-- Checkout drawer -->
        <a-drawer
            :width="500"
            title="Nuxt Store"
            placement="right"
            :visible="visible"
            @close="onClose"
        >
            <template #extra>
                <a-button
                    style="margin-right: 8px"
                    type="primary"
                    @click="handleCheckout"
                    >Checkout</a-button
                >
                <a-button @click="onClose">Cancel</a-button>
            </template>
            <a-list
                item-layout="horizontal"
                :key="(record:IProduct) => record.id"
                :pagination="pagination"
                :data-source="cart"
            >
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-list-item-meta :description="item.description">
                            <template #title>
                                <p>{{ item.title }}</p>
                            </template>
                            <template #avatar>
                                <a-avatar :src="item.image" />
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </template>
                <template #footer>
                    <p>Total: {{ getTotal() }} VND</p>
                </template>
            </a-list>
        </a-drawer>

        <!-- Main layout profile -->
        <main class="profile-page">
            <!-- Banner -->
            <section class="relative block" style="height: 500px">
                <div
                    class="absolute top-0 w-full h-full bg-center bg-cover"
                    style="
                        background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
                    "
                >
                    <span
                        id="blackOverlay"
                        class="w-full h-full absolute opacity-50 bg-black"
                    ></span>
                </div>
            </section>

            <section class="relative py-16 bg-gray-300">
                <div class="container mx-auto px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
                    >
                        <div class="px-6">
                            <!-- User properties & action -->
                            <div class="flex flex-wrap justify-between">
                                <div
                                    class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                                >
                                    <div class="relative">
                                        <div
                                            id="avatar"
                                            className="w-[100px] h-[100px] shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                        >
                                            <a-image
                                                :width="100"
                                                :src="user?.avatar"
                                                fallback="https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="w-full lg:w-4/12 px-4 lg:order-3 flex lg:justify-end"
                                >
                                    <div class="py-6 mt-32 sm:mt-0">
                                        <a-button
                                            type="primary"
                                            @click="logout"
                                            danger
                                        >
                                            <template #icon>
                                                <LogoutOutlined />
                                            </template>
                                            Logout
                                        </a-button>
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div
                                        class="flex items-center py-6 mt-32 sm:mt-0"
                                    >
                                        <a-button
                                            type="primary"
                                            @click="handleEdit"
                                        >
                                            <template #icon>
                                                <EditOutlined />
                                            </template>
                                            Edit
                                        </a-button>
                                        <div class="mx-4">
                                            <span
                                                class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                                                >{{ user?.username }}</span
                                            ><span
                                                class="text-sm text-gray-500"
                                            >
                                                {{ user?.email }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Product list -->
                            <div class="py-4">
                                <a-list
                                    item-layout="vertical"
                                    size="large"
                                    :key="(record:IProduct) => record.id"
                                    :pagination="pagination"
                                    :data-source="cart"
                                >
                                    <template #footer>
                                        <div class="px-4">
                                            <a-button
                                                v-if="cart.length"
                                                type="primary"
                                                @click="showDrawer"
                                            >
                                                <template #icon>
                                                    <WalletOutlined />
                                                </template>
                                                Checkout
                                            </a-button>
                                        </div>
                                    </template>
                                    <template #renderItem="{ item, index }">
                                        <a-list-item key="item.id">
                                            <template #actions>
                                                <a-button
                                                    shape="circle"
                                                    danger
                                                    @click="
                                                        removeCartItem(index)
                                                    "
                                                >
                                                    <template #icon
                                                        ><DeleteOutlined
                                                    /></template>
                                                </a-button>
                                            </template>
                                            <template #extra>
                                                <a-image
                                                    :width="150"
                                                    :height="150"
                                                    :src="item.image"
                                                    fallback="https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c"
                                                />
                                            </template>
                                            <a-list-item-meta
                                                :description="item.description"
                                            >
                                                <template #title>
                                                    <a :href="item.href">{{
                                                        item.title
                                                    }}</a>
                                                </template>
                                            </a-list-item-meta>
                                            {{ item.price }} VND
                                        </a-list-item>
                                    </template>
                                </a-list>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
