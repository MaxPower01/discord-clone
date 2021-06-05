<template>
  <Button label="Primary" />
  <Button label="Secondary" class="p-button-secondary" />
  <Button label="Success" class="p-button-success" />
  <Button label="Info" class="p-button-info" />
  <Button label="Warning" class="p-button-warning" />
  <Button label="Help" class="p-button-help" />
  <Button label="Danger" class="p-button-danger" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Button from "primevue/button/Button.vue";

@Options({
  components: {
    HelloWorld,
    Button
  }
})
export default class Home extends Vue {}
</script>
