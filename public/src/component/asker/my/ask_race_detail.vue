<template id="rob_problem">
    <div class="rob_problem">
        <div v-title>问题详情</div>
        <div class="my_problem_detail">
            <div class="problem_detail_header">
                问题类型:  <div>{{detail.title}}</div>
                <div>赏金￥{{detail.price}}</div>
            </div>
            <div class="problem_detail_content">
                {{detail.question}}
            </div>

            <!--const QUESTION_CONTINUE = 0;//问题还在进行-->
            <!--const QUESTION_FINISH = 1;//问题结束有最佳答案-->
            <!--const QUESTION_FINISH_NOT_BEST = 2;//问题结束但是没有最佳答案-->
            <!--const QUESTION_NOT_PAY = 3;//问题还未支付-->
            <!--超时未解答-->
            <div class="rob_status_box" v-if="detail.questionStatus==2&&detail.answerCount==0">
                <div>未解答</div>
                <div>48小时内无人抢答，赏金已全额退还</div>
            </div>
            <!--正在进行中-->
            <div class="rob_status_box"  v-if="detail.questionStatus==0">
                <div>还{{formatTimeLastText(detail.endTime)}}</div>
                <div>已有{{detail.answerCount}}人抢答，可以选择一个最佳答案，其答主将获得全部赏金，且该回答将产生偷偷听收入</div>
            </div>
            <div class="rob_status_box" v-if="detail.questionStatus==2&&detail.answerCount!=0">
                <div>已解答</div>
                <div>共有{{detail.answerCount}}人抢答，抢答者平分赏金。</div>
            </div>
            <div class="rob_status_box" v-if="detail.questionStatus==1">
                <div>已解答</div>
                <div>共有{{detail.answerCount}}人抢答，{{bestAnswer.expertNickName}}的回答被选为最佳回答。</div>
            </div>
            <ul class="rob_lists">
                <li v-for="(item,index) in detail.answers">
                    <div class="rob_box_top">
                        <img :src="item.expertFaceUrl" alt="">
                        <div>{{item.expertNickName}}</div>
                    </div>
                    <div class="rob_answer">
                        <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                            <div class="audio_btn" @click.stop="play(index)">
                                <template v-if="!item.playing&&!item.paused">点击播放</template>
                                <template v-if="item.playing">正在播放..</template>
                                <template v-if="item.paused">播放暂停</template>
                                <div class="second">{{item.voiceLength}}”</div>
                            </div>

                            <div class="clear"></div>
                        </div>


                        <!--选择最佳答案选框-->
                        <div v-if="detail.bestAnswerId==0&&detail.questionStatus==0" @click="selectBestAnswerId(item)" class="best_answer" :class='[{best_answer_true:selBestAnswerId==item.answerId}]'></div>
                        <!--最佳确定-->
                        <div class="best_getMoney" v-if="detail.bestAnswerId!=0&&detail.questionStatus!=0&&detail.bestAnswerId==item.answerId" >
                            <div>￥{{detail.price}}</div>
                            <img src="../../../images/asker/getmoney.png" alt="">
                        </div>
                        <!--未选择最佳平分赏金-->
                        <div class="deuce_money_box" v-if="detail.bestAnswerId==0&&detail.questionStatus==2">
                            ￥{{detail.price/detail.answerCount}}
                        </div>
                    </div>
                    <div class="problem_answer_bottom rob_answer_bottom">
                        <div class="problem_answer_time">{{formatDateText(item.addTime)}}</div>
                        <div class="problem_answer_zan">
                            <div><span>听过</span><span>{{item.ListenTimes}}</span></div>
                            <div v-if="detail.bestAnswerId==item.answerId"><span>收入分成</span><span>￥{{formatPrice(item.inCome)}}</span></div>
                            <div @click="like(index)" class="good_care" :class="{good_cared:item.isLiked}"><span> {{item.likeTimes}}</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="submit_best_answer" v-if="selBestAnswerId!=0&&isOver">
            已选择最佳答案，确定加入偷偷听分成
            <div class="submit_btn" @click="setBestAnswerId()">完成快问</div>
        </div>
        <!--弹出层-->
        <div class="success_set_best_answer_dialog" style="display: none;" >
            <div class="best_dialog">
                <div class="best_dialog_header">
                    <img src="../../../images/asker/bestan.png" alt="">
                    <div v-if="selBestAnswer">{{selBestAnswer.expertNickName}}</div>
                </div>
                <div class="best_dialog_html">被选为最佳回答并获得奖金。并且与Ta一起参与偷听分成哦</div>
                <div class="best_dialog_fb" >知道了</div>
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

                detail:{},
                selBestAnswerId:0,
                selBestAnswer:null,
                bestAnswer:{},
                isOver:true


            }
        },
        mounted: function () {

            this.id= parseInt(this.$route.query.id);
            this.getDetail();
            xqzs.wx.setConfig(this);
        },
        methods: {
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
            },
            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            play:function (index) {
                this.initVoice();
                let _this=this;
                console.log(_this.detail.answers)
                let list = _this.detail.answers;
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.detail.answers,index,list[index])
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.detail.answers,i,list[i]);
                    }
                }
                let item= this.detail.answers[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    list[index].paused=false;
                    list[index].playing=true;
                    _this.$set(_this.list,index,list[index])
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        list[index].paused=true;
                        list[index].playing=false;
                        _this.$set(_this.detail.answers,index,list[index])
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        let answerId= item.answerId;
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.detail.answers,index,list[index])
                        })
                    }

                }

            },
            /**
             * 获取音频地址
             * callFun(url) 回调 用户播放
             */
            getVoiceUrl:function (answerId,callFun) {
                let _this=this;
                this.showLoad=true;
                this.$http.put(web.API_PATH + "come/listen/get/voice/_userId_/"+answerId, {})
                    .then(function (bt) {
                        _this.showLoad=false;
                        if (bt.data && bt.data.status == 1) {
                            if(typeof (callFun) =="function"){
                                callFun(bt.data.data.path)
                            }
                        }
                    });
            },

            like:function (index) {
                let  item = this.detail.answers[index];
                if(item.isLiked){
                    xqzs.weui.tip("已经点赞");
                    return ;
                }
                let _this=this;
                this.$http.put(web.API_PATH + "come/user/like/answer/_userId_/"+item.answerId, {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            item.isLiked=1;
                            item.likeTimes=item.likeTimes+1;
                            _this.$set(_this.detail.answers,index,item);
                        }
                    });
            },
            setBestAnswerId:function () {
                let _this=this;
                this.$http.post(web.API_PATH + "come/user/set/question/best/answer", {userId:"_userId_",answerId:this.selBestAnswerId, questionId: this.id})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {

                            _this.detail.bestAnswerId=_this.selBestAnswerId;
                            _this.detail.questionStatus=1

                             xqzs.weui.dialogCustom($(".success_set_best_answer_dialog").html());
                             $(".best_dialog_fb").click(function () {
                                 xqzs.weui.dialogClose();

                                 _this.isOver = false
                             })
                             
                        }
                    });
            },
            selectBestAnswerId:function (answer) {
                let _this=this;
                if( this.selBestAnswerId==answer.answerId){
                    xqzs.weui.dialog("","确定不选择中" + answer.expertNickName+"了？",function () {
                    },function () {
                        _this.selBestAnswerId=0;
                    })
                }
                this.selBestAnswer=answer;
                this.selBestAnswerId=answer.answerId;
            },
            formatDateText:function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },
            formatTimeLastText:function (time) {
                return xqzs.dateTime.getTimeFormatLastText(time)
            },
            getDetail:function () {
                let _this= this;
                _this.$http.get(web.API_PATH + 'come/user/query/question/_userId_/'+this.id ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        console.log(data.body.data.data)
                        _this.detail= data.body.data.data;
                        for(let i=0;i<_this.detail.answers.length;i++){
                            if(_this.detail.answers[i].isBestAnswer){
                                _this.bestAnswer=_this.detail.answers[i];
                            }
                        }
                    }
                }, function (error) {
                });

            },


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
    .submit_best_answer{ background: #fff; height:2.588235294117647rem; line-height: 2.588235294117647rem;  color:rgba(36,37,61,1); font-size: 0.76471rem; position: fixed; bottom:0;left:0; width: 100%;box-shadow: 2px 0px 10px rgba(0,0,0,0.3);padding-left:0.5rem;}
    .submit_btn { position: absolute;right:1.176471rem; top:50%; height: 1.588235rem;line-height: 1.588235rem; text-align: center; width: 4.71rem;border:0.0294rem solid rgba(252,66,42,1);color:rgba(252,66,42,1);border-radius: 0.88235rem;margin-top:-0.794rem;}
    .submit_btn:active{ background: #FE7301;color:#fff;}
    .rob_problem{
        background: #fff;
    }
    .rob_status_box{
        padding:0 0.88235rem;
        color: rgba(36,37,61,0.5);
        font-size: 0.70588235rem;
        border-bottom: 0.41176471rem solid #f4f4f8;
    }
    .rob_status_box>div:nth-of-type(1){
        margin-bottom: 0.2rem;
        line-height: 1.0588235rem;
        padding-top: 0.5rem;
    }
    .rob_status_box>div:nth-of-type(2){
        margin-bottom: 0.6rem;
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
        color: rgba(36,37,61,1);
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
        color: rgba(36,37,61,0.5);
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
        color: rgba(36,37,61,1);
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
        color: rgba(36,37,61,0.7);
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
        color: rgba(36,37,61,0.7);
        font-size: 0.76471rem;
        border-radius: 5px;
        z-index: 10001;
    }
    .best_dialog_header{
        position: relative;
        color: rgba(36,37,61,1);
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
        color: #FE7301;
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