<template >
    <div style="height: 100%" class="answer_index">
        <div v-title>找专家</div>
        <v-showLoad v-if="showLoad"></v-showLoad>


        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :isShowMoreText="isShowMoreText" :bottomHeight="50">
            <div class="class_list">
                <div class="class_item" v-for="(item,index) in classList" @click="goClass(item.id)"
                     :class="'aaa_'+item.code">
                    <div class="addClassImg" :class="{clickImg:index==0}"></div>
                    <span>{{item.title}}</span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="answer_list">
                <div class="item" v-for="(item,index) in list">
                    <div @click="goDetail(item.expertId)">
                        <div class="itemHeader">
                            <div>{{item.nickName}} <span>{{item.city}}</span></div>
                            <div class="header_addRightStyle">
                                <div class="headerImg" @click.stop="play(index)">
                                    <div :class="{addPlaying:item.playing,addPaused:item.paused}"></div>
                                </div>
                                {{item.length}}''
                            </div>

                        </div>
                        <div class="itemDetail">
                            <div class="img"><img :src="item.faceUrl"></div>
                            <div class="itemDetail_right">
                                <div class="title">{{item.sign}}</div>
                                <div class="itemDetail_class_s">
                                    <span v-for="(good,goodIndex) in item.goodAt" class="tab_i_i">{{good.title}}</span>
                                </div>
                                <div class="class_s other"><span class="price"><b>问价</b>¥{{item.price}}</span> <span
                                        class="ml"
                                        v-if="item.answerCount!=null">{{item.answerCount}}个回答</span><span
                                        class="ml" v-if="item.listenCount!=null">{{item.listenCount}}次被偷听</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item" v-for="(item,index) in list" v-if="true">
                    <div @click="goDetail(item.expertId)">
                        <div class="info">
                            <div class="problem_answer_yy">
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
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="noContent_icon" v-if="noContent">
                    <img src="../../images/asker/newNoContent.png" alt="">
                    <div>暂无该方面问题</div>
                </div>
            </div>
        </v-scroll>

        <v-asker-bottom  tabOnIndex="1"></v-asker-bottom>
    </div>
</template>

