<template >
    <div style="height: 100%" class="wbg answer_join_base_info_box">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="1"  preUrl="" nextUrl="../field" title="填写基本信息"></v-answer-top-step>


        <div class="head">
        <div class="weui-cell ">
            <div class="weui-cell__hd"><label class="weui-label">设置头像<span>*</span></label> </div>
            <div class="weui-cell__bd">
                <div class="img">+</div>
            </div>
            <div class="clear"></div>

        </div>
            <div class="tip">(设置头像，请选择一个清晰，辨识度高的个人照片作为头像，以便在用户心中建立您的个人品牌。）</div>
        </div>

        <div class="infos">
                <ul>
                    <li>
                        <div class="info_left">昵称</div>
                        <input type="text">
                    </li>
                    <li>
                        <div class="info_left">真实姓名</div><span>*</span>
                        <input type="text">
                    </li>
                    <li>
                        <div class="info_left">性别</div><span>*</span>
                        <div class="info_right">
                            <div>
                                <span class="level_item "></span>
                                <span class="level_itemsex">男</span>
                            </div>
                            <div>
                                <span class="level_item "></span>
                                <span class="level_itemsex">女</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="info_left">出生年月</div><span>*</span>
                        <input type="text">
                    </li>
                    <li>
                        <div class="info_left">所在城市</div><span>*</span>
                        <input type="text">
                    </li>
                    <li>
                        <div class="info_left"></div>
                        <div class="info_right">
                            <i class="right_active">身份证</i>
                            <i>护照</i>
                        </div>

                    </li>
                    <li>
                        <div class="info_left">证件</div><span>*</span>
                        <input type="text">
                    </li>
                </ul>
        </div>

    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                codeType:1
            }
        },


        mounted: function () {
            $('.info_right>div').click(function () {
               $('.info_right>div').find('.level_item').removeClass('checked_item')
                $(this).find('.level_item').addClass('checked_item')
            })
            $('.info_right i').click(function () {
                $('.info_right i').removeClass('right_active')
                $(this).addClass('right_active')
            })

        },
        methods: {
            codeChange:function (v) {
                this.codeType=v;
            }

        }
        ,
        components: {
            "v-answer-top-step": answerTopStep
        }

    }
</script>
<style>

    .answer_join_base_info_box .weui-cell__bd .img{
        width: 3.764705882352941rem; height: 3.764705882352941rem; background: #F4F4F7; color:#fff; font-size: 3.2rem; line-height: 3.2rem ; text-align: center; margin-left: 2rem
    }
    .answer_join_base_info_box .head{ margin-top:0.3rem; border-bottom: solid 0.5882352941176471rem #F4F4F7}
    .answer_join_base_info_box .tip{ margin-top: 0.2rem; font-size: 0.7058823529411765rem; padding: 10px 15px; color:#999}
    .answer_join_base_info_box  .weui-label span{ color:red;}

    .level_item{height:14px;width:14px;border-radius: 50%;border:1px solid #D2D2D2;display: inline-block;margin-right:0.8235rem;position: absolute;top:50%;margin-top:-8px;}
    .checked_item{border-color: #09bb07}
    .checked_item::after{  content: '';  width:12px;  height: 12px;  background: #09bb07;  border-radius: 50%;  position: absolute;top:50%;margin-top:-6px;left:50%;margin-left:-6px;}
    .infos li{height:40px;line-height: 40px;color:#666;font-size: 0.8235rem;display: flex;margin-bottom: 0.88235rem;position: relative}
    .infos li input{height:100%;width:70%;background: #F4F4F7;border-radius: 5px;position: absolute;right:0;padding-left: 0.588235rem;color:#333;}
    .info_right{height:100%;text-align: center;padding-left: 4rem;display: flex}
    .info_left{width:20%;text-align: right;}
    .infos ul{padding:0.88235rem}
    .infos li span{color:red}
    .info_right>div{position: relative}
    .info_right>div:nth-of-type(1){margin-right: 1.76471rem}
    .info_right .level_itemsex{margin-left: 30px;color:#333;font-size: 0.88235rem}
    .info_right i{display: inline-block;color:#999;font-style: normal;width:60px;height:21px;font-size:0.70588235rem;line-height: 21px;border:1px solid #999;border-radius: 1rem;margin-right:25px;margin-top:10px;}
    .info_right .right_active{background: #09bb07;border-color: #09bb07;color:#fff}
</style>