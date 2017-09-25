<template >
    <div style="height: 100%" class="answer_join_voice wbg">

        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="8"  preUrl="./sign" nextUrl="./price" title="60''语音寄语"></v-answer-top-step>
        <div class="tip">此60''的语音寄语，将会出现在用户端的咨询师列表里，为了吸引用户向您咨询，请说出您对来访者的寄语！</div>

        <div class="audio" style="display: none">
            <div class="audio_btn">
                点击播放
            </div>
            <div class="minute">60"</div>
            <div class="clear"></div>
        </div>

        <div class="action_btn" >
            <div class="item"  @click="start()">
                <div class="audio_btn_in audio_begin"></div>
                <div class="txt" style=" color:#666">开始</div>
            </div>
        </div>

        <div class="voice_box" v-show="answering||preAnswer">
            <div class="bg"></div>
            <!--播放状态-->
            <div class="time_go "  v-if="!isAnswered" :class="{play_go:answering||playing}">
                <template v-if="!outTime">
                    <div class="playing play"></div>
                    <div class="playing play2"></div>
                    <div class="playing play3"></div>
                    <div class="playing">{{answerTime}}</div>
                </template>
            </div>

            <!--操作按钮-->
            <div class="action_btn" >


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
                        <div class="txt">完成</div>
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





    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                answering:false,
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
                this.clearTimeOut();
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


        },
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .answer_join_voice .tip{  margin:2rem     1.352941176470588rem; font-size: 1.058823529411765rem; line-height: 1.5; color:#666}
    .answer_join_voice .audio{ margin-left:  1.352941176470588rem !important;}




    .voice_box { position: fixed;  width: 100%; height: 100%; top:0; padding: 8.8233rem 0  }
    .voice_box .bg{background: rgba(0,0,0,0.7); width: 100%; height: 100%; position: fixed; top:0;    z-index: -1;}

    /*播放*/
    .answer_join_voice   .time_go{ position: relative;  height: 4.8rem; width: 4.8rem; margin: 0 auto; margin-top: 2rem;}
    .answer_join_voice  .time_go .playing { height: 4.8rem; width: 4.8rem; border-radius: 50%; background: #00b9e8; position: absolute; top:0;left:0; text-align: center; color:#fff; font-size: 1.764705882352941rem; line-height: 4.8rem;}
    .answer_join_voice   .play{
        opacity: 0.1;
        transform:scale(1.6,1.6);
    }
    .answer_join_voice   .play2{
        opacity: 0.3;
        transform:scale(1.4,1.4);
    }
    .answer_join_voice   .play3{
        opacity: 0.4;
        transform:scale(1.2,1.2);
    }

    .answer_join_voice  .play_go  .play{
        animation: playing 1s infinite;
        -webkit-animation: playing  1s infinite;
        animation-delay: -0.8s;
        -webkit-animation-delay: -0.8s;
    }
    .answer_join_voice  .play_go .play2{
        animation-delay: -0.6s;
        -webkit-animation-delay: -0.6s;
        animation: playing 1s infinite;
        -webkit-animation: playing 1s infinite;

    }
    .answer_join_voice  .play_go .play3{
        animation-delay: -0.4s;
        -webkit-animation-delay: -0.4s;
        animation: playing 1s infinite;
        -webkit-animation: playing 1s infinite;

    }
    @keyframes  playing {
        0%{
            transform:scale(0.9,0.9);
            opacity: 0.8;
        }
        100%{
            transform:scale(1.7,1.7);
            opacity: 0;
        }
    }






    .answer_join_voice  .times{ padding: 0.2rem 2.5rem; background: #fff}
    .answer_join_voice   .times .bg{ background: #163201; height: 2.94117647058823rem;  border-radius: 1.470588235294118rem ; }
    .answer_join_voice    .times .bg .in{ padding:  0.1470588235294118rem; }
    .answer_join_voice    .times .bg .go{ background: #69BA2D; height: 2.647058823529412rem; min-width:2.647058823529412rem;  width: 0; border-radius:1.323529411764706rem;      }
    .answer_join_voice  .times .last_time{ text-align: center; color:#666; margin-top: 0.5rem; font-size: 1.529411764705882rem;}
    .answer_join_voice  .action_btn{   padding: 3.529411764705882rem 1rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .answer_join_voice  .action_btn .item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center; color:#fff; font-size: 0.7647058823529412rem;
    }
    .answer_join_voice  .action_btn .item .txt{ margin-top: 0.6rem}
    .answer_join_voice  .audio_btn_in{ background: #fff; border-radius: 50%; height: 4.117647058823529rem; width: 4.117647058823529rem;
        -webkit-box-shadow:0 0 8px #69BA2D;box-shadow:0 0 8px #69BA2D;  position: relative; margin: 0 auto}
    .answer_join_voice .audio_btn_in:active{ background: rgba(105,186,45,0.1)
    }
    .answer_join_voice  .audio_btn_in:before{content: " " ; display: block ; position: absolute; top:50%; left:50% ;}
    .answer_join_voice   .audio_begin:before{ background:url(../../../images/audio_btn_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_join_voice   .audio_end:before{ background:url(../../../images/audio_btn_end.png)  no-repeat; background-size:  1.235294117647059rem; width:1.235294117647059rem;; height: 1.235294117647059rem;  margin-left: -0.6176470588235294rem; margin-top: -0.6176470588235294rem;  ;   }
    .answer_join_voice   .audio_play:before{ background:url(../../../images/audio_btn_play.png)  no-repeat; background-size: 1.323529411764706rem; width:1.323529411764706rem;; height: 1.529411764705882rem;  margin-left: -0.517647058823529rem; margin-top: -0.7647058823529412rem;  }
    .answer_join_voice   .audio_send:before{ background:url(../../../images/audio_btn_send.png)  no-repeat; background-size:  1.352941176470588rem; width:1.470588235294118rem;; height:1.411764705882353rem;  margin-left: -0.7352941176470588rem; margin-top: -0.7058823529411765rem;   }
    .answer_join_voice   .audio_cant_begin:before{ background:url(../../../images/audio_btn_cant_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
</style>