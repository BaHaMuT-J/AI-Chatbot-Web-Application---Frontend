/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";
import axiosPlugin from "./vue-axios";

// Types
import type { App } from "vue";
import { axiosInstance } from "./vue-axios";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(axiosPlugin);
}
