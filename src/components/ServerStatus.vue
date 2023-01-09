<template>
    <span :class="text_color">{{ server_status }}</span>
</template>

<script>
import { computed } from 'vue-demi'
import ServerStatusEnum from '@/services/enums/ServerStatusEnum.js'
    export default {
        props: ["server_status"],
        data() {
            return {
                text_color : computed(() => {
                    switch(this.server_status) {
                        case ServerStatusEnum.STARTED:
                            return "text-green";
                        case ServerStatusEnum.STOPPED:
                            return "text-red";
                        default:
                            return "text-orange"
                    }
                })
            }
        }
    }
</script>