<template >
    <div style="height: 100%" class="answer_detail_box">


        <div v-title>专家详情</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div class="answer_info">
                <div class="answer_banner">
                    <div class="answer_face"><img :src="detail.faceUrl"></div>
                    <div class="answer_name">{{detail.nickName}}</div>
                    <div class="answer_cs">
                        <div class="answer_ability">
                            <span v-for="good in detail.domain">{{good.title}}</span>
                        </div>
                    </div>

                    <div class="answer_address">{{detail.province}}-{{detail.city}}</div>
                </div>
                <div class="answer_count">
                    <div class="answer_countBox">
                        <div class="counts">{{detail.answerCount}}</div>
                        <div class="nr">个回答</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts" v-if="detail.listenCount!=null">{{detail.listenCount}}</div>
                        <div class="counts" v-if="detail.listenCount==null">0</div>
                        <div class="nr">次偷听</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts">{{detail.evaluate}}</div>
                        <div class="nr">好评率</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts">{{detail.followCount}}</div>
                        <div class="nr">人收听</div>
                    </div>

                </div>
            </div>
            <div class="answer_voice">
                <div class="ts">{{detail.sign}}</div>
                <div class="voice">
                    <span class="hello">您好：</span>
                    <div class="problem_answer_yy">
                        <div class="audio" :class="{playing:detail.playing,paused:detail.paused}">
                            <div class="audio_btn" @click.stop="play()">
                                <span v-if="!detail.playing&&!detail.paused">点击播放</span>
                                <span v-if="detail.playing">正在播放..</span>
                                <span v-if="detail.paused">播放暂停</span>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="answer_play_time">60”</div>
                    </div>
                </div>
            </div>
            <div class="answer_detail">
                <div class="answer_title">详细介绍</div>
                <div class="content">
                    <p :class={friestP:Hflag}>{{detail.introduction}}</p>
                    <div :class={addopen:!Hflag,addstop:Hflag}>
                        <b>专业培训经历：</b>
                        <p style="margin-bottom: 1.76rem">{{detail.experience}}</p>

                        <b>擅长领域：</b>
                        <p>{{detail.goodat}}</p>
                    </div>
                </div>
                <div class="btn_sq" @click="btn_sq()"><span v-if="!Hflag">收起</span><span v-if="Hflag">展开全部</span></div>
            </div>
            <div class="answer_comments">
                <div class="answer_title">最新评价({{detail.evaluateCount}})</div>
                <div class="list">
                    <div class="item" v-for="item in commentList">
                        <div class="img"><img
                                :src="item.faceUrl">
                        </div>
                        <div class="info">
                            <div class="name">{{item.nickName}}</div> <!--该名字-->
                            <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span>
                            </div>
                            <div class="word">{{item.content}}
                            </div>
                            <div class="class_s">
                                <span v-for="tag in item.tag">{{tag.title}}</span>
                                <div class="clear"></div>
                            </div>
                            <div class="time">{{formatTime(item.addTime)}}</div>
                        </div>
                        <div class="clear"></div>
                    </div>

                </div>
                <div class="btn_sq" @click="moreComment()">查看更多评价</div>
            </div>
            <div class="ask_answer">
                <div class="answer_title">问答({{detail.answerCount}})
                    <div class="new" @click="answerTypeChange()">{{answerTypeTxt}}<span class="sj"></span></div>
                </div>

                <div class="list">
                    <div class="item" v-for="(item,index) in answerList">
                        <div class="question">
                            <div class="img"><img :src="item.faceUrl">
                            </div>
                            <div class="info">
                                <div class="word">
                                    {{item.content}}
                                </div>
                                <div class="price">￥{{item.price}}</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="answer">
                            <div class="img"><img :src="item.expertUrl">
                            </div>
                            <div class="info audio">
                                <div class="reply" v-if="item.needPay" @click.stop="pay(index)">
                                    <div class="audio_btn">
                                        1元偷听
                                    </div>
                                    <span class="minute">{{item.length}}"</span>
                                </div>


                                <div class="reply" v-if="!item.needPay">
                                    <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                        <div class="audio_btn" @click.stop="playAnswer(index)">
                                            <template v-if="!item.playing&&!item.paused">点击播放</template>
                                            <template v-if="item.playing">正在播放..</template>
                                            <template v-if="item.paused">播放暂停</template>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </div>




                                <div class="status">
                                    <div class="ask_time">{{formatTime(item.queAddTime)}}</div>
                                    <div class="ask_status">听过 {{item.listenTimes}}
                                        <div class="icon2"><span>{{item.likeTimes}}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>

            </div>

        </v-scroll>
        {{detail.expertUserId}}
        <div class="ask_bottom" >
            <div class="listen"  @click="follow()">
                <img src="../../images/asker/listenin1.png" alt="">
                <span v-if="detail.followed===1">已收听</span>
                <span v-if="detail.followed===0">收听</span>
            </div>
            <div class="pay_ask" @click="ask()">￥{{detail.price}} 提问</div>
        </div>
        </div>

