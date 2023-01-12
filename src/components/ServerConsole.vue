<template>
  <div style="height: 200px">
    <v-virtual-scroll :items="console" item-height="10">
      <template v-slot:default="{ item }"> {{ item }} </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
import ApiStore from "@/store/api";
import { useRoute } from "vue-router";
export default {
  mounted() {
    let apiStore = ApiStore();
    let route = useRoute();
    var source = new EventSource(
      `${apiStore.baseURL}server/${route.params.servername}/console`
    );

    source.onmessage = (event) => {
      event.data.split("\\n").forEach((item) => this.console.push(item));
    };

    return {
      API: apiStore,
    };
  },
  data: () => {
    return {
      console: [],
    };
  },
};
</script>