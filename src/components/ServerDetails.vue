<template>
  <div>
    <v-card>
      <div
        v-for="key in Object.keys(this.server.details)"
        v-bind:key="key"
      >
        {{`${key} : ${this.server.details[key]}`}}
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["server"],
};
</script>