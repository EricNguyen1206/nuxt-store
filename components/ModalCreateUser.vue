<!-- component overview
    display dialog to enter user data
    validate and convert image to base64
    send data to server then notify if success
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
                    label="Email"
                    name="email"
                    :rules="[{ type: 'email' }]"
                >
                    <a-input v-model:value="form.email" />
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
                        v-model:file-list="fileList"
                        name="file"
                        accept="image/*"
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
    visible: {
        type: Boolean,
    },
});

// States
const emit = defineEmits(["update:visible"]);
const form = reactive<FormState>({
    username: "",
    email: "",
    password: "",
    checkPass: "",
    avatar: "",
});
const fileList = ref<File[]>([]);

// Event handler, method, validator
const handleChangeImage = async (info: UploadChangeParam) => {
    if (info.file.status === "done" && info.file.originFileObj) {
        form.avatar = (await uploadImage(
            info.file.originFileObj,
            "avatar"
        )) as string;
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
    }
};

const progress: UploadProps["progress"] = {
    strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent?.toFixed(2) || "0")}%`,
    class: "test",
};

const handleCancel = () => {
    emit("update:visible", false);
};
const handleOk = async () => {
    try {
        await useFetch("/api/user", {
            method: "post",
            body: {
                user: {
                    ...form,
                },
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
