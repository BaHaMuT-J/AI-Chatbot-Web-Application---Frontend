// stores/index.ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Create Pinia instance and use the persisted state plugin
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
