<template>
    <div class="answer_join_mobile_box">
        <div v-title>入驻心理咨询师</div>
        <div class="validate_box">
            <div class="validate_top">
                <h1>绑定手机号</h1>
            </div>
            <div class="validate_div">
                <div class="validate_phone">
                    <input class="input_phone" type="tel" oninput="if(value.length>11)value=value.slice(0,11)"
                           placeholder="请输入您的手机号" v-model="mobile"/>
                    <p id="errorMobile" v-if="!isMobileRight&&isShowErrorMobileMsg">手机格式错误</p>
                </div>
                <button href="javascript:;" id="_phonebtn" @click="getCode()"
                        class="weui-btn weui-btn_plain-primary "
                        :class="{'weui-btn_plain-disabled':!isMobileRight||isGetingCodeIn}">{{getCodeBtnText}}
                </button>
            </div>


            <div class="validate_code">
                <input class="input_code" type="tel" placeholder="请输入您收到的验证码" maxlength="4" v-model="code"/>
                <p id="errorCode" v-if="isShowErrorCodeMsg">验证码错误</p>
                <p id="message" v-if="isShowMessage">{{message}}</p>
            </div>
            <div>
                <button id="sublim" href="javascript:;" class="weui-btn  weui-btn_primary"
                        :class="{'weui-btn_disabled':!isAllInput}" @click="submit()">确定
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    var validate = {
        template: '#validate'
    }
    export default {
        data() {
            return {
                isGetingCodeIn: false,
                interValObj: null,
                time: 60,
                getCodeBtnText: "获取验证码",
                isShowMessage: false,
                isMobileRight: false,
                isErrorCode: false,
                mobile: "",
                code:"",
                message: "验证码已发送，请注意查收短信",
                isShowErrorMobileMsg: false,
                isShowErrorCodeMsg: false,
                isAllInput:false,
                codeError:false

            }
        },
        mounted: function () {
            let _this = this;

            $('.input_phone').keyup(function () {

                var length = _this.mobile.length;
                if (length == 11) {
                    if (xqzs.string.checkUserPhoneReg(_this.mobile)) {
                        _this.isShowErrorMobileMsg =false;
                        _this.isMobileRight = true;
                    } else {
                        _this.isMobileRight = false;
                        _this.isShowErrorMobileMsg = true;
                        _this.isAllInput =false;
                    }
                } else {
                    _this.isMobileRight = false;
                    _this.isShowErrorMobileMsg = false;
                    _this.isAllInput =false;
                }
                console.log(_this.isMobileRight)
            });
            $('.input_code').keyup(function () {

                var len = $(".input_code").val().length;
                if (len == 4) {
                    _this.isErrorCode = false;
                    if(_this.isMobileRight===true){
                        _this.isAllInput =true;
                    }

                } else {
                    _this.isAllInput =false;
                    _this.isErrorCode = true
                }
            });

            //获得焦点
            $('.input_phone').focus(function () {
                _this.isShowErrorMobileMsg = false;
            });
            xqzs.wx.setConfig(_this);
        },
        methods: {
            submit:function () {



                let _this = this;

                if(_this.isAllInput==true){
                    _this.$http.post(web.API_PATH + 'user/update/mobile/by/code/mobile/_userId_', {mobile: _this.mobile,code:_this.code}).then(response => {
                        if (response.data.status === 1) {
                            xqzs.weui.toast("success","验证成功",function () {
                                _this.$router.push('joinstep');
                            })
                        } else   {
                            if(response.data.status === -2 || response.data.status === -3){
//                                clearInterval(_this.interValObj);
                                _this.isShowErrorCodeMsg =true;
                                _this.isShowMessage = false;
                                _this.codeError=true;

                            }
                            //-1 手机号码为空，-4 验证码为空 ，-5 手机格式错误，-2 验证码过期，-3 验证码不存在

                        }

                    }, response => {
                        // error
                    });
                }

            },

            getCode: function () {
                let _this = this;
                if (_this.isMobileRight&&!_this.isGetingCodeIn) {
                    _this.$http.post(web.API_PATH + 'base/verification/code/get/code', {mobile: _this.mobile}).then(response => {
                        if (response.data.status === 1) {
                            _this.codeError=false;
                            _this.interValObj = setInterval(function () {
                                _this.setRemainTime();
                            }, 1000);
                            _this.isShowMessage = true;
                            _this.isShowErrorCodeMsg=false;
                            _this.message = "验证码已发送，请注意查收短信";
                        } else if (response.data.status === -1) {
                            _this.isShowMessage = true;
                            _this.isShowErrorCodeMsg=false;
                            _this.message = "请勿频繁获取验证码";
                        } else if (response.data.status === -2) {
                            _this.isShowMessage = true;
                            _this.isShowErrorCodeMsg=false;
                            _this.message = "手机号码不能为空";
                        } else if (response.data.status === -3) {
                            _this.isShowMessage = true;
                            _this.isShowErrorCodeMsg=false;
                            _this.message = "手机号码格式不正确";
                        }

                    }, response => {
                        // error
                    });
                }
            },
            setRemainTime: function () {
                let _this = this;
                if (_this.time == 0) {
                    clearInterval(_this.interValObj);
                    _this.getCodeBtnText = "获取验证码";
                    _this.isGetingCodeIn = false;
                    _this.isShowMessage = false;
                    _this.isShowErrorCodeMsg=false;
                    _this.time = 60;
                } else {

                    _this.time--;
                    _this.getCodeBtnText = '重获验证码' + '(' + _this.time + ')';
                    _this.isGetingCodeIn = true;
                    if(_this.codeError){
                        _this.isShowMessage = false;
                        _this.isShowErrorCodeMsg=true;
                    }else{
                        _this.isShowMessage = true;
                        _this.isShowErrorCodeMsg=false;
                    }


                }

            }
        }
    }
