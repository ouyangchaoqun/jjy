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
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">昵称</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"   placeholder=" 请输入昵称"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">真实姓名 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"   placeholder="请输入姓名"/>
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">性别 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <div class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label sex" for="s13">
                        <div class="weui-cell__hd">
                            <input type="radio" name="checkbox1" class="weui-check"  checked id="s13"/>
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>男</p>
                        </div>
                    </label>
                        <label class="weui-cell weui-check__label sex" for="s15">
                            <div class="weui-cell__hd">
                                <input type="radio" name="checkbox1" class="weui-check"    id="s15"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd">
                                <p>女</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">出生年月 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"   placeholder="请选择出生年月"/>
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">所在城市 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"   placeholder="请选择所在城市"/>
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label"></label></div>
                <div class="weui-cell__bd">
                    <div class=" click_btn" :class="{on:codeType==1}" @click="codeChange(1)">身份证</div>
                    <div class=" click_btn" :class="{on:codeType==2}"  @click="codeChange(2)">护照</div>
                 </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">证件 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"   placeholder="请输入您的证件号码"/>
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
                codeType:1
            }
        },


        mounted: function () {


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
    .answer_join_base_info_box  .weui-cells:after, .weui-cells:before,.answer_join_base_info_box  .weui-cell:before{ display: none}
    .answer_join_base_info_box  .weui-check__label{ width: 42%; float:left; font-size: 0.823rem !important}

    .answer_join_base_info_box .tip{ margin-top: 0.2rem; font-size: 0.7058823529411765rem; padding: 10px 15px; color:#999}

    .answer_join_base_info_box .infos input{ background: #F4F4F7;  height: 2.352941176470588rem;line-height: 2.352941176470588rem; padding:0 0.6rem;font-size: 0.88235rem; border-radius: 0.3rem; width: 80%; color:#333}
    .answer_join_base_info_box  .weui-label span{ color:red;}

    .answer_join_base_info_box .weui-check__label.sex{ padding: 0}
    .answer_join_base_info_box  .weui-cells_checkbox{ margin-top: 0}

    .answer_join_base_info_box   .click_btn{ border: 1px solid #D2D2D2; color:#D2D2D2; line-height: 1.4rem; border-radius: 0.7rem;  width:4.5rem; text-align: center; float:left; margin-right: 0.6rem  }
    .answer_join_base_info_box   .click_btn.on{ background: #0BB20C; border: 1px solid  #0BB20C; color:#fff}

</style>