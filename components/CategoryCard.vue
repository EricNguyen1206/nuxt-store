<template>
    <NuxtLink :to="props.link">
        <a-card hoverable style="width: 100%; min-width: 240px">
            <template #cover>
                <img alt="example" :src="props.image" />
            </template>
            <a-card-meta :title="props.title"></a-card-meta>
        </a-card>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    link: {
        type: String,
    },
});
</script>
