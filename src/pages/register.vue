<template>
  <v-container class="fill-height">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-card-title class="headline pa-0">Create New Account</v-card-title>

          <v-card-subtitle class="my-4 pa-0">
            Please enter your information to register.
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
              v-model="displayName"
              label="Display Name"
              :rules="displayNameRules"
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

            <v-text-field
              v-model="confirmedPassword"
              label="Confirmed Password"
              :rules="ConfirmedPasswordRules"
              type="password"
              outlined
              dense
            ></v-text-field>

            <v-btn
              class="mt-2"
              :disabled="!valid"
              color="blue-darken-3"
              block
              type="submit"
            >
              Register
            </v-btn>

            <v-btn class="mt-2" color="grey-darken-1" to="/login" block>
              Back
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
const displayName = ref("");
const password = ref("");
const confirmedPassword = ref("");
const valid = ref(false);
const errorMessage = ref("");

const usernameRules = [(value: string) => !!value || "Username is required"];
const displayNameRules = [
  (value: string) => !!value || "Display Name is required",
];
const passwordRules = [(value: string) => !!value || "Password is required"];
const ConfirmedPasswordRules = [
  (value: string) => !!value || "Password confirmation is required",
  (value: string) => value === password.value || "Passwords do not match",
];

// Register form submission handler
const axios: any = inject("axios");
const router = useRouter();
const submitForm = async () => {
  try {
    const response = await axios.post("/api/user/create", {
      username: username.value,
      displayName: displayName.value,
      password: password.value,
    });

    console.log(response.data);

    if (response.data.success) {
      router.push({ path: "/login", state: { registered: true } });
    } else {
      errorMessage.value = response.data.message || "Register failed.";
    }
  } catch (error) {
    errorMessage.value = "Register failed.";
  }
};
</script>

<style scoped></style>
