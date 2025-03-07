// Utilities
import { defineStore } from "pinia";

interface userPayload {
  username: string;
  diplayName: string;
  chatIds: number[];
}

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoggedIn: false,
    username: "",
    diplayName: "",
    chatIds: [] as number[],
  }),
  getters: {
    //
  },
  actions: {
    setLoggedInUser({ username, diplayName, chatIds }: userPayload) {
      this.isLoggedIn = true;
      this.username = username;
      this.diplayName = diplayName;
      this.chatIds = chatIds;
    },
    clearUser() {
      this.isLoggedIn = false;
      this.username = "";
      this.diplayName = "";
      this.chatIds = [] as number[];
    },
  },
});
