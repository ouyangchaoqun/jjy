<template >
    <div style="height: 100%" class="wbg answer_join_price_box">

        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">10/10</div>
        <div class="joinStep_title">设置咨询者向我提问需要支付的酬金</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-answer-top-step step="10"  preUrl="./voice" nextUrl="" title="设置咨询者向我提问需要支付的酬金"></v-answer-top-step>

        <div class="set_price">
            <div class="til">设置提问酬金：</div>
            <div class="select" ><input type="" class="priceInput"   @input="changePrice()" :value="'￥'+price"></div>
            <div class="clear"></div>
        </div>
        <!--<div class="set_price mt" @click="selectFreeTime()" >-->
            <!--<div class="til">设置限时免费：</div>-->
            <!--<div class="select" ><input type="" readonly  :value="freeTimeText"></div>-->
            <!--<div class="clear"></div>-->
        <!--</div>-->


         <!--<div class="submit" @click="submit()">提交审核</div>-->
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                prices:["1.00","2.00","3.00","5.00","10.00","15.00","20.00","30.00","50.00"],
                price:"10.00",
                showLoad:false,
                freeTime:null,
                freeTimeText:'',
                isSubmitting:false,
                times:[{
                    label: '不免费',
                    value: 0
                }, {
                    label: '30分钟',
                    value: 1
                }, {
                    label: '1小时',
                    value: 2
                },{
                    label: '2小时',
                    disabled: true,
                    value: 3
                }, {
                    label: '3小时',
                    value: 4
                },{
                    label: '4小时',
                    value: 5
                }]
            }
        },

        mounted: function () {
            let freeTime = cookie.get("freeTime");
            if(freeTime&&freeTime!=''){
                for(let i =0;i<this.times.length;i++){
                    if(this.times[i].value== parseInt(freeTime)){
                        this.freeTimeText= this.times[i].label;
                    }
                }
            }
            let price = cookie.get("price");
            console.log(price)
            if(price)this.price= price;

            let _this =this;
            $('#subBtn').click(function () {
                _this.submit();
            })
            xqzs.wx.setConfig(this);

        } ,
        methods:  {
            changePrice:function () {
                let price= $(".priceInput").val()
                price=  price.replace('￥','');
                this.price=price;

            },
//            selectFreeTime:function () {
//                let  data= this.times;
//                let _this=this;
//                weui.picker(  data, {
//                    id:"id"+Math.random(),
//                    onChange: function (result) {
//                        console.log(result);
//                    },
//                    onConfirm: function (result) {
//                        _this.freeTime = result[0].value;
//                        cookie.set("freeTime", _this.freeTime );
//                        _this.freeTimeText= result[0].label;
//                    },
//                });
//            },
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
                let _this=this;
                console.log(_this.isSubmitting)
                if(_this.isSubmitting){
                    return;
                }

                console.log('sub');

                if(!xqzs.string.checkPrice(_this.price)){
                    xqzs.weui.tip("请输入正确的金额！");
                    return ;
                }
                if(parseFloat(_this.price)>xqzs.price.MAX_ANSWER_SET_PRICE||parseFloat(_this.price)<xqzs.price.MIN_ANSWER_SET_PRICE){
                    xqzs.weui.tip("金额需在 "+xqzs.price.MIN_ANSWER_SET_PRICE+"-"+xqzs.price.MAX_ANSWER_SET_PRICE+" 之间！");
                    return;
                }

                _this.isSubmitting=true;
                _this.showLoad=true;
                let questionClassId= cookie.get("questionClassId");
                let  questionClassIds=[];
                if(questionClassId&&questionClassId!=''){
                    questionClassIds=questionClassId.split(',')
                }
                console.log("questionClassIds:"+questionClassIds)
                let data={
                    userId:"_userId_",
                    price:_this.price,
//                    freeTime:cookie.get("freeTime"),
                    sign:unescape(cookie.get("sign")),
                    mediaId:cookie.get("mediaId"),
                    voiceLength:cookie.get("voiceLength"),
                    questionClassId:questionClassIds,
                    jobTitle:unescape(cookie.get("jobTitle")),
                    certificateNo:unescape(cookie.get("certificateNo")),
                    certificateFile:[unescape(cookie.get("certificateFile1")),unescape(cookie.get("certificateFile2"))],
                    introduction:unescape(cookie.get("introduction")),
                    experience:unescape(cookie.get("experience")),
                    goodat:unescape(cookie.get("goodAt")),
                    identityNo:unescape(cookie.get("identityNo")),
                    cardImage:[unescape(cookie.get("identityFile1")),unescape(cookie.get("identityFile2"))]

                };
                $.ajax({
                    url: web.API_PATH + "come/expert/register",
                    data:data,
                    type: 'PUT',
                    success: function( bt ) {
                        _this.showLoad=false;
                        _this.isSubmitting=false;
                        let result = JSON.parse(bt)
                        if(result.status==9000006){
                            xqzs.weui.tip("您已经提交过审核",function () {
                                window.history.go(-1);
                            })
                        }else if(result.status==1){
                            _this.$router.replace("./reviewing")
                        }


                    }
                });

            }
        },
        components: {
            'v-showLoad': showLoad,
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .mt{ margin-top: 15px!important;}
    .set_price{ width: 66%; margin: 0rem auto; margin-top: 48% }
    .set_price .til,  .set_price .select{ float:left; line-height: 2rem; text-align: center; color:#333; font-size: 0.88235rem;}
    .set_price .select input{ width: 6rem;font-size: 1.2rem; line-height: 2rem;;color: #ffaa00; text-align: center}
    .set_price .select{ margin-left: 0.6rem; width:50%;color: #ffaa00; font-size: 1.2rem; line-height: 2rem;; border-radius: 0.3rem; border: 1px solid #B3B3B3
    }
    .answer_join_price_box .submit{ position: absolute; top:0; right:0.88235rem;    line-height: 2.647058823529412rem;
        font-size: 0.9rem;}
</style>