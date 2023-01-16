<template>
  <div class="d-flex flex-column">
    <v-container>
      <v-col cols="12">
        <v-list
          id="list"
          lines="one"
          density="compact"
          height="500"
          bg-color="background"
          class="rounded"
          :elevation="4"
        >
          <v-list-item
            v-for="line in console"
            :key="line"
            variant="text"
            min-height="0"
            style="padding: 0px !important"
          >
            {{ line }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-container>

    <v-form ref="form" @submit.prevent="submit">
      <v-container>
        <v-col cols="12">
          <v-text-field
            v-model="command"
            :counter="120"
            label="Type command here..."
            required
            prepend-inner-icon="mdi-console"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn type="submit" color="success" class="mr-4">Send</v-btn>
        </v-col>
      </v-container>
    </v-form>
    <v-switch
      v-model="autoscroll"
      label="Autoscroll"
      color="info"
    ></v-switch>
  </div>
</template>

<script>
import ApiStore from "@/store/api";
import { useRoute } from "vue-router";
export default {
  setup() {
    let apiStore = ApiStore();

    return {
      API: apiStore,
    };
  },
  mounted() {
    let route = useRoute();
    let source = this.API.getConsoleStream(route.params.servername, 40);
    source.onmessage = (event) => {
      event.data.split("\\n").forEach((item) => this.console.push(item));
    };


    let list = document.getElementById("list");

    let observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type == "childList") {
          if (this.autoscroll) {
            list.scroll({
              top: list.scrollHeight,
              left: 0,
              behavior: "smooth",
            });
          }
        }
      }
    });

    observer.observe(list, { childList: true , attributes: false, subtree: true })
  },
  data() {
    return {
      console: [],
      command: "",
      servername: useRoute().params.servername,
      autoscroll: true,
    };
  },
  methods: {
    async submit() {
      let command = this.command;
      this.$refs.form.reset();
      this.console.push("[INFO] Sent command: " + command);
      this.API.sendCommand(this.servername, command)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>