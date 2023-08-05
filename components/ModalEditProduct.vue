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
                <a-form-item
                    label="Title"
                    name="title"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input product title!',
                        },
                    ]"
                >
                    <a-input v-model:value="form.title" />
                </a-form-item>

                <a-form-item
                    label="Description"
                    name="description"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input description!',
                        },
                    ]"
                >
                    <a-textarea v-model:value="form.description" />
                </a-form-item>

                <a-form-item label="Category" name="category">
                    <a-radio-group v-model:value="form.category">
                        <a-radio value="men">Men</a-radio>
                        <a-radio value="women">Women</a-radio>
                        <a-radio value="kid">Kid</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item
                    name="price"
                    label="Price"
                    :rules="[{ validator: checkPrice }]"
                >
                    <a-input
                        prefix="₫"
                        suffix="VND"
                        v-model:value="form.price"
                    />
                </a-form-item>

                <a-form-item name="image" label="Image">
                    <a-upload
                        v-model:file-list="imageList"
                        name="file"
                        :progress="progress"
                        @change="handleChangeImage"
                    >
                        <a-button>
                            <upload-outlined></upload-outlined>
                            Click to Upload
                        </a-button>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { UploadChangeParam, UploadProps, message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

interface FormState {
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
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
const form = reactive<FormState>({
    title: props.modelValue?.title,
    description: props.modelValue?.description,
    category: props.modelValue?.category,
    price: props.modelValue?.price,
    image: "",
});
const imageList = ref<File[]>([]);

const progress: UploadProps["progress"] = {
    strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent?.toFixed(2) || "0")}%`,
    class: "test",
};

// Event handler, method, validator
const checkPrice = (_: any, value: { price: number }) => {
    if (value.price > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error("Price must be greater than zero!"));
};
const handleChangeImage = async (info: UploadChangeParam) => {
    if (info.file.status === "done" && info.file.originFileObj) {
        form.image = (await uploadImage(
            info.file.originFileObj,
            "product"
        )) as string;
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
    }
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
        if (props.modelValue) {
            const { data: res } = await useFetch(
                `/api/product/${props.modelValue.id}`,
                {
                    method: "PUT",
                    body: {
                        ...form,
                        id: props.modelValue.id,
                        created: props.modelValue.created,
                    },
                }
            );
            if (res.value?.status == 200) {
                emit("set-visible", false);
                message.success(res.value?.message + "");
                return;
            }
            message.success(res.value?.message + "");
        } else {
            message.error("invalid data!");
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            message.error(e.message);
        }
    }
};
</script>
