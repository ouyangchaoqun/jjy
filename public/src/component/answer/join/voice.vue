<template >
    <div style="height: 100%" class="answer_join_voice wbg">

        <div v-title>入驻心理咨询师</div>
        <div class="tipc">此至少10秒的语音寄语，将展示给来访者，请录制您对来访者的寄语！</div>



        <div class="audio" :class="{playing:vPlaying,paused:vPaused}" v-if="finish" >
            <div class="audio_btn" @click.stop="playV()" >
                <template v-if="!vPlaying&&!vPaused">点击播放</template>
                <template v-if="vPlaying">正在播放..</template>
                <template v-if="vPaused">播放暂停</template>
                <div class="second">{{voiceLength}}”</div>
            </div>

            <div class="clear"></div>
        </div>




        <div class="addPlayBox" v-if="preAnswer&&!finish" >

            <!--操作按钮-->

            <div class="action_btn" >

                <div class="item" >
                    <div class="re_start" @click="reStart()">重录</div>
                </div>
                <div class="item" style="flex: 2" >
                </div>


                <div class="item">
                    <div class="send" :class="{cant_send:voiceLength<MIN_VOICE_LENGTH}" @click="send()">完成</div>
                </div>


            </div>
        </div>
        <div class="record_voice_box" v-if="!finish">
            <div class="time_in">
                <div>{{answerTime}}"</div>

            </div>
            <div class="time_in_tip">至少录制10秒</div>
            <div class="circle">
                <div class="pie_left">
                    <div class="left"></div>
                </div>
                <div class="pie_right">
                    <div class="right"></div>
                </div>

                <div class="gg"></div>
                <div class="move">
                    <div class="qq"></div>
                </div>
                <div class="mask"><i class="start"></i></div>

            </div>
            <div class="tip">录制</div>
        </div>




        <div class="over_nor_btn" v-if="!finish">保存</div>
        <div class="over_nor_btn over_per_btn" v-if="finish" @click="goJoinmore()">保存</div>

    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                answering2:false,
                preAnswer:false,
                playing:false,
                answerTime:"00",
                timeOut:null,
                finish:false,

                vPlaying:false,
                vPaused:false,
                localId:null,
                serviceId:null,
                voiceLength:0,
                MIN_VOICE_LENGTH:10
            }
        },

        methods: {
            goJoinmore:function () {
                let _this=this;
                let data={
                    userId:"_userId_",
                    expertId:cookie.get("expertId"),
                    mediaId:_this.serviceId,
                    voiceLength:_this.voiceLength
                };
                _this.$http.post(web.API_PATH + 'come/expert/modify/voice', data)
                    .then(
                        (response) => {
                            _this.$router.replace('/answer/join/joinmore')
                        }
                    );


            },
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
                            _this.voiceLength=time;
                            if(time<10)time="0"+time
                            _this.answerTime = time ;
                            _this.timeout();
                        }else{
                            _this.voiceLength=time;
                            _this.stop();
                        }

                    }

                },1000);
                console.log( _this.answerTime);

            },

            clearTimeOut:function () {
                let _this=this;
                if(_this.timeOut!==null){
                    clearTimeout(_this.timeOut);
                }
            },
            reStart:function () {
                //重新开始录制
                this.answerTime="00";
                this.voiceLength=0;
                this.preAnswer=false;
                if(this.playing)xqzs.wx.voice.stopPlay( this.localId);
                this.playing=false;

                this.localId=null;
                myVideo.start(this.start);
            },
            send:function () {
                let _this=this;
                if(_this.voiceLength<_this.MIN_VOICE_LENGTH){
                    return ;
                }
                //发送到微信服务器并获取serverId
                xqzs.wx.voice.upload(_this.localId,function (serverId) {
                    _this.finish=true;
                    cookie.set("mediaId",serverId);
                    cookie.set("voiceLength",_this.voiceLength)

                });

                this.clearTimeOut();

            },
            start:function () {

//                开始录制
                let _this=this;
                _this.vPaused=true;
                _this.vPlaying=false;
                xqzs.voice.pause();
                this.clearTimeOut();
                this.answering2=true;
                this.timeout()
                console.log("startRecordtimeout")
                xqzs.wx.voice.startRecord();
                xqzs.wx.voice.onRecordEnd(function (localId) {
                    _this.localId=localId
                    xqzs.localdb.set("voice_localId",localId);
                    _this._recordStop();
                });

            },
            play:function () {//试听
                let _this = this;
                if(this.playing){  //在播放中则暂停
                    if(_this.localId!=null) {
                        _this.clearTimeOut();
                        xqzs.wx.voice.pausePlay(_this.localId);
                        console.log("pausePlay")
                        this.playing = false;
                    }
                }else{
                    if(_this.localId!=null){
                        this.clearTimeOut();
                        xqzs.wx.voice.startPlay(_this.localId);
                        this.playing=true;
                        this.timeout(true);
                        xqzs.wx.voice.onPlayEnd(function () {
                            console.log("onPlayEnd")
                            if(_this.playing)_this.clearTimeOut();
                            _this.playing = false;

                            if(_this.voiceLength<10){
                                _this.answerTime = "0"+_this.voiceLength
                            }else{
                                _this.answerTime = ""+_this.voiceLength
                            }
                        })
                    }
                }
            },
            stop:function () { //停止录制
                let _this = this;


                xqzs.wx.voice.stopRecord(function (localId) {
                    _this.localId = localId;
                    xqzs.localdb.set("voice_localId", localId);
                    _this._recordStop();
                });

            },
            _recordStop:function () {
                let _this = this;
                _this.clearTimeOut();
                _this.answering2=false;
                _this.preAnswer=true;
            },
            getTime:function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },
            playV:function () {
                let _this=this;
                if(_this.vPaused){  //暂停中也就是已经获取到且为当前音频
                    _this.vPaused=false;
                    _this.vPlaying=true;
                    xqzs.wx.voice.startPlay(_this.localId)
                    console.log("1")
                }else{
                    if(_this.vPlaying){    //播放中去做暂停操作
                        _this.vPaused=true;
                        _this.vPlaying=false;
                        xqzs.wx.voice.pausePlay(_this.localId)
                        console.log("2")
                    }else{     //重新打开播放
                        _this.vPaused=false;
                        _this.vPlaying=true;
                        xqzs.wx.voice.startPlay(_this.localId)
                        console.log("3")
                    }

                }

            }
        },
        mounted: function () {

            xqzs.wx.setConfig(this);
            let _this= this;
            myVideo.config({obj:$('.circle')}).init(_this.start,_this.stop,_this.play,_this.play);
        },
        components: {
            "v-answer-top-step": answerTopStep
        },
        beforeDestroy:function () {
            this.clearTimeOut()
        },


    }
