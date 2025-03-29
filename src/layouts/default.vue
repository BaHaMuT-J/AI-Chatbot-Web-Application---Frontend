<template>
  <Navbar v-if="showNavbar" />

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
const route = useRoute();

const showNavbar = computed(
  () => !["/login", "/register"].includes(route.path)
);
</script>
