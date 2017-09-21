<template id="rob_problem">
    <div class="rob_problem">
        <div class="my_problem_detail">
            <div class="problem_detail_header">
                问题类型:  <div>情感困惑</div>
                <div>赏金￥13.14</div>
            </div>
            <div class="problem_detail_content">
                六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手选择分手？
            </div>
            <!--超时未解答-->
            <div class="rob_status_box" v-if="false">
                <div>未解答</div>
                <div>48小时内无人抢答，赏金已全额退还</div>
            </div>
            <!--正在进行中-->
            <div class="rob_status_box">
                <div>还剩44小时</div>
                <div>已有2人抢答，可以选择一个最佳答案，其答主将获得全部赏金，且该回答将产生偷偷听收入</div>
            </div>
            <ul class="rob_lists">
                <li>
                    <div class="rob_box_top">
                        <img src="../../../images/34.jpg" alt="">
                        <div>陈小刚</div>
                    </div>
                    <div class="rob_answer">
                        <img class="answer_line" src="../../../images/nocharge.png" alt="">
                        <img class="answer_play" src="../../../images/sond.png" />
                        <div>点击播放</div>
                        <span>60”</span>
                        <img class="best_answer" src="../../../images/asker/imgfalse.png" alt="">
                    </div>
                    <div class="problem_answer_bottom rob_answer_bottom">
                        <div class="problem_answer_time">1小时前</div>
                        <div class="problem_answer_zan">
                            <div><span>听过</span><span>48</span></div>
                            <div><img src="../../../images/asker/zan_nor.png" alt=""><span>48</span></div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="rob_box_top">
                        <img src="../../../images/34.jpg" alt="">
                        <div>陈小刚</div>
                    </div>
                    <div class="rob_answer">
                        <img class="answer_line" src="../../../images/nocharge.png" alt="">
                        <img class="answer_play" src="../../../images/sond.png" />
                        <div>点击播放</div>
                        <span>60”</span>
                        <img class="best_answer" src="../../../images/asker/imgtrue.png" alt="">
                    </div>
                    <div class="problem_answer_bottom rob_answer_bottom">
                        <div class="problem_answer_time">1小时前</div>
                        <div class="problem_answer_zan">
                            <div><span>听过</span><span>48</span></div>
                            <div><img src="../../../images/asker/zan_nor.png" alt=""><span>48</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="es6">
    var rob_problem = {
        template: '#rob_problem'
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
    .rob_problem{
        background: #fff;
    }
    .rob_status_box{
        padding:0 0.88235rem;
        color: #666;
        font-size: 0.70588235rem;
        border-bottom: 0.588235rem solid #f4f4f8;
    }
    .rob_status_box>div{
        margin-bottom: 0.588235rem;
        line-height: 1.0588235rem;
    }
    .rob_lists li{
        background: #fff;
        padding:15px 15px 0px 15px;
        border-bottom: 10px solid #f4f4f8;
    }
    .rob_box_top{
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        font-size: 12px;
        color: #333;
        line-height: 34px;
    }
    .rob_box_top img{
        width: 34px;
        height:34px;
        display: block;
        border-radius: 50%;
        margin-right:10px;
    }
    .rob_answer{
        position: relative;
        margin-left: 44px;
        margin-bottom: 14px;
    }
    .answer_line{
        width:174px;
        display: block;
    }
    .answer_play{
        height:16px;
        display: block;
        position: absolute;
        top:50%;
        left:0.88235rem;
        margin-top:-11px;
    }
    .rob_answer div{
        color: #fff;
        width:100px;
        position: absolute;
        font-size: 15px;
        text-align: center;
        line-height: 1;
        top:12px;
        left:36px;
    }
    .rob_answer span{
        position: absolute;
        left:185px;
        top:8px;
        color: #999;
        font-size: 14px;
    }
    
    .rob_answer_bottom{
        padding: 0;
        padding-left: 44px;
    }
    .best_answer{
        height: 18px;
        width:18px;
        display: block;
        position: absolute;
        right:0;
        top: 50%;
        margin-top: -11px;
    }

</style>