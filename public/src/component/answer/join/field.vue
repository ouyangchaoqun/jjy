<template >
    <div style="height: 100%">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="2"  preUrl="./base/info" nextUrl="./qualification"></v-answer-top-step>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {}
        },


        mounted: function () {


        } ,
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>

</style>