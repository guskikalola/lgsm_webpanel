<template>
    <v-img :src="`/gameIcons/${ game_name }.png`" cover height="200px">

    </v-img>
</template>

  
<script>
export default {
  props: ["game_name"],
  data() {
    return {};
  },
  components: {
  },
};
</script>
  