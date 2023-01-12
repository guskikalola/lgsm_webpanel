<template>
  <v-card variant="tonal" :loading="loading" :width="388">
    <v-toolbar :elevation="8" density="compact">
      <v-toolbar-title>
        <router-link
          :to="{
            name: 'ViewServer',
            params: { servername: server.server_name },
          }"
          class="text-decoration-none"
          style="color: var(--v-theme-primary) !important;"
        >
          {{ server.server_pretty_name }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-trash-can" color="red" v-bind="props"></v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> Delete this server? </v-card-title>
          <v-card-text
            >You are about to delete
            <span style="font-weight: -1; color: goldenrod"
              >"{{ server.server_pretty_name }}"</span
            ></v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              variant="text"
              @click="dialog = false"
              append-icon="mdi-cancel"
            >
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="green"
              variant="text"
              @click="deleteServer"
              append-icon="mdi-check"
            >
              Agree
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <router-link
      :to="{ name: 'ViewServer', params: { servername: server.server_name } }"
    >
      <GameIcon :game_name="server.game_name" />
    </router-link>
    <v-card-text class="text-center">
      <v-row align="center">
        <v-col class="text-h6" cols="12">
          <ServerStatus
            :server_status="API.servers[server.server_name].server_status"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex align-center justify-center">
      <v-btn
        color="green"
        @click="executeMethod('start')"
        variant="outlined"
        :disabled="
          loading ||
          API.servers[server.server_name].server_status ==
            ServerStatusEnum.STARTED
        "
        >{{
          API.servers[server.server_name].server_status ==
          ServerStatusEnum.NOT_INSTALLED
            ? "INSTALL"
            : "START"
        }}</v-btn
      >
      <v-btn
        color="red"
        @click="executeMethod('stop')"
        variant="outlined"
        :disabled="
          loading ||
          API.servers[server.server_name].server_status !=
            ServerStatusEnum.STARTED
        "
        >STOP</v-btn
      >
      <v-btn
        color="grey"
        @click="executeMethod('restart')"
        variant="outlined"
        :disabled="
          loading ||
          API.servers[server.server_name].server_status ==
            ServerStatusEnum.NOT_INSTALLED
        "
        >RESTART</v-btn
      >
      <v-tooltip text="Fetch server status" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            color="grey"
            @click="updateServerData"
            variant="outlined"
            :disabled="loading"
            v-bind="props"
          >
            <v-icon icon="mdi-reload"> </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
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
      dialog: false,
      loading: false,
      API: apiStore,
      ServerStatusEnum: ServerStatusEnum,
      executeMethod: (method) => {
        this.loading = true;
        if (this.server.server_status == ServerStatusEnum.NOT_INSTALLED) {
          alert(
            "First run takes some time, it might appear as STOPPED but the server is installing in the background."
          );
        }
        apiStore
          .executeMethod(this.server.server_name, method)
          .then(() => {
            this.loading = false;
            this.updateServerData();
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
      deleteServer: () => {
        this.loading = true;
        apiStore.deleteServer(this.server.server_name).then(() => {
          this.loading = false;
        });
        this.dialog = false;
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
  