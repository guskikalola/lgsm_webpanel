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
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="gamename"
          :rules="gamenameRules"
          :counter="50"
          label="Game name"
          required
        ></v-text-field>
      </v-col>
      <v-btn type="submit" color="success" class="mr-4">Create</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import ApiStore from "@/store/api.js";
export default {
  setup() {
    const apiStore = ApiStore();
    return {
      API: apiStore,
    };
  },
  data: () => ({
    valid: false,
    servername: "",
    gamename: "",
    servernameRules: [
      (v) => !!v || "Server name is required",
      (v) => v.length <= 50 || "Name must be less than 50 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    gamenameRules: [
      (v) => !!v || "Game name is required",
      (v) => v.length <= 50 || "Name must be less than 50 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      this.valid = valid;
    },
    async submit() {
      await this.validate();
      if (!this.valid) return false;

      this.API.createServer(this.servername, this.gamename)
        .then((server) => {
          console.log("New server created", server);
          this.$refs.form.reset();
        })
        .catch((err) => {
          alert(err["detail"][0]["msg"]); // TODO : Move this to notification system
        });
    },
  },
};
</script>