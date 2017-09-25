<template >
    <div style="height: 100%">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="6"  preUrl="../training" nextUrl="../sign" title="擅长领域问题"></v-answer-top-step>
        <div class="text_area">
            <textarea name=""  placeholder="请填写您擅长领域的具体问题

例如：
擅长领域：
# 家庭关系：婚姻挽救、情感修复、外遇分离、家暴危机、婆媳关系、复婚帮助、离婚纠纷
# 恋爱关系：失恋帮助、性格不合、沟通障碍、经常吵架、父母反对、异地恋问题
# 性心理：同性恋、恋母情结、偷窥幻想女性、性取向问题" id="" cols="30" rows="10"></textarea>
            <div class="count">1/200</div>
        </div>

    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {}
        },


        mounted: function () {


        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>

</style>