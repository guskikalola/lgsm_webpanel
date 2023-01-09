<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="appStore.drawer = !appStore.drawer"
      v-show="mobile"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>LGSM Webpanel</v-app-bar-title>

    <v-btn @click="appStore.toggleTheme" icon>
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import AppStore from "@/store/theme.js";
import { computed } from "vue-demi";
import { useDisplay } from 'vuetify/lib/framework.mjs';
export default {
  setup() {
    let appStore = AppStore();
    const {mobile} = useDisplay();

    return {
      appStore: appStore,
      mobile : computed(() => mobile.value ),
    };
  },
};
</script>