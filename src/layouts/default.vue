<template>
  <Navbar v-if="showNavbar" />

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const showNavbar = computed(
  () => !["/login", "/register"].includes(route.path)
);
</script>
