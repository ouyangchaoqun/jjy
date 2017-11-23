<template >
    <div style="height: 100%" class="asker_my_coment_list wbg">
        <div v-title>我的评价</div>
        <div class="nothing comment" v-if="list.length==0&&!showLoad">
            <div>
                <img src="../../../images/asker/newNoContent.png" alt="">
                <div class="nothing_bottom">
                    <p>您还没有过任何评价</p>
                    在我问的问题中可以进行评价
                    <div @click="goComment()">去评价</div>
                </div>
            </div>

        </div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText"  v-if="list.length>0">
            <div class="top_tip">共{{list.length}}条评价</div>
            <div class="list">
                <div class="item" v-for="(item,index) in list">
                    <div class="comment">
                        <div class="img"><img  :src="item.userFaceUrl"></div>
                        <div class="info">
                            <div class="times">{{formatTime(item.addTime)}}&nbsp; &nbsp;评价了<span>{{item.expertNickName}}</span>的回答</div>
                            <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span></div>
                            <div class="content">
                              {{item.content}}
                            </div>
                            <!--<div class="tags">-->
                                <!--<span v-for="i in item.tags">{{i.title}}</span>-->

                            <!--</div>-->
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="reply" v-if="item&&item.replyContent!=undefined&&item.replyContent!=''">
                        <span>专家回复：</span>{{item.replyContent}}
                    </div>
                    <div class="question">
                        <div class="content">{{item.questionContent}}</div>
                        <div class="answer">
                            <div class="img"><img  :src="item.expertFaceUrl"></div>

                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                <div class="audio_btn" @click.stop="play(index)">
                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                    <template v-if="item.playing">正在播放..</template>
                                    <template v-if="item.paused">播放暂停</template>
                                    <div class="second">{{item.length}}”</div>
                                </div>

                                <div class="clear"></div>
                            </div>


                        </div>
                    </div>
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
                list:[]
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },

        mounted: function () {
            this.getList();
            xqzs.wx.setConfig(this);
        },
        methods:{

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

            goComment:function () {
                this.$router.push('../ask/list')
            },
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time)
            },

            getList: function (done) {

                let vm= this;
                let url =web.API_PATH + 'come/user/query/comment/page/_userId_/'+vm.page+'/'+vm.row;

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
                    console.log(response)

                    if(response.data.status!=1&&vm.page==1){
                        vm.list = [];
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    let arr = response.data.data;
//
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

    }
</script>
<style>

   .asker_my_coment_list .item{ padding: 0.88235rem; border-bottom: 0.7058823529411765rem solid #F4F4F7;}
    .asker_my_coment_list .comment .img{ width: 2.35294rem; height: 100%; float:left; margin-right: 0.5rem;}
    .asker_my_coment_list .comment .img img{width: 2.35294rem; height:2.35294rem; border-radius: 50%;display: block;border:0.5px solid rgba(238,234,234,1)}
    .asker_my_coment_list .comment .info{     max-width: 17rem;float:left;}
    .asker_my_coment_list  .comment .info .times{ color:rgba(36,37,61,0.7); font-size:0.7058823529411765rem; }
    .asker_my_coment_list .comment .info .times span{ font-weight: bold; color:rgba(36,37,61,1)}
    .asker_my_coment_list .comment .info .content{ color:rgba(36,37,61,1); font-size: 0.8235294117647059rem; margin: 0.2rem  0}
    .asker_my_coment_list .comment .info .tags{}
    .asker_my_coment_list .comment .info .tags span{ display: inline-block;
        border:1px solid rgba(36,37,61,0.5); color:rgba(36,37,61,0.5); text-align: center; line-height: 1.323529411764706rem; border-radius: 0.6617647058823529rem; padding: 0 0.5rem; font-size:0.7058823529411765rem; margin-right: 0.3rem;}
    .asker_my_coment_list .comment .info .star span{ display: inline-block; background: url(../../../images/starNew_no.png) no-repeat; background-size: 0.85294rem;  height: 0.85294rem; width: 0.85294rem; margin-right: 0.4rem; }
    .asker_my_coment_list .comment .info .star span.on{background: url(../../../images/starNew.png) no-repeat;background-size: 0.85294rem; }

    .asker_my_coment_list .reply{ background: #F1F1F5;  font-size:0.7058823529411765rem; color:rgba(36,37,61,1); padding:0.5rem ; border-radius: 0.3rem; position: relative; margin-top: 0.88rem }
   .asker_my_coment_list .reply span{color:rgba(36,37,61,0.5);}
    .asker_my_coment_list .reply:before{ content:" " ; display: block; position: absolute; left:0.8rem; top:-0.6rem;  width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.7rem solid #F1F1F5;}


    .asker_my_coment_list .answer .img{ width: 2rem; height: 2rem; float:left; margin-top: 0.2rem;  margin-right: 0.88235rem;}
    .asker_my_coment_list .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_coment_list .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_coment_list .question{ border: 0.1470588235294118rem solid #F1F1F5; border-radius: 0.4rem; padding: 0.6176470588235294rem; margin-top:0.5882352941176471rem; color:rgba(36,37,61,0.7); font-size: 0.76471rem  }
    .asker_my_coment_list .question .content{ margin-bottom: 0.88325rem}

</style>