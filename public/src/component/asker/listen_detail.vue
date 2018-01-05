<template >
    <div>
        <!--详情头部-->
        <div v-title>问题详情</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="steal_detail_header" v-if="detail.title">
            <div class="steal_detail_top"><img :src="detail.faceUrl" alt=""><div>在<span>{{detail.title}}</span>方面</div></div>
            <div class="steal_detail_content">{{detail.content}}</div>
        </div>
        <!--专家回答列表-->
        <ul>
            <li class="steal_detail_answer" v-for="(item,index) in detail.answerList">
                <div class="steal_answer_top">
                    <img class="steal_answer_topimg" :src="item.expertUrl" alt="" @click="goDetail(item.expertId)">
                    <div class="steal_answer_yy">

                        <!--* const GRAB_NOT_BEST    = 1;抢答一般的答案-->
                        <!--* const GRAB_BEST_ANSWER = 2;抢答最好的答案-->
                        <!--* const EXPERT_FREE_TIME = 3;专家免费偷听期内答案-->
                        <!--* const EXPERT_NOT_FREE  = 4;专家收费期内的答案",-->
                        <!--免费听-->
                        <template v-if="detail.needPay==0&&(item.answerType==1||item.answerType!=3)">
                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                <div class="audio_btn" @click.stop="play(index)" >
                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                    <template v-if="item.playing">正在播放..</template>
                                    <template v-if="item.paused">播放暂停</template>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </template>

                        <!--付费听-->
                        <template  v-if="detail.needPay==1">
                            <div @click="pay(index)">
                                <div class="audio"><div class="audio_btn pay" >1元偷听</div></div>
                            </div>
                        </template>
                        <!--限时免费听-->
                        <template v-if="item.answerType==3&&detail.needPay==0">
                            <div class="audio"  :class="{playing:item.playing,paused:item.paused}"><div class="audio_btn" @click.stop="play(index)" >
                                <template v-if="!item.playing&&!item.paused">限时免费听</template>
                                <template v-if="item.playing">正在播放..</template>
                                <template v-if="item.paused">播放暂停</template>
                            </div><div class="clear"></div></div>
                        </template>



                    </div>
                    <div :class="{position_change2:(item.answerType==2||item.answerType==4)&&detail.needPay==1}">{{(item.ct && item.ct!='00')?item.ct:item.length}}”</div>
                </div>
                <div class="steal_answer_zan">
                    <div @click="like(index)" class="good_care" :class="{good_cared:item.isCared}"><span>{{item.likeTimes}}</span></div>
                    <div>听过  <span>{{item.listenTimes}}</span></div>
                </div>
                <div class="steal_expert_info">
                    <div>
                        <span class="steal_expert_name" @click="goDetail(item.expertId)">{{item.expertName}}</span><span class="steal_expert_fans">{{item.followCount}}人收听</span>
                    </div>
                    <div class="steal_expert_des">{{item.sign}}</div>
                    <div class="followed_box" v-if="item.isFollowed==0" @click="follow(index)"> 收听</div>
                    <div class="followed_box isfollow_style"  v-if="item.isFollowed==1" @click="follow(index)" >已收听</div>
                </div>
            </li>

        </ul>

    </div>

