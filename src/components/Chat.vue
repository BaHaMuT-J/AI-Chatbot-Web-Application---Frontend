<template>
  <v-container class="d-flex flex-column ma-auto">
    <v-list ref="chatBox" class="pa-2" height="calc(85vh - 80px)">
      <v-list-item v-for="(msg, index) in messages" :key="index">
        <v-row
          :justify="msg.from === 'me' ? 'end' : 'start'"
          class="d-flex align-center mb-4"
        >
          <!-- <v-avatar v-if="msg.from !== 'me'" size="40">
            <v-img src="https://randomuser.me/api/portraits/men/75.jpg" />
          </v-avatar> -->

          <v-card class="rounded-xl pa-3" max-width="70%" color="primary">
            <v-card-text class="text-white">
              {{ msg.text }}
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
import { ref } from "vue";

const messages = ref([
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
  { text: "Hey! How are you?", from: "other" },
  { text: "I'm good! You?", from: "me" },
  { text: "Great! Let's build a chat app.", from: "other" },
]);

const newMessage = ref("");
const chatBox = ref(null);

const scrollToBottom = () => {
  if (chatBox.value) {
    chatBox.value.$el.scrollTop = chatBox.value.$el.scrollHeight;
    // chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    messages.value.push({ text: newMessage.value, from: "me" });
    newMessage.value = "";

    nextTick(() => {
      scrollToBottom();
    });
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped></style>
