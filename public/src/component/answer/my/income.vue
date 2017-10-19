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


   .answer_my_income_box .my_income .img{ background: url(../../../images/asker/my_income_money.png) no-repeat; width: 5.382352941176471rem; height: 5.382352941176471rem; background-size: 5.382352941176471rem; margin: 0 auto ; margin-top:3.7rem; }
   .answer_my_income_box .my_income{ line-height: 1}
   .answer_my_income_box .my_income .my_income_txt{color:#333; width: 100%; text-align: center; margin-top: 1.470588235294118rem;font-size: 0.8823529411764706rem; }
   .answer_my_income_box .my_income .money{color:rgba(253,114,6,1) ; margin-top: 0.7058823529411765rem; text-align: center; width: 100%; font-size: 2.117647058823529rem; font-weight: bold; line-height: 1}

   .answer_my_income_box  .my_income .get_money{ margin:1rem auto; width: 58.66666666666667%; line-height:2.588235294117647rem; border:1px solid #999;border-radius: 5px; text-align: center; font-size: 1.058823529411765rem; margin-top: 2.205882352941176rem;color:#454B54}
   .answer_my_income_box .my_income .income_list{ margin-top: 6rem; text-align: center;  width: 100%}
   .answer_my_income_box .my_income .income_list span{ padding: 0.5rem 0; border-bottom: 1px solid #999; font-size: 0.7647058823529412rem; color:#999; margin-bottom: 10px;}

</style>