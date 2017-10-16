<template id="setAnswer">
    <div class="setAnswer_box">
        <div class="setItem">
            <div>
                <div class="set_price">
                    <div class="til">设置提问酬金：</div>
                    <div class="select" ><input type="" class="priceInput" @input="getPrice()" :value="'￥'+formatPrice(expert.price)"></div>
                    <div class="clear"></div>
                </div>
                <div class="set_price mt_mb" @click="showTimePicker()" >
                    <div class="til">设置限时免费：</div>
                    <div class="select" ><input type="" readonly   :value="label"></div>
                    <div class="clear"></div>
                </div>

            </div>


            <div class="btn_box">

                <a id="subBtn" @click="submit()" >提交审核</a>
            </div>


            <div class="setItem_bottom" @click="showMask()">
                <span>
                    <img src="../../../images/asker/need_know.png" alt="">
                    解答须知
                </span>
            </div>
        </div>
        <div class="weui-mask weui-animate-fade-in" v-if="myask_mask_flag" @click="hide_myask_mask()">
            <div class="myask_class myask_know_box" @click.stop>
                <h3>解答须知</h3>
                <ul style="overflow: auto;height: 12.35294rem;">
                    <li><b>1.</b>提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。<br/>（1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。<br/>（2）问题描述越清楚，咨询师的回答将精准。</li>
                    <li><b>2.</b>你可以选择做佳答案：<br/>（1）该回答将产生偷偷听收入；<br/>（2）其咨询师将获得全部赏金；</li>
                    <li><b>3.</b>48小时内无人抢答，则全额退款。</li>
                    <li><b>1.</b>提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。<br/>（1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。<br/>（2）问题描述越清楚，咨询师的回答将精准。</li>
                    <li><b>2.</b>你可以选择做佳答案：<br/>（1）该回答将产生偷偷听收入；<br/>（2）其咨询师将获得全部赏金；</li>
                    <li><b>3.</b>48小时内无人抢答，则全额退款。</li>

                </ul>
                <div class="myask_class_true" @click="hide_myask_mask()">知道了</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        data() {
            return {
                label:'',
                myask_mask_flag:false,
                expert:{ },
                keyValue:[{
                    label: '不免费',
                    value: 0
                }, {
                    label: '30分钟',
                    value: 30
                }, {
                    label: '1小时',
                    value: 60
                },{
                    label: '2小时',
                    value: 120
                }, {
                    label: '3小时',
                    value: 180
                },{
                    label: '4小时',
                    value: 240
                }]
            }
        },
        mounted: function () {
            this.getExpertByUserId();
            $("#timePic").focus(function(){
                document.activeElement.blur();
            });
        },
        methods:{
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
            },
            showTimePicker:function () {
                let _this = this;
                let defaultValue= _this.expert.freeTime;
                weui.picker(_this.keyValue, {
                    defaultValue: defaultValue,
                    onChange: function (result) {

                    },
                    onConfirm: function (result) {
                        console.log(result);
                        _this.label = result[0].label;
                        _this.expert.freeTime = result[0].value;


                    }
                });
            },
            submit:function () {
                let _this=this;
                let expertId = cookie.get('expertId');

                let msg = {
                    expertId:expertId,
                    userId:'',
                    price: _this.expert.price,
                    freeTime: _this.expert.freeTime
                };
                _this.$http.post(web.API_PATH + 'come/expert/answerset', msg,{emulateJSON: true})
                    .then(
                        (response) => {
                            console.log('success')
                            xqzs.weui.toast("success", "修改成功", function () {
                                _this.$router.go(-1)
                            })
                        });
            },
            showMask:function () {
                this.myask_mask_flag = true
            },
            hide_myask_mask:function () {
                this.myask_mask_flag = false
            },
            getPrice:function () {
                this.expert.price=$(".priceInput").val().replace("￥","");
            },
            getExpertByUserId:function () {
                let _this=this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1&&data.body.data!=null) {
                        _this.expert = data.data.data;
                        for(let i =0  ;i< _this.keyValue.length;i++){
                            if(_this.keyValue[i].value== _this.expert.freeTime){
                                _this.label=_this.keyValue[i].label;
                                break;

                            }
                        }

                    }
                }, function (error) {
                });
            },
        }


    }
</script>
<style>
    .setAnswer_box{
        background: #fff;
        position: relative;
    }

    .setItem .setItem_bottom{
        text-align: center;
        font-size: 0.70588235rem;
        color: #666;
    }
    .setItem_bottom img{
        height:14px;
        width:14px;
        display: inline-block;
        position: absolute;
        left:0;
        top:1px;
    }
    .setItem_bottom span{
        margin:0 auto;
        position: relative;
        padding-left: 1.176471rem;
    }
    .set_price{ width: 66%; margin: 0rem auto; margin-top: 48% }
    .set_price .til,  .set_price .select{ float:left; line-height: 2rem; text-align: center; color:#333; font-size: 0.88235rem;}
    .set_price .select input{ width: 6rem;font-size: 1.2rem; line-height: 2rem;;color: #ffaa00; text-align: center}
    .set_price .select{ margin-left: 0.6rem; width:50%;color: #ffaa00; font-size: 1.2rem; line-height: 2rem;; border-radius: 0.3rem; border: 1px solid #B3B3B3
    }
    .set_price.mt_mb{ margin-top: 30px; margin-bottom: 30px;}

    .btn_box{width:100%;position: absolute;bottom:1.471rem;display: flex;display: -webkit-flex;text-align: center;line-height: 2.35rem}
    .btn_box a{flex: 1;border:1px solid rgba(253,115,1,1);margin:0 0.88235rem;border-radius: 1.176471rem;color:rgba(253,115,1,1);background: #fff;}
    .btn_box a:last-of-type{color:#fff;background:linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1))}
    .btn_box a:active{
        color:#fff;background:linear-gradient(to right, rgb(217, 128, 25), rgb(220, 107, 6))
    }
</style>