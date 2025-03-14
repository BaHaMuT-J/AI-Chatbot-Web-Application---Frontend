<template>
  <v-container class="fill-height">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-card-title class="headline pa-0">Log in</v-card-title>

          <v-card-subtitle class="my-4 pa-0">
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

            <v-btn
              class="mt-2"
              :disabled="!valid"
              color="indigo-darken-4"
              block
              type="submit"
            >
              Login
            </v-btn>

            <v-btn class="mt-2" color="blue-darken-3" to="/register" block>
              Register
            </v-btn>

            <!-- Error message -->
            <v-alert
              v-if="errorMessage"
              :type="success ? 'success' : 'error'"
              dismissible
              class="mt-4"
            >
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
import { useRouter, useRoute } from "vue-router";

const username = ref("");
const password = ref("");
const valid = ref(false);
const success = ref(false);
const errorMessage = ref("");

const usernameRules = [(value: string) => !!value || "Username is required"];
const passwordRules = [(value: string) => !!value || "Password is required"];

const route = useRoute();
onMounted(() => {
  if (history.state?.registered) {
    errorMessage.value = "Registration successful! Please log in.";
    success.value = true;
  }

  const newState = { ...history.state };
  delete newState.registered;
  history.replaceState(newState, document.title);
});

// Login form submission handler
const axios: any = inject("axios");
const router = useRouter();
const submitForm = async () => {
  success.value = false;
  try {
    const response = await axios.post("/api/login", {
      username: username.value,
      password: password.value,
    });

    if (response.data.success) {
      router.push("/");
    } else {
      errorMessage.value = response.data.message || "Login failed.";
    }
  } catch (error) {
    errorMessage.value = "Login failed.";
  }
};
</script>

<style scoped></style>
