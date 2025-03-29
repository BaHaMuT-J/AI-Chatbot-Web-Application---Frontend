<template>
  <v-container class="d-flex flex-column ma-auto">
    <v-list id="chatBox" class="pa-2" height="calc(85vh - 80px)">
      <v-list-item v-for="(msg, index) in messages" :key="index">
        <v-row
          :justify="msg.user ? 'end' : 'start'"
          class="d-flex align-center mb-4 pa-3"
        >
          <v-card
            class="rounded-xl pa-3"
            max-width="70%"
            color="blue-grey-darken-2"
          >
            <v-card-text class="text-white">
              <span v-html="parseMarkdown(msg.text)"></span>
            </v-card-text>
          </v-card>
        </v-row>
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

    <!-- Chat Input -->
    <v-footer class="d-flex align-center justify-center pa-2 border-t-sm">
      <v-textarea
        v-model="newMessage"
        placeholder="Type a message ..."
        variant="solo"
        density="compact"
        hide-details
        rows="1"
        auto-grow
        @keyup.enter="sendMessage"
      />
      <v-btn
        v-if="!loading"
        icon="mdi-send"
        color="primary"
        @click="sendMessage"
      ></v-btn>
      <v-progress-circular v-if="loading" color="primary" indeterminate />
    </v-footer>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { marked } from "marked";

interface Message {
  text: string;
  user: boolean;
}

const messages = ref([] as Message[]);
const newMessage = ref("");
const loading = ref(false);

// for alert error
const alert = ref(false);
const errorMsg = ref("");

const router = useRouter();
const appStore = useAppStore();
const axios: any = inject("axios");

const scrollToBottom = () => {
  var objDiv = document.getElementById("chatBox");
  if (objDiv) {
    objDiv.scrollTop = objDiv.scrollHeight;
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    let msg = newMessage.value;
    newMessage.value = "";
    messages.value.push({ text: msg, user: true });
    nextTick(() => {
      scrollToBottom();
    });

    loading.value = true;
    let response = await axios.post("/api/chat/send", {
      chatId: appStore.chatId,
      prompt: msg,
    });

    if (!response.data.success) {
      openAlert(response.data.message + "\n Please try again.");
      messages.value.pop();
      loading.value = false;
      return;
    }

    msg = response.data.response;
    messages.value.push({ text: msg, user: false });

    nextTick(() => {
      scrollToBottom();
      loading.value = false;
    });
  }
};

const parseMarkdown = (text: string) => {
  return marked(text);
};

const openAlert = (msg: string) => {
  alert.value = true;
  errorMsg.value = msg;
};

const closeAlert = () => {
  alert.value = false;
  errorMsg.value = "";
};

watch(
  () => appStore.aiId,
  async (newAiId) => {
    if (newAiId !== null) {
      let response = await axios.post("/api/chat/getByAI", {
        aiId: newAiId,
      });

      if (!response.data.success) {
        openAlert(response.data.message + "\n Please try again.");
        return;
      }
      let chatId = response.data.chatId;
      appStore.chatId = chatId;

      response = await axios.post("/api/message/getByChat", {
        chatId: chatId,
      });

      if (!response.data.success) {
        openAlert(response.data.message + "\n Please try again.");
        return;
      }
      messages.value = response.data.messagesList;

      nextTick(() => {
        scrollToBottom();
      });
    }
  },
  { immediate: true }
);

onMounted(async () => {
  if (appStore.aiId !== null) {
    let response = await axios.post("/api/chat/getByAI", {
      aiId: appStore.aiId,
    });

    if (!response.data.success) {
      openAlert(response.data.message + "\n Please try again.");
      return;
    }
    let chatId = response.data.chatId;
    appStore.chatId = chatId;

    response = await axios.post("/api/message/getByChat", {
      chatId: chatId,
    });

    if (!response.data.success) {
      openAlert(response.data.message + "\nPlease try again.");
      return;
    }
    messages.value = response.data.messagesList;

    scrollToBottom();
  }
});
</script>

<style module>
pre {
  overflow-x: auto;

  /* uncomment the line below if you want code to line break instead of overflow */
  /* white-space: pre-wrap; */
}
</style>
