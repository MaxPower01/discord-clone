<template>
  <nav>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      :default-active="activeTab"
    >
      <el-menu-item index="/">
        Accueil
      </el-menu-item>
      <el-menu-item index="/about">
        À propos
      </el-menu-item>
      <el-menu-item index="/signin">
        Connexion
      </el-menu-item>
      <el-menu-item index="/signup">
        Créer un compte
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";

export default defineComponent({
  name: "TopBar",
  data() {
    return {
      activeTab: ""
    };
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.activeTab = newRoute.path;
    }
  }
});
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