</script>
<style>
    .answer_join_voice{ width: 100%; overflow: hidden}
    .answer_join_voice .tipc{  margin:1.76471rem    1.176470588235294rem; font-size: 0.7647058823529412rem; line-height: 1.5; color:rgba(36,37,61,0.5)}
    .answer_join_voice .audio{ margin-left:  15%  !important ; margin-top: 8rem;}
.pt3{ padding-top: 9rem !important}



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
    .answer_join_voice    .times .bg .go{ background: #09bb07; height: 2.647058823529412rem; min-width:2.647058823529412rem;  width: 0; border-radius:1.323529411764706rem;      }
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
        -webkit-box-shadow:0 0 8px #09bb07;box-shadow:0 0 8px #09bb07;  position: relative; margin: 0 auto}
    .answer_join_voice .audio_btn_in:active{ background: rgba(105,186,45,0.1)
    }

    .answer_join_voice .audio_send.not { background: #b1b1b1;}
    .answer_join_voice .audio_send.not:active{ background: #b1b1b1;}


    .answer_join_voice  .audio_btn_in:before{content: " " ; display: block ; position: absolute; top:50%; left:50% ;}
    .answer_join_voice   .audio_begin:before{ background:url(../../../images/audio_btn_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_join_voice   .audio_end:before{ background:url(../../../images/audio_btn_end.png)  no-repeat; background-size:  1.235294117647059rem; width:1.235294117647059rem;; height: 1.235294117647059rem;  margin-left: -0.6176470588235294rem; margin-top: -0.6176470588235294rem;  ;   }
    .answer_join_voice   .audio_play:before{ background:url(../../../images/audio_btn_play.png)  no-repeat; background-size: 1.323529411764706rem; width:1.323529411764706rem;; height: 1.529411764705882rem;  margin-left: -0.517647058823529rem; margin-top: -0.7647058823529412rem;  }
    .answer_join_voice   .audio_send:before{ background:url(../../../images/audio_btn_send.png)  no-repeat; background-size:  1.352941176470588rem; width:1.470588235294118rem;; height:1.411764705882353rem;  margin-left: -0.7352941176470588rem; margin-top: -0.7058823529411765rem;   }
    .answer_join_voice   .audio_cant_begin:before{ background:url(../../../images/audio_btn_cant_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_join_voice .addPlayBox{position: absolute;bottom:4rem;width:100%;}
    .answer_join_voice  .record_voice_box{ bottom:2.5rem;}
</style>