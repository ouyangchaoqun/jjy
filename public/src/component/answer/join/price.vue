<template >
    <div style="height: 100%" class="wbg">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="9"  preUrl="./voice" nextUrl="" title="设置咨询者向我提问需要支付的酬金"></v-answer-top-step>

        <div class="set_price">
            <div class="til">设置提问酬金</div>
            <div class="select" @click="select()">￥1.00</div>
        </div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                prices:["1.00","2.00","3.00","5.00","10.00","15.00","20.00","30.00","50.00"]
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
                        _this.yearN = result[0].label;
                        _this.monthN = result[1].label;
                        _this.dayN = result[2].label;

                    },
                });
            }
        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>

</style>