<script setup lang="ts">
import { VCard } from 'vuetify/components/VCard';

defineProps<{ title: string }>();
</script>

<template>
    <div class="item">
        <VCard class="my-3 w-100" :title="title" link />
    </div>
</template>

<style scoped lang="scss">
.item {
    width: 500px;
}
</style>
