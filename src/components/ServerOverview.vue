<template>
  <v-card :title="server_name" variant="tonal" :loading="loading">
    <v-card-text>
      <v-row align="center">
        <v-col class="text-h6" cols="6">
          <ServerStatus :server_status="API.servers[server_name].details?.status" />
        </v-col>
        <v-col cols="6" class="text-right">
          <GameIcon :game_name="game_name" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="green"
        @click="executeMethod('start')"
        variant="outlined"
        :disabled="loading || API.servers[server_name].details?.status == 'STARTED'"
        >START</v-btn
      >
      <v-btn
        color="red"
        @click="executeMethod('stop')"
        variant="outlined"
        :disabled="loading || API.servers[server_name].details?.status != 'STARTED'"
        >STOP</v-btn
      >
      <v-btn
        color="grey"
        @click="executeMethod('restart')"
        variant="outlined"
        :disabled="loading || API.servers[server_name].details?.status == 'NOT INSTALLED'"
        >RESTART</v-btn
      >
      <v-btn
        color="grey"
        @click="updateServerData"
        variant="outlined"
        :disabled="loading"
        >
        <v-icon icon="mdi-reload">
          
        </v-icon>
        </v-btn
      >
    </v-card-actions>
  </v-card>
</template>
  
  <script>
import ServerStatus from "./ServerStatus.vue";
import GameIcon from "./GameIcon.vue";
import ApiStore from "@/store/api.js";
export default {
  props: ["server_name", "game_name"],
  data() {
    const apiStore = ApiStore();
    return {
      loading: false,
      API: apiStore,
      executeMethod: (method) => {
        this.loading = true;
        apiStore
          .executeMethod(this.server_name, method)
          .then(() => {
            this.loading = false;
            this.updateServerData()
          })
          .catch((err) => {
            this.loading = false;
            console.error(
              "Error while executing method: " + method + " Status code: " + err
            );
          });
      },
      updateServerData: () => {
        this.loading = true;
        apiStore
          .feedServerDetails(this.server_name)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.error(
              "Error while feeding(updating) server data: " +
                this.server_name +
                " Err: " +
                err
            );
          });
      },
    };
  },
  mounted() {
    if(this.API.servers[this.server_name].details == undefined)
    this.updateServerData();
  },
  components: {
    ServerStatus: ServerStatus,
    GameIcon: GameIcon,
  },
};
</script>
  