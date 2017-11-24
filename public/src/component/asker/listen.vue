<template id="stealListen_index">
    <div class="asker_listen_box" :class="{wbg:navLists[typeIndex].list.length==0 }">
        <!--头部导航栏-->
        <div v-title>偷听</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="weui-tab__panel main">
            <nav>
                <div class="swiper-container navSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="navList in navLists" :value="navList.id">{{navList.title}}</div>
                    </div>
                </div>
            </nav>
            <div>
                <div class="swiper-container con_swiper_c">
                    <div class="swiper-wrapper">

                        <div class="swiper-slide" v-for="navList in navLists">
                            <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                                      :bottomHeight="92"
                                      :isShowMoreText="isShowMoreText">
                                  <div class="index_box">
                    <div v-if="navList.list.length>0" class="index_content_active">
                        <ul>
                            <li v-for="(item,index) in navList.list">
                                <a @click="goDetail(item.questionId)">
                                    <div class="index_li_header">
                                        <img :src="item.expertFaceUrl" alt=""><div>{{item.expertName}} <span>回答了</span></div>
                                    </div>
                                    <div class="index_li_content">{{item.content}}</div>
                                    <div class="index_li_bottom">

                                        <!--免费听-->
                                        <span class="problem_answer_yy"  v-if="item.answerType==1">
                                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                                <div class="audio_btn" @click.stop="play(index)">
                                                    <div class="radio"><span></span><i></i></div>
                                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                                    <template v-if="item.playing">正在播放..</template>
                                                    <template v-if="item.paused">播放暂停</template>
                                                    <div class="second">{{item.length}}”</div>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                        </span>

                                        <!--付费听-->
                                        <div class="problem_answer_yy" @click.stop="pay(index)" v-if="item.answerType==2||item.answerType==4">
                                            <div class="audio">
                                                <div class="audio_btn pay" >1元偷听
                                                    <div class="second">{{item.length}}”</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--限时免费听-->
                                        <span class="problem_answer_yy"   v-if="item.answerType==3">
                                            <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                                                <div class="audio_btn"  @click.stop="play(index)" >
                                                    <template v-if="!item.playing&&!item.paused">限时免费听</template>
                                                    <template v-if="item.playing">正在播放..</template>
                                                    <template v-if="item.paused">播放暂停</template>
                                                    <div class="second">{{item.length}}”</div>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                        </span>

                                        <div class="index_li_count">听过{{item.listenTimes}}</div>
                                    </div>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div v-show="navLists[typeIndex].list.length==0&&!showLoad">
                        <div class="index_nocontent">
                            <div>
                                <img src="../../images/asker/newNoContent.png" alt="">
                                <div class="nocontent_html">暂无该方面问题</div>
                            </div>

                        </div>
                    </div>

                </div>
                            </v-scroll>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <v-asker-bottom tabOnIndex="0"></v-asker-bottom>



    </div>

