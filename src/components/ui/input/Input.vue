<script setup lang="ts">
import { defineProps } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';

import type { InputProps } from './types';

import { computedWidth } from './services';

defineProps<InputProps>();
</script>

<template>
    <VTextField
        :label="label"
        single-line
        variant="outlined"
        :type="type"
        :style="{ width: computedWidth(width) }"
    />
</template>

<style scoped lang="scss"></style>
