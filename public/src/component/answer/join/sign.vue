<template >
    <div style="height: 100%">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="7"  preUrl="./training" nextUrl="./price" title="一句话签名"></v-answer-top-step>
        <div class="text_area">
            <textarea name=""  placeholder="限25个字符。
方向1：可以写您对咨询的理解（价值观）。示例：有阴影的地方就有阳光。
方向2：可以写您想对来访者说的话。示例：星洲易渡，心河难逾，与你共觅心河之舟。
方向3：可以写您擅长的领域问题。示例：恋爱技巧，挽回情感，遭遇婚外情，告别前任。" id="" cols="30" rows="10"></textarea>
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