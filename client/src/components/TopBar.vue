<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    :default-active="activeTab"
    @select="handleSelect"
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
  setup(props) {
    function handleSelect(index: string, indexPath: string[]) {
      console.log(index);
      console.log(indexPath);
    }

    return {
      handleSelect
    };
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.activeTab = newRoute.path;
    }
  }
});
</script>
