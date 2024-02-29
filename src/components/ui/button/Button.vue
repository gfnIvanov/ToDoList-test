<script setup lang="ts">
import { VBtn } from 'vuetify/components/VBtn';

defineProps<{ text: string; type?: 'text' }>();
</script>

<template>
    <VBtn :variant="type || 'outlined'" class="bc-g" :text="text" />
</template>

<style scoped lang="scss">
.bc-g {
    border-color: gray;
}
</style>
