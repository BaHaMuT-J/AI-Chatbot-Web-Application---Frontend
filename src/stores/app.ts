// Utilities
import { defineStore } from "pinia";

interface userPayload {
  userId: number;
  username: string;
  displayName: string;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    userId: null as number | null,
    isLoggedIn: false,
    username: "",
    displayName: "",
    aiId: null as number | null,
    chatId: null as number | null,
  }),
  getters: {
    //
  },
  actions: {
    setLoggedInUser({ userId, username, displayName }: userPayload) {
      this.isLoggedIn = true;
      this.userId = userId;
      this.username = username;
      this.displayName = displayName;
    },
    clearUser() {
      this.isLoggedIn = false;
      this.username = "";
      this.displayName = "";
    },
    setAI(aiId: number) {
      this.aiId = aiId;
    },
    setChat(chatId: number) {
      this.chatId = chatId;
    },
  },
});
