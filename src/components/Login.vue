<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>

          <v-card-subtitle>
            Please enter your credentials to login.
          </v-card-subtitle>

          <!-- Login Form -->
          <v-form v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="username"
              label="Username"
              :rules="usernameRules"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
              type="password"
              outlined
              dense
            ></v-text-field>

            <v-btn :disabled="!valid" color="primary" block type="submit">
              Login
            </v-btn>

            <!-- Error message -->
            <v-alert v-if="errorMessage" type="error" dismissible class="mt-4">
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const valid = ref(false);
const errorMessage = ref("");

const usernameRules = [(value: string) => !!value || "Username is required"];

const passwordRules = [(value: string) => !!value || "Password is required"];

// Login form submission handler
const axios: any = inject("axios");
const router = useRouter();
const submitForm = async () => {
  try {
    const response = await axios.post("http://localhost:8081/api/login", {
      username: username.value,
      password: password.value,
    });

    if (response.data.success) {
      console.log("Login successful: ", response.data.message);
      router.push("/home");
    } else {
      errorMessage.value = response.data.message || "Login failed.";
    }
  } catch (error) {
    console.error("Login request failed: ", error);
    errorMessage.value = "Login failed.";
  }
};
</script>

<style scoped></style>
