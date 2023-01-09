<template>
    <span :class="text_color">{{ server_status }}</span>
</template>

<script>
import { computed } from 'vue-demi'
    export default {
        props: ["server_status"],
        data() {
            return {
                text_color : computed(() => {
                    switch(this.server_status) {
                        case "STARTED":
                            return "text-green";
                        case "STOPPED":
                            return "text-red";
                        default:
                            return "text-orange"
                    }
                })
            }
        }
    }
</script>