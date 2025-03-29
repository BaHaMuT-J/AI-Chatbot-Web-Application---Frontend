<template>
  <v-container class="text-center mt-6">
    <v-row>
      <v-col cols="12">
        <h1 class="display-1 white--text ma-4">
          Welcome {{ appStore.displayName }}!
        </h1>
        <h2 class="display-2 white--text">
          Choose an AI from side bar and start chatting!
        </h2>
        <p class="subheading white--text">
          Click top left icon to open side bar, you can click on AI tab to chat
          or click gear icon there to open settings of each AI.
        </p>
        <p class="subheading white--text">
          Click top right icon to open menu, you can update your profile and
          logout there.
        </p>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col v-for="model in models" :key="model.name" cols="12" sm="8" md="3">
        <v-card
          class="pa-3 d-flex justify-center align-center text-center flex-column"
          height="300px"
        >
          <v-avatar class="ma-4" size="x-large" v-html="model.logo" />
          <v-card-title>{{ model.name }}</v-card-title>
          <v-card-subtitle>{{ model.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import AIs from "@/data/AIs";

const appStore = useAppStore();

const models = ref(AIs);
</script>

<style scoped></style>
