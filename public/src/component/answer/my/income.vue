<template >
    <div style="height: 100%" class="answer_my_income_box wbg">

        <div v-title>我的余额</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="my_income">
            <div class="img"></div>
            <div class="my_income_txt">我的收益</div>
            <div class="money">￥{{formatPrice(user.balance)}}</div>
            <div class="get_money" @click="showOut()">提现</div>
            <div class="income_list" @click="incomeList()"><span>收益明细</span></div>
        </div>
        <div class="moneyOut_box" v-if="isOut" @click="hideOut()">
            <div class="money_dialog" @click.stop>
                <div class="money_dialog_title">
                    1-3个工作日内将转账至您的微信钱包
                </div>
                <div class="money_dialog_detail">
                    <div class="detail_top">提现金额</div>
                    <div class="detail_input">
                        <span>￥</span>
                        <input type="number" @input="getMoney()" v-model="moneyVal">
                        <img @click="clearMoneyVal()" src="../../../images/clear_moneyVal_img.png" alt="">
                    </div>
                    <div class="detail_warn">
                        <span v-if="!isWarn">
                            可用余额¥{{formatPrice(user.balance)}}
                        </span>
                        <span v-if="isWarn" class="warn_red">
                            金额已超过可提现余额
                        </span>
                    </div>
                    <div v-if="moneyVal<1" class="disabled_btn weui-btn weui-btn_disabled weui-btn_primary">
                        确认提现
                    </div>
                    <div v-if="moneyVal>=1" class="dialog_btn weui-btn weui-btn_primary" @click="withdraw()">
                        确认提现
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                showLoad:false,
                income:0,
                isOut:false,
                isWarn:false,
                moneyVal:'',
                user:''

            }
        },
        components: {
            'v-showLoad': showLoad
        },

        mounted: function () {
            this.getUserInfo()
            xqzs.wx.setConfig(this);

        },
        methods:{
            goQuestion:function () {
                this.$router.push("/answer/ask/list")
            },
//            getIncome:function () {
//                let expertId = cookie.get('expertId')
//                let _this= this;
//                _this.showLoad=true;
//                _this.$http.get(web.API_PATH + 'come/expert/query/income/'+expertId+'/_userId_' ).then(function (data) {//es5写法
//                    _this.showLoad=false;
//                    if (data.body.status == 1) {
//                        _this.income= data.body.data.inCome
//                    }
//                }, function (error) {
//                    _this.showLoad=false;
//                });
//
//            },
            getUserInfo:function () {
                let _this = this;
                _this.$http({
                    method: 'GET',
                    type: "json",
                    url: web.API_PATH + 'user/find/by/user/Id/_userId_',
                }).then(function (data) {//es5写法
                    if (data.data.data !== null) {
                        _this.user = eval(data.data.data);
                        console.log( _this.user )
                    }
                }, function (error) {
                    //error
                });
            },
            formatPrice:function(price){
                return  xqzs.string.formatPrice(price)
            },
            incomeList:function () {
                this.$router.push("./income/list")
            },
            hideOut:function () {
                this.isOut = false
            },
            showOut:function () {
                this.isOut = true
            },
            getMoney:function () {
                if(Number(this.moneyVal)>Number(this.user.balance)){
                    this.isWarn = true;
                }else {
                    this.isWarn = false;
                }
            },
            clearMoneyVal:function () {
                this.moneyVal = '';
            },
            withdraw:function () {
                let _this = this;
                let msg = {
                    userId :_this.user.id,
                    money  : _this.moneyVal*100
                }
                if(this.isWarn){
                    xqzs.weui.tip("提现金额超限");
                    return;
                }
                _this.showLoad = true;
                _this.$http.post(web.API_PATH+'user/withdraw',msg).then(function (data) {

                    if(data.data.status==1){
                        _this.getUserInfo()
                        setTimeout(function () {
                            _this.showLoad = false;
                            _this.isOut = false;
                            _this.moneyVal = '';
                            xqzs.weui.tip("提交成功，等待审核");
                        },500)


                    }
                })
            },
        }


    }
