<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <Input v-model="label" :label="label" type="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/form/Input.vue";

export default defineComponent({
  components: { Input },
  data() {
    return {
      label: "Label of the input"
    };
  }
});
</script>