</template>
<script>
    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';
    import askerBottom from "./include/bottom.vue";
    var stealListen_index = {
        template: '#stealListen_index'
    };
    export default {
        data() {
            return {
                navLists:[
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false},
                    {title:'',list:[],page: 1,isPageEnd:false}
                ],
                typeIndex:0,
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                type:0,
                stopState:false,
            }
        },


        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll,
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            console.log("bbbb")
            this.getClassList()
            this.getList();
            xqzs.voice.audio=null;
            xqzs.wx.setConfig(this);
        },
        methods:{
            initView:function () {
                let _this=this;
                var minHeight = $(window).height()-$('nav').height()-100;
                $(".con_swiper_c .swiper-slide ").height($(document).height()-92)
                //$('.index_box').css('minHeight',minHeight)
                $('.index_nocontent').css('minHeight',minHeight)
                var navSwiper = new Swiper('.navSwiper', {
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                });
                $('.navSwiper .swiper-slide').eq(0).addClass('nav_active');
                var conSwiper;
                navSwiper.on('tap', function(swiper) {
                    //效果
                    _this.initTopView(navSwiper,navSwiper.clickedIndex);
                    conSwiper.slideTo(navSwiper.clickedIndex);

                });

                conSwiper = new Swiper('.con_swiper_c', {
                    onSlideChangeStart: function(){
                        _this.initTopView(navSwiper,conSwiper.activeIndex);

                        _this.type = $('.navSwiper .swiper-slide').eq(conSwiper.activeIndex).attr("value");
                        _this.typeIndex=conSwiper.activeIndex;
                        //数据
                        _this.navLists[ _this.typeIndex].isPageEnd = false;
                        _this.isShowMoreText = false;
                        _this.getList();

                        console.log('触发.....')
                    }

                 });

            },
            initTopView:function (navSwiper,index) {
                var swiperWidth = $('nav').width() //获取导航条宽度
                var maxTranslate = navSwiper.maxTranslate();//移动位置
                var maxWidth = -maxTranslate + swiperWidth / 2;
                $('.navSwiper .swiper-slide').removeClass('nav_active')
                $('.navSwiper .swiper-slide').eq(index).addClass('nav_active')
                var slide = navSwiper.slides[index]
                var slideLeft = slide.offsetLeft
                var slideWidth = slide.clientWidth
                var slideCenter = slideLeft + slideWidth / 2
                navSwiper.setWrapperTransition(300)
                if (slideCenter < swiperWidth / 2) {
                    navSwiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    navSwiper.setWrapperTranslate(maxTranslate)
                } else {
                    var nowTlanslate = slideCenter - swiperWidth / 2
                    navSwiper.setWrapperTranslate(-nowTlanslate)
                }
            },
            initActive:function () {
                var obj =  $(".index_box li")
                xqzs.weui.active(obj);

                $(".audio ,.index_li_voice ").on("touchstart",function () {
                    event.stopPropagation();
                })
            },
            timeout:function () {
                let _this = this;
                  setTimeout(function () {
                      time--;
                      if(time!=0&&!_this.stopState){
                          timeout()
                      }
                  },1000)
            },
            pay:function (index) {
                let  item = this.navLists[this.typeIndex].list[index];
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
                let item = this.navLists[this.typeIndex].list[index];
                item.answerType=1;
                this.$set(this.navLists[this.typeIndex].list,index,item);
                this.$nextTick(function () {
                    this.initActive();
                })

            },
            initVoice:function () {
                console.log("xqzs.voice.audio"+xqzs.voice.audio);
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            play:function (index) {
                this.initVoice();
                let _this=this;
                let list = _this.navLists[_this.typeIndex].list;
               var T = list[index].length;
                console.log(T)
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.navLists[_this.typeIndex].list,index,list[index])
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.navLists[_this.typeIndex].list,i,list[i]);
                    }
                }
                let item= _this.navLists[_this.typeIndex].list[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    list[index].paused=false;
                    list[index].playing=true;
                    _this.$set(_this.navLists[_this.typeIndex].list,index,list[index])
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        list[index].paused=true;
                        list[index].playing=false;
                        _this.$set(_this.navLists[_this.typeIndex].list,index,list[index])
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        let answerId= item.answerId;
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.navLists[_this.typeIndex].list,index,list[index])
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
            goDetail:function (questionId) {
              this.$router.push("/asker/listen/detail/?questionId="+questionId)
            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        let arr =[{"title":"全部",id:0,list:[]}]
                        _this.navLists= data.body.data
                        _this.navLists =arr.concat(_this.navLists);
                        for(let i=0;i<_this.navLists.length;i++){
                            _this.navLists[i].list = [];
                            _this.navLists[i].page = 1;
                            _this.navLists[i].isPageEnd=false;
                            _this.navLists[i].isLoading=false;
                        }
                        _this.initView();
                    }
                }, function (error) {
                });
            },
            getList: function (done) {

                let vm= this;
                console.log(vm.navLists[ vm.typeIndex])
                let url =web.API_PATH + 'come/listen/listen/list/_userId_/'+vm.type+'/'+vm.navLists[ vm.typeIndex].page+'/'+vm.row;
                this.rankUrl = url + "?";
                if (web.guest) {
                    this.rankUrl = this.rankUrl + "guest=true"
                }
                if (vm.navLists[ vm.typeIndex].isLoading || vm.navLists[ vm.typeIndex].isPageEnd) {
                    return;
                }
                if (vm.navLists[ vm.typeIndex].page == 1) {
                    vm.showLoad = true;
                }
                vm.navLists[ vm.typeIndex].isLoading = true;
                vm.$http.get(vm.rankUrl).then((response) => {
                    if(done&&typeof(done)==='function'){
                        done()
                    }
                    vm.showLoad = false;
                    vm.navLists[ vm.typeIndex].isLoading = false;
//                    console.log(response)

                    if(response.data.status!=1&&vm.navLists[ vm.typeIndex].page==1){
                        vm.navLists[vm.typeIndex].list = [];
                        vm.navLists[ vm.typeIndex].isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    let arr = response.data.data;
//
                    if (arr.length < vm.row) {
                        vm.navLists[ vm.typeIndex].isPageEnd = true;
                        vm.isShowMoreText = false
                    }else{

                        vm.isShowMoreText = true;
                    }
                    Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);

                    if (vm.navLists[ vm.typeIndex].page == 1) {
                        vm.navLists[vm.typeIndex].list = arr;
                    } else {
                        vm.navLists[vm.typeIndex].list =  vm.navLists[vm.typeIndex].list.concat(arr);
                    }
                     if (arr.length == 0) return;
                    vm.navLists[ vm.typeIndex].page = vm.navLists[ vm.typeIndex].page + 1;
                    vm.$nextTick(function () {
                        vm.initActive()
                    });


                }, (response) => {
                    vm.navLists[ vm.typeIndex].isLoading = false;
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
    .con_swiper_c .swiper-slide{ overflow-y: scroll}
   .asker_listen_box .audio .audio_btn{ width: 52%}
    .index_li_bottom .problem_answer_yy{width:100%}
    .index_li_bottom .problem_answer_play{margin-left:0;left:12%;}
    nav{
        width: 100%;
        background: #FDFDFD;
        height:2.471rem;
        line-height: 2.471rem;
        font-size: 0.8235rem;
        color: rgba(36,37,61,1);
        text-align: center;
        border-bottom: 1px solid #E0E0E1;
    }
    .navSwiper .swiper-slide{
        width:4rem;
    }
    .nav_active{
        color:#FE7301;
        position: relative;
        transition:all .1s linear;
    }
    .nav_active:after{
        content: '';
        width:0.88235rem;
        height:2px;
        background: #FE7301;
        position: absolute;
        bottom:0.29rem;
        left:50%;
        margin-left: -0.41176rem;
    }

    .index_box{
        width:100%;
        height:auto;
    }

    .index_box .index_content_active{
        display: block;
    }
    .index_box li{
        background: #fff;
        padding:0.88235rem 0.88235rem 1.176471rem 0.88235rem;
        margin-bottom: 0.41176471rem;
    }



    .index_li_header{
        font-size: 0.8235rem;
        color: rgba(36,37,61,0.5);
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 1.70588235rem;
        margin-bottom: 0.5294rem;
    }
    .index_li_header img{
        height:1.70588235rem;
        width:1.70588235rem;
        display:block;
        border-radius: 50%;
        margin-right: 0.470588rem;
    }
    .index_li_content{
        font-size:0.88235rem;
        color: rgba(36,37,61,1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 0.88235rem;
    }
    .index_li_bottom{
        position: relative;
    }
    .index_li_voice{
       position: relative;
        font-size: 0.88235rem;
        color: #fff;
        width: 10.235rem;
    }
    .index_li_voice img{
        width:100%;
        height:auto;
        display: block;
    }
    .index_li_voice div{
        width: 5.88235rem;
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-2.941175rem;
        text-align: center;

    }
    .position_change1{
        margin-top: -0.176471rem;
    }
    .position_change2{
        margin-top: -0.88235rem;
    }
    .index_li_count{
        position: absolute;
        right:0;
        font-size: 0.76471rem;
        color: rgba(36,37,61,0.5);
        top:0;
        line-height: 2.4rem;
    }
    .index_nocontent{
        background: #fff;
        margin-top: 1px;
        text-align: center;
        font-size: 0.76471rem;
        color:rgba(36,37,61,0.5);
        position: relative;
    }
    .index_nocontent img{
        display: block;
        margin:0 auto;
        width: 100%;
    }
    .index_nocontent>div{
        position: absolute;
        top:2rem;
        width:100%;
    }
    .nocontent_html{margin-top:-3.8rem}

    .asker_listen_box .audio{margin-bottom: 0}



</style>