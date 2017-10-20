<template >
    <div style="height: 100%" class="answer_my_income_box wbg">

        <div v-title>我的收益</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="nothing income" v-if="income==0&&!showLoad">
            <img src="../../../images/asker/newNoContent.png" alt="">
            <div class="nothing_bottom">
                <p>没有收益</p>
                可以对一对一提问进行回答
                <div @click="goQuestion()">去回答</div>
            </div>
        </div>
        <div class="my_income" v-if="income>0">
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
        components: {
            'v-showLoad': showLoad
        },

        mounted: function () {
            let _this=this;
            let expertId = cookie.get('expertId')
            _this.showLoad=true;
            this.$http.get(web.API_PATH + 'come/expert/query/income/'+expertId+'/_userId_' ).then(function (data) {//es5写法
                _this.showLoad=false;
                if (data.body.status == 1) {
                    console.log(data)
                    _this.income = data.data.data.inCome
                }
            }, function (error) {
                _this.showLoad=false;
            });
            xqzs.wx.setConfig(this);

        },
        methods:{
            goQuestion:function () {
                this.$router.push("/answer/ask/list")
            },
            formatPrice:function(price){
                console.log(price)
                return  xqzs.string.formatPrice(price)
            },
            incomeList:function () {
                this.$router.push("./income/list")
            }
        }


    }
</script>
<style>


   .answer_my_income_box .my_income .img{ background: url(../../../images/asker/income.png) no-repeat; width: 6.21rem; height: 5.941176471rem; background-size: 100% 100%; margin: 0 auto ; margin-top:3.7rem; }
   .answer_my_income_box .my_income{ line-height: 1}
   .answer_my_income_box .my_income .my_income_txt{color:#333; width: 100%; text-align: center; margin-top: 0.76471rem;font-size: 0.8823529411764706rem; }
   .answer_my_income_box .my_income .money{color:#FE7301 ; margin-top: 0.7058823529411765rem; text-align: center; width: 100%; font-size: 2.117647058823529rem; line-height: 1}

   .answer_my_income_box  .my_income .get_money{color:#383333; margin:0 auto;line-height:2.88235rem; border-top:1px solid #D1D1D1;border-bottom:1px solid #D1D1D1;text-align: center; font-size: 1.058823529411765rem; margin-top: 2.941176471rem;}
   .answer_my_income_box .my_income .income_list{ position:absolute;bottom:6rem;text-align: center;  width: 100%}
   .answer_my_income_box .my_income .income_list span{padding-bottom:0.35294rem; border-bottom: 1px solid #999; font-size: 0.7647058823529412rem; color:#999;border-radius: 1px}

</style>