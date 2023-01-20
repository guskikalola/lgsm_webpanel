<template>
  <v-card>
    <ServerActions :server="server"/>
    <ServerDetails v-if="this.server.details != undefined" :server="server"/>
  </v-card>
</template>
  
  <script>
import ServerActions from "./ServerActions.vue";
import ApiStore from "@/store/api";
import ServerDetails from "./ServerDetails.vue";

export default {
  props: ["server"],
  data: function () {
    let apiStore = ApiStore();
    apiStore.feedServerDetails(this.server.server_name);

    return {
      API: apiStore,
    };
  },
  components: { ServerActions, ServerDetails },
};
</script>