<template>
  <v-form :v-model="valid" ref="form" @submit.prevent="submit">
    <v-container>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="servername"
          :rules="servernameRules"
          :counter="50"
          label="Server name"
          required
          prepend-inner-icon="mdi-server"
          type="text"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <!-- <v-combobox
          v-model="gamename"
          label="Game name"
          clearable
          :items="API.gameList.map(item => item.game_full_name)"
          required
          prepend-inner-icon="mdi-controller"
        ></v-combobox> -->
        <v-text-field
          v-model="gamename"
          :disabled="true"
          label="Game name"
          required
          prepend-inner-icon="mdi-controller"
          readonly
          :rules="servernameRules"
          type="text"
        >
        </v-text-field>
      </v-col>
      <v-btn type="submit" color="success" class="mr-4">Create</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import ApiStore from "@/store/api.js";
import { useRoute } from 'vue-router';
export default {
  setup() {
    const apiStore = ApiStore();
    return {
      API: apiStore,
    };
  },
  data: function () {
    let game_full_name = useRoute().query.gname;
    return {
      gamename: game_full_name,
      valid: false,
      servername: "",
      servernameRules: [
        (v) => !!v || "Server name is required",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
    };
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      this.valid = valid;
    },
    async submit() {
      await this.validate();
      if (!this.valid) return false;
      console.log(this.API.getGameIdentifier(this.gamename))
      this.API.createServer(
        this.servername,
        this.API.getGameIdentifier(this.gamename)
      )
        .then((server) => {
          console.log("New server created", server);
          this.$refs.form.reset();
        })
        .catch((err) => {
          alert(JSON.stringify(err["detail"])); // TODO : Move this to notification system
        });
    },
  },
};
</script>