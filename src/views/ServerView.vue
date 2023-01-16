<template>
  <v-container>
    <v-responsive>
      <ServerOverview v-if="API.currentServer != undefined" :server="API.currentServer" />
    </v-responsive>
  </v-container>
</template>

<script>
import ServerOverview from "@/components/ServerOverview.vue";
import ApiStore from "@/store/api";
export default {
  setup: function () {
    let apiStore = ApiStore();

    return {
      API : apiStore,
    }

  },
  mounted: function () {},
  components: { ServerOverview },
};
</script>
