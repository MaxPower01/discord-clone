<template>
  <top-bar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TopBar from "./components/TopBar.vue";

export default defineComponent({
  name: "App",
  components: {
    TopBar
  }
});
</script>
