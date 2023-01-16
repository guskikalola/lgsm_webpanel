<template>
  <v-navigation-drawer
    v-model="appStore.drawer"
    location="left"
    :temporary="mobile"
  >
    <v-container>
      <a href="https://linuxgsm.com/" target="_blank">
        <LinuxGSMLogo />
      </a>
    </v-container>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item router to="/" prepend-icon="mdi-home">
        <v-list-item-content>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group value="Servers">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-server-network"
            title="Servers"
          ></v-list-item>
        </template>

        <v-list-item router :to="{ name: 'ServerList'}">
          <v-list-item-content>
            <v-list-item-title> Servers overview </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item router :to="{ name: 'CreateServerChoose'}">
          <v-list-item-content>
            <v-list-item-title> Create new server </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-group>
      <v-list-item router :to="{ name: 'Configuration'}" prepend-icon="mdi-tune-vertical">
        <v-list-item-content>
          <v-list-item-title> Configuration </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list v-if="API.currentServer != undefined">
      <ServerNavigation/>
    </v-list>

    <slot name="server"></slot>
  </v-navigation-drawer>
</template>

<script>
import ThemeStore from "@/store/theme.js";
import ApiStore from "@/store/api.js";
import { computed } from "vue-demi";
import { useDisplay } from "vuetify/lib/framework.mjs";
import LinuxGSMLogo from "@/components/LinuxGSMLogo.vue";
import ServerNavigation from "@/components/ServerNavigation.vue";

export default {
  setup() {
    const themeStore = ThemeStore();
    const apiStore = ApiStore();
    const { mobile } = useDisplay();
    return {
      drawer: computed(() => themeStore.drawer),
      appStore: themeStore,
      API: apiStore,
      mobile: computed(() => mobile.value),
    };
  },
  components: {
    LinuxGSMLogo,
    ServerNavigation,
  },
};
</script>