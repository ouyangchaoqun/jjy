<template >
    <div style="height: 100%" class="wbg answer_join_price_box">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="2"  preUrl="./base/info" nextUrl="./field" title="请拍摄身份证正反面，该信息仅用于心情加油站身份验证" errorWord="请上传身份认证"></v-answer-top-step>
        <div class="identity_tabs">
            <div class="identity_tabs_active">身份证</div>
            <div>护照</div>
        </div>
        <div class="identity_content">
            <div class="content_active">
                <div class="content_list1">
                    身份证 <span>*</span><input type="text">
                </div>
                <div class="content_list2">
                    <img src="../../../images/positive.png" alt="">
                    <img src="../../../images/negative.png" alt="">
                </div>
            </div>
            <div>
                <div class="content_list1">
                    护照 <span>*</span><input type="text">
                </div>
                <div class="content_list2">
                    <img src="../../../images/positive.png" alt="">
                    <img src="../../../images/negative.png" alt="">
                </div>
            </div>
        </div>



    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
            }
        },

        mounted: function () {
            $('.identity_tabs div').click(function () {
                $('.identity_tabs div').removeClass('identity_tabs_active')
                $('.identity_content>div').removeClass('content_active')
                $(this).addClass('identity_tabs_active')
                $('.identity_content>div').eq($(this).index()).addClass('content_active')
            })

        } ,
        methods:  {

        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .identity_tabs{padding: 1.5294rem 28% 0 28%;display: flex;display: -webkit-flex;}
    .identity_tabs div{width:60px;text-align: center;font-size: 0.70588235rem;height:21px;border:1px solid #D2D2D2;line-height: 21px;border-radius: 11px;margin:0 auto;color:#B0B0B0;}
    .identity_tabs .identity_tabs_active{color:#fff;background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));border-color:rgba(253,114,6,1) }
    .content_list1{height:2.35294rem;line-height: 2.35294rem;color:#666;padding:0.88235rem 0.88235rem 1.5294rem 0.8235rem;font-size: 0.8235rem;}
    .content_list1 span{color:red;}
    .content_list1 input{width:16rem;height:2.35294rem;background:#f4f4f7;border-radius:0.294rem;float: right}
    .content_list2{padding:0 0.88235rem;}
    .content_list2 img{display:block;width:9.4rem;float: left}
    .content_list2 img:nth-of-type(2){float: right}
    .identity_content>div{display: none}
    .identity_content .content_active{display: block}
</style>