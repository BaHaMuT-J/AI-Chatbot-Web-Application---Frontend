/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { axiosInstance } from "@/plugins/vue-axios";
import { useAppStore } from "@/stores/app";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  let response = await axiosInstance.get("/api/whoami");
  let isLoggedIn = response.data.loggedIn;

  if (
    (to.name as string) !== "/login" &&
    (to.name as string) !== "/register" &&
    !isLoggedIn
  ) {
    next({ name: "/login" });
  } else if ((to.name as string) === "/login" && isLoggedIn) {
    next({ name: "/" });
  } else if ((to.name as string) === "/chat" && appStore.aiId === null) {
    next({ name: "/" });
  } else {
    next();
  }

  if (isLoggedIn) {
    appStore.setLoggedInUser({
      userId: response.data.userId,
      username: response.data.username,
      displayName: response.data.displayName,
    });
  } else {
    appStore.clearState();
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
