<template >
    <div class="sign_box">
        <div v-title>入驻心理咨询师</div>
        <div class="text_area">
            <textarea name="" maxlength="25"   class="sign" @input="changeSign()"  placeholder="限25个字符。

方向1:可以写您对咨询的理解（价值观）
示例：有阴影的地方就有阳光。

方向2：可以写您想对来访者说的话。
示例：星洲易渡，心河难逾，与你共觅心河之舟。

方向3：可以写您擅长的领域问题。
示例：恋爱技巧、挽回情感、遭遇婚外情、告别前任。" id="" cols="30" rows="10">{{sign}}</textarea>
        </div>
        <div class="over_nor_btn" v-if="!sign" @click="check_step()">保存</div>
        <div class="over_nor_btn over_per_btn" v-if="sign" @click="goJoinmore()">保存</div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                MAX_INPUT_LENGTH:25,
                inputLength:0,
                sign:'',
                canGoNext:false
            }
        },
        mounted: function () {
            let sign= (cookie.get("sign"));
            if(sign&&sign!=''){
                this.sign=unescape(sign)
            }

            this.inputLength = this.sign.length
            xqzs.wx.setConfig(this);
        },
        methods: {
            changeSign: function (v) {
                let sign = $(".sign").val();
                this.sign = sign;
                if (sign.length > this.MAX_INPUT_LENGTH) {
                    xqzs.weui.tip("限25个字符")
                    sign = sign.substr(0, this.MAX_INPUT_LENGTH)
                }
                this.inputLength =sign.length;
                cookie.set("sign",escape(sign));
            },
            goJoinmore:function () {
                let _this = this;
                let data={
                    userId:"_userId_",
                    expertId:cookie.get("expertId"),
                    sign:unescape(cookie.get("sign")),
                };
                _this.$http.post(web.API_PATH + 'come/expert/modify', data)
                    .then(
                        (response) => {
                            _this.$router.replace('joinmore')

                        }
                    );

            },
            check_step:function () {
                let _this = this;
                console.log('check-------------')
                if(_this.sign==''){
                    xqzs.weui.tip("请填写个人签名")
                }
            },
        }

    }
</script>
<style>
    .sign_box{background: #fff;}
    .sign_box .text_area{background: rgba(245,245,245,1);margin:0;border:0;}
    .sign_box .text_area textarea{background: rgba(245,245,245,1)}
</style>