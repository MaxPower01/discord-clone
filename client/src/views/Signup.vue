<template>
  <el-form ref="form">
    <el-form-item :label="inputLabel.username">
      <el-input v-model="form.username" :placeholder="inputLabel.username">
      </el-input>
    </el-form-item>

    <el-form-item :label="inputLabel.email">
      <el-input
        v-model="form.email"
        :placeholder="inputLabel.email"
        type="email"
      >
      </el-input>
    </el-form-item>

    <el-form-item :label="inputLabel.password">
      <el-input
        v-model="form.password"
        :placeholder="inputLabel.password"
        type="password"
      >
      </el-input>
    </el-form-item>

    <el-form-item :label="inputLabel.confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        :placeholder="inputLabel.confirmPassword"
        type="password"
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">Créer un compte</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      inputLabel: {
        username: "Username",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password"
      },
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Submitting form...");
      console.log(this.form);
    }
  }
});
</script>

<style lang="scss" scoped></style>
