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
            <div class="rob_status_box" v-if="true">
                <div>还剩44小时</div>
                <div>已有2人抢答，可以选择一个最佳答案，其答主将获得全部赏金，且该回答将产生偷偷听收入</div>
            </div>
            <div class="rob_status_box" v-if="false">
                <div>已解答</div>
                <div>共有2人抢答，抢答者平分赏金。</div>
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
                        <div class="paly_html">点击播放</div>
                        <span>60”</span>
                        <!--选择最佳答案选框-->
                        <div v-if="false" :class='[{best_answer_true:isactive},{best_answer:true}]'></div>
                        <!--最佳确定-->
                        <div class="best_getMoney">
                            <div>￥13.14</div>
                            <img src="../../../images/asker/getmoney.png" alt="">
                        </div>
                        <!--未选择最佳平分赏金-->
                        <div class="deuce_money_box" v-if="false">
                            ￥5.00
                        </div>
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
        <!--弹出层-->
        <div class="weui-mask" v-if="changeFlg">
            <div class="problem_dialog" v-if="problem_dialogFlag">
                <div class="problem_dialog_bd">确定不选择中<span>陈小刚</span>了？</div>
                <div class="problem_dialog_fd">
                    <div @click="best_qx()">取消</div>
                    <div @click="best_confirm()">确定</div>
                </div>
            </div>
            <div class="best_dialog" v-if="best_dialogFlag">
                <div class="best_dialog_header">
                    <img src="../../../images/asker/bestan.png" alt="">
                    <div>陈小刚</div>
                </div>
                <div class="best_dialog_html">被选为最佳回答并获得奖金。并且与Ta一起参与偷听分成哦</div>
                <div class="best_dialog_fb" @click="hide_dialog()">知道了</div>
            </div>
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
                problem_assess_flag:true,
                isactive:false,
                changeFlg:false,
                problem_dialogFlag:false,
                best_dialogFlag:false
            }
        },
        mounted: function () {
            let _this = this
            $('.best_answer').click(function () {
                _this.isactive = ! _this.isactive
                _this.changeFlg = true;
                if(_this.isactive==false){
                   _this.problem_dialogFlag = true
                    _this.best_dialogFlag = false
                }
                if(_this.isactive==true){
                    _this.best_dialogFlag = true
                    _this.problem_dialogFlag = false
                }
            })
        },
        methods: {
            best_qx:function () {
                this.changeFlg = false;
                this.isactive=true;
            },
            best_confirm:function () {
                this.changeFlg = false;
                this.isactive=false
            },
            hide_dialog:function () {
                this.changeFlg = false;
            }
        }


    }
</script>
<style>
    .rob_problem{
        background: #fff;
    }
    .rob_status_box{
        padding:0 0.88235rem;
        color: #999;
        font-size: 0.70588235rem;
        border-bottom: 0.41176471rem solid #f4f4f8;
    }
    .rob_status_box>div{
        margin-bottom: 0.2rem;
        line-height: 1.0588235rem;
    }
    .rob_lists li{
        background: #fff;
        padding:0.88235rem 0.88235rem 0px 0.88235rem;
        border-bottom: 0.41176471rem solid #f4f4f8;
    }
    .rob_box_top{
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        font-size: 0.70588235rem;
        color: #333;
        line-height: 2rem;
        margin-bottom: 0.4rem;
    }
    .rob_box_top img{
        width: 2rem;
        height:2rem;
        display: block;
        border-radius: 50%;
        margin-right:0.588235rem;
    }
    .rob_answer{
        position: relative;
        margin-left: 2.588235rem;
        margin-bottom: 0.8235rem;
    }
    .answer_line{
        width:10.235rem;
        display: block;
    }
    .answer_play{
        height:0.941176471rem;
        display: block;
        position: absolute;
        top:50%;
        left:0.88235rem;
        margin-top:-0.6471rem;
    }
    .paly_html{
        color: #fff;
        width:5.88235rem;
        position: absolute;
        font-size: 0.88235rem;
        text-align: center;
        line-height: 1;
        top:0.70588rem;
        left:2.1176471rem;
    }
    .rob_answer span{
        position: absolute;
        left:10.88235rem;
        top:0.470588rem;
        color: #999;
        font-size: 0.8235rem;
    }
    
    .rob_answer_bottom{
        padding: 0;
        padding-left: 2.588235rem;
    }
    .best_answer{
        height: 1.0588235rem;
        width:1.0588235rem;
        display: block;
        position: absolute;
        right:0;
        top: 50%;
        margin-top: -0.6470588rem;
        background: url("../../../images/asker/imgfalse.png") no-repeat;
        background-size: 100% 100%;
    }
    .best_answer_true{
        background: url("../../../images/asker/imgtrue.png") no-repeat;
        background-size: 100% 100%;
    }
    .problem_dialog{
        width:16.470588rem;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        top:40%;
        left:50%;
        margin-left:-8.235294rem;
    }
    .problem_dialog_bd{
        height:5.588235rem;
        line-height: 5.588235rem;
        color: #7F7E7E;
        font-size: 0.94117647rem;
        text-align: center;
        border-bottom: 1px solid #D1D1D3;
    }
    .problem_dialog_bd span{
        color: #333;
    }
    .problem_dialog_fd{
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        height:2.8235rem;
        line-height: 2.8235rem;
    }
    .problem_dialog_fd div{
        flex: 1;
        text-align: center;
        font-size: 1.0588235rem;
    }
    .problem_dialog_fd div:active{
        background: #eee;
    }
    .problem_dialog_fd div:nth-of-type(1){
        color: #666;
        position: relative;
    }
    .problem_dialog_fd div:nth-of-type(1)::after{
        content: '';
        height:100%;
        width:1px;
        background: #D1D1D3;
        position: absolute;
        right:0;
    }
    .problem_dialog_fd div:nth-of-type(2){
        color: #09bb07;
    }
    .best_dialog{
        width:14.470588rem;
        background: #fff;
        position: absolute;
        top:30%;
        left:50%;
        margin-left:-7.235294rem;
        padding-top:1.6470588rem;
        color: #666;
        font-size: 0.76471rem;
        border-radius: 5px;
    }
    .best_dialog_header{
        position: relative;
        color: #333;
        font-size: 1.23529411rem;
        text-align: center;
        margin-bottom: 1.176471rem;
    }
    .best_dialog_header div{
        margin-top:-1.176471rem;
    }
    .best_dialog_header img{
        height:6.529411rem;
        display: block;
        margin:0 auto;
    }
    .best_dialog_html{
        padding:0 0.941176471rem 1.176471rem 1.0588235rem;
        line-height: 1.176471rem;
        border-bottom: 1px solid #D1D1D3;
    }
    .best_dialog_fb{
        color: #09bb07;
        font-size: 1.0588235rem;
        text-align: center;
        height:2.941176rem;
        line-height: 2.941176rem;
    }
    .best_dialog_fb:active{
        background: #eee;
    }
    .deuce_money_box{
        color: #FF9900;
        font-size: 0.8235rem;
        position: absolute;
        top: 0.470588rem;;
        right:0;
    }
    .best_getMoney{
        position: absolute;
        right:0;
        top:0.76471rem;
    }
    .best_getMoney div{
        float: left;
        line-height: 1;
        margin-right:0.588235rem;
        color: #FF9900;
        font-size: 0.8235rem;
    }
    .best_getMoney img{
        width:1.0588235rem;
        display: block;
        float: left;
        margin-top:-0.41176rem;
    }
</style>