<template >
    <div style="height: 100%" class="answer_answer_box wbg">

        <div v-title>回答</div>
        <!--问题详情-->
        <div class="answer" >
            <div class="img"><img
                    src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"></div>
            <div class="info">
                <div class="names"><span>j**</span> </div>
                <div class="type"><span>在哪方面：</span>情感困惑</div>
                <div class="content">六年的感情真的败给时间了，男朋友还是选择分手，说他厌恶我了。分手后我特别害怕早上醒来和入睡前的胡思乱想，而且一到上午就会变得好无力，不知所措怎么办呢？</div>
                <div class="last_time">5分钟前</div>
                <div class="clear"></div>
                <div class="audio" v-if="isAnswered">
                    <div class="audio_btn">
                        点击播放
                    </div>
                    <div class="minute">60"</div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="price">酬金 <span>￥13.14</span></div>

            <div class="clear"></div>
        </div>

        <!--播放状态不用-->
        <div class="times" style="display: none">
            <div class="bg">
                <div class="in"><div class="go"></div></div>
            </div>
            <div class="last_time">00"</div>
        </div>


        <!--播放状态-->
        <div class="time_go "  v-if="!isAnswered" :class="{play_go:answering||playing}">
            <template v-if="!outTime">
            <div class="playing play"></div>
            <div class="playing play2"></div>
            <div class="playing">{{answerTime}}</div>
            </template>
        </div>

        <!--操作按钮-->
        <div class="action_btn" v-if="!isAnswered">
            <div class="item" v-if="!outTime&&!answering&&!preAnswer" @click="start()">
                <div class="audio_btn_in audio_begin"></div>
                <div class="txt">开始</div>
            </div>

            <template v-if="preAnswer">
            <div class="item" @click="play()">
                <div class="audio_btn_in audio_play"></div>
                <div class="txt">试听</div>
            </div>
            <div class="item" @click="reStart()">
                <div class="audio_btn_in audio_begin"></div>
                <div class="txt">重录</div>
            </div>
            <div class="item" @click="send()">
                <div class="audio_btn_in audio_send"></div>
                <div class="txt">发送</div>
            </div>
            </template>
            <div class="item" v-if="answering" @click="stop()">
                <div class="audio_btn_in audio_end"></div>
                <div class="txt">停止</div>
            </div>
            <div class="item" v-if="outTime">
                <div class="audio_btn_in audio_cant_begin"></div>
                <div class="txt">超时</div>
            </div>
        </div>


    </div>
</template>

<script type="es6">

    export default {
        data() {
            return {
                isAnswered:false,
                answering:false,
                outTime:false,
                preAnswer:false,
                playing:false,
                answerTime:"00",
                timeOut:null

            }
        },
        methods: {
            timeout:function (play) {
                let _this=this;
                _this.timeOut =    setTimeout(function () {
                    let time = parseInt(_this.answerTime);
                    if(play==true){  //试听
                        if(time>0){
                            time = time -1 ;
                            if(time<10)time="0"+time
                            _this.answerTime = time ;
                            _this.timeout(play);
                        }else{
                            _this.playing=false;
                        }
                    }else{
                        if(time<60){
                            time = time +1 ;
                            if(time<10)time="0"+time
                            _this.answerTime = time ;
                            _this.timeout();
                        }else{
                            _this.stop();
                        }
                    }

                },1000)

            },
            clearTimeOut:function () {
                let _this=this;
                if(_this.timeOut!==null){
                    clearTimeout(_this.timeOut);
                }
            },
            reStart:function () {
                this.answerTime="00";
                this.preAnswer=false;
                this.clearTimeOut();
                this.start()
            },
            send:function () {
                this.clearTimeOut();
                this.isAnswered=true;
            },
            start:function () {
                this.clearTimeOut();
                this.answering=true;
                this.timeout()
            },
            play:function () {
                this.playing=true;
                this.timeout(true);
            },
            stop:function () {
                this.clearTimeOut();
                this.answering=false;
                this.preAnswer=true;
            }
        },

        mounted: function () {


        }


    }
