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
          <v-avatar
            class="ml-4"
            size="x-large"
            v-html="AIs[model.aiId - 1].logo"
          />
        </template>

        <v-list-item-title>
          {{ model.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ model.model }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-icon
            class="fa-solid fa-gear"
            color="#e9ecf1"
            @click="toggleSetting(model.aiId, true)"
          />

          <v-dialog
            v-model="dialog[model.aiId - 1]"
            width="1000"
            @click:outside="toggleSetting(model.aiId, false)"
            @keydown.esc="toggleSetting(model.aiId, false)"
            persistent
          >
            <v-card>
              <v-card-title> {{ model.name }} Settings </v-card-title>
              <v-divider></v-divider>

              <v-select
                v-model="modelCurrent[model.aiId - 1]"
                :items="model.modelsAvailable"
                hint="Choose model"
                label="Select"
                persistent-hint
              ></v-select>

              <v-slider
                v-model="temperature[model.aiId - 1]"
                :min="0.1"
                :max="0.9"
                :step="0.1"
                class="ma-4"
                label="Temperature"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="temperature[model.aiId - 1]"
                    density="compact"
                    style="width: 90px"
                    type="number"
                    variant="outlined"
                    hide-details
                  ></v-text-field>
                </template>
              </v-slider>

              <v-slider
                v-model="maxToken[model.aiId - 1]"
                :min="100"
                :max="1000"
                :step="1"
                class="ma-4"
                label="Max Token"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="maxToken[model.aiId - 1]"
                    density="compact"
                    style="width: 90px"
                    type="number"
                    variant="outlined"
                    hide-details
                  ></v-text-field>
                </template>
              </v-slider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="ms-auto"
                  color="primary"
                  @click="settingChat(model.aiId)"
                >
                  Save
                </v-btn>
                <v-btn
                  class="ms-auto"
                  @click="toggleSetting(model.aiId, false)"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-list-item>

      <v-dialog v-model="alert" width="1000">
        <v-card color="error">
          <v-alert type="error" prominent>{{ errorMsg }}</v-alert>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ms-auto" @click="closeAlert"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import AIs from "@/data/AIs";

interface AI {
  aiId: number;
  name: string;
  model: string;
  temperature: number;
  maxToken: number;
  modelsAvailable: string[];
}

const appStore = useAppStore();
const router = useRouter();
const axios: any = inject("axios");

const models = ref<AI[]>([]);
const highlighted = ref<number | null>(appStore.aiId);
const drawer = ref(true);
const dialog = ref<boolean[]>([]);

// for temporary settings
const temperature = ref<number[]>([]);
const maxToken = ref<number[]>([]);
const modelCurrent = ref<string[]>([]);

// for alert error
const alert = ref(false);
const errorMsg = ref("");

const goHome = () => {
  appStore.aiId = null;
  highlighted.value = null;
  router.push("/");
};

const profile = () => {};

const logout = async () => {
  await axios.get("/api/logout");
  router.push("/login");
};

const menus = [
  { title: "Profile", icon: "fa-solid fa-user", click: profile },
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

const toggleSetting = (aiId: number, open: boolean) => {
  dialog.value[aiId - 1] = open;
  temperature.value[aiId - 1] = models.value[aiId - 1].temperature;
  maxToken.value[aiId - 1] = models.value[aiId - 1].maxToken;
  modelCurrent.value[aiId - 1] = models.value[aiId - 1].model;
};

const settingChat = async (aiId: number) => {
  const response = await axios.post("/api/ai/setting", {
    userId: appStore.userId,
    aiId: aiId,
    model: modelCurrent.value[aiId - 1],
    temperature: temperature.value[aiId - 1],
    maxToken: maxToken.value[aiId - 1],
  });

  dialog.value[aiId - 1] = false;

  const data = response.data;
  if (!data.success) {
    alert.value = true;
    errorMsg.value = data.message + "\n Please try again.";
    modelCurrent.value[aiId - 1] = data.oldModel;
    temperature.value[aiId - 1] = data.oldTemperature;
    maxToken.value[aiId - 1] = data.oldMaxToken;
  } else {
    models.value[aiId - 1].model = modelCurrent.value[aiId - 1];
    models.value[aiId - 1].temperature = temperature.value[aiId - 1];
    models.value[aiId - 1].maxToken = maxToken.value[aiId - 1];
  }
};

const closeAlert = () => {
  alert.value = false;
  errorMsg.value = "";
};

onMounted(async () => {
  if (window.innerWidth < 1024) {
    drawer.value = false;
  }

  let response = await axios.get("/api/ai/models");
  models.value = response.data;

  if (models.value !== null) {
    dialog.value = models.value.map(() => false);

    for (let model of models.value) {
      temperature.value.push(model.temperature);
      maxToken.value.push(model.maxToken);
      modelCurrent.value.push(model.model);
    }
  }
});
</script>
