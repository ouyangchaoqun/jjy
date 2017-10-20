<template id="my_problem_index">
    <div>
        <div v-title>我的回答</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <div class="my_problem_tabs">
                <div class="my_problem_active">抢答</div>
                <div>一对一解答</div>
            </div>
            <div class="my_problem_box">
            <!--抢答-->
            <div class="problem_box_active">
                <ul class="problem_item">
                    <li v-for="(item,index) in list" v-if="type==1">
                        <div class="problem_item_top">
                            <img :src="item.askUserFaceUrl" alt="">
                            <span>{{item.askUserNickName}}</span>在哪方面：<div>{{item.questionClassName}}</div>
                            <div class="problem_item_right" v-if="item.wageType!=0">
                                <template v-if="item.wageType==4">赏金<i>￥{{formatPrice(item.wage)}}</i></template>
                                <template v-if="item.wageType==5">平分<i>￥{{formatPrice(item.wage)}}</i></template>
                            </div>
                        </div>
                        <div class="problem_item_del">{{item.questionContent}}</div>
                        <div class="problem_answer_info">
                            <img :src="item.expertUserFaceUrl" alt="">
                            <!--回答，专家语音-->
                            <div class="problem_answer_yy" v-if="true">
                                <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                    <div class="audio_btn" @click.stop="play(index)">
                                        <template v-if="!item.playing&&!item.paused">点击播放</template>
                                        <template v-if="item.playing">正在播放..</template>
                                        <template v-if="item.paused">播放暂停</template>
                                        <div class="second">{{item.voiceLength}}”</div>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                                <span class="problem_bestAns" v-if="item.isBestAnswer==1">最佳回答</span>
                                <span class="problem_bestAns" v-if="item.isBestAnswer!=1">非最佳回答</span>
                            </div>
                        </div>
                        <!--回答后底部显示详情-->
                        <div class="problem_answer_bottom">
                            <div class="problem_answer_time"><span>{{formatDateText(item.answerTime)}}</span><span>听过 {{item.listenTimes}}</span></div>
                            <div class="problem_answer_zan">
                                <div  v-if="item.inCome!=0"><span>偷听分成 </span><span style="color:#FF9900">￥{{formatPrice(item.inCome)}}</span></div>
                                <div class="good_care"><span>{{item.likeTimes}}</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--一对一解答-->
            <div>
                <ul class="problem_item">
                    <li v-if="type==2" v-for="(item,index) in list">
                        <div class="problem_item_top">
                            <img :src="item.askUserFaceUrl" alt="">
                            <span>{{item.askUserNickName}}</span>在哪方面：<div>{{item.questionClassName}}</div>
                            <div class="problem_item_right">酬金<i>￥{{formatPrice(item.wage)}} </i></div>
                        </div>
                        <div class="problem_item_del">{{item.questionContent}}</div>
                        <div class="problem_answer_info">
                            <img :src="item.expertUserFaceUrl" alt="">
                            <!--回答，专家语音-->
                            <div class="problem_answer_yy" v-if="true">
                                <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                    <div class="audio_btn" @click.stop="play(index)">
                                        <template v-if="!item.playing&&!item.paused">点击播放</template>
                                        <template v-if="item.playing">正在播放..</template>
                                        <template v-if="item.paused">播放暂停</template>
                                        <div class="second">{{item.voiceLength}}”</div>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                            </div>
                        </div>
                        <!--回答后底部显示详情-->
                        <div class="problem_answer_bottom">
                            <div class="problem_answer_time"><span>{{formatDateText(item.answerTime)}}</span><span>听过 {{item.listenTimes}}</span></div>
                            <div class="problem_answer_zan">
                                <div><span>偷听分成 </span><span style="color:#FF9900">￥{{formatPrice(item.inCome)}}</span></div>
                                <div class="good_care"><span>{{item.likeTimes}}</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </v-scroll>
    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    import scroll from '../../include/scroll.vue';
    import Bus from '../../../js/bus';
    export default {
        data() {
            return {
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText: false,
                showLoad: false,
                list: [],
                type: 1
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            let _this = this;
            $('.my_problem_tabs>div').click(function () {
                $('.my_problem_tabs>div').removeClass('my_problem_active')
                $('.my_problem_box>div').removeClass('problem_box_active')
                $(this).addClass('my_problem_active')
                $('.my_problem_box>div').eq($(this).index()).addClass('problem_box_active')

                if ($(this).index() == 0) {
                    _this.changeType(1);
                } else {
                    _this.changeType(2);
                }
            })
            this.getList();
            xqzs.voice.audio=null;
            xqzs.wx.setConfig(this);
        },
        methods: {
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
            getList: function (done) {
                let expertId = cookie.get('expertId');
                let vm = this;
                let url = web.API_PATH + 'come/expert/query/my/answer/page/' + this.type + '/'+expertId+'/_userId_/' + vm.page + '/' + vm.row;
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

                    if (response.data.status != 1 && vm.page == 1) {
                        vm.list = [];
                        return;
                    }
                    let arr = response.data.data.rows;
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
            changeType: function (v) {
                this.type = v;
                this.page = 1;
                this.list = [];
                this.isPageEnd = false;
                this.isShowMoreText = true;
                xqzs.voice.pause();
                this.getList();
            },
            formatDateText: function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },
            formatPrice:function (price) {
                return xqzs.string.formatPrice(price)
            }

        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        }


    }
</script>
<style>
    .my_problem_tabs{
        color: #333;
        font-size: 0.88235rem;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #eee;
        height:2.35294rem;
        line-height: 2.35294rem;
    }
    .my_problem_tabs>div{
        flex: 1;
        position: relative;
    }
    .my_problem_tabs>div:nth-of-type(1)::after{
        content: '';
        height:1.1176rem;
        width:1px;
        background: #E0E0E0;
        position: absolute;
        right:0;
        top:50%;
        margin-top:-0.5588rem;
    }
    .my_problem_active{
        border-bottom: 2px solid rgba(253,114,6,1);
    }
    .my_problem_box{
        position: relative;
        width: 100%;
        height:auto;
    }
    .my_problem_box>div{
        display: none;
        width:100%;
    }
    .my_problem_box .problem_box_active{
        display: block;
    }
    .problem_item li{
        padding:0.88235rem 0.88235rem 0.588235rem 0.88235rem;
        background: #fff;
        margin-bottom: 0.588235rem;
    }
    .problem_item_top{display: -webkit-box;display: -webkit-flex;display: flex;font-size: 12px;line-height: 34px;color:#999;position: relative}
    .problem_item_top span{color:#666;margin-right: 10px;}
    .problem_item_top i{font-style: normal;color:#FF9900;margin-left: 5px}
    .problem_item_top img{
        width:34px;
        height:34px;
        display: block;
        border-radius: 50%;
        margin-right: 10px;
    }
    .problem_item_right{position: absolute;right:0}
    .problem_item_del{color:#333;font-size: 15px;line-height: 20px;padding-left:44px;margin-bottom: 1.176471rem}
    .problem_answer_info{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 2.8235rem;
        height:2.8235rem;
        font-size: 0.8235rem;
        color: #999;
        margin-bottom: 0.88235rem;
    }
    .problem_answer_info img{
        height:44px;
        display: block;
        width:44px;
        border-radius: 50%;
        margin-right: 0.6rem;
    }
    .problem_answer_yy{
        position: relative;
        margin-top: 3px;
    }
    .problem_answer_yy .problem_answer_ly{
        display: block;
        width:10.235rem;
        border-radius: 0;
    }
    .problem_answer_play{
        position: absolute;
        color: #fff;
        font-size: 0.88235rem;
        width: 5.88235rem;
        left: 50%;
        margin-left: -2.941175rem;
        text-align: center;
        top:50%;
        line-height: 1;
        margin-top:-0.6471rem;
    }
    .answer_play_time{
        position: absolute;
        line-height: 1;
        height:1.176471rem;
        top:50%;
        right:-2rem;
        margin-top:-10px;
    }
    .problem_bestAns{
        color: #44A3FF;
        font-size: 0.70588235rem;
        position: absolute;
        right:-6.6rem;
        top:0;
        line-height: 1;
        top:50%;
        margin-top:-10px;

    }
    .problem_answer_info .problem_answer_sond{
        height:16px;
        display: block;
        position: absolute;
        width:auto;
        top:50%;
        margin-top:-0.588235rem;
        left:0.88235rem;
    }
    .problem_answer_bottom{
        padding:0;
        margin:0;
    }
    .problem_answer_time span:nth-of-type(1){margin-right:20px}
</style>