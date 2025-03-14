<template>
  <v-app-bar :elevation="2" height="80">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AI Chatbot webapp</v-app-bar-title>

    <template v-slot:append>
      <v-btn color="primary">
        <v-icon
          ><i class="fa-solid fa-user fa-xl" style="color: #e9ecf1"></i
        ></v-icon>

        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in menus"
              :key="index"
              :value="index"
            >
              <v-list-item-title @click="item.click">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" width="300">
    <v-list style="position: absolute" flat width="100%">
      <v-list-item class="text-center">
        <!-- <v-icon class="mb-2"
            ><i class="fa-solid fa-user fa-xl" style="color: #e9ecf1"></i
          ></v-icon> -->
        <v-list-item-title class="my-4"> Model Chats </v-list-item-title>
        <v-divider></v-divider>
      </v-list-item>
      <v-list-item>
        <v-avatar class="my-4" size="x-large">
          <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </v-avatar>
      </v-list-item>
      <v-list-item>
        <v-avatar class="my-4" size="x-large">
          <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </v-avatar>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const drawer = ref(true);

const axios: any = inject("axios");
const router = useRouter();
const profile = () => {};
const setting = () => {};
const logout = async () => {
  let response = await axios.get("/api/logout");
  router.push("/login");
};
const menus = [
  { title: "Profile", click: profile },
  { title: "Setting", click: setting },
  { title: "Logout", click: logout },
];
</script>