<script type="es6">
    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';
    import askerBottom from "../asker/include/bottom.vue";

    export default {
        data() {
            return {
                classList:[],
                list:[],
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                classId:0,
                noContent:false

            }
        },

        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll,
            "v-asker-bottom": askerBottom
        },
        methods: {
            initActive:function () {
                var obj =  $(".answer_list .item")
                xqzs.weui.active(obj);

                $(".audio ").on("touchstart",function () {
                    event.stopPropagation();
                })
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
                let item= list[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    console.log(1)
                    item.paused=false;
                    item.playing=true;
                    _this.$set(_this.list,index,item)
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        console.log(2)
                        item.paused=true;
                        item.playing=false;
                        _this.$set(_this.list,index,item)
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        this.getVoiceUrl(item.expertId,function (url) {
                            console.log(3)

                            if(url!=null&&url!=undefined&&url!=''){
                                xqzs.voice.play(url);
                                item.playing=true;
                                item.paused=false;
                                _this.$set(_this.list,index,item)
                            }

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
                this.$router.push('/answer/detail/?id='+extId)
            },
            goClass:function (classId) {
//                this.$router.push('./list?id='+item.id+"&name="+item.title)
                let _this = this;
                _this.classId  = classId;
                _this.page = 1;
                _this.isPageEnd = false;
                _this.getList()
            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.classList= data.body.data
                        _this.classList.splice(0,0,{id:0,title:'全部',code:'qb'})
                    }
                }, function (error) {
                });
            },
            getList: function (done) {

                let vm= this;
                let url = web.API_PATH + "come/expert/get/by/class/"+vm.classId+"/"+vm.page+"/"+vm.row+"";
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

                    if(response.data.status==9000003){
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
                    if(vm.list.length==0&&vm.page==1){
                        vm.noContent = true
                    }else{
                        vm.noContent = false
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
        mounted: function () {
            xqzs.wx.setConfig(this);
            $(".weui-tab__panel").height($(window).height()-50)
            this.getClassList();
            this.getList(0);
            xqzs.voice.audio=null;

        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        },
        updated:function () {
            this.initActive()
            let h = $(window).height() - $('.class_list').outerHeight(true)-$('.asker_bottom_box').outerHeight(true)
            $('.noContent_icon').height(h);
            $('.class_item').click(function () {
                $('.class_item div').removeClass('clickImg');
                $(this).find('div').addClass('clickImg');
            })
        }

    }
</script>
<style>
    .header_addRightStyle{position: absolute;right:0;top:-1px;display: flex;color:rgba(36,37,61,0.5);font-size: 0.70588rem;font-weight:normal}
    .answer_list .headerImg{width:1.471rem;height:1.471rem;border-radius: 50%;border:1px solid rgba(253,87,57,1);position: relative;margin-right: 0.35rem;}
    .answer_list .headerImg div{background: url("../../images/playing3.png") no-repeat;content: '';width:0.88235rem;height:0.76471rem;position: absolute;left:5px;top:6px;background-size:100%;}
    .answer_list .headerImg .addPlaying{
        animation: addPlaying 1.5s infinite;
        -webkit-animation: addPlaying 1.5s infinite;
    }
    .answer_list .headerImg img{width:0.88235rem;height:0.76471rem;display: inline-block;margin-left: 0.3rem;}
    .answer_list .class_s .price{color:#FE7301}
    .answer_list .class_s .price b{color:rgba(36,37,61,0.5);font-style: normal;font-weight: normal;}
   .answer_index  .class_list{  padding:0.47rem 0;background: #fff;}
   .answer_index  .class_list .class_item:active{ background:#f1f1f1}
   .answer_index  .class_list .class_item{  float:left ; width: 20%; text-align: center;color:#696969;font-size: 0.6176471rem;padding: 6px 0 ; }
.itemDetail_class_s{font-size: 0.70588rem;color:rgba(36,37,61,0.5);position: absolute;bottom: 24%;}
   .answer_list .info .other{margin-bottom: 0.88235rem}
    .addClassImg{height:2.59rem; width:2.6176471rem; margin:0 auto;margin-bottom: 0.3529411rem;background: url("../../images/answer/index_class_nor.png") no-repeat;background-size: 22.0588235rem;}
   .clickImg{background: url("../../images/answer/index_class_per.png") no-repeat;background-size: 22.0588235rem;}
    .class_list>div:nth-of-type(1) div{background-position:-0.88235rem -1.02941rem}
   .class_list>div:nth-of-type(2) div{background-position:-5.235rem -1.02941rem }
   .class_list>div:nth-of-type(3) div{background-position:-9.6764rem -1.02941rem }
   .class_list>div:nth-of-type(4) div{background-position:-14.11764rem -1.02941rem }
   .class_list>div:nth-of-type(5) div{background-position:-18.5294rem -1.02941rem }
   .class_list>div:nth-of-type(6) div{background-position:-0.88235rem -5.76471rem }
   .class_list>div:nth-of-type(7) div{background-position:-5.20588rem -5.76471rem }
   .class_list>div:nth-of-type(8) div{background-position:-9.6764rem -5.76471rem }
   .class_list>div:nth-of-type(9) div{background-position:-14.088235rem -5.76471rem }
    .class_list>div:nth-of-type(10) div{background-position:-18.5294rem -5.76471rem }
    .answer_index .noContent_icon{background: #fff;color:rgba(36,37,61,0.5);font-size: 0.76471rem;text-align: center;}
    .answer_index .noContent_icon div{margin-top: -3.8rem;}

    @keyframes  addPlaying {
        0%{
            background: url("../../images/playing1.png") no-repeat;
            background-size:20%;
        }
        50%{
            background: url("../../images/playing2.png") no-repeat;
            background-size:100%;
        }
        100%{
            background: url("../../images/playing3.png") no-repeat;
            background-size:100%;
        }
    }
    .answer_index .itemDetail_class_s .tab_i_i{ color: #FF9966;background:rgba(204,204,204,0.3);; border-radius:0.1470588235294118rem ; padding: 0.2rem 0.3rem; margin: 0 0.3rem; }
    .answer_index .itemDetail_class_s .tab_i_i:first-child{ margin-left: 0;}

</style>