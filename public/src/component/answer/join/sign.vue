<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">8/10</div>
        <div class="joinStep_title">一句话签名</div>
        <v-answer-top-step step="8"  preUrl="./good/at" nextUrl="./voice" title="一句话签名"    errorWord="请填写一句话签名" :canGoNext="canGoNext"></v-answer-top-step>
        <div class="text_area">
            <textarea name=""   class="sign" @keyup="changeSign()"  placeholder="限25个字符。
方向1：可以写您对咨询的理解（价值观）。示例：有阴影的地方就有阳光。
方向2：可以写您想对来访者说的话。示例：星洲易渡，心河难逾，与你共觅心河之舟。
方向3：可以写您擅长的领域问题。示例：恋爱技巧，挽回情感，遭遇婚外情，告别前任。" id="" cols="30" rows="10">{{sign}}</textarea>
            <div class="count">1/200</div>
        </div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                sign:'',
                canGoNext:false
            }
        },


        mounted: function () {

            let sign= (cookie.get("sign"));
            if(sign&&sign!=''){
                this.sign=unescape(sign)
            }
            this.check();
        },
        methods: {
            changeSign: function (v) {
                let sign = $(".sign").val();
                cookie.set("sign",escape(sign));
                this.check();
            },
            check:function () {
                let sign= (cookie.get("sign"));
                if(sign&&sign!=''){
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