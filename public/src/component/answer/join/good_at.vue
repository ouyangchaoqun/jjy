<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">7/10</div>
        <div class="joinStep_title">擅长领域问题</div>
        <v-answer-top-step step="7"  preUrl="../training" nextUrl="../sign" title="擅长领域问题"   errorWord="请填写擅长领域问题" :canGoNext="canGoNext"></v-answer-top-step>
        <div class="text_area">
            <textarea name="" class="goodAt" @keyup="changeGoodAt()"   placeholder="请填写您擅长领域的具体问题

例如：
擅长领域：
# 家庭关系：婚姻挽救、情感修复、外遇分离、家暴危机、婆媳关系、复婚帮助、离婚纠纷
# 恋爱关系：失恋帮助、性格不合、沟通障碍、经常吵架、父母反对、异地恋问题
# 性心理：同性恋、恋母情结、偷窥幻想女性、性取向问题" id="" cols="30" rows="10">{{goodAt}}</textarea>
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
                goodAt:'',
                canGoNext:false
            }
        },


        mounted: function () {
            let goodAt= (cookie.get("goodAt"));
            if(goodAt&&goodAt!=''){
                this.goodAt=unescape(goodAt)
            }

            this.inputLength = this.goodAt.length
            this.check();
            xqzs.wx.setConfig(this);
        },
        methods: {
            changeGoodAt: function (v) {
                let goodAt = $(".goodAt").val();
                if (goodAt.length > this.MAX_INPUT_LENGTH) {
                    goodAt = goodAt.substr(0, this.MAX_INPUT_LENGTH)
                }
                this.inputLength =goodAt.length;
                cookie.set("goodAt",escape(goodAt));
                this.check();
            },
            check:function () {
                let goodAt= (cookie.get("goodAt"));
                if(goodAt&&goodAt!=''){
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