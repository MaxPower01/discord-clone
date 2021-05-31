<template>
  <h1>Signup</h1>
  <form @submit.prevent="submitForm">
    <Input
      v-model="formData.username"
      :label="inputLabel.username"
      type="username"
    />
    <Input v-model="formData.email" :label="inputLabel.email" type="email" />
    <Input
      v-model="formData.password"
      :label="inputLabel.password"
      type="password"
    />
    <Input
      v-model="formData.confirmPassword"
      :label="inputLabel.confirmPassword"
      type="password"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/form/Input.vue";

export default defineComponent({
  components: { Input },
  data() {
    return {
      inputLabel: {
        username: "Username",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password"
      },
      formData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  setup() {
    const submitForm = () => console.log("Submitting form");

    return {
      submitForm
    };
  }
});
</script>
