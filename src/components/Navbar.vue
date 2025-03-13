<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AI Chatbot webapp</v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex justify-space-around">
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
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const axios: any = inject("axios");
const router = useRouter();
const profile = () => {
  console.log("profile");
};
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
