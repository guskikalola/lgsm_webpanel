<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <LinuxGSMLogo height="70"/>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <h>Hi, welcome to <span style="font-weight: 800;">LinuxGSM Webpanel</span></h>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import LinuxGSMLogo from "@/components/LinuxGSMLogo.vue";
export default {
  setup() {},
  components: {
    LinuxGSMLogo: LinuxGSMLogo,
  },
};
</script>
