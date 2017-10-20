<template >
    <div style="height: 100%" class="asker_my_income_box wbg">

        <div v-title>我的收益</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="nothing income" v-if="income==0&&!showLoad">
            <img src="../../../images/asker/newNoContent.png" alt="">
            <div class="nothing_bottom">
                <p>没有收益明细</p>
                可以对专家进行提问
                <div @click="goAsk()">去提问</div>
            </div>
        </div>
        <div class="my_income"  v-if="income>0">
            <div class="img"></div>
            <div class="my_income_txt">我的收益</div>
            <div class="money">￥{{formatPrice(income)}}</div>
            <div class="get_money">提现</div>
            <div class="income_list" @click="incomeList()"><span>收益明细</span></div>
        </div>

    </div>
</template>

<script type="es6">


    import showLoad from '../../include/showLoad.vue';

    export default {
        data() {
            return {
                showLoad:false,
                income:0
            }
        },


        mounted: function () {
            this.getIncome()
            xqzs.wx.setConfig(this);
        },
        components: {
            'v-showLoad': showLoad
        },
        methods:{
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
            },
            goAsk:function () {
                this.$router.push("/answer/index");
            },
            getIncome:function () {

                let _this= this;
                _this.showLoad=true;
                _this.$http.get(web.API_PATH + 'come/user/query/income/_userId_' ).then(function (data) {//es5写法
                    _this.showLoad=false;
                    if (data.body.status == 1) {
                        _this.income= data.body.data.inCome
                    }
                }, function (error) {
                    _this.showLoad=false;
                });

            },
            incomeList:function () {
                this.$router.push("./income/list")
            }
        }


    }
</script>
<style>

    .asker_my_income_box{position: relative}
   .asker_my_income_box .my_income .img{ background: url(../../../images/asker/income.png) no-repeat; width: 6.21rem; height: 5.941176471rem; background-size:100% 100%; margin: 0 auto ; margin-top:3.7rem; }
   .asker_my_income_box .my_income{ line-height: 1}
   .asker_my_income_box .my_income .my_income_txt{ width: 100%; text-align: center; margin-top: 0.76471rem;font-size: 0.8823529411764706rem; color:#333;}
   .asker_my_income_box .my_income .money{ margin-top: 0.7058823529411765rem; text-align: center; width: 100%; font-size: 2.117647058823529rem;line-height: 1;color:#FE7301}

   .asker_my_income_box  .my_income .get_money{color:#383333 ; margin:0 auto;line-height:2.88235rem; border-top:1px solid #D1D1D1;border-bottom:1px solid #D1D1D1;text-align: center; font-size: 1.058823529411765rem; margin-top: 2.941176471rem;}
    .asker_my_income_box  .my_income .get_money:active{background: #eee}
   .asker_my_income_box .my_income .income_list{ position: absolute;bottom:6rem; text-align: center;  width: 100%}
   .asker_my_income_box .my_income .income_list span{border-bottom: 1px solid #999; font-size: 0.7647058823529412rem; color:#999; padding-bottom: 0.35294rem;border-radius: 1px;}
</style>