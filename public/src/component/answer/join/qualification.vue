<template >
    <div style="height: 100%" class="wbg">

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


            </div>


        </div>


        <div class="number">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">证书编号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9a-zA-Z]*" placeholder="证件号码"/>
                </div>
            </div>
        </div>

        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">资质证书</label></div>
                <div class="weui-cell__bd">
                    <div class="upload">上传证书</div>
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
    .upload{ background: #0BB20C; border-radius: .3rem; text-align: center; padding: 0 0.7rem; color:#fff;  line-height: 2rem; width: 50%}
 </style>