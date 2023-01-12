<template>
  <v-container class="fill-height">
    <v-responsive>
        <v-card>
        <v-card-title> Server console </v-card-title>
        <v-card-text>
            <ServerConsole/>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>
  
<script>
import ServerConsole from '@/components/ServerConsole.vue'

export default {
    components: {
        ServerConsole
    }
}
</script>
  