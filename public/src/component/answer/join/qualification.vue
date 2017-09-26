<template >
    <div style="height: 100%" class="wbg answer_join_quali">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="3"  preUrl="./field" nextUrl="./introduce" title="从业资质"></v-answer-top-step>


        <div class="checks">

            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="s11">
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="checkbox1" id="s11" checked="checked"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>国家二级咨询师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s12">
                    <div class="weui-cell__hd">
                        <input type="radio" name="checkbox1" class="weui-check" id="s12"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>国家三级咨询师</p>
                    </div>
                </label>

                <label class="weui-cell weui-check__label" for="s13">
                    <div class="weui-cell__hd">
                        <input type="radio" name="checkbox1" class="weui-check" id="s13"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>注册系统咨询师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s14">
                    <div class="weui-cell__hd">
                        <input type="radio" name="checkbox1" class="weui-check" id="s14"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>注册系统督导师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s15">
                    <div class="weui-cell__hd">
                        <input type="radio" name="checkbox1" class="weui-check" id="s15"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>其它</p>
                    </div>
                </label>

                <div class="clear"></div>
            </div>


        </div>


        <div class="number">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">证书编号 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9a-zA-Z]*" placeholder="证件号码"/>
                </div>
            </div>
        </div>

        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">资质证书 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <div class="upload"><span>+</span><font>上传证书</font></div>
                </div>
            </div>
        </div>
        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label"></label> </div>
                <div class="weui-cell__bd">
                    <div class="img"><img src="../../../images/answer/join_qu.png" > </div>
                </div>
            </div>
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


        } ,
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .answer_join_quali  .weui-cells:after, .weui-cells:before,.answer_join_quali  .weui-cell:before{ display: none}
    .answer_join_quali  .weui-check__label{ width: 42%; float:left; font-size: 0.823rem !important}

    .answer_join_quali  .weui-label span{ color:red;}
    .answer_join_quali .number{ margin-top: 0.8rem;}
    .answer_join_quali .number,.answer_join_quali .photo{ margin-left: 0.4rem;}
    .answer_join_quali .number input[type='number'], .upload{ background: #F4F4F7;  height: 2.352941176470588rem;line-height: 2.352941176470588rem; padding:0 0.6rem;font-size: 0.88235rem; border-radius: 0.3rem; width: 80%}
    .answer_join_quali  .upload { text-align: center; color:#A9A7A7}
    .answer_join_quali .upload span{ color:#09bb07; font-size: 1.4rem;line-height: 2.352941176470588rem; vertical-align: bottom
    }

    .answer_join_quali .weui-cell__bd img{ width: 80%}

 </style>