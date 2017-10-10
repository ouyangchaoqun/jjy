<template >
    <div style="height: 100%" class="asker_my_income_box wbg">

        <div v-title>我的收益</div>
        <div class="nothing income" v-if="false">
            没有收益明细
        </div>
        <div class="my_income">
            <div class="img"></div>
            <div class="my_income_txt">我的收益</div>
            <div class="money">￥{{income}}</div>
            <div class="get_money">提现</div>
            <div class="income_list" @click="incomeList()"><span>收益明细</span></div>
        </div>

    </div>
</template>

<script type="es6">

    export default {
        data() {
            return {
                income:0
            }
        },


        mounted: function () {
            let expertId = cookie.get('expertId')
            this.$http.get(web.API_PATH + 'come/expert/query/income/'+expertId+'/1289' ).then(function (data) {//es5写法
                if (data.body.status == 1) {
                    console.log(data)
                    this.income = data.data.data.inCome
                }
            }, function (error) {
            });

        },
        methods:{
            incomeList:function () {
                this.$router.push("./income/list")
            }
        }


    }
</script>
<style>

   .asker_my_income_box .nothing.income{ background: url(../../../images/asker/nothing_income.png) no-repeat center top; background-size: 5.205882352941176rem; }

   .asker_my_income_box .my_income .img{ background: url(../../../images/asker/my_income_money.png) no-repeat; width: 5.382352941176471rem; height: 5.382352941176471rem; background-size: 5.382352941176471rem; margin: 0 auto ; margin-top:3.7rem; }
   .asker_my_income_box .my_income{ line-height: 1}
   .asker_my_income_box .my_income .my_income_txt{color:#333; width: 100%; text-align: center; margin-top: 1.470588235294118rem;font-size: 0.8823529411764706rem; }
   .asker_my_income_box .my_income .money{color:#454B54 ; margin-top: 0.7058823529411765rem; text-align: center; width: 100%; font-size: 2.117647058823529rem; font-weight: bold; line-height: 1}

   .asker_my_income_box  .my_income .get_money{ margin:1rem auto; width: 58.66666666666667%; line-height:2.588235294117647rem; border:1px solid rgba(253,115,1,1);border-radius: 5px; text-align: center; font-size: 1.058823529411765rem; margin-top: 2.205882352941176rem;color:#454B54}
   .asker_my_income_box .my_income .income_list{ margin-top: 6rem; text-align: center;  width: 100%}
   .asker_my_income_box .my_income .income_list span{ padding: 0.5rem 0; border-bottom: 1px solid #999; font-size: 0.7647058823529412rem; color:#999; margin-bottom: 10px;}

</style>