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
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
            >
                <a-form-item name="file" label="File data">
                    <a-upload
                        v-model:file-list="form.csv"
                        accept=".xlsx"
                        name="file"
                        :progress="progress"
                        @change="handleChangeFile"
                    >
                        <a-button>
                            <upload-outlined></upload-outlined>
                            Click to Upload (.xlsx file)
                        </a-button>
                    </a-upload>
                </a-form-item>

                <a-form-item name="preview" label="Preview data">
                    <a-list
                        v-if="previewData.length > 0"
                        item-layout="horizontal"
                        :data-source="previewData.slice(0, 4)"
                        style="background-color: white; padding: 0 8px"
                    >
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta
                                    :description="
                                        stringMinify(item.description, 30)
                                    "
                                >
                                    <template #title>
                                        <p>
                                            {{ stringMinify(item.title, 20) }}
                                            ₫{{
                                                item.price.toLocaleString(
                                                    "en-US"
                                                )
                                            }}
                                        </p>
                                    </template>
                                    <template #avatar>
                                        <a-avatar :src="item.image" />
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { UploadChangeParam, UploadProps, message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

import { IProductMetadata } from "~/types";

interface FormState {
    csv: File[];
}
const props = defineProps({
    visible: {
        type: Boolean,
    },
});
const emit = defineEmits(["set-visible"]);
const form = reactive<FormState>({
    csv: [],
});
const previewData = ref<IProductMetadata[]>([]);

// Event handler, method, validator
const handleChangeFile = async (info: UploadChangeParam) => {
    if (info.file.status === "done" && info.file.originFileObj) {
        const res = await readXLSXFile(info.file.originFileObj);
        previewData.value = res as IProductMetadata[];
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
    emit("set-visible", false);
};

// Upload data from csv to firebase store
const handleOk = async () => {
    try {
        if (previewData.value.length == 0) {
            message.warning("Please upload valid data file!");
        }
        const requests = previewData.value.map((item) =>
            useFetch("/api/product", {
                method: "post",
                body: {
                    ...item,
                    created: new Date(),
                },
            })
        );
        await Promise.all(requests);

        message.success("Import data success!");
        emit("set-visible", false);
    } catch (e: any) {
        message.error(e.message);
        emit("set-visible", false);
    }
};
</script>
