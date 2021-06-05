import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./styles/index.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .mount("#app");
