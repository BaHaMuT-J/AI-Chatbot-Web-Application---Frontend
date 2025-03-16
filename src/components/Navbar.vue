<template>
  <v-app-bar :elevation="2" height="80">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title @click="goHome" style="cursor: pointer">
      AI Chatbot Webapp
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn color="primary">
        <v-icon>
          <i class="fa-solid fa-circle-info fa-xl" style="color: #e9ecf1"></i>
        </v-icon>

        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in menus"
              :key="index"
              :value="index"
              width="150"
              class="d-flex justify-center align-center"
              @click="item.click"
            >
              <template v-slot:prepend>
                <v-icon>
                  <i :class="item.icon" style="color: #e9ecf1"></i>
                </v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" width="300">
    <v-list style="position: absolute" flat width="100%">
      <v-list-item class="text-center">
        <v-list-item-title class="text-h6 my-4">
          Model Chats
        </v-list-item-title>
        <v-divider></v-divider>
      </v-list-item>
      <v-list-item
        class="text-center py-4"
        v-for="(model, index) in models"
        :key="index"
        :active="model.aiId === highlighted"
        @click="chatWithAI(model.aiId)"
      >
        <template v-slot:prepend>
          <v-avatar class="ml-4" size="x-large">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                fill="url(#prefix__paint0_radial_980_20147)"
              />
              <defs>
                <radialGradient
                  id="prefix__paint0_radial_980_20147"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                >
                  <stop offset=".067" stop-color="#9168C0" />
                  <stop offset=".343" stop-color="#5684D1" />
                  <stop offset=".672" stop-color="#1BA1E3" />
                </radialGradient>
              </defs>
            </svg>
          </v-avatar>
        </template>
        <v-list-item-title>
          {{ model.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ model.version }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref, inject } from "vue";

interface AI {
  aiId: number;
  name: string;
  version: string;
}

const models = ref<AI[] | null>(null);
const highlighted = ref<number | null>(null);
const drawer = ref(true);

const appStore = useAppStore();
const router = useRouter();
const axios: any = inject("axios");

const goHome = () => {
  appStore.aiId = null;
  highlighted.value = null;
  router.push("/");
};

const profile = () => {};

const setting = () => {};

const logout = async () => {
  await axios.get("/api/logout");
  router.push("/login");
};

const menus = [
  { title: "Profile", icon: "fa-solid fa-user", click: profile },
  {
    title: "Setting",
    icon: "fa-solid fa-gear",
    click: setting,
  },
  {
    title: "Logout",
    icon: "fa-solid fa-right-to-bracket",
    click: logout,
  },
];

const chatWithAI = (id: number) => {
  if (highlighted.value !== id) {
    appStore.aiId = id;
    highlighted.value = id;
    router.push("/chat");
  }
};

onMounted(async () => {
  if (window.innerWidth < 1024) {
    drawer.value = false;
  }

  let response = await axios.get("/api/ai/models");
  models.value = response.data;
});
</script>
