<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="3">
        <v-card class="pa-4">
          <v-card-title class="text-center">Profile</v-card-title>

          <!-- Display Username and Display Name -->
          <v-card-subtitle class="text-center">
            <div><strong>Username:</strong> {{ appStore.username }}</div>
            <div><strong>Display Name:</strong> {{ appStore.displayName }}</div>
          </v-card-subtitle>

          <!-- Buttons for updating display name, changing password, and deleting account -->
          <v-card-actions
            class="d-flex justify-center align-center flex-column"
          >
            <v-btn color="secondary" @click="displayNameModal = true"
              >Update Display Name</v-btn
            >
            <v-btn color="secondary" @click="changePasswordModal = true"
              >Change Password</v-btn
            >
            <v-btn color="error" @click="deleteAccountModal = true"
              >Delete Account</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal for Updating Display Name -->
    <v-dialog
      v-model="displayNameModal"
      max-width="500px"
      @click:outside="closeDispkayNameModal"
      @keydown.esc="closeDispkayNameModal"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Update Display Name</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newDisplayName"
            label="New Display Name"
            outlined
            dense
          ></v-text-field>
          <v-alert v-if="displayNameErr" type="error" dismissible>
            {{ displayNameErr }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="updateDisplayName">Update</v-btn>
          <v-btn @click="closeDispkayNameModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Changing Password -->
    <v-dialog
      v-model="changePasswordModal"
      max-width="500px"
      @click:outside="closeChangePasswordModal"
      @keydown.esc="closeChangePasswordModal"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Change Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            label="New Password"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-alert v-if="passwordErr" type="error" dismissible>
            {{ passwordErr }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="changePassword">Change Password</v-btn>
          <v-btn color="grey" @click="closeChangePasswordModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal for Confirm Deleting Account -->
    <v-dialog
      v-model="deleteAccountModal"
      max-width="500px"
      @click:outside="closeDeleteAccountModal"
      @keydown.esc="closeDeleteAccountModal"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Confirm Deleting Account</v-card-title>
        <v-card-text>
          <p>Are you sure you want to delete your account?</p>
          <p>This action cannot be undone.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="deleteAccount">Confirm</v-btn>
          <v-btn color="grey" @click="closeDeleteAccountModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const router = useRouter();
const axios: any = inject("axios");

const displayNameModal = ref(false);
const changePasswordModal = ref(false);
const deleteAccountModal = ref(false);

const newDisplayName = ref("");
const displayNameErr = ref<string | null>(null);

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const passwordErr = ref<string | null>(null);

const closeDispkayNameModal = () => {
  newDisplayName.value = "";
  displayNameErr.value = null;
  displayNameModal.value = false;
};

const closeChangePasswordModal = () => {
  currentPassword.value = "";
  newPassword.value = "";
  confirmNewPassword.value = "";
  passwordErr.value = null;
  changePasswordModal.value = false;
};

const closeDeleteAccountModal = () => {
  deleteAccountModal.value = false;
};

const updateDisplayName = () => {
  if (newDisplayName.value.trim() !== "") {
    console.log("Display Name Updated:", newDisplayName.value);
  } else {
    displayNameErr.value = "Display Name is required.";
    return;
  }
};

const changePassword = () => {
  if (
    currentPassword.value.trim() === "" ||
    newPassword.value.trim() === "" ||
    confirmNewPassword.value.trim() === ""
  ) {
    passwordErr.value = "All password is required.";
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    passwordErr.value = "Passwords do not match.";
    return;
  }

  console.log("Password Changed!");
  changePasswordModal.value = false;
};

const deleteAccount = async () => {
  console.log("Account Deleted!");

  // log out after deleteAccount
  await axios.get("/api/logout");
  router.push("/login");
};
</script>

<style scoped></style>