</script>
<style type="text/css">
    .answer_join_mobile_box .validate_box {
        padding: 20px 15px;
        background: #fff;
        height: 100%;
    }

    .answer_join_mobile_box .validate_top {
        margin-bottom: 32px;
    }

    .answer_join_mobile_box .validate_top h1 {
        font-size: 18px;
        color: #333; text-align: center;
        margin-bottom: 18px;
    }

    .answer_join_mobile_box .validate_top p {
        font-size: 15px;
        color: #878686;
        text-align: center;
    }

    .answer_join_mobile_box input {
        height: 20px;
        outline: none;
        line-height: 20px;
        margin-top: 12px;
    }

    #_phonebtn {
        width: 36%;
        height: 46px;
        font-size: 12px;
        float: right;
        padding: 0;
        text-align: center;
    }

    .answer_join_mobile_box .input_phone {
        font-size: 15px;
        color: #333333;

    }

    .answer_join_mobile_box .input_code {
        font-size: 15px;
        width: 100%;
        color: #333333;
    }

    .answer_join_mobile_box .validate_div {
        height: 44px;
        margin-bottom: 26px;
        position: relative;
    }

    .answer_join_mobile_box .validate_phone {
        border: 1px solid #D2D2D2;
        height: 44px;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 7px;
        float: left;
        width: 50%;
        overflow: hidden;

    }

    #_phonebtn {
        float: right;
        font-size: 14px;
    }

    .answer_join_mobile_box .validate_code {
        height: 44px;
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        margin-bottom: 30px;
        padding-left: 15px;
        position: relative;
    }

    #errorMobile, #errorCode {
        font-size: 11px;
        color: #fc0303;
        position: absolute;
        left: 15px;
        top: 50px;
    }

    #message {
        font-size: 11px;
        color: #999999;
        position: absolute;
        top: 50px;
        left: 15px;

    }



    .answer_join_mobile_box  input:-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    .answer_join_mobile_box input::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    .answer_join_mobile_box  input::-moz-placeholder {
        color: rgba(0, 0, 0, 0.2)
    }

    .answer_join_mobile_box input:-moz-placeholder {
        color: rgba(0, 0, 0, 0.2);
    }
</style>