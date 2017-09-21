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
        padding:12px 15px 0 15px;
        background: #fff;
    }
    .steal_detail_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        color: #999;
        font-size: 12px;
        line-height: 29px;
    }
    .steal_detail_top img{
        display: block;
        height:29px;
        width:29px;
        border-radius: 50%;
        margin-right: 10px;
        margin-bottom: 12px;
    }
    .steal_detail_top span{
        color: #333;
    }
    .steal_detail_content{
        color: #333;
        font-size: 15px;
        line-height: 21px;
    }
    .steal_detail_answer{
        background: #fff;
        padding-top:20px;
        margin-bottom: 10px;
    }
    .steal_answer_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        height:48px;
        line-height: 48px;
        color: #999;
        font-size: 14px;
        margin-bottom: 8px;
        padding:0 15px;
    }
    .steal_answer_topimg{
        display: block;
        height:44px;
        width: 44px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .steal_answer_yy{
        position: relative;
        margin-top:3px;
        margin-right:7px;
    }
    .steal_answer_yy div{
        position: absolute;
        color: #fff;
        font-size: 15px;
        width: 100px;
        top:-5px;
        left:50%;
        margin-left: -50px;
        text-align: center;
    }
     .steal_answer_ly{
        display: block;
        height:45px;
         width:auto;
         border-radius: 0;
    }
    .steal_answer_zan{
        color: #999;
        font-size: 12px;
        height:16px;
        line-height: 16px;
        margin-bottom:10px;
        padding-right: 15px;
    }
    .steal_answer_zan div{
        float: right;
    }
    .steal_answer_zan img{
        display: inline-block;
        width:16px;
    }
    .steal_answer_zan div:nth-of-type(2){
        margin-right:21px ;
    }
    .steal_answer_zan div:nth-of-type(1) img{
        float: left;
        margin-right:5px;
    }
    .steal_answer_zan div:nth-of-type(1) span{
        float: left;
        margin-top:1px;
    }
    .steal_answer_sond{
        display: block;
        margin-top:-11px;
        height:16px;
        position: absolute;
        top:50%;
        left:15px;
    }
</style>