<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { VTextField } from 'vuetify/components/VTextField';

import type { InputProps } from './types';

import { computedWidth } from './services';

const props = defineProps<InputProps>();

const calcWidth = computed(() => computedWidth(props.width));
</script>

<template>
    <VTextField
        :label="label"
        single-line
        variant="outlined"
        :type="type"
        :style="{ width: calcWidth }"
    />
</template>