</script>
<style>
    .answer_answer_box .answer{ background: #fff; padding:0.8823529411764706rem;  position: relative }
   .answer_answer_box .answer .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; }
   .answer_answer_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%}
   .answer_answer_box .answer .info{ float:left; margin-left:0.8823529411764706rem; width: 81% }
   .answer_answer_box .answer .info .names{ font-size: 0.7058823529411765rem;  color:#666; margin-bottom: 0.2rem; width: 14.11764705882353rem; line-height: 2.5rem}
   .answer_answer_box .answer .info .content{  font-size: 0.8823529411764706rem; color:#333; line-height:1.176470588235294rem; margin-bottom: 0.4rem}
   .answer_answer_box .answer .info .last_time{ float:left;font-size:0.7647058823529412rem;color:#666; width: 6rem;
    }
   .answer_answer_box .answer .info .type{ font-size: 0.7058823529411765rem; color:#333;margin-bottom: 0.4rem}
    .answer_answer_box .answer .info .type span{ color:#666}
   .answer_answer_box .answer .price{ font-size: 0.8823529411764706rem;color:#535353; text-align: right; width: 7rem; position: absolute; right:0.8823529411764706rem; top:0.8823529411764706rem ;}
    .answer_answer_box .answer  .price span{ color:#FF9900; font-size: 1.058823529411765rem;}
    .answer_answer_box  .btns { text-align: center; width: 90%; margin: 0 auto ;}
    .answer_answer_box    .btns .btn{ border-radius: 1.2rem; height: 2.4rem;line-height: 2.4rem; text-align: center; background: #0BB20C;   color:#fff; font-size:0.8823529411764706rem; width: 23%; display: inline-block; }
    .answer_answer_box .answer .info  .audio{ margin-top: 0.6rem;}

    .answer_answer_box   .time_go{ position: relative;  height: 4.8rem; width: 4.8rem; margin: 0 auto; margin-top: 2rem;}
    .answer_answer_box  .time_go .playing { height: 4.8rem; width: 4.8rem; border-radius: 50%; background: #00b9e8; position: absolute; top:0;left:0; text-align: center; color:#fff; font-size: 1.764705882352941rem; line-height: 4.8rem;}
    .answer_answer_box  .time_go .playing:first-child{ width: 7.6rem; height: 7.6rem;opacity: 0.2; top:-1.4rem; left:-1.4rem;}
    .answer_answer_box  .time_go .playing:nth-child(2){ width: 6rem; height: 6rem;opacity: 0.5;top:-0.6rem; left:-0.6rem;}
    .answer_answer_box  .play_go  .play{
        animation: playing .9s infinite;
        -webkit-animation: playing .9s infinite;
        animation-direction:alternate;
        -webkit-animation-direction:alternate; /* Safari 和 Chrome */
    }
    .answer_answer_box  .play_go .play2{
        animation: playing 0.9s infinite;
        -webkit-animation: playing 0.9s infinite;
        animation-direction:alternate;
        -webkit-animation-direction:alternate; /* Safari 和 Chrome */
    }
    @keyframes  playing {
        0%{
            transform:scale(0.65,0.65);
            opacity: 0.5;
        }
        100%{
            transform:scale(1.14,1.14);
            opacity: 0.1;
        }
    }




    .answer_answer_box  .times{ padding: 0.2rem 2.5rem; background: #fff}
    .answer_answer_box   .times .bg{ background: #163201; height: 2.94117647058823rem;  border-radius: 1.470588235294118rem ; }
    .answer_answer_box    .times .bg .in{ padding:  0.1470588235294118rem; }
    .answer_answer_box    .times .bg .go{ background: #69BA2D; height: 2.647058823529412rem; min-width:2.647058823529412rem;  width: 0; border-radius:1.323529411764706rem;      }
    .answer_answer_box  .times .last_time{ text-align: center; color:#666; margin-top: 0.5rem; font-size: 1.529411764705882rem;}
    .answer_answer_box  .action_btn{ background: #fff; padding: 3.529411764705882rem 1rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .answer_answer_box  .action_btn .item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center; color:#666; font-size: 0.7647058823529412rem;
    }
    .answer_answer_box  .action_btn .item .txt{ margin-top: 0.6rem}
    .answer_answer_box  .audio_btn_in{ background: #fff; border-radius: 50%; height: 4.117647058823529rem; width: 4.117647058823529rem;
        -webkit-box-shadow:0 0 8px #69BA2D;box-shadow:0 0 8px #69BA2D;  position: relative; margin: 0 auto}
    .answer_answer_box .audio_btn_in:active{ background: rgba(105,186,45,0.1)
    }
    .answer_answer_box  .audio_btn_in:before{content: " " ; display: block ; position: absolute; top:50%; left:50% ;}
    .answer_answer_box   .audio_begin:before{ background:url(../../images/audio_btn_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_answer_box   .audio_end:before{ background:url(../../images/audio_btn_end.png)  no-repeat; background-size:  1.235294117647059rem; width:1.235294117647059rem;; height: 1.235294117647059rem;  margin-left: -0.6176470588235294rem; margin-top: -0.6176470588235294rem;  ;   }
    .answer_answer_box   .audio_play:before{ background:url(../../images/audio_btn_play.png)  no-repeat; background-size: 1.323529411764706rem; width:1.323529411764706rem;; height: 1.529411764705882rem;  margin-left: -0.517647058823529rem; margin-top: -0.7647058823529412rem;  }
    .answer_answer_box   .audio_send:before{ background:url(../../images/audio_btn_send.png)  no-repeat; background-size:  1.352941176470588rem; width:1.470588235294118rem;; height:1.411764705882353rem;  margin-left: -0.7352941176470588rem; margin-top: -0.7058823529411765rem;   }
    .answer_answer_box   .audio_cant_begin:before{ background:url(../../images/audio_btn_cant_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
</style>