<template >
    <div style="height: 100%">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="5"  preUrl="./introduce" nextUrl="./good/at" title="专业培训经历"></v-answer-top-step>

        <div class="text_area">
            <textarea name=""  placeholder="请填写您的专业培训经历

例如：
# 武汉大学心理咨询师培训
# 丁建略婚恋咨询师升级路径
# 中级绘画治疗师" id="" cols="30" rows="10"></textarea>
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