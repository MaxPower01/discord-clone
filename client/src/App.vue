<template>
  <TopBar />

  <main>
    <RouterView />
  </main>
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

<style lang="scss" scoped>
main {
  padding: 1em;
}
</style>
