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

        <a-form-item label="Color" name="colorId">
          <a-select
            ref="select"
            v-model:value="form.colors"
            style="width: 120px"
            mode="tags"
          >
            <a-select-option
              v-for="color in assetsStore.colors"
              :key="color.colorId"
              :value="color.colorId"
              >{{ color.color }}{
              <span
                :style="{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: color.colorId,
                }"
              ></span>
              }</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="Size" name="sizeId">
          <a-select
            ref="select"
            v-model:value="form.sizes"
            style="width: 120px"
            mode="tags"
          >
            <a-select-option
              v-for="size in assetsStore.sizes"
              :key="size.sizeId"
              :value="size.sizeId"
              >{{ size.size }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Category" name="categoryId">
          <a-radio-group v-model:value="form.categoryId">
            <a-radio
              v-for="cat in assetsStore.categories"
              :key="cat.categoryId"
              :value="cat.categoryId"
              >{{ cat.category }}</a-radio
            >
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Tag" name="tagId">
          <a-radio-group v-model:value="form.tagId">
            <a-radio
              v-for="tag in assetsStore.tags"
              :key="tag.tagId"
              :value="tag.tagId"
              >{{ tag.tag }}</a-radio
            >
          </a-radio-group>
        </a-form-item>

        <a-checkbox v-model:checked="form.release">Release</a-checkbox>

        <a-form-item name="price" label="Price" :rules="[]">
          <a-input prefix="₫" suffix="VND" v-model:value="form.price" />
        </a-form-item>

        <a-form-item name="image" label="Image">
          <a-upload
            v-model:file-list="imageList"
            accept="image/*"
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
import { IColor } from "~/types/color";
import { uploadImage } from "~/utils/uploadImage";
import { useAssetsStore } from "~/store/assetsStore";
import { ICategory } from "~/types/category";

interface FormState {
  title: string;
  description: string;
  categoryId: string;
  tagId: string;
  price: number;
  colors: string[];
  sizes: string[];
  image: string;
  release: boolean;
}
const props = defineProps({
  visible: {
    type: Boolean,
  },
});
const emit = defineEmits(["set-visible"]);
const form = reactive<FormState>({
  title: "",
  description: "",
  categoryId: "men",
  tagId: "",
  colors: [],
  sizes: [],
  price: 0,
  image: "",
  release: true,
});
const imageList = ref<File[]>([]);
const assetsStore = useAssetsStore();
const category = ref<ICategory | null>(null);

// Event handler, method, validator
const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
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

const progress: UploadProps["progress"] = {
  strokeColor: {
    "0%": "#108ee9",
    "100%": "#87d068",
  },
  strokeWidth: 3,
  format: (percent) => `${parseFloat(percent?.toFixed(2) ?? "0")}%`,
  class: "test",
};

const handleCancel = () => {
  emit("set-visible", false);
};
const handleOk = async () => {
  try {
    const { data: res } = await useFetch("/api/product", {
      method: "post",
      body: {
        ...form,
        colors: assetsStore.colors.map((color) => ({
          colorId: color.colorId,
        })),
        sizes: assetsStore.sizes.map((size) => ({
          sizeId: size.sizeId,
        })),
        tagId: form.tagId,
        categoryId: form.categoryId,
        updated: new Date(),
        isActive: true,
        image: form.image,
      },
    });
    if (res.value?.status == 200) {
      emit("set-visible", false);
      message.success(res.value?.message + "");
      return;
    }
    message.error(res.value?.message + "");
  } catch (e: any) {
    message.error(e.message);
  }
};
</script>
