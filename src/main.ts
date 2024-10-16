// register vue composition api globally
import "./styles/main.css";
import "./styles/color-picker.css";
import "./styles/geist-mono.css";
import "./styles/nova.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/source-code-pro/400.css";
import "@fontsource/source-code-pro/700.css";
import { ViteSSG } from "vite-ssg/single-page";
import App from "~/App.vue";
import { createPinia } from "pinia";

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, async (ctx) => {
  const pinia = createPinia();
  ctx.app.use(pinia);
  // @ts-ignore
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
});
