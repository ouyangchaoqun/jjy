<template>
    <div style="height: 100%" class="asker_my_listen_list_box wbg">

        <div v-title>我的偷听</div>
        <div class="nothing listen" v-if="list.length==0">
            没有任何偷听
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
                                </div>
                                <div class="minute">{{item.answerVoiceLength}}"</div>
                                <div class="clear"></div>
                            </div>


                        </div>
                        <div class="others">
                            <div class="time">{{formatTime(item.answerTime)}}</div>
                            <div class="listen_count">听过 {{item.listenTimes}}</div>
                            <div class="good">{{item.likeTimes}}</div>
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
                isShowMoreText:true,
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

        },
        methods:{

            play:function (index) {
                let _this=this;
                let list = _this.list;
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
            goDetail:function (questionId) {
              this.$router.push("/asker/listen/detail?questionId="+questionId)
            },
            getList: function () {

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
                this.getList();
                done() // call done
            },
        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        },


    }
</script>
<style>
    .asker_my_listen_list_box .questCount{height:2.588235rem;text-align: center;background: #F4F4F7;font-size: 0.88235rem;line-height: 2.588235rem;color:#999;}
    .asker_my_listen_list_box .item{ border-bottom: 1px solid #eee; padding-bottom: 0.85rem;}
    .asker_my_listen_list_box .nothing.listen{ background: url(../../../images/asker/nothing_listen.png) no-repeat center top; background-size: 4.5rem; }
    .asker_my_listen_list_box .question{ padding: 0.88235rem;display: flex;display: -webkit-box;display: -webkit-flex;}
    .asker_my_listen_list_box .question .img{border-radius: 50%; width:2rem; height: 2rem;display: block; margin-right:0.8235294117647059rem;}
    .asker_my_listen_list_box .question .title{ font-size: 0.88235rem; color:#333 }

    .asker_my_listen_list_box .answer .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; margin-left: 0.88235rem; margin-right: 0.5rem;}
    .asker_my_listen_list_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_listen_list_box .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_listen_list_box .answer .audio .audio_btn{ width: 47%}

    .asker_my_listen_list_box .others{ color:#999; position: relative; font-size: 0.7058823529411765rem; padding: 0 0.88235rem; margin-top: 1.1rem;}
    .asker_my_listen_list_box .others .listen_count{ position: absolute; right:4.5rem; top:0}
    .asker_my_listen_list_box .others .good{ position: absolute; right:0.88235rem; top:0; background: url(../../../images/asker/zan_nor.png) no-repeat; background-size: 0.9411764705882353rem; padding-left: 1.3rem; background-position: 0.1rem;}




</style>