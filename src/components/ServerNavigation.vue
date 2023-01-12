<template>
  <v-list density="compact" nav v-model:opened="open">
    <v-list-group value="ServerNavigation">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-server"
          :title="API.currentServer?.server_pretty_name"
        ></v-list-item>
      </template>
      <v-list-item
        router
        :to="{
          name: 'ViewServer',
          params: { servername: API.currentServer?.server_name },
        }"
        prepend-icon="mdi-collage"
      >
        <v-list-item-content>
          <v-list-item-title> Server Panel </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        router
        :to="{
          name: 'ServerConsole',
          params: { servername: API.currentServer?.server_name },
        }"
        prepend-icon="mdi-console"
      >
        <v-list-item-content>
          <v-list-item-title> Server Console </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import ApiStore from "@/store/api";
export default {
  data() {
    const apiStore = ApiStore();
    return {
      API: apiStore,
      open: ["ServerNavigation"],
    };
  },
};
</script>