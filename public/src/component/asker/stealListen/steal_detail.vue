<template id="steal_detail">
    <div>
        <!--详情头部-->
        <div class="steal_detail_header">
            <div class="steal_detail_top"><img src="../../../images/34.jpg" alt=""><div>在<span>情感困惑</span>方面</div></div>
            <div class="steal_detail_content">女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这是不是一种病？</div>
        </div>
        <!--专家回答列表-->
        <ul>
            <li class="steal_detail_answer">
                <div class="steal_answer_top">
                    <img class="steal_answer_topimg" src="../../../images/asker/34.jpg" alt="">
                    <div class="steal_answer_yy">
                        <img class="steal_answer_ly" src="../../../images/nocharge.png" alt="">
                        <div>点击播放</div>
                        <img class="steal_answer_sond" src="../../../images/sond.png" alt="">
                    </div>
                    <div>58”</div>
                </div>
                <div class="steal_answer_zan">
                    <div><img src="../../../images/asker/zan_nor.png" alt="">  <span>48</span></div>
                    <div>听过  <span>48</span></div>
                </div>
                <div class="steal_expert_info">
                    <div>
                        <span class="steal_expert_name">陆军</span><span class="steal_expert_fans">20134人收听</span>
                    </div>
                    <div class="steal_expert_des">帮你解决婚姻，情感中的困扰，情感中的困扰...</div>
                    <img src="../../../images/asker/listenin.png" alt="">
                </div>
            </li>
            <li class="steal_detail_answer">
                <div class="steal_answer_top">
                    <img class="steal_answer_topimg" src="../../../images/34.jpg" alt="">
                    <div class="steal_answer_yy">
                        <img class="steal_answer_ly" src="../../../images/nocharge.png" alt="">
                        <div>点击播放</div>
                        <img class="steal_answer_sond" src="../../../images/sond.png" alt="">
                    </div>
                    <div>58”</div>
                </div>
                <div class="steal_answer_zan">
                    <div><img src="../../../images/asker/zan_por.png" alt="">  <span>48</span></div>
                    <div>听过  <span>48</span></div>
                </div>
                <div class="steal_expert_info">
                    <div>
                        <span class="steal_expert_name">陆军</span><span class="steal_expert_fans">20134人收听</span>
                    </div>
                    <div class="steal_expert_des">帮你解决婚姻，情感中的困扰，情感中的困扰...</div>
                    <img src="../../../images/asker/listenin.png" alt="">
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
            }
        },
        mounted: function () {

        }
    }


</script>
<style>
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