</template>

<script type="es6">

    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';

    export default {
        data() {
            return {
                detail:{
                    expertUserId:null,
                    playing:false,
                    paused:false

                },
                id:0,
                viewType:0,
                commentList:[],
                answerList:[],
                answerType:1,
                answerTypeTxt:"最新",
                page: 1,
                row: 5  ,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false,
                Hflag:true,
                user:{id:null},
                scrollHeightBottom:0
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            this.id = this.$route.query.id;
            this.getDetail();
            this.getUser();
            this.getComment();
            this.getAnswer();
            xqzs.voice.audio=null;
        },
        methods:{

            pay:function (index) {
                let  item = this.answerList[index];
                let _this=this;
                this.$http.get(web.API_PATH + "come/listen/create/order/_userId_/"+item.answerId)
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            let result = bt.data.data;
                            let config =result.config;
                            console.log(config)



                            //delete ToDo
                            _this.$http.put(web.API_PATH + "pay/wxpay", {tradeNo:result.order.tradeNo})
                                .then(function (bt) {
                                    if (bt.data && bt.data.status == 1) {

                                        xqzs.weui.tip("支付成功", function () {
                                            _this.setPayed(index);
                                        });

                                    }
                                });
                            return;
                            /// TOdO

                            xqzs.wx.pay.pay(config, function () {
                                xqzs.weui.tip("正在跳转支付")
                            }, function () {//success
                                xqzs.weui.tip("支付成功", function () {
                                    _this.setPayed(index);
                                });
                            }, function () {//error

                            })
                        }
                    });
            },
            //设置dom 已经支付
            setPayed:function (index) {
                let item = this.answerList[index];
                item.needPay=0;
                this.$set(this.answerList,index,item);
            },

            //回答播放
            playAnswer:function (index) {
                this.initVoice();
                let _this=this;
                let list = _this.answerList;
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.answerList,index,list[index])
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.answerList,i,list[i]);
                    }
                }

                let item= list[index];
                console.log(index)
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    console.log(1)
                    item.paused=false;
                    item.playing=true;
                    _this.$set(_this.answerList,index,item)
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        console.log(2)
                        item.paused=true;
                        item.playing=false;
                        _this.$set(_this.answerList,index,item)
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        this.getVoiceUrlAnswer(item.answerId,function (url) {
                            console.log(3)

                            if(url!=null&&url!=undefined&&url!=''){
                                xqzs.voice.play(url);
                                item.playing=true;
                                item.paused=false;
                                _this.$set(_this.answerList,index,item)
                            }

                        })
                    }

                }

            },
            getVoiceUrlAnswer:function (answerId,callFun) {
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

            formatTime:function (time) {
              return xqzs.dateTime.formatDate(time)
            },

            getUser:function () {
                let _this=this;
                _this.$http({
                    method: 'GET',
                    type: "json",
                    url: web.API_PATH + 'user/find/by/user/Id/_userId_',
                }).then(function (data) {//es5写法
                    if (data.data.data !== null) {
                        _this.user = eval(data.data.data);


                    }
                }, function (error) {
                    //error
                });
            },
            btn_sq:function () {
                let _this=this;
                _this.Hflag = !this.Hflag
            },
            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            play:function () {
                this.initVoice();
                let _this=this;
                xqzs.voice.onEnded=function () {
                    _this.detail.paused=false;
                    _this.detail.playing=false;
                };

                if(_this.detail.paused){  //暂停中也就是已经获取到且为当前音频
                    _this.detail.paused=false;
                    _this.detail.playing=true;
                    xqzs.voice.play();
                    console.log("1")
                }else{
                    if(_this.detail.playing){    //播放中去做暂停操作
                        _this.detail.paused=true;
                        _this.detail.playing=false;
                        xqzs.voice.pause();
                        console.log( _this.detail.playing)
                        console.log("2")
                    }else{     //重新打开播放
                        this.getVoiceUrl(_this.detail.expertId,function (url) {
                            xqzs.voice.play(url);
                            _this.detail.playing=true;
                            _this.detail.paused=false;
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

            follow:function () {
                if(this.detail.followed===1){
                    xqzs.weui.tip("已经收听");
                    return ;
                }

                let that=this;
                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+this.id+"/_userId_", {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            that.detail.followed=1;
                            that.detail.followCount=that.detail.followCount+1;
                            xqzs.weui.toast("success","收听成功")
                        }else if(bt.data.status ==900004){
                            xqzs.weui.toast("success","已经收听")
                        }else if(bt.data.status ==9000003){
                            xqzs.weui.toast("fail","不能收听自己")
                        }else {
                            xqzs.weui.toast("fail","收听失败")
                        }
                    });
            },
            answerTypeChange:function () {
                let _this=this;
                let　answerTypes=[{label:"最新",value:1},{label:"热门",value:2}]
                weui.picker(answerTypes, {
                    defaultValue: _this.answerType,
                    onConfirm: function (result) {
                        console.log(result);
                        _this.answerTypeTxt = result[0].label;
                        _this.answerType = result[0].value;
                        _this.page=1;
                        _this.getAnswer();

                    }
                });
            },
            moreComment:function () {
               this.$router.push("comment?expertId="+this.id );
            },
            ask:function () {
                if(this.detail.expertUserId==null||this.user.id==null){
                    xqzs.weui.tip('加载中，请稍后重试')
                    return;
                }
                if(this.detail.expertUserId!=this.user.id){
                    this.$router.push("/asker/ask?expertId="+this.id )
                }else{
                    xqzs.weui.tip('不能向自己提问')
                }

            },
            getComment:function () {
                let _this= this;
                let id=  this.id;
                _this.$http.get(web.API_PATH + 'come/expert/get/evaluate/'+id+"/"+_this.viewType+'/1/1' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.commentList= data.body.data
                        console.log(data.body.data)
                    }
                }, function (error) {
                });
            },
            onInfinite(done) {
                this.getAnswer();
                done() // call done
            },
            getAnswer:function () {
                let _this= this;
                let id=  this.id;

//                if (_this.page == 1) {_this.showLoad=true;}
                if(   _this.isLoading ){return ;}
                _this.isLoading = true;
                _this.$http.get(web.API_PATH + 'come/expert/get/answer/'+id+"/"+_this.answerType+'/'+_this.page+'/'+_this.row+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
//                        _this.answerList= data.body.data;

                        _this.showLoad = false;
                        _this.isLoading = false;
//                    console.log(response)

                        if( data.body.status!=1&&_this.page==1){
                            _this.list = [];
                            return;
                        }
                        let arr = data.body.data;
//
                        if (arr.length < _this.row) {
                            _this.isPageEnd = true;
                            _this.isShowMoreText = false
                        }
                        Bus.$emit("scrollMoreTextInit", _this.isShowMoreText);



                        if (_this.page == 1) {
                            _this.answerList = arr;
                        } else {
                            _this.answerList = _this.answerList.concat(arr);
                        }
                        if (arr.length == 0) return;
                        _this.page = _this.page + 1;
                    }
                }, function (error) {
                    _this.isLoading = false;
                    _this.showLoad = false;
                });
            },
            getDetail:function () {
                let _this= this;
                let id=  this.id;
                _this.$http.get(web.API_PATH + 'come/expert/show/to/user/'+id+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.detail= data.body.data
                        console.log( _this.detail)
                        if(_this.detail.expertUserId!=_this.user.id&&_this.detail.expertUserId!=null&&_this.user.id!=null){
                            _this.scrollHeightBottom=50;
                        }
                    }
                }, function (error) {
                });

            },
            beforeDestroy:function () {
                xqzs.voice.pause();
            },
        }


    }
