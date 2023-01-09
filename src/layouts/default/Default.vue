<template>
  <v-app>
    <AppBar />
    <NavigationDrawer />
    <DefaultView />
  </v-app>
</template>
  
<script setup>
import DefaultView from "./View.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import AppBar from "@/components/AppBar.vue";
</script>