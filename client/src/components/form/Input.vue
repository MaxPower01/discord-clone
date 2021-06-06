<template>
  <label v-if="label">{{ label }}</label>
  <el-input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    label: {
      type: String,
      default: ""
    },
    // placeholder: {
    //   type: String,
    //   default: ""
    // },
    modelValue: {
      type: [String, Number],
      required: true
    }
  }
});
</script>