</template>
<script>

    import showLoad from '../include/showLoad.vue';

    export default {
        data() {
            return {
                questionId:0,
                detail:{},
                showLoad:false,
                timeOut:null,
                playing:false,
                list:[]
            }
        },
        mounted: function () {
            this.questionId=this.$route.query.questionId;
            this.getDetail();
            xqzs.voice.audio=null;
            xqzs.wx.setConfig(this);

        },
        components: {
            'v-showLoad': showLoad
        },
        methods:{
            like:function (index) {
                let  item = this.detail.answerList[index];
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
                            _this.$set(_this.detail.answerList,index,item);
                        }
                    });
            },

            pay:function (index) {
                let  item = this.detail.answerList[index];
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
                let item =  this.detail.answerList[index];
                item.answerType=1;
                item.needPay=0;
                this.detail.needPay=0;
                this.$set( this.detail.answerList,index,item);
            },

            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            timeout:function (play,time,index) {
                let _this=this;
                _this.timeOut = setTimeout(function () {
                    if(play==true){  //试听
                        if(time>0){
                            time = time -1 ;
                            if(time<10)time="0"+time
                            _this.timeout(play,time,index);
                        }else{
                            _this.playing=false;
                        }
                    }

                },1000);
                _this.list[index].ct =time;
                console.log(time)
                _this.$set(_this.list,index,_this.list[index])
            },

            clearTimeOut:function () {
                let _this=this;
                if(_this.timeOut!==null){
                    clearTimeout(_this.timeOut);
                }
            },
            play:function (index) {
                this.initVoice();
                let _this=this;
                let list = _this.detail.answerList;
                let CT= list[index].ct? list[index].ct: list[index].length;
                let T = list[index].length;
                console.log(CT)
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.detail.answerList,index,list[index]);
                    if(_this.playing)_this.clearTimeOut();
                    _this.playing = false;
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                       list[i].paused=false;
                       list[i].playing=false;
                        _this.$set(_this.detail.answerList,i,list[i]);
                    }
                }
                let item= list[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                   list[index].paused=false;
                   list[index].playing=true;
                    _this.$set(_this.detail.answerList,index,list[index])
                    xqzs.voice.play();
                    _this.timeout(true,CT,index)
                }else{
                    if(item.playing){    //播放中去做暂停操作
                       list[index].paused=true;
                       list[index].playing=false;
                        _this.$set(_this.detail.answerList,index,list[index])
                        xqzs.voice.pause();
                        _this.clearTimeOut();
                        _this.playing = false;
                    }else{     //重新打开播放
                        let answerId= item.answerId;
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                           list[index].playing=true;
                           list[index].paused=false;
                            _this.$set(_this.detail.answerList,index,list[index]);
                            _this.playing=true;
                            _this.clearTimeOut();
                            _this.timeout(true,T,index)
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

            getDetail:function () {
                let _this= this;
                _this.showLoad=true;
                _this.$http.get(web.API_PATH + 'come/listen/question/detail/'+_this.questionId +"/_userId_").then(function (data) {//es5写法
                    _this.showLoad=false;
                    if (data.body.status == 1) {
                        _this.detail= data.body.data
                        _this.list = _this.detail.answerList;
                        console.log(_this.detail)
                    }
                }, function (error) {
                    _this.showLoad=false;
                });

            },
            goDetail:function (extId) {
                this.$router.push('/answer/detail/?id='+extId)
            },
            follow:function (index) {

                let item = this.list[index];
                let id = item.expertId;
                console.log(item)
                let that=this;
                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+id+"/_userId_", {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            if(item.isFollowed){
                                xqzs.weui.toast("success","收听成功")
                            }else{
                                xqzs.weui.toast("success","取消成功")
                            }
                            item.isFollowed=!item.isFollowed;
                            that.$set(that.list,index,item);

                        }else if(bt.data.status ==900004){
                            xqzs.weui.toast("success","已经收听",function () {

                            })
                        }else if(bt.data.status ==9000003){
                            xqzs.weui.toast("fail","不能收听自己",function () {

                            })
                        }else {
                            xqzs.weui.toast("fail","收听失败",function () {

                            })
                        }
                    });
            },
        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        },

    }


</script>
<style>

    .position_change_detail{
        color:#fff;
        position: absolute;
        top: 0.8rem;left:1.5rem; font-size: 0.88235rem;
    }
    .position_change2{ margin-top: 1rem;}
    .pay_listen{ width: 10.35294117647059rem; height: auto}
    .steal_detail_header{
        padding:0.70588rem 0.88235rem 0 0.88235rem;
        background: #fff;
    }
    .steal_detail_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        color: rgba(36,37,61,0.5);
        font-size: 0.70588rem;
        line-height: 29px;
    }
    .steal_detail_top img{
        display: block;
        height:29px;
        width:29px;
        border-radius: 50%;
        margin-right: 0.588235rem;
        margin-bottom: 0.70588rem;
    }
    .steal_detail_top span{
        color: rgba(36,37,61,1);
    }
    .steal_detail_content{
        color: rgba(36,37,61,1);
        font-size:0.88235rem;
        line-height: 1.35294rem;
        overflow: hidden;
        word-wrap:break-word;
    }
    .steal_detail_answer{
        background: #fff;
        padding-top:1.176471rem;
        margin-bottom: 0.588235rem;
    }
    .steal_answer_top{
        display: flex;
        display: -webkit-flex;
        display: -webkit-box;
        height:2.8235rem;
        line-height: 2.8235rem;
        color: rgba(36,37,61,0.5);
        font-size: 0.8235rem;
        margin-bottom: 0.471rem;
        padding:0 0.88235rem;
    }
    .steal_answer_topimg{
        display: block;
        height:44px;
        width: 44px;
        border-radius: 50%;
        margin-right: 0.588235rem;
    }
    .steal_answer_yy{
        position: relative;
        margin-top:0.176471rem;
        margin-right:0.41176471rem;
    }

     .steal_answer_ly{
        display: block;
        height:2.6471rem;
         width:auto;
         border-radius: 0;
    }
    .steal_answer_zan{
        color:rgba(36,37,61,0.5);
        font-size: 0.70588rem;
        height:0.941176471rem;
        line-height: 0.941176471rem;
        margin-bottom:0.588235rem;
        padding-right: 0.88235rem;
    }
    .steal_answer_zan div{
        float: right;
    }

    .steal_answer_zan div:nth-of-type(2){
        margin-right:1.235rem;
    }
    .steal_answer_zan div:nth-of-type(1) img{
        float: left;
        margin-right:0.29411rem;
    }
    .steal_answer_zan div:nth-of-type(1) span{
        float: left;
        margin-top:1px;
    }
    .steal_answer_sond{
        display: block;
        margin-top:-0.6471rem;
        height:0.941176rem;
        position: absolute;
        top:50%;
        left:0.88235rem;
    }

</style>