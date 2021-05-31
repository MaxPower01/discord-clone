<template>
  <h1>Signin</h1>

  <Input v-model="event.description" :label="event.description" type="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/form/Input.vue";

export default defineComponent({
  components: { Input },
  data() {
    return {
      event: {
        category: "",
        title: "",
        description: "Event description",
        location: "",
        pets: 1,
        extras: {
          catering: false,
          music: false
        }
      }
    };
  }
});
</script>
