<template >
    <div style="height: 100%" class="answer_join_voice wbg message_box">

        <div v-title>入驻心理咨询师</div>
        <div class="tip">此60''的语音寄语，将会出现在用户端的咨询师列表里，为了吸引用户向您咨询，请说出您对来访者的寄语！</div>



        <div class="audio" :class="{playing:vPlaying,paused:vPaused}" >
            <div class="audio_btn" @click.stop="playV()" >
                <template v-if="!vPlaying&&!vPaused">点击播放</template>
                <template v-if="vPlaying">正在播放..</template>
                <template v-if="vPaused">播放暂停</template>
            </div>
            <div class="minute">{{detail.voiceLength}}"</div>
            <div class="clear"></div>
        </div>


        <div class="action_btn" v-if="detail.voiceMessageIdStatus!=0" >
            <div class="item"  @click="start()">
                <div class="audio_btn_in audio_begin"></div>
                <div class="txt" style=" color:#666">重录</div>
            </div>
        </div>

        <div class="applying" v-if="detail.voiceMessageIdStatus==0" >
             审核中..
        </div>

        <div class="voice_box" v-show="(answering||preAnswer)&&!finish">
            <div class="bg"></div>
            <!--播放状态-->
            <div class="time_go "  v-if="!finish" :class="{play_go:answering||playing}">
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


    export default {
        data() {
            return {
                answering:false,
                preAnswer:false,
                playing:false,
                answerTime:"00",
                timeOut:null,
                finish:false,
                detail:{},
                vPlaying:false,
                vPaused:false,
                localId:null,
                serviceId:null,
                voiceLength:0

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
                this.start();
            },
            send:function () {
                let _this=this;

                //发送到微信服务器并获取serverId
                xqzs.wx.voice.upload(this.localId,function (serverId) {
                    _this.serverId=serverId;

                    let data ={
                        mediaId:serverId,
                        voiceLength:_this.voiceLength,
                        expertId:cookie.get("expertId"),
                        userId:"_userId_"
                    }
                    _this.$http.post(web.API_PATH + "come/expert/modify/voice", data)
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {
                                this.finish=true;
                            }
                        });





                });

                this.clearTimeOut();

            },
            start:function () {
                console.log("startRecord")
//                开始录制
                let _this=this;
                _this.vPaused=true;
                _this.vPlaying=false;
                xqzs.voice.pause();
                this.clearTimeOut();
                this.answering=true;
                this.timeout()
                console.log("startRecordtimeout")
                xqzs.wx.voice.startRecord();
                xqzs.wx.voice.onRecordEnd(function (localId) {
                    _this.localId=localId;
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
                    _this.localId=localId;
                    _this._recordStop();
                });


            },
            _recordStop:function () {
                let _this = this;
                _this.clearTimeOut();
                _this.answering=false;
                _this.preAnswer=true;
            },
            getTime:function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },


            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            playV:function () {
                this.initVoice();
                let _this=this;
                if(_this.vPaused){  //暂停中也就是已经获取到且为当前音频
                    _this.vPaused=false;
                    _this.vPlaying=true;
                    xqzs.voice.play();
                    console.log("1")
                }else{
                    if(_this.vPlaying){    //播放中去做暂停操作
                        _this.vPaused=true;
                        _this.vPlaying=false;
                        xqzs.voice.pause();
                        console.log("2")
                    }else{     //重新打开播放
                        let expertId=  cookie.get("expertId");
                        this.getVoiceUrl(expertId,function (url) {
                            _this.vPaused=false;
                            _this.vPlaying=true;
                            xqzs.voice.play(url);
                            console.log("3")
                        })
                    }

                }

            },
            /**
             * 获取音频地址
             * callFun(url) 回调 用户播放
             */
            getVoiceUrl:function (expertId,callFun) {
                let _this=this;
                this.showLoad=true;
                this.$http.get(web.API_PATH + "come/expert/voice/message/"+expertId)
                    .then(function (bt) {
                        _this.showLoad=false;
                        if (bt.data && bt.data.status == 1) {
                            if(typeof (callFun) =="function"){
                                callFun(bt.data.data)
                            }
                        }
                    });
            },



