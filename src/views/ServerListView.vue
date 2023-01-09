<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col v-for="(server ,index) in Object.values(API.servers)" :key="server.server_name" cols="auto">
          <ServerOverview
            :server_name="server.server_name"
            :game_name="server.game_name"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>


  <script>
import ServerOverview from "@/components/ServerOverview.vue";
import ApiStore from '@/store/api.js';
export default {
  setup() {
    const apiStore = ApiStore();
    apiStore.updateServerList()
    return {
        API: apiStore
    }
  },
  components: {
    ServerOverview: ServerOverview,
  }
};
</script>