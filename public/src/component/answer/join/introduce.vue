<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="4"  preUrl="./qualification" nextUrl="./training" title="自我介绍"></v-answer-top-step>
        <div class="text_area">
            <textarea name=""  placeholder="请采用精简的语言介绍自己，以便用户快速地了解您！

例如：国家二级心理咨询师。专注婚恋情感咨询。擅长解决恋爱婚姻中的情感创伤疗愈及应对，解决各种情感心理纠葛。失恋安抚、恋人挽回、婚姻破裂挽回、婆媳关系处理、婚外情等情感问题。幸福并不难，相信我，把问题交给我，我们一起敲开幸福的大门。" id="" cols="30" rows="10"></textarea>
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