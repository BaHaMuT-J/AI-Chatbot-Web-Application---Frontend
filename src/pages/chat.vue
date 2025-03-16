<template>
  <v-container class="d-flex flex-column ma-auto">
    <v-list ref="chatBox" class="pa-2" height="calc(85vh - 80px)">
      <v-list-item v-for="(msg, index) in messages" :key="index">
        <v-row
          :justify="msg.user ? 'end' : 'start'"
          class="d-flex align-center mb-4 pa-3"
        >
          <!-- <v-avatar v-if="msg.from !== 'me'" size="40">
            <v-img src="https://randomuser.me/api/portraits/men/75.jpg" />
          </v-avatar> -->

          <v-card class="rounded-xl pa-3" max-width="70%" color="blue-darken-3">
            <v-card-text class="text-white">
              <span v-html="parseMarkdown(msg.text)"></span>
            </v-card-text>
          </v-card>
        </v-row>
      </v-list-item>
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
      <v-btn icon="mdi-send" color="primary" @click="sendMessage"></v-btn>
    </v-footer>
  </v-container>
</template>

<script setup lang="js">
import { useAppStore } from "@/stores/app";
import { ref } from "vue";
import { marked } from "marked";

const messages = ref([]);

const newMessage = ref("");
const chatBox = ref(null);

const appStore = useAppStore();
const axios = inject("axios");

const scrollToBottom = () => {
  if (chatBox.value) {
    chatBox.value.$el.scrollTop = chatBox.value.$el.scrollHeight;
    // chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    let msg = newMessage.value
    newMessage.value = "";
    messages.value.push({ text: msg, user: true });
    nextTick(() => {
      scrollToBottom();
    });

    let response = await axios.post("/api/chat/send", {
      chatId: appStore.chatId,
      prompt: msg,
    });

    if (response.data.success === false) {
      // TODO: alert error
      messages.value.pop();
      let error = response.data.message;
      return;
    }
    msg = response.data.response
    messages.value.push({ text: msg, user: false });

    nextTick(() => {
      scrollToBottom();
    });
  }
};

const parseMarkdown = (text) => {
  // TODO: if possible, line break the code
  return marked(text);
};

watch(
  () => appStore.aiId,
  async (newAiId) => {
    if (newAiId !== null) {
      let response = await axios.post("/api/chat/getByUserAndAI", {
        userId: appStore.userId,
        aiId: newAiId,
      });
      let chatId = response.data.chatId;
      appStore.chatId = chatId;

      response = await axios.post("/api/message/getByChat", {
        chatId: chatId,
      });
      messages.value = response.data;

      nextTick(() => {
        scrollToBottom();
      });
    }
  },
  { immediate: true }
);

onMounted(async () => {
  if (appStore.aiId !== null) {
    let response = await axios.post("/api/chat/getByUserAndAI", {
      userId: appStore.userId,
      aiId: appStore.aiId,
    });
    let chatId = response.data.chatId;
    appStore.chatId = chatId;

    response = await axios.post("/api/message/getByChat", {
      chatId: chatId,
    });
    messages.value = response.data;

    scrollToBottom();
  }
});
</script>

<style scoped></style>
