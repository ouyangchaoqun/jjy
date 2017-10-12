<template >
    <div style="height: 100%" class="answer_answer_box wbg">

        <div v-title>回答</div>
        <!--问题详情-->
        <div class="answer" >
            <div class="img"><img :src="detail.faceUrl"></div>
            <div class="info">
                <div class="names"><span>{{detail.nickname}}</span> </div>
                <div class="type"><span>在哪方面：</span>{{detail.title}}</div>
                <div class="content">{{detail.content}}</div>
                <div class="last_time">{{getTime(detail.addTime)}}</div>
                <div class="clear"></div>

                <div class="audio" :class="{playing:detail.playing,paused:detail.paused}" v-if="isAnswered&&answerId">
                    <div class="audio_btn" @click.stop="play()" >
                        <template v-if="!detail.playing&&!detail.paused">点击播放</template>
                        <template v-if="detail.playing">正在播放..</template>
                        <template v-if="detail.paused">播放暂停</template>
                    </div>
                    <div class="minute">{{voiceLength}}"</div>
                    <div class="clear"></div>
                </div>


            </div>
            <div class="price">酬金 <span>￥{{detail.price}}</span></div>

            <div class="clear"></div>
        </div>





        <!--播放状态-->
        <div class="addPlayBox">
            <div class="time_go"  v-if="!isAnswered" :class="{play_go:answering||playing}">
                <template v-if="!outTime">
                    <div class="playing play"></div>
                    <div class="playing play2"></div>
                    <div class="playing play3"></div>
                    <div class="playing">{{answerTime}}</div>
                </template>
            </div>
            <!--操作按钮-->
            <div class="action_btn" v-if="!isAnswered">
                <div class="item" v-if="!isOver">
                    <div class="audio_play">试听</div>
                </div>
                <div class="item" v-if="isOver">
                    <div class="audio_play overStyle" @click="reStart()">重录</div>
                </div>
                <div class="item" style="flex: 2" v-if="!outTime&&!answering&&!isOver" @click="start()">
                    <div class="audio_btn_in audio_begin"></div>
                    <div class="txt">点击开始录制</div>
                </div>
                <div class="item" style="flex:2" v-if="answering&&!isOver" @click="stop()">
                    <div class="audio_btn_in audio_end"></div>
                    <div class="txt">录音中，再次点击结束录音</div>
                </div>
                <div class="item" style="flex: 2" v-if="isOver" @click="send()">
                    <div class="audio_btn_in audio_send">
                        <img src="../../images/audio_btn_send1.png" alt="">
                    </div>
                    <div class="txt">发布</div>
                </div>

                <div class="item" v-if="!isOver" >
                    <div class="audio_send">发布</div>
                </div>
                <div class="item" v-if="isOver">
                    <div class="audio_send overStyle" @click="play()">试听</div>
                </div>


                <div class="item" v-if="outTime">
                    <div class="audio_btn_in audio_cant_begin outTimeStyle"></div>
                    <div class="txt">已超时</div>
                </div>
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
//                preAnswer:false,
                playing:false,
                answerTime:"00",
                timeOut:null,
                questionId:null,
                detail:{},
                str:null,
                localId:null,
                serviceId:null,
                voiceLength:0,
                isOver:false
            }
        },
        mounted: function () {
            let _this=this;
            this.questionId = this.$route.query.askId
            this.$http.get(web.API_PATH + 'come/expert/question/detail/'+this.questionId).then(function (data) {//es5写法
                if (data.body.status == 1) {
                    console.log(data)
                    this.detail = data.data.data;
                }
            }, function (error) {

            });
            xqzs.wx.setConfig(_this);




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
//                this.preAnswer=false;
                if(this.playing)xqzs.wx.voice.stopPlay( this.localId);
                this.playing=false;

                this.localId=null;
                this.start();
            },
            send:function () {
                let _this=this;
                if(this.playing)xqzs.wx.voice.stopPlay( this.localId);
                //发送到微信服务器并获取serverId
                xqzs.wx.voice.upload(this.localId,function (serverId) {
                    _this.serverId=serverId;

                    let data ={
                        mediaId:serverId,
                        voiceLength:_this.voiceLength,
                        expertId:cookie.get("expertId"),
                        userId:"_userId_"
                    }
                    _this.$http.put(web.API_PATH + "come/expert/answer/"+_this.questionId, data)
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {
                                this.isAnswered=true;
                                this.answerId= bt.data.data.answerId;
                            }else if(bt.data.status==910003){
                                window.history.go(-1);

                            }
                        });





                });

                this.clearTimeOut();

            },
            start:function () {
                console.log("startRecord")
//                开始录制
                let _this=this;
                if(this.playing)xqzs.wx.voice.stopPlay( this.localId);
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
                        this.playing = false;
                        xqzs.wx.voice.pausePlay(_this.localId);
                        console.log("pausePlay")

                    }
                }else{
                    if(_this.localId!=null){
                        this.clearTimeOut();
                        this.playing=true;
                        this.timeout(true);
                        xqzs.wx.voice.startPlay(_this.localId);
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
                _this.isOver = true;
                xqzs.wx.voice.stopRecord(function (localId) {
                    _this.localId=localId;
                    _this._recordStop();
                });


            },
            _recordStop:function () {
                let _this = this;
                _this.clearTimeOut();
                _this.answering=false;
//                _this.preAnswer=true;
            },
            getTime:function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            }


        },
        beforeDestroy:function () {
            if(this.playing)xqzs.wx.voice.stopPlay( this.localId);
        },


    }