//            timeout:function (play) {
//                let _this=this;
//                _this.timeOut =    setTimeout(function () {
//                    let time = parseInt(_this.answerTime);
//                    if(play==true){  //试听
//                        if(time>0){
//                            time = time -1 ;
//                            if(time<10)time="0"+time
//                            _this.answerTime = time ;
//                            _this.timeout(play);
//                        }else{
//                            _this.playing=false;
//                        }
//                    }else{
//                        if(time<60){
//                            time = time +1 ;
//                            if(time<10)time="0"+time
//                            _this.answerTime = time ;
//                            _this.timeout();
//                        }else{
//                            _this.stop();
//                        }
//                    }
//
//                },1000)
//
//            },
//            clearTimeOut:function () {
//                let _this=this;
//                if(_this.timeOut!==null){
//                    clearTimeout(_this.timeOut);
//                }
//            },
//            reStart:function () {
//                this.answerTime="00";
//                this.preAnswer=false;
//                this.clearTimeOut();
//                this.start()
//            },
//            send:function () {
//                this.clearTimeOut();
//                this.answering=false;
//                this.finish=true;
//            },
//            start:function () {
//                this.clearTimeOut();
//                this.answering=true;
//                this.timeout()
//            },
//            play:function () {
//                this.clearTimeOut();
//                this.playing=true;
//                this.timeout(true);
//            },
//            stop:function () {
//                this.clearTimeOut();
//                this.answering=false;
//                this.preAnswer=true;
//            }
        },
        mounted: function () {
            let _this=this ;
            let expertId= cookie.get("expertId")
            this.$http.get(web.API_PATH + 'come/expert/query/detail/for/edit/'+expertId + "/_userId_" ).then(function (data) {//es5写法
                if (data.body.status == 1) {
                  _this.detail=data.body.data;
                  if( _this.detail.voiceMessageIdStatus==0){
                      //0 审核中  1 通过  2 未通过审核
                  }

                }
            }, function (error) {

            });
            xqzs.wx.setConfig(_this);
            xqzs.voice.audio=null;

        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        }
    }
</script>
<style>
    .message_box .audio{text-align: center}
    .message_box .audio .audio_btn {
        display: inline-block;
        float: none;
    }
    .message_box .audio .minute {
        display: inline-block;
        float: none;
    }
    .answer_join_voice .tip{padding:4.41176471rem  1.41176471rem 5.588235rem 1.41176471rem; font-size: 1.058823529411765rem; line-height: 1.5; color:#666}
    .answer_join_voice .audio{ margin-left:  1.352941176470588rem !important;text-align: center}




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
    .answer_join_voice  .audio_btn_in:before{content: " " ; display: block ; position: absolute; top:50%; left:50% ;}
    .answer_join_voice   .audio_begin:before{ background:url(../../../images/audio_btn_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_join_voice   .audio_end:before{ background:url(../../../images/audio_btn_end.png)  no-repeat; background-size:  1.235294117647059rem; width:1.235294117647059rem;; height: 1.235294117647059rem;  margin-left: -0.6176470588235294rem; margin-top: -0.6176470588235294rem;  ;   }
    .answer_join_voice   .audio_play:before{ background:url(../../../images/audio_btn_play.png)  no-repeat; background-size: 1.323529411764706rem; width:1.323529411764706rem;; height: 1.529411764705882rem;  margin-left: -0.517647058823529rem; margin-top: -0.7647058823529412rem;  }
    .answer_join_voice   .audio_send:before{ background:url(../../../images/audio_btn_send.png)  no-repeat; background-size:  1.352941176470588rem; width:1.470588235294118rem;; height:1.411764705882353rem;  margin-left: -0.7352941176470588rem; margin-top: -0.7058823529411765rem;   }
    .answer_join_voice   .audio_cant_begin:before{ background:url(../../../images/audio_btn_cant_begin.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .applying{ text-align: center; color:#09bb07; margin-top: 50px}
</style>