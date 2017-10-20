<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">5/10</div>
        <div class="joinStep_title">自我介绍</div>
        <v-answer-top-step step="5"  preUrl="./qualification" nextUrl="./training" title="自我介绍"  errorWord="请填写自我介绍" :canGoNext="canGoNext"></v-answer-top-step>
        <div class="text_area">
            <textarea name=""  class="introduction" @input="changeIntroduction()" placeholder="请采用精简的语言介绍自己，以便用户快速地了解您！

例如：国家二级心理咨询师。专注婚恋情感咨询。擅长解决恋爱婚姻中的情感创伤疗愈及应对，解决各种情感心理纠葛。失恋安抚、恋人挽回、婚姻破裂挽回、婆媳关系处理、婚外情等情感问题。幸福并不难，相信我，把问题交给我，我们一起敲开幸福的大门。" id="" cols="30" rows="10">{{introduction}}</textarea>
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
                introduction:'',
                canGoNext:false
            }
        },


        mounted: function () {
            let introduction= (cookie.get("introduction"));
            if(introduction&&introduction!=''){
                this.introduction=unescape(introduction)
            }
            this.inputLength = this.introduction.length
            this.check();

        },
        methods: {
            changeIntroduction: function (v) {
                let introduction = $(".introduction").val();
                if (introduction.length > this.MAX_INPUT_LENGTH) {
                    introduction = introduction.substr(0, this.MAX_INPUT_LENGTH)
                }
                this.inputLength =introduction.length

                cookie.set("introduction",escape(introduction));
                this.check();
            },
            check:function () {
                let introduction= (cookie.get("introduction"));
                if(introduction&&introduction!=''){
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