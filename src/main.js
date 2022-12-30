import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import components from "./components/index";

const app = createApp(App);

for (let component of components) {
  app.component(component.name, component);
}

app.mount("#app");
