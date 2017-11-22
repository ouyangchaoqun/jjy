<template >
    <div style="height: 100%" class="answer_detail_box">
        <div v-title>专家详情</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText" >
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
            <!--<div class="answer_voice">-->
                <!--<div class="ts">{{detail.sign}}</div>-->
                <!--<div class="voice">-->
                    <!--<span class="hello">您好：</span>-->
                    <!--<div class="problem_answer_yy">-->
                        <!--<div class="audio" :class="{playing:playing2,paused:paused2}">-->
                            <!--<div class="audio_btn" @click.stop="play()">-->
                                <!--<span v-if="!playing2&&!paused2">点击播放</span>-->
                                <!--<span v-if="playing2">正在播放..</span>-->
                                <!--<span v-if="paused2">播放暂停</span>-->
                                <!--<div class="second">{{detail.length}}”</div>-->
                            <!--</div>-->
                            <!--<div class="clear"></div>-->
                        <!--</div>-->

                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="answer_detail">
                <div class="answer_title">详细介绍</div>
                <div class="content">
                    <p :class={friestP:Hflag} v-html="detail.introduction"></p>
                    <div :class={addopen:!Hflag,addstop:Hflag}>
                        <b>专业培训经历：</b>
                        <p style="margin-bottom: 1.76rem" v-html="detail.experience"></p>

                        <b>擅长领域：</b>
                        <p v-html="detail.goodat"></p>
                    </div>
                </div>
                <div class="btn_sq" @click="btn_sq()"><span v-if="!Hflag">收起</span><span v-if="Hflag">展开全部</span></div>
            </div>
            <div class="answer_comments">
                    <div class="answer_title">最新评价({{detail.evaluateCount}})
                        <i @click="moreComment()">查看更多></i>
                    </div>
                <div v-if="detail.evaluateCount>0">
                    <div class="list">
                        <div class="item" v-for="(item,index) in commentList" :class="{addBorder_bottom:commentList.length>1}">
                            <div class="img"><img
                                    :src="item.faceUrl">
                            </div>
                            <div class="info">
                                <div class="name">{{item.nickName}}</div> <!--该名字-->
                                <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span>
                                    <div class="time timeRight">{{formatTime(item.addTime)}}</div>
                                </div>
                                <div class="word" >{{item.content}}
                                </div>
                                <div class="class_s">
                                    <span v-for="tag in item.tag">{{tag.title}}</span>
                                    <div class="clear"></div>
                                </div>

                            </div>
                            <div class="clear"></div>
                        </div>

                    </div>
                </div>
                <div v-if="detail.evaluateCount==0">
                    <div class="comment_btn">暂无评价</div>
                </div>

            </div>
            <div class="ask_answer">
                <div class="answer_title">问答({{detail.answerCount}})
                    <div class="new" style="position: relative" @click="showPicker()">{{answerTypeTxt}}<span class="sj" :class="{bj:showPic}"></span>
                        <ul v-if="showPic">
                            <li v-for="item in answerTypes" :val="item.value">{{item.label}}</li>
                        </ul>
                    </div>
                </div>

                <div class="list">
                    <div class="item" v-for="(item,index) in answerList" :class="{addBorder_bottom:answerList.length>1}">
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
                                    <div class="audio_btn pay">
                                        1元偷听
                                        <div class="second">{{item.length}}”</div>
                                    </div>
                                </div>
                                <div class="reply" v-if="!item.needPay">
                                    <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                        <div class="audio_btn" @click.stop="playAnswer(index)">
                                            <template v-if="!item.playing&&!item.paused">点击播放</template>
                                            <template v-if="item.playing">正在播放..</template>
                                            <template v-if="item.paused">播放暂停</template>
                                            <div class="second">{{item.length}}”</div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>


                        <div class="others">
                            <div class="time">{{formatTime(item.queAddTime)}}</div>
                            <div class="others_right">
                                <div class="listen_count">听过 {{item.listenTimes}}</div>
                                <div class="good_care" :class="{good_cared:item.isCared}" @click.stop="like(index)" ><span>{{item.likeTimes}}</span></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="detail.answerCount==0">
                    <div class="comment_btn">暂无回答</div>
                </div>
            </div>

        </v-scroll>
        <!--{{detail.expertUserId}}-->
        <div class="ask_bottom">
        <div class="ask_bottom" >
            <div class="listen"  @click="follow()">

                <span v-if="detail.followed===1">
                    <img v-if="detail.followed===1" src="../../images/followed_new.png" alt="">已收听
                </span>
                <span v-if="detail.followed===0" class="followedColor">+收听</span>
            </div>
            <div class="pay_ask" @click="ask()">￥{{detail.price}} 提问</div>
        </div>
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
                    answerCount:0,
                    evaluate:0,
                    listenCount:0,
                    followCount:0,


                },
                playing:false,
                paused:false,
                playing2:false,
                paused2:false,
                id:0,
                viewType:0,
                commentList:[],
                answerList:[],
                answerType:1,
                answerTypeTxt:"最新",
                answerTypes:[{label:"最新",value:1},{label:"热门",value:2}],
                page: 1,
                row: 5  ,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false,
                Hflag:true,
                user:{id:null},
                scrollHeightBottom:0,
                showPic:false
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
            xqzs.wx.setConfig(this);

        },
        updated:function () {
            let _this = this;
            $('.new li').on('click',function () {
                _this.answerTypeTxt = $(this).html();
                _this.answerType = $(this).attr('val');
                _this.page=1;
                _this.getAnswer();
            })
        },
        methods:{
            showPicker:function () {
                let _this = this;
                _this.showPic = !_this.showPic;

            },
            like:function (index) {
                let  item = this.answerList[index];
                if(item.isCared){
                    xqzs.weui.tip("已经点赞");
                    return ;
                }
                let _this=this;
                this.$http.put(web.API_PATH + "come/user/like/answer/_userId_/"+item.answerId, {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            item.isCared=1;
                            item.likeTimes=item.likeTimes+1;
                            _this.$set(_this.answerList,index,item);
                        }
                    });
            },
            pay:function (index) {
                let  item = this.answerList[index];
                let _this=this;
                this.$http.get(web.API_PATH + "come/listen/create/order/_userId_/"+item.answerId)
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            let result = bt.data.data;


                            xqzs.wx.pay.pay(result.order, function () {
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
                    _this.paused2=false;
                    _this.playing2=false;
                };

                if(_this.paused2){  //暂停中也就是已经获取到且为当前音频
                    _this.paused2=false;
                    _this.playing2=true;
                    xqzs.voice.play();
                    console.log("1")
                }else{
                    if(_this.playing2){    //播放中去做暂停操作
                        _this.paused2=true;
                        _this.playing2=false;
                        xqzs.voice.pause();
                        console.log( _this.playing2)
                        console.log("2")
                    }else{     //重新打开播放
                        this.getVoiceUrl(_this.detail.expertId,function (url) {
                            xqzs.voice.play(url);
                            _this.playing2=true;
                            _this.paused2=false;
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
//            answerTypeChange:function () {
//                let _this=this;
//                let　answerTypes=[{label:"最新",value:1},{label:"热门",value:2}]
//                weui.picker(answerTypes, {
//                    defaultValue: _this.answerType,
//                    onConfirm: function (result) {
//                        console.log(result);
//                        _this.answerTypeTxt = result[0].label;
//                        _this.answerType = result[0].value;
//                        _this.page=1;
//                        _this.getAnswer();
//
//                    }
//                });
//            },
            moreComment:function () {
                if( this.detail.evaluateCount>0)
                this.$router.push("/answer/comment?expertId="+this.id );
            },
            ask:function () {
                if(this.detail.expertUserId==null||this.user.id==null){
                    xqzs.weui.tip('加载中，请稍后重试')
                    return;
                }
                if(this.detail.expertUserId!=this.user.id){
                    this.$router.push("/asker/ask/?expertId="+this.id )
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

                if (_this.page == 1) {_this.showLoad=true;}
                if(   _this.isLoading ){return ;}
                _this.isLoading = true;
                _this.$http.get(web.API_PATH + 'come/expert/get/answer/'+id+"/"+_this.answerType+'/'+_this.page+'/'+_this.row+'/_userId_' ).then(function (data) {//es5写法
                    _this.showLoad=false;
                    if (data.body.status == 1) {
//                        _this.answerList= data.body.data;
                          _this.isLoading = false;
//                        console.log(response)

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
                _this.showLoad=true;
                _this.$http.get(web.API_PATH + 'come/expert/show/to/user/'+id+'/_userId_' ).then(function (data) {//es5写法
                    _this.showLoad=false;
                    if (data.body.status == 1) {
                        _this.detail= data.body.data;
                        _this.detail.introduction= xqzs.string.transferContentBr(_this.detail.introduction);
                        _this.detail.experience= xqzs.string.transferContentBr(_this.detail.experience);
                        _this.detail.goodat= xqzs.string.transferContentBr(_this.detail.goodat);
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
        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        }


    }
</script>
<style>
    .comment_btn{
        width: 5.235rem;
        height: 1.3235rem;
        line-height: 1.3235rem;
        margin: 0 auto;
        margin-top: 0.88rem;
        text-align: center;
        color: rgba(36,37,61,0.5);
        font-size: 0.70588235rem;
    }
    .answer_detail_box .answer_info{
        width: 100%;
        box-shadow: 0 0.294rem 0 #f5f5f5;
        -webkit-box-shadow:0 0.294rem 0 #f5f5f5;
        margin-bottom: 0.294rem;
    }
    .answer_detail_box .answer_banner{
        background: url("../../images/answer/banner.jpg") top center  no-repeat;
        background-size: cover;
        padding-bottom:0.588235rem;
        padding-top: 0.88rem;
    }
    .answer_detail_box .answer_face{
        width: 5.29rem;
        height: 5.29rem;
        border-radius: 50%;
        margin: 0 auto;
        margin-bottom: 0.88235rem;
        border:0.294rem solid rgba(255,255,255,0.5);
    }
    .answer_detail_box  .answer_face img{
        width: 100%;
        border-radius: 50%;
        display: block;
        height: 100%;
    }
    .answer_detail_box .answer_name{
        font-size: 1.0588235rem;
        line-height: 1;
        color: white;
        text-align: center;
    }
    .answer_detail_box .answer_cs{
        margin-top: 0.76471rem;
        text-align: center;
    }
    .answer_detail_box  .answer_ability{
      display: inline-block;
    }
    .answer_detail_box  .answer_ability span{
        display: block;
        float:left;
        text-align: center;
        border-radius:0.294rem;
        height: 1.235294117647059rem;
        line-height: 1.235294117647059rem;
        border: 1px solid rgba(255,255,255,0.5);
        color:rgba(255,255,255,1);
        font-size: 0.7058823529411765rem;
        margin-right:0.55rem;
        width:3.76471rem;
    }
    .answer_detail_box .answer_address{
        margin-top: 4px;
        text-align: center;
        color: rgba(255,255,255,1);
        line-height: 1;
        font-size: 0.70588rem;
    }
    .answer_detail_box .answer_count{
        display: flex;
        background: white;
    }
    .answer_detail_box   .answer_countBox{
        width: 100%;
        text-align: center;
        position: relative;
        padding-top: 0.471rem;
        padding-bottom: 0.9rem;
    }
    .answer_detail_box .counts{
        font-size:1.05rem;
        line-height: 1;
        color:rgba(36,37,61,0.8);
        margin-bottom: 0.5rem;
    }
    .answer_detail_box .nr{
        font-size:0.705rem;
        color:rgba(36,37,61,0.5);
        line-height: 1;
    }
    .answer_detail_box .line_1{
        width: 1px;
        height: 2.1rem;
        background:rgba(219,219,219,1);
        position: absolute;
        right: 0;
        top:0.88235rem;
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
        color:rgba(36,37,61,0.5); font-size: 0.88235rem;
        float: left;
        margin-top: 0.88rem;
        margin-right: 0.588235rem;
    }
    .answer_detail_box .minute{ color:rgba(36,37,61,0.5); font-size: 0.76rem; margin-left: 0.8rem; float:left; line-height: 2.4rem;}




    .answer_detail_box .answer_detail{
        background: white;
        padding-bottom: 1.2rem;
        color:rgba(36,37,61,1)
    }
    .answer_detail_box .answer_title{
        height: 2.59rem;
        line-height: 2.59rem;
        font-size: 1rem;
        padding-left: 0.88rem;
        border-bottom: 1px solid rgba(224,224,225,1);
        background: white;
        font-family: PingFangSC-Medium;
    }
    .answer_detail_box .answer_title i{
        font-style: normal;
        font-size:0.76471rem;
        color:rgba(36,37,61,0.5);
        float: right;
        padding-right: 0.88235rem;
    }
    .answer_detail_box .content{
        font-size: 13px;
        padding:0.88rem ;
        color:rgba(36,37,61,0.7)

    }
    .answer_detail_box .content b{
        color:rgba(36,37,61,1);
        font-weight: normal;
    }
    .answer_detail_box .btn_sq{
        width:5.294rem;
        height:1.3235rem;
        line-height: 1.3235rem;
        border-radius: 0.29rem ;
        border: 1px solid rgba(254,115,1,1);
        margin:0 auto;
        margin-top: 0.6rem;
        text-align: center;
        color: rgba(254,115,1,1);
        font-size: 0.70588235rem;
    }
    .answer_detail_box .answer_comments{
        background: white;
        margin-top: 0.41176471rem;
        padding-bottom: 0.88rem;
    }
   .answer_detail_box  .list .item{ background: #fff; padding: 0.8823529411764706rem 0;margin:0 0.88235rem;margin-bottom: 0.41176471rem;position: relative ; }
    .answer_detail_box  .list .addBorder_bottom{border-bottom: 1px solid #E0E0E1;}
    .answer_detail_box .list .star span{ background: url(../../images/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_detail_box  .list .star span.on{background: url(../../images/star.png);background-size: 0.7647058823529412rem; }

    .answer_detail_box  .list .item .img{ width: 2rem;height: 2rem; float:left; }
    .answer_detail_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%; border: 1px solid #EEEAEA }
    .answer_detail_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_detail_box  .list .info .name{ font-size: 0.7058823529411765rem; color:rgba(36,37,61,0.5); margin-bottom: 0.2rem; width: 14.11764705882353rem;line-height: 1}
    .answer_detail_box  .list .info .star{line-height: 1;margin-bottom: 0.35rem}
    .answer_detail_box  .list .word{ font-size:0.8235rem;  color:rgba(36,37,61,1); margin-bottom: 0.4rem;}
    .answer_detail_box  .list .time{ font-size:0.7058823529411765rem; color:rgba(36,37,61,0.5);}
    .answer_detail_box .timeRight{float: right}
    .answer_detail_box  .list .info .class_s { clear: both; padding-top: 0.3rem;}
    .answer_detail_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #E0E0E1 ; color:rgba(36,37,61,0.5) ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;margin-bottom: 0.6rem}
    .answer_detail_box .ask_answer{
        margin-top: 0.41176471rem;
        background: white;
        padding-bottom: 0.88rem;
    }
    .answer_detail_box .sj{
        width: 0;
        height: 0;
        border-top: 6px solid rgba(36,37,61,0.5) ;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        position: absolute;
        top:1.17rem;
        margin-left: 0.294rem;
    }
    .answer_detail_box .bj{ border-bottom: 6px solid rgba(36,37,61,0.5) ;border-top:0}
    .answer_detail_box .new{float: right;margin-right: 0.58rem; position: relative; padding-right: 1.35rem; color: rgba(36,37,61,0.5);font-size: 0.76471rem;}
    .answer_detail_box .price{font-size: 0.74rem;color:#FE7301}
    .answer_detail_box .reply{height: 50px;}
    .answer_detail_box .status{color: rgba(36,37,61,0.5); font-size:0.70rem;margin-top: 0.88235rem }
    .answer_detail_box .ask_time{float: left;}
    .answer_detail_box .answer{margin-top: 0.88rem}
    .answer_detail_box .ask_status{float: right;position: absolute;right:0.3rem;}
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
        width: 30%;
        background: white;
        box-shadow: #eee 0 -5px 5px -5px;
        height: 2.588rem;
        text-align: center;
    }
    .listen img{display: inline-block;width:0.5294rem;margin-right: 0.294rem;}
    .answer_detail_box .listen span{color: rgba(36,37,61,0.5);font-size: 0.8235rem;display: block;height:100%;line-height: 2.588rem;}
   .answer_detail_box .icon1{
       margin-top: 0.588rem;
       background: url("../../images/asker/listenin1.png") no-repeat;
       background-size: 0.936rem;
       padding-left: 0.8rem;
       background-position: 0.9rem 0.294rem;
   }
    .answer_detail_box .care_img_{
        float: right;
        padding-left:1.1rem;
        margin-left: 0.6rem;
    }
    .answer_detail_box .pay_ask{width: 70%;float: right; background: linear-gradient(to right, rgba(255,158,25,1), rgba(254,115,1,1));color: white;line-height: 2.588rem;height: 2.588rem}
    .friestP{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;line-height:1.176rem;-webkit-box-orient: vertical;}
    .addopen{margin-top:1.76rem;height:auto;}
    .addstop{margin-top:0;height:0;overflow: hidden;}
     .item .others{ color:rgba(36,37,61,0.5); position: relative; font-size: 0.7058823529411765rem; padding-left: 2.88235rem;}
     .item .others .listen_count{ float: left;margin-right: 0.588235rem}
    .item .others_right{position: absolute;right:0;top:0}
    .ask_answer .new ul{
        position: absolute;
        width: 3.5rem;
        background: rgb(255, 255, 255);
        box-shadow: rgb(204, 204, 204) 2px 2px 5px 0px;
        top: 2.5rem;
        left: -0.588235rem;
        z-index: 100;
        text-align: center;
    }
    .ask_answer .new ul li{
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid rgb(229, 229, 229);
    }
    .ask_answer .new ul li:active{background:rgb(229, 229, 229) }
    .answer_detail_box .listen .followedColor{color:rgba(254,115,1,1)}
</style>