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
    // Define getters if necessary
  },
  actions: {
    setLoggedInUser({ userId, username, displayName }: userPayload) {
      this.isLoggedIn = true;
      this.userId = userId;
      this.username = username;
      this.displayName = displayName;
    },
    clearState() {
      this.userId = null;
      this.isLoggedIn = false;
      this.username = "";
      this.displayName = "";
      this.aiId = null;
      this.chatId = null;
    },
  },
  persist: {
    pick: ["aiId", "chatId"],
  },
});
