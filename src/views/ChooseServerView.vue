<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col
          v-for="(game, index) in Object.values(API.gameList)"
          :key="game.game_name"
          cols="auto"
        >
          <GameServer :game="game" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
      
  <script>
import GameServer from "@/components/GameServer.vue";
import ApiStore from "@/store/api";
import { computed } from "vue-demi";
export default {
  setup() {
    let apiStore = ApiStore();
    apiStore.updateGameList();
    return {
      API: apiStore,
    };
  },
  data: function () {
    return {
      page: 1,
    };
  },
  components: {
    GameServer,
  },
};
</script>