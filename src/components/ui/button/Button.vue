<script setup lang="ts">
import { VBtn } from 'vuetify/components/VBtn';

defineProps<{ text: string }>();
</script>

<template>
    <VBtn variant="outlined" class="bc-g" :text="text" />
</template>

<style scoped lang="scss">
.bc-g {
    border-color: gray;
}
</style>
