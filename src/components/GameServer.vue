<template>
  <v-card variant="tonal" :width="388">
    <v-card-title>
      <router-link
        :to="{
          name: 'CreateServerForm',
          query: { gname: game.game_full_name },
        }"
        class="text-decoration-none"
        style="color: var(--v-theme-primary) !important"
      >
        {{ game.game_full_name }}
      </router-link>
    </v-card-title>
    <router-link
      :to="{ name: 'CreateServerForm', query: { gname: game.game_full_name } }"
    >
      <GameIcon :game_name="game.game_name" />
    </router-link>
  </v-card>
</template>

<script>
import GameIcon from "./GameIcon.vue";

export default {
  props: ["game"],
  components: {
    GameIcon,
  },
};
</script>