</script>
<style>
    .answer_detail_box .answer_info{
        width: 100%;
    }
    .answer_detail_box .answer_banner{
        background: url("../../images/answer/banner.jpg") top center  no-repeat;
        background-size: 100%;
        height: 12.03rem;
        padding-top: 0.88rem;
    }
    .answer_detail_box .answer_face{
        width: 5.29rem;
        height: 5.29rem;
        border-radius: 50%;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    .answer_detail_box  .answer_face img{
        width: 100%;
        border-radius: 50%;
        display: block;
    }
    .answer_detail_box .answer_name{
        font-size: 1.0588235rem;
        line-height: 1;
        color: white;
        text-align: center;
    }
    .answer_detail_box .answer_cs{
        margin-top: 14px;
        text-align: center;
    }
    .answer_detail_box  .answer_ability{
      display: inline-block;
    }
    .answer_detail_box  .answer_ability span{
        display: block;
        float:left;
        text-align: center;
        border-radius:0.6176470588235294rem;
        height: 1.235294117647059rem;
        line-height: 1.235294117647059rem;
        border: 1px solid rgba(211,213,215,1);
        color:rgba(211,213,215,1);
        font-size: 0.7058823529411765rem;
        padding: 0 0.7rem;
        margin-right:0.55rem;
    }
    .answer_detail_box .answer_address{
        margin-top: 4px;
        text-align: center;
        color: rgba(211,213,215,1);
        line-height: 1;
        font-size: 0.76471rem;
    }
    .answer_detail_box .answer_count{
        display: flex;
        background: white;
    }
    .answer_detail_box   .answer_countBox{
        width: 100%;
        text-align: center;
        position: relative;
    }
    .answer_detail_box .counts{
        font-size:1.05rem;

        color:rgba(102,102,102,1);
    }
    .answer_detail_box .nr{
        font-size:0.705rem;

        color:rgba(149,149,149,1);
        line-height: 1;
        margin-top: 0.1rem;
        margin-bottom: 0.64rem;
    }
    .answer_detail_box .line_1{
        width: 1px;
        height: 1rem;
        background:rgba(219,219,219,1);
        position: absolute;
        right: 0;
        top:50%;
        margin-top: -0.5rem;
    }
    .answer_detail_box .answer_voice{
        margin-top: 0.41176471rem;
        background: white;
        padding-bottom: 0.88rem;
    }
    .answer_detail_box .ts{
        padding:0.88rem;
        font-size:0.88rem;
        color:rgba(51,51,51,1);
    }
    .answer_detail_box .hello{
        padding-left: 0.88rem;
        color:#999; font-size: 0.88235rem;
        float: left;
        margin-top: 0.88rem;
        margin-right: 0.588235rem;
    }
    .answer_detail_box .minute{ color:#999; font-size: 0.76rem; margin-left: 0.8rem; float:left; line-height: 2.4rem;}



    .answer_detail_box  .audio_btn:active:after{
        border-top: 0.6764705882352941rem solid rgb(0, 138, 182);;
    }
    .answer_detail_box .answer_detail{
        background: white;
        margin-top: 0.41176471rem;
        padding-bottom: 1.2rem;
    }
    .answer_detail_box .answer_title{
        height: 2.59rem;
        line-height: 2.59rem;
        font-size: 0.88rem;
        padding-left: 0.88rem;
        border-bottom: 1px solid #EEEEEE;
        background: white;
    }
    .answer_detail_box .content{
        font-size: 13px;
        padding:0.88rem ;
        color:#999
    }
    .answer_detail_box .content b{
        color:#333;
        font-weight: normal;
    }
    .answer_detail_box .btn_sq{
        width:5.235rem;
        height:1.352rem;
        border-radius: 0.66rem ;
        border: 1px solid rgba(254,115,1,1);
        margin:0 auto;
        text-align: center;
        color: rgba(254,115,1,1);
        line-height: 1.352rem;
        font-size: 0.70588235rem;
    }
    .answer_detail_box .answer_comments{
        background: white;
        margin-top: 0.41176471rem;
        padding-bottom: 0.88rem;
    }
   .answer_detail_box  .list .item{ background: #fff; padding: 0.8823529411764706rem 0.8823529411764706rem 1.23rem 0.8823529411764706rem;margin-bottom: 0.41176471rem  }
    .answer_detail_box .list .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_detail_box  .list .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_detail_box  .list .item .img{ width: 2rem; float:left; }
    .answer_detail_box  .list .item .img img{ width: 100%; border-radius: 50%; border: 1px solid #EEEAEA }
    .answer_detail_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_detail_box  .list .info .name{ font-size: 0.7058823529411765rem; color:#999; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
    .answer_detail_box  .list .word{ font-size:0.7647058823529412rem;  color:#333; margin-bottom: 0.2rem;;}
    .answer_detail_box  .list .time{ font-size:0.7058823529411765rem; color:#C1C1C1; margin-top: 0.6rem;margin-bottom: 0.6rem;}
    .answer_detail_box  .list .info .class_s { clear: both; margin-top: 0.3rem;}
    .answer_detail_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #C1C1C1 ; color:#C1C1C1 ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_detail_box .ask_answer{
        margin-top: 0.41176471rem;
    }
    .answer_detail_box .sj{
        width: 0;
        height: 0;
        border-top: 5px solid #999999 ;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        position: absolute;
        top:1.17rem;
        margin-left: 0.294rem;
    }
    .answer_detail_box .new{float: right;margin-right: 0.58rem; position: relative; padding-right: 1.17rem; color: #999999 ;}
    .answer_detail_box .price{font-size: 0.74rem;color:#ff6600}
    .answer_detail_box .reply{height: 50px;}
    .answer_detail_box .status{color: #999999; font-size:0.70rem;margin-top: 0.58rem }
    .answer_detail_box .ask_time{float: left;}
    .answer_detail_box .answer{margin-top: 0.88rem}
    .answer_detail_box .ask_status{float: right;}
    .answer_detail_box .ask_status img{width: 0.94rem;}

    .answer_detail_box .ask_bottom{
        margin-top: 2rem;
        height: 2.588rem;
        text-align: center;
        position: absolute;
        bottom:0;
        left: 0;
        width: 100%;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    .answer_detail_box .listen{
        float: left;
        width: 25%;
        background: white;
        box-shadow: #eee 0 -5px 5px -5px;
        height: 2.588rem;
        position: relative;
    }
    .listen img{display: block;position: absolute;left:0.88235rem;width:1.70588rem;height:1.70588rem;top:50%;margin-top: -0.85294rem;}
    .answer_detail_box .listen span{color: #999;position: absolute;left:3rem;font-size: 0.76471rem;display: block;height:100%;line-height: 2.588rem;}
   .answer_detail_box .icon1{
       margin-top: 0.588rem;
       background: url("../../images/asker/listenin1.png") no-repeat;
       background-size: 1.05rem;
       padding-left: 0.8rem;
       background-position: 0.9rem 0.294rem;
   }
    .answer_detail_box .icon2{
        float: right;
        background: url("../../images/asker/zan_por1.png") no-repeat;
        background-size: 1.05rem;
        padding-left: 2rem;
        background-position: 0.9rem 0;
    }
    .answer_detail_box .pay_ask{width: 75%;float: right; background: linear-gradient(to right, rgba(255,158,25,1), rgba(254,115,1,1));color: white;line-height: 2.588rem;height: 2.588rem}
    .friestP{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;line-height:1.176rem;-webkit-box-orient: vertical;}
    .addopen{margin-top:1.76rem;height:auto;}
    .addstop{margin-top:0;height:0;overflow: hidden;}
</style>