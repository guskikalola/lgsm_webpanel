<template>
  <v-container class="fill-height">
    <v-card>
        <v-card-title>
            Create a new server
        </v-card-title>
        <v-card-text>
            <CreateServerForm/>
        </v-card-text>
        
    </v-card>
  </v-container>
</template>
    
<script>
import CreateServerForm from '@/components/CreateServerForm.vue'
export default {
    components: {
        CreateServerForm: CreateServerForm
    }
}
</script>