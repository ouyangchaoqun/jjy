<template >
    <div style="height: 100%" class="wbg answer_join_price_box">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="9"  preUrl="./voice" nextUrl="" title="设置咨询者向我提问需要支付的酬金"></v-answer-top-step>

        <div class="set_price">
            <div class="til">设置提问酬金：</div>
            <div class="select" ><input type="" onkeyup="this.value=this.value.replace(/[^\d\.￥]/g,'');  " value="￥1.00"></div>
        </div>
        <div class="submit" @click="submit()">提交审核</div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                prices:["1.00","2.00","3.00","5.00","10.00","15.00","20.00","30.00","50.00"],
                price:"1.00"
            }
        },

        mounted: function () {
        } ,
        methods:  {
            select:function () {
                let _this= this;
                let data = [];
                for(let i =  0 ; i<this.prices.length;i++){
                    data.push({label:"￥ "+this.prices[i]+"",value:this.prices[i]})
                }
                weui.picker(  data, {
                    id:"id"+Math.random(),
                    onChange: function (result) {
                        console.log(result);
                    },
                    onConfirm: function (result) {
                        _this.price = result[0].value;


                    },
                });
            },
            submit:function () {
                this.$router.push("./reviewing")
            }
        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .set_price{ width: 66%; margin: 0rem auto; margin-top: 48% }
    .set_price .til,  .set_price .select{ float:left; line-height: 2rem; text-align: center; color:#333; font-size: 0.88235rem;}
    .set_price .select input{ width: 6rem;font-size: 1.2rem; line-height: 2rem;;color: #ffaa00; text-align: center}
    .set_price .select{ margin-left: 0.6rem; width:50%;color: #ffaa00; font-size: 1.2rem; line-height: 2rem;; border-radius: 0.3rem; border: 1px solid #B3B3B3
    }
    .answer_join_price_box .submit{ position: absolute; top:0; right:0.88235rem;    line-height: 2.647058823529412rem;
        font-size: 0.9rem;}
</style>