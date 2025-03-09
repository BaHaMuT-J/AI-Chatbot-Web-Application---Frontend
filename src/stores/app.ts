// Utilities
import { defineStore } from "pinia";

interface userPayload {
  username: string;
  displayName: string;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoggedIn: false,
    username: "",
    displayName: "",
  }),
  getters: {
    //
  },
  actions: {
    setLoggedInUser({ username, displayName: diplayName }: userPayload) {
      this.isLoggedIn = true;
      this.username = username;
      this.displayName = diplayName;
    },
    clearUser() {
      this.isLoggedIn = false;
      this.username = "";
      this.displayName = "";
    },
  },
});
