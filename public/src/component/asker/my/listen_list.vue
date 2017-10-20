<template>
    <div style="height: 100%" class="asker_my_listen_list_box wbg">
        <div v-title>我的偷听</div>
        <div class="nothing listen" v-if="list.length==0&&!showLoad">
            <img src="../../../images/asker/newNoContent.png" alt="">
            <div class="nothing_bottom">
                <p>您还没有偷听</p>
                在偷听页面可以点击播放按钮进行偷听
                <div @click="goAsk()">去偷听</div>
            </div>
        </div>

        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText"  v-if="list.length>0">
            <header class="questCount">共{{count}}个问题</header>
            <div class="list">
                <div class="item" v-for="(item,index) in list">
                    <a @click="goDetail(item.questionId)">
                        <div class="question">
                            <img class="img" :src="item.questionUserFaceUrl" alt="">
                            <div class="title">{{item.question}}
                            </div>
                        </div>
                        <div class="answer">
                            <div class="img"><img
                                   :src="item.expertFaceUrl">
                            </div>
                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                <div class="audio_btn" @click.stop="play(index)">
                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                    <template v-if="item.playing">正在播放..</template>
                                    <template v-if="item.paused">播放暂停</template>
                                    <div class="second">{{item.answerVoiceLength}}”</div>
                                </div>

                                <div class="clear"></div>
                            </div>


                        </div>
                        <div class="others">
                            <div class="time">{{formatTime(item.answerTime)}}</div>
                            <div class="others_right">
                                <div class="listen_count">听过 {{item.listenTimes}}</div>
                                <div class="good_care" :class="{good_cared:item.isCared}" @click.stop="like(index)">
                                    <span>{{item.likeTimes}}</span>
                                </div>
                            </div>

                        </div>
                    </a>
                </div>
            </div>
        </v-scroll>
    </div>

</template>

<script type="es6">


    import showLoad from '../../include/showLoad.vue';
    import scroll from '../../include/scroll.vue';
    import Bus from '../../../js/bus.js';
    export default {
        data() {
            return {
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                list:[],
                count:null
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },

        mounted: function () {
            this.getList();
            xqzs.voice.audio=null;
            xqzs.wx.setConfig(this);

        },
        methods:{
            initActive:function () {

                var obj =  $(".asker_my_listen_list_box .item")
                xqzs.weui.active(obj);

                $(".good , .audio ").on("touchstart",function () {
                    event.stopPropagation();
                })
            },
            like:function (index) {
                let  item = this.list[index];
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
                            _this.$set(_this.list,index,item);
                        }
                    });
            },
            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            play:function (index) {
                this.initVoice();
                let _this=this;
                let list = _this.list;
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.list,index,list[index])
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.list,i,list[i]);
                    }
                }
                let item= this.list[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    list[index].paused=false;
                    list[index].playing=true;
                    _this.$set(_this.list,index,list[index])
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        list[index].paused=true;
                        list[index].playing=false;
                        _this.$set(_this.list,index,list[index])
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        let answerId= item.answerId;
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.list,index,list[index])
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


            formatTime:function (time) {
              return xqzs.dateTime.formatDateTime(time)
            },
            goAsk:function () {
                this.$router.push("/asker/listen")
            },
            goDetail:function (questionId) {
              this.$router.push("/asker/listen/detail?questionId="+questionId)
            },
            getList: function (done) {

                let vm= this;
                let url =web.API_PATH + 'come/user/query/listen/page/_userId_/'+vm.page+'/'+vm.row;

                this.rankUrl = url + "?";
                if (web.guest) {
                    this.rankUrl = this.rankUrl + "guest=true"
                }
                if (vm.isLoading || vm.isPageEnd) {
                    return;
                }

                if (vm.page == 1) {
                    vm.showLoad = true;
                }

                vm.isLoading = true;
                vm.$http.get(vm.rankUrl).then((response) => {
                    if(done&&typeof(done)==='function'){
                        done()
                    }
                    vm.showLoad = false;
                    vm.isLoading = false;
//                    console.log(response)

                    if(response.data.status!=1&&vm.page==1){
                        vm.list = [];
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    let arr = response.data.data.rows;
//
                    vm.count =response.data.data.total
                    if (arr.length < vm.row) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false
                    }else{
                        vm.isShowMoreText =true;
                    }
                    Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);



                    if (vm.page == 1) {
                        vm.list = arr;
                    } else {
                        vm.list = vm.list.concat(arr);
                    }
                    if (arr.length == 0) return;
                    vm.page = vm.page + 1;


                }, (response) => {
                    vm.isLoading = false;
                    vm.showLoad = false;
                });

            },
            onInfinite(done) {
                this.getList(done);
            },
        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        },
        updated:function () {
            this.initActive()
        }




    }
</script>
<style>
    .asker_my_listen_list_box .questCount{height:2.588235rem;text-align: center;background: #F4F4F7;font-size: 0.88235rem;line-height: 2.588235rem;color:#999;}
    .asker_my_listen_list_box .item{ border-bottom: 1px solid #eee; padding-bottom: 0.85rem;}
    .asker_my_listen_list_box .question{ padding: 0.88235rem;display: flex;display: -webkit-box;display: -webkit-flex;}
    .asker_my_listen_list_box .question .img{border-radius: 50%; width:2rem; height: 2rem;display: block; margin-right:0.8235294117647059rem;}
    .asker_my_listen_list_box .question .title{ font-size: 0.88235rem; color:#474747 }

    .asker_my_listen_list_box .answer .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; margin-left: 0.88235rem; margin-right: 0.5rem;}
    .asker_my_listen_list_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_listen_list_box .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_listen_list_box .answer .audio .audio_btn{ width: 47%}

    .asker_my_listen_list_box .others{ color:#999; position: relative; font-size: 0.7058823529411765rem; padding: 0 0.88235rem; margin-top: 1.1rem;}
    .asker_my_listen_list_box .others .listen_count{ float:left;    margin-right: 0.588235rem;}


    .asker_my_listen_list_box .others .others_right{position: absolute;right:0.8rem;top:0}

</style>