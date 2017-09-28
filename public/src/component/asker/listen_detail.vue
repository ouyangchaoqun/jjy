<template id="steal_detail">
    <div>
        <!--详情头部-->
        <div class="steal_detail_header">
            <div class="steal_detail_top"><img :src="detail.faceUrl" alt=""><div>在<span>{{detail.title}}</span>方面</div></div>
            <div class="steal_detail_content">{{detail.content}}</div>
        </div>
        <!--专家回答列表-->
        <ul>
            <li class="steal_detail_answer" v-for="item in detail.answerList">
                <div class="steal_answer_top">
                    <img class="steal_answer_topimg" :src="item.expertUrl" alt="">
                    <div class="steal_answer_yy">

                        <!--* const GRAB_NOT_BEST    = 1;抢答一般的答案-->
                        <!--* const GRAB_BEST_ANSWER = 2;抢答最好的答案-->
                        <!--* const EXPERT_FREE_TIME = 3;专家免费偷听期内答案-->
                        <!--* const EXPERT_NOT_FREE  = 4;专家收费期内的答案",-->
                        <!--免费听-->
                        <template v-if="item.answerType==1||item.needPay==0">
                            <img class="steal_answer_ly" src="../../images/nocharge.png" alt="">
                            <div>点击播放</div>
                            <img class="steal_answer_sond" src="../../images/sond.png" alt="">
                        </template>

                        <!--付费听-->
                        <template @click="play()" v-if="item.needPay==1">
                            <img class="pay_listen" src="../../images/charge.png" alt="">
                            <div class="position_change1">1元偷听</div>
                        </template>
                        <!--限时免费听-->
                        <template v-if="item.answerType==3&&item.needPay==0">
                            <img class="steal_answer_ly" src="../../images/nocharge.png" alt="">
                            <div >限时免费听</div>
                            <img class="steal_answer_sond" src="../../images/sond.png" alt="">
                        </template>



                    </div>
                    <div :class="{position_change1:(item.answerType==2||item.answerType==4)&&item.needPay==1}">{{item.length}}”</div>
                </div>
                <div class="steal_answer_zan">
                    <div><img src="../../images/asker/zan_nor.png" alt="">  <span>{{item.likeTimes}}</span></div>
                    <div>听过  <span>{{item.listenTimes}}</span></div>
                </div>
                <div class="steal_expert_info">
                    <div>
                        <span class="steal_expert_name">{{item.expertName}}</span><span class="steal_expert_fans">{{item.followCount}}人收听</span>
                    </div>
                    <div class="steal_expert_des">{{item.sign}}</div>
                    <img src="../../images/asker/listenin.png" alt="" @click="follow(item.expertId)">
                </div>
            </li>

        </ul>

    </div>

</template>
<script>
    var steal_detail = {
        template: '#steal_detail'
    };
    export default {
        data() {
            return {
                questionId:0,
                detail:{}
            }
        },
        mounted: function () {
            this.questionId=this.$route.query.questionId;
            this.getDetail()

        },
        methods:{
            getDetail:function () {
                let _this= this;

                _this.$http.get(web.API_PATH + 'come/listen/question/detail/'+_this.questionId +"/_userId_").then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.detail= data.body.data
                    }
                }, function (error) {
                });

            },
            follow:function (id) {
                let that=this;
                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+id+"/_userId_", {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            xqzs.weui.toast("success","收听成功",function () {

                            })
                        }else if(bt.data.status ==900004){
                            xqzs.weui.toast("success","已经收听",function () {

                            })
                        }else if(bt.data.status ==9000003){
                            xqzs.weui.toast("fail","不能收听自己",function () {

                            })
                        }else {
                            xqzs.weui.toast("fail","收听失败",function () {

                            })
                        }
                    });
            },
        }

    }


</script>
<style>
    .position_change1{
        margin-top: 1.1rem;
    }
    .pay_listen{ width: 10.35294117647059rem; height: auto}
    .steal_detail_header{
        padding:0.70588rem 0.88235rem 0 0.88235rem;
        background: #fff;
    }
    .steal_detail_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        color: #999;
        font-size: 0.70588rem;
        line-height: 29px;
    }
    .steal_detail_top img{
        display: block;
        height:29px;
        width:29px;
        border-radius: 50%;
        margin-right: 0.588235rem;
        margin-bottom: 0.70588rem;
    }
    .steal_detail_top span{
        color: #333;
    }
    .steal_detail_content{
        color: #333;
        font-size:0.88235rem;
        line-height: 1.235294rem;
    }
    .steal_detail_answer{
        background: #fff;
        padding-top:1.176471rem;
        margin-bottom: 0.588235rem;
    }
    .steal_answer_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        height:2.8235rem;
        line-height: 2.8235rem;
        color: #999;
        font-size: 0.8235rem;
        margin-bottom: 0.471rem;
        padding:0 0.88235rem;
    }
    .steal_answer_topimg{
        display: block;
        height:44px;
        width: 44px;
        border-radius: 50%;
        margin-right: 0.588235rem;
    }
    .steal_answer_yy{
        position: relative;
        margin-top:0.176471rem;
        margin-right:0.41176471rem;
    }
    .steal_answer_yy div{
        position: absolute;
        color: #fff;
        font-size: 0.88235rem;
        width: 5.882352rem;
        top:-0.29411764471rem;
        left:50%;
        margin-left: -2.941176rem;
        text-align: center;
    }
     .steal_answer_ly{
        display: block;
        height:2.6471rem;
         width:auto;
         border-radius: 0;
    }
    .steal_answer_zan{
        color: #999;
        font-size: 0.70588rem;
        height:0.941176471rem;
        line-height: 0.941176471rem;
        margin-bottom:0.588235rem;
        padding-right: 0.88235rem;
    }
    .steal_answer_zan div{
        float: right;
    }
    .steal_answer_zan img{
        display: inline-block;
        width:0.941176471rem;
    }
    .steal_answer_zan div:nth-of-type(2){
        margin-right:1.235rem;
    }
    .steal_answer_zan div:nth-of-type(1) img{
        float: left;
        margin-right:0.29411rem;
    }
    .steal_answer_zan div:nth-of-type(1) span{
        float: left;
        margin-top:1px;
    }
    .steal_answer_sond{
        display: block;
        margin-top:-0.6471rem;
        height:0.941176rem;
        position: absolute;
        top:50%;
        left:0.88235rem;
    }
</style>