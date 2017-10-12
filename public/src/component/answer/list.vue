<template  >
    <div style="height: 100% " class="answer_list_box" :class="{wbg:list.length==0}">

        <div v-title>找专家</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="main_title" v-if="list.length==0">{{name}}</div>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd" :bottomHeight="0"
                  :isShowMoreText="isShowMoreText" v-if="list.length>0">
            <div class="main_title">{{name}}</div>
            <div class="answer_list">
                <div class="item" v-for="(item,index) in list">
                    <div @click="goDetail(item.expertId)">
                        <div class="img"><img :src="item.faceUrl"></div>
                        <div class="info">
                            <div class="title">{{item.sign}}</div>
                            <div class="address"><span>{{item.nickName}}</span> {{item.province}}-{{item.city}}</div>
                            <div class="class_s">
                                <span v-for="good in item.goodAt">{{good.title}}</span>
                                <div class="clear"></div>
                            </div>
                            <div class="other">问价 <span class="price">¥{{item.price}}</span> <span class="ml" v-if="item.answerCount!=null">{{item.answerCount}}个回答</span><span class="ml" v-if="item.listenCount!=null">{{item.listenCount}}次被偷听</span></div>


                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                <div class="audio_btn" @click.stop="play(index)">
                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                    <template v-if="item.playing">正在播放..</template>
                                    <template v-if="item.paused">播放暂停</template>
                                </div>
                                <div class="minute">60"</div>
                                <div class="clear"></div>
                            </div>

                        </div>
                        <div class="clear"></div>
                    </div>
                </div>

            </div>

        </v-scroll>
        <div class="no_body" v-show="list.length==0">

            <!--<div class="img"></div>-->
            <!--<div class="txt">暂无该方面专家</div>-->
                <div class="no_body_box">
                    <img src="../../images/asker/newNoContent.png" alt="">
                    <div class="nocontent_html">暂无该方面问题</div>
                    <div class="nocontent_bottom">我们会尽快安排该方面专家入驻</div>
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
                list:[],
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false,name:''
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },

        mounted: function () {
            this.name= this.$route.query.name;
            this.getList();
            xqzs.voice.audio=null;
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
                let item= list[index];
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
                        this.getVoiceUrl(item.expertId,function (url) {
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
            goDetail:function (extId) {

                this.$router.push('./detail?id='+extId)
            },
            getList: function () {

                let vm= this;
                let classId= vm.$route.query.id;

                let url = web.API_PATH + "come/expert/get/by/class/"+classId+"/"+vm.page+"/"+vm.row+"";

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

                    if(response.data.status==9000003){
                        vm.list = [];
                        return;
                    }
                    let arr = response.data.data;
//
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

        }

    }
</script>
<style>
    .answer_list_box .audio{margin-top: 0.8rem;}
    .answer_list_box .main_title{
        font-size: 0.8823529411764706rem;
        text-align: center;
        background:#F4F4F7;
        color:#999; line-height: 2.588235294117647rem;
         margin-bottom: -0.5882352941176471rem;
    }
    .no_body_box{text-align: center;}
    .no_body_box img{display: block;width:100%;}
    .no_body_box .nocontent_html{color:rgba(149,151,157,1);font-size: 0.88235rem;margin-top:-3.8rem}
    .no_body_box .nocontent_bottom{color:rgba(195,197,205,1);font-size: 0.6471rem}
    .answer_list_box .no_body{ background: #fff;  position: absolute; top:2.588235294117647rem; left:0; width: 100%}
    .answer_list_box .no_body .img { background: url(../../images/answer/no_body.png); width: 4.852941176470588rem; ;height: 5.823529411764706rem; background-size:4.852941176470588rem; margin: 0 auto; margin-top: 5rem; }
    .answer_list_box .no_body .txt{ color:#B3B3B3;font-size: 0.7647058823529412rem; text-align: center; width: 100%; margin-top: 0.8rem;}
</style>