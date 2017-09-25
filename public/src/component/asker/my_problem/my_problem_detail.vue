<template id="my_problem_detail">
    <div :class="{problem_box_background:problem_assess_flag}">
        <div class="my_problem_detail">
            <div class="problem_detail_header">
                问题类型:  <div>情感困惑</div>
                <div>￥13.14</div>
            </div>
            <div class="problem_detail_content">
                女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这是不是一种病？女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这是不是一种病？
            </div>
            <div class="problem_answer_info">
                <img src="../../../images/asker/34.jpg" alt="">
                <!--回答，专家语音-->
                <div class="problem_answer_yy" v-if="true">
                    <img class="problem_answer_ly" src="../../../images/nocharge.png" alt="">
                    <div class="problem_answer_play">点击播放</div>
                    <img class="problem_answer_sond" src="../../../images/sond.png" alt="">
                    <div class="answer_play_time">60”</div>
                </div>

                <!--待回答-->
                <div class="problem_wait_style" v-if="false">
                    <span>待回答</span><span>还剩45小时</span>
                </div>
                <!--超时未回答-->
                <div class="problem_wait_style" v-if="false">
                    <span>超时未回答</span><span>提问酬金已原路返还</span>
                </div>
            </div>
            <!--回答后底部显示详情-->
            <div class="problem_answer_bottom">
                <div class="problem_answer_time">1小时前</div>
                <div class="problem_answer_zan">
                    <div><span>听过</span><span>48</span></div>
                    <div><span>收入分成￥</span><span>1.00</span></div>
                    <div><img src="../../../images/asker/zan_nor.png" alt=""><span>48</span></div>
                </div>
            </div>
            <div class="steal_expert_info">
                <div>
                    <span class="steal_expert_name">陆军</span><span class="steal_expert_fans">20134人收听</span>
                </div>
                <div class="steal_expert_des">帮你解决婚姻，情感中的困扰，情感中的困扰...</div>
                <img src="../../../images/asker/listenin.png" alt="">
            </div>
        </div>


        <!--匿名评价-->
        <div class="problem_assess" v-if="problem_assess_flag">
            <h4>匿名评价此回答</h4>
            <div>
                <img src="../../../images/answer/star_no.png" alt="">
                <img src="../../../images/answer/star_no.png" alt="">
                <img src="../../../images/answer/star_no.png" alt="">
                <img src="../../../images/answer/star_no.png" alt="">
                <img src="../../../images/answer/star_no.png" alt="">
            </div>
            <div class="problem_assess_item">
                <div class="problem_assess_class">
                    <span>和蔼可亲</span><span>态度好</span><span>和蔼可亲</span><span>态度好</span><span>声音好听</span><span>和蔼可亲</span><span>很专业</span><span>和蔼可亲</span>
                </div>
                <div class="problem_assess_input">
                    <textarea placeholder="您的反馈将影响咨询师"></textarea>
                </div>
            </div>
            <div class="problem_assess_btn">
                <div class="weui-btn weui-btn_disabled weui-btn_primary">提交</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    var my_problem_detail = {
        template: '#my_problem_detail'
    };

    export default {
        data() {
            return {
                problem_assess_flag:true
            }
        },
        mounted: function () {

        },
        methods: {

        }


    }
</script>
<style>

    .problem_answer_info{
        padding:0 0.88235rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 2.8235rem;
        height:2.8235rem;
        font-size: 0.8235rem;
        color: #999;
        margin-bottom: 0.88235rem;
    }
    .problem_answer_info img{
        height:44px;
        display: block;
        width:44px;
        border-radius: 50%;
        margin-right: 0.88235rem;
    }
    .problem_answer_yy{
        position: relative;
        margin-top: 3px;
    }
    .problem_answer_yy .problem_answer_ly{
        display: block;
        height: 2.6471rem;
        width: auto;
        border-radius: 0;
    }
    .problem_answer_play{
        position: absolute;
        color: #fff;
        font-size: 0.88235rem;
        width: 5.88235rem;
        left: 50%;
        margin-left: -2.941175rem;
        text-align: center;
        top:50%;
        line-height: 1;
        margin-top:-0.6471rem;
    }
    .answer_play_time{
        position: absolute;
        right:-1.76471rem;
        line-height: 1;
        height:1.176471rem;
        top:50%;
        margin-top:-10px;
    }
    .problem_answer_info .problem_answer_sond{
        height:16px;
        display: block;
        position: absolute;
        width:auto;
        top:50%;
        margin-top:-0.588235rem;
        left:0.88235rem;
    }
    .problem_assess{
        background: #fff;
        padding-top:1.176471rem;
        font-size: 0.70588rem;
        color: #999;
        text-align: center;
        border-top: 0.588235rem solid #f4f4f8;
        padding-bottom: 2.35rem;
    }
    .problem_assess h4{
        color: #333;
        font-size: 0.88235rem;
        font-weight: normal;
    }
    .problem_assess img{
        display: inline-block;
        margin:0.588235rem 0.20588rem;
        width: 0.941176rem;
    }
    .problem_assess_item span{
        padding:0 0.70588rem;
        height:1.35294rem;
        line-height: 1.35294rem;
        border:1px solid #999;
        border-radius: 0.6470588rem;
        display: inline-block;
        margin-bottom:0.70588rem;
        margin-right: 0.235294rem;
    }
    .problem_assess_class{
        margin-bottom: 0.88235rem;
        padding:0 2.1176471rem;
        text-align: left;
    }
    .problem_assess_input{
       padding: 0 2.1176471rem 1.6471rem 2.1176471rem;
    }
    .problem_assess_item textarea{
        height:4.1176471rem;
        background: #EBEBEC;
        resize: none;
        border:0;
        outline: none;
        width:100%;
        font-size: 0.70588rem;
        color: #999;
    }
    .problem_assess_item textarea::-webkit-input-placeholder{color:#BCBBBB;}
    .problem_assess_btn{
        padding: 0 0.88235rem;
    }
    .problem_wait_style>span:nth-of-type(1){
        color: #69BA2D ;
        font-size: 0.88235rem;
        margin-right: 1.235294rem;;
    }
    .problem_wait_style>span:nth-of-type(2){
        color: #666 ;
        font-size: 0.76471rem;
    }
    .problem_box_background{
        background: #fff;
    }
</style>