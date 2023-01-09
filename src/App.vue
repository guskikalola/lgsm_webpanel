<template>
  <router-view />
</template>

<script>
import { useTheme } from "vuetify/lib/framework.mjs";
import AppStore from "./store/theme.js";
export default {
  setup() {
    let appStore = AppStore();
    appStore.injectTheme(useTheme());
    return {};
  },
};
</script>
