<template id="setAnswer">
    <div class="setAnswer_box">
        <div class="setItem">
            <div>
                <div>设置向我提问的价格：<input type="text" placeholder="￥1.00" v-model="price" @input="getPrice()"/></div>
                <div @click="showTimePicker()">设置限时免费听：<input id="timePic" type="text" v-model="label"></div>
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
                price:10
            }
        },


        mounted: function () {

            $("#timePic").focus(function(){
                document.activeElement.blur();
            });
        },
        methods:{
            showTimePicker:function () {
                let _this = this;
                weui.picker([{
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
                    value: 4
                }], {
                    onChange: function (result) {
                        console.log(result);
                    },
                    onConfirm: function (result) {
                        _this.label = result[0].label;
                        let expertId = cookie.get('expertId');
                        let pri  = _this.price;
                        let time = result[0].value;
                        let msg = {
                            expertId:expertId,
                            userId:'',
                            price:pri,
                            freeTime:time
                        };
                        _this.$http.post(web.API_PATH + 'come/expert/answerset', msg,{emulateJSON: true})
                            .then(
                                (response) => {
                                    console.log('success')
                                    xqzs.weui.toast("success", "修改成功", function () {
                                        _this.$router.go(-1)
                                    })
                                });
                    }
                });
            },
            showMask:function () {
                this.myask_mask_flag = true
            },
            hide_myask_mask:function () {
                this.myask_mask_flag = false
            },
            getPrice:function () {
                console.log(this.price)
            }
        }


    }
</script>
<style>
    .setAnswer_box{
        background: #fff;
        position: relative;
    }
    .setItem{
        width:100%;
        text-align: right;
        position: absolute;
        top:40%;
        color: #333;
        font-size: 0.88235rem;
        line-height: 1;
        right:0;
    }
    .setItem input{
        outline: none;
        border:1px solid #B3B3B3;
        width:9rem;
        height:1.88235rem;
        border-radius: 5px;
        text-align: center;
        margin-left:0.88235rem;
        color:rgba(253,114,6,1);
    }

    .setItem>div:nth-of-type(1){
        margin-bottom: 2.1rem;
        padding-right: 2.29411rem;
    }
    .setItem>div:nth-of-type(1)>div:nth-of-type(1){
        margin-bottom: 2.3529411rem;
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

</style>