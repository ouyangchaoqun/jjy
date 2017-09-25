<template >
    <div style="height: 100%">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="9"  preUrl="./voice" nextUrl="" title="设置咨询者向我提问需要支付的酬金
"></v-answer-top-step>
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