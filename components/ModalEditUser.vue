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
                    label="Username"
                    name="username"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input an username!',
                        },
                    ]"
                >
                    <a-input v-model:value="form.username" />
                </a-form-item>
                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]"
                >
                    <a-input-password v-model:value="form.password" />
                </a-form-item>
                <a-form-item has-feedback label="Confirm" name="checkPass">
                    <a-input
                        v-model:value="form.checkPass"
                        type="password"
                        autocomplete="off"
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
    username: string;
    email: string;
    password: string;
    checkPass: string;
    avatar: string;
}
// Props
const props = defineProps({
    modelValue: {
        type: Object,
    },
    visible: {
        type: Boolean,
    },
});
// State
const emit = defineEmits(["update:visible"]);
const form = reactive<FormState>({
    username: props.modelValue?.username,
    email: props.modelValue?.email,
    password: props.modelValue?.password,
    checkPass: "",
    avatar: "",
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
const handleChangeImage = async (info: UploadChangeParam) => {
    if (info.file.status === "done" && info.file.originFileObj) {
        form.avatar = (await uploadImage(
            info.file.originFileObj,
            "product"
        )) as string;
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
    }
};

// close dialog
const handleCancel = () => {
    emit("update:visible", false);
};

// submit form
const handleOk = async () => {
    try {
        const { data: res } = await useFetch(`/api/user/${form.email}`, {
            method: "put",
            body: {
                ...form,
                created: props.modelValue?.created,
            },
        });
        emit("update:visible", false);
        message.success("Create user successfully!");
    } catch (e: unknown) {
        if (e instanceof Error) {
            message.error(e.message);
        }
    }
};
</script>
