<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">6/10</div>
        <div class="joinStep_title">专业培训经历</div>
        <v-answer-top-step step="6"  preUrl="./introduce" nextUrl="./good/at" title="专业培训经历"   errorWord="请填写专业培训经历" :canGoNext="canGoNext"></v-answer-top-step>

        <div class="text_area">
            <textarea name=""  class="experience" @keyup="changeExperience()"  placeholder="请填写您的专业培训经历

例如：
# 武汉大学心理咨询师培训
# 丁建略婚恋咨询师升级路径
# 中级绘画治疗师" id="" cols="30" rows="10">{{experience}}</textarea>
            <div class="count" >{{inputLength}}/{{MAX_INPUT_LENGTH}}</div>
        </div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                MAX_INPUT_LENGTH:200,
                inputLength:0,
                experience:'',
                canGoNext:false
            }
        },


        mounted: function () {

            let experience= (cookie.get("experience"));
            if(experience&&experience!=''){
                this.experience=unescape(experience)
            }
            this.inputLength = this.experience.length
            this.check();
            xqzs.wx.setConfig(this);

        },
        methods: {
            changeExperience: function (v) {
                let experience = $(".experience").val();
                if (experience.length > this.MAX_INPUT_LENGTH) {
                    experience = experience.substr(0, this.MAX_INPUT_LENGTH)
                }
                this.inputLength =experience.length;
                cookie.set("experience",escape(experience));
                this.check();
            },
            check:function () {
                let experience= (cookie.get("experience"));
                if(experience&&experience!=''){
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
            }

        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>

</style>