</script>
<style>


   .answer_my_income_box .my_income .img{ background: url(../../../images/asker/income.png) no-repeat; width: 6.21rem; height: 5.941176471rem; background-size: 100% 100%; margin: 0 auto ; margin-top:3.7rem; }
   .answer_my_income_box .my_income{ line-height: 1}
   .answer_my_income_box .my_income .my_income_txt{color:#333; width: 100%; text-align: center; margin-top: 0.76471rem;font-size: 0.8823529411764706rem; }
   .answer_my_income_box .my_income .money{color:#FE7301 ; margin-top: 0.7058823529411765rem; text-align: center; width: 100%; font-size: 2.117647058823529rem; line-height: 1}

   .answer_my_income_box  .my_income .get_money{color:rgba(255,255,255,1); margin:0 auto;line-height:2.1176471rem;text-align: center; font-size: 1.0588235rem; margin-top: 3.1176471rem;background: rgba(255,157,24,1);border:1px solid rgba(229,135,6,1);border-radius: 1.0588235rem;width:42%;}
   .answer_my_income_box  .my_income .get_money:active{background:rgba(229,135,6,1) ;}
   .answer_my_income_box .my_income .income_list{ position:absolute;bottom:6rem;text-align: center;  width: 100%}
   .answer_my_income_box .my_income .income_list span{padding-bottom:0.35294rem; border-bottom: 1px solid #999; font-size: 0.7647058823529412rem; color:#999;border-radius: 1px}

   .answer_my_income_box .moneyOut_box{width: 100%;height:100%;background: rgba(239,238,244,1);position: absolute;top:0; bottom:0;}
   .answer_my_income_box .money_dialog{  margin: 1.235rem 0.88235rem;margin-bottom: 0;background: rgba(255,255,255,1)}
   .answer_my_income_box .money_dialog_title{line-height: 3.0588rem;font-size: 0.76471rem;color:rgba(255,157,24,1);background: rgba(250,250,250,1);padding-left: 1.76471rem;}
   .answer_my_income_box .money_dialog_detail{padding:1.35rem 1.76471rem;color:rgba(51,51,51,1);}
   .answer_my_income_box .money_dialog_detail .detail_top{margin-bottom: 1.6471rem;font-size: 0.8235rem;}
   .answer_my_income_box .money_dialog_detail .detail_input{margin-bottom: 1.176471rem;padding-bottom: 0.35rem;height:3.0588rem;border-bottom: 1px solid rgba(231,231,231,1);}
   .answer_my_income_box .money_dialog_detail .detail_input span{font-size: 1.76471rem;color:rgba(51,51,51,1);line-height: 1;float: left;margin-right: 0.588235rem;}
   .answer_my_income_box .money_dialog_detail .detail_input input{outline: none;height:100%;font-size: 2.4rem;color: rgba(255,157,24,1);text-shadow: 0px 0px 0px rgba(51,51,51,1);-webkit-text-fill-color: transparent;width:70%;float: left}
   .answer_my_income_box .money_dialog_detail .detail_warn{color:rgba(118,118,118,1);font-size: 0.7671rem;line-height: 1; margin-bottom: 1.176471rem;}
   .answer_my_income_box .money_dialog_detail .detail_warn .warn_red{color:rgba(255,51,0,1)}
   .answer_my_income_box .dialog_btn{background: rgba(255,157,24,1);line-height: 2.647rem;font-size: 1.0588235rem;color:rgba(255,255,255,1);border-radius: 0.294rem;text-align: center;}
   .answer_my_income_box .disabled_btn{line-height: 2.647rem;font-size: 1.0588235rem;color:rgba(255,255,255,1);border-radius: 0.294rem;text-align: center;
   }
   .answer_my_income_box .dialog_btn:active{background: rgba(229,135,6,1);}
   .answer_my_income_box .detail_input img{width:0.88235rem;float: right;margin-top: 1rem;}
</style>