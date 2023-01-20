<template>
  <v-container>
    <v-responsive>
      <ServerPanel v-if="API.currentServer != undefined" :server="API.currentServer" />
    </v-responsive>
  </v-container>
</template>

<script>
import ServerPanel from "@/components/ServerPanel.vue";
import ApiStore from "@/store/api";
export default {
  setup: function () {
    let apiStore = ApiStore();

    return {
      API : apiStore,
    }

  },
  mounted: function () {},
  components: { ServerPanel },
};
</script>
