<template>
  <v-btn color="red-darken-2" @click="logout"> Logout </v-btn>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const axios: any = inject("axios");
const router = useRouter();
const logout = async () => {
  let response = await axios.get("/api/logout");
  router.push("/login");
};
</script>
