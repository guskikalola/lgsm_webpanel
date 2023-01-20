<template>
  <div>
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
  </div>
</template>

<script>
import ServerStatusEnum from "@/services/enums/ServerStatusEnum.js";
import ApiStore from '@/store/api';

export default {
  props: ["server"],
  setup: function() {
    let apiStore = ApiStore();
    return {
        API: apiStore,
        ServerStatusEnum: ServerStatusEnum,
    }
  },
  data: function () {
    return {
      loading: false,
      executeMethod: (method) => {
        this.loading = true;
        if (this.server.server_status == ServerStatusEnum.NOT_INSTALLED) {
          alert(
            "First run takes some time, it might appear as STOPPED but the server is installing in the background."
          );
        }
        this.API
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
        this.API
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
};
</script>