</script>
<style>
    .answer_answer_box .answer{ background: #fff; padding:0.8823529411764706rem;  position: relative }
   .answer_answer_box .answer .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; }
   .answer_answer_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%}
   .answer_answer_box .answer .info{ float:left; margin-left:0.8823529411764706rem; width: 81% }
   .answer_answer_box .answer .info .names{ font-size: 0.7058823529411765rem;  color:#666; margin-bottom: 0.2rem; width: 14.11764705882353rem; line-height: 2.5rem}
   .answer_answer_box .answer .info .content{  font-size: 0.8823529411764706rem; color:#474747; line-height:1.176470588235294rem; margin-bottom: 0.4rem}
   .answer_answer_box .answer .info .last_time{ float:left;font-size:0.7647058823529412rem;color:#666; width: 6rem;
    }
   .answer_answer_box .answer .info .type{ font-size: 0.7058823529411765rem; color:#333;margin-bottom: 0.4rem}
    .answer_answer_box .answer .info .type span{ color:#666}
   .answer_answer_box .answer .price{ font-size: 0.8823529411764706rem;color:#535353; text-align: right;position: absolute; right:0.8823529411764706rem; top:0.8823529411764706rem ;}
    .answer_answer_box .answer  .price span{ color:#FF9900; font-size: 1.058823529411765rem;}
    .answer_answer_box .answer .info  .audio{ margin-top: 0.6rem;}


    /*播放*/
    .answer_answer_box   .time_go{ position: relative;  height: 6.2rem; width: 6.2rem; margin: 0 auto;}
    .answer_answer_box  .time_go .playing { height: 6.2rem; width: 6.2rem; border-radius: 50%; background: #00b9e8; position: absolute; top:0;left:0; text-align: center; color:#fff; font-size: 1.764705882352941rem; line-height: 6.2rem;}
    .answer_answer_box   .play{
           opacity: 0.1;
           transform:scale(1.6,1.6);
       }
    .answer_answer_box   .play2{
        opacity: 0.3;
        transform:scale(1.4,1.4);
    }
    .answer_answer_box   .play3{
        opacity: 0.4;
        transform:scale(1.2,1.2);
    }

    .answer_answer_box  .play_go  .play{
        animation: playing 1s infinite;
        -webkit-animation: playing  1s infinite;
        animation-delay: -0.8s;
        -webkit-animation-delay: -0.8s;
    }
    .answer_answer_box  .play_go .play2{
        animation-delay: -0.6s;
        -webkit-animation-delay: -0.6s;
            animation: playing 1s infinite;
            -webkit-animation: playing 1s infinite;

    }
    .answer_answer_box  .play_go .play3{
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






    .answer_answer_box  .times{ padding: 0.2rem 2.5rem; background: #fff}
    .answer_answer_box   .times .bg{ background: #163201; height: 2.94117647058823rem;  border-radius: 1.470588235294118rem ; }
    .answer_answer_box    .times .bg .in{ padding:  0.1470588235294118rem; }
    .answer_answer_box    .times .bg .go{ background: #09bb07; height: 2.647058823529412rem; min-width:2.647058823529412rem;  width: 0; border-radius:1.323529411764706rem;      }
    .answer_answer_box  .times .last_time{ text-align: center; color:#666; margin-top: 0.5rem; font-size: 1.529411764705882rem;}
    .answer_answer_box  .action_btn{ background: #fff; padding: 6.4rem 1rem 0 1rem; display: -webkit-box; display: -webkit-flex;  display: flex;}
    .answer_answer_box  .action_btn .item{  -webkit-box-flex: 1;  -webkit-flex: 1;  flex: 1;  text-align: center; color:#666; font-size: 0.7647058823529412rem;  }
    .answer_answer_box  .action_btn .item .txt{ margin-top: 0.6rem}
    .answer_answer_box  .audio_btn_in{ background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); border-radius: 50%; height: 4.117647058823529rem; width: 4.117647058823529rem;
        -webkit-box-shadow:0 0 8px rgba(255,158,25,1);box-shadow:0 0 8px rgba(255,158,25,1);  position: relative; margin: 0 auto}
    .answer_answer_box .audio_btn_in:active{ background: rgba(253,114,6,0.6)}
    .answer_answer_box  .audio_btn_in:before{content: " " ; display: block ; position: absolute; top:50%; left:50% ;}
    .answer_answer_box   .audio_begin:before{ background:url(../../images/audio_btn_begin1.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_answer_box   .audio_end:before{ background:#fff; background-size:  1.235294117647059rem; width:1.235294117647059rem;; height: 1.235294117647059rem;  margin-left: -0.6176470588235294rem; margin-top: -0.6176470588235294rem; border-radius: 5px ;   }
    .answer_answer_box   .audio_play,.audio_send{width:2.588rem;height:2.588rem;background:#ccc;border-radius: 50%;margin:0.76471rem auto;color:#fff;font-size: 0.76471rem;line-height: 2.588rem}
    .answer_answer_box .audio_send  img{position: absolute;left:50%;top:1.176rem;margin-left:-0.88235rem;width:1.76471rem}
    .answer_answer_box   .audio_cant_begin:before{ background:url(../../images/audio_btn_begin1.png)  no-repeat; background-size:  1.352941176470588rem; width:1.352941176470588rem;; height: 1.882352941176471rem;  margin-left: -0.676470588235294rem; margin-top: -0.9411764705882355rem;  }
    .answer_answer_box .overStyle{background: #00B9E8;}
    .answer_answer_box .outTimeStyle{background: linear-gradient(to right, rgba(255,158,25,0.4), rgba(253,114,6,0.4))}
    .answer_answer_box .addPlayBox{position: absolute;bottom:2rem;width:100%;}
</style>