<template>
  <v-card :title="server.server_pretty_name" variant="tonal" :loading="loading">
    <v-card-text>
      <v-row align="center">
        <v-col class="text-h6" cols="6">
          <ServerStatus :server_status="API.servers[server.server_name].server_status" />
        </v-col>
        <v-col cols="6" class="text-right">
          <GameIcon :game_name="server.game_name" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="green"
        @click="executeMethod('start')"
        variant="outlined"
        :disabled="loading || API.servers[server.server_name].server_status == ServerStatusEnum.STARTED"
        >START</v-btn
      >
      <v-btn
        color="red"
        @click="executeMethod('stop')"
        variant="outlined"
        :disabled="loading || API.servers[server.server_name].server_status != ServerStatusEnum.STARTED"
        >STOP</v-btn
      >
      <v-btn
        color="grey"
        @click="executeMethod('restart')"
        variant="outlined"
        :disabled="loading || API.servers[server.server_name].server_status == ServerStatusEnum.NOT_INSTALLED"
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
import ServerStatusEnum from "@/services/enums/ServerStatusEnum.js";
export default {
  props: ["server"],
  data() {
    const apiStore = ApiStore();
    return {
      loading: false,
      API: apiStore,
      ServerStatusEnum : ServerStatusEnum,
      executeMethod: (method) => {
        this.loading = true;
        apiStore
          .executeMethod(this.server.server_name, method)
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
          .updateServer(this.server.server_name)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.error(
              "Error while feeding(updating) server data: " +
                this.server.server_name +
                " Err: " +
                err
            );
          });
      },
    };
  },
  mounted() {
    this.updateServerData();
  },
  components: {
    ServerStatus: ServerStatus,
    GameIcon: GameIcon,
  },
};
</script>
  