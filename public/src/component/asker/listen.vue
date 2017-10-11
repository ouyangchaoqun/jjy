<template id="stealListen_index">
    <div class="asker_listen_box" :class="{wbg:list.length==0    }">
        <!--头部导航栏-->
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
        <div class="weui-tab__panel main">
            <nav>
                <div class="swiper-container navSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="navList in navLists" :value="navList.id">{{navList.title}}</div>
                    </div>
                </div>
            </nav>
            <div>
                <div class="index_box">
                    <div v-if="list.length>0" class="index_content_active">
                        <ul>
                            <li v-for="(item,index) in list">
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
                                                    <template v-if="!item.playing&&!item.paused">点击播放</template>
                                                    <template v-if="item.playing">正在播放..</template>
                                                    <template v-if="item.paused">播放暂停</template>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                        </span>

                                        <!--付费听-->
                                        <div class="index_li_voice" @click.stop="pay(item)" v-if="item.answerType==2||item.answerType==4">
                                            <img src="../../images/charge.png" alt="">
                                            <div class="position_change1">1元偷听</div>
                                        </div>
                                        <!--限时免费听-->
                                        <span class="problem_answer_yy"   v-if="item.answerType==3">
                                            <div class="audio" :class="{playing:item.playing,paused:item.paused}"><div class="audio_btn"  @click.stop="play(index)" >
                                            <template v-if="!item.playing&&!item.paused">限时免费听</template>
                                                    <template v-if="item.playing">正在播放..</template>
                                                    <template v-if="item.paused">播放暂停</template>
                                            </div><div class="clear"></div></div>
                                        </span>

                                        <div class="index_li_count">听过{{item.listenTimes}}</div>
                                    </div>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div v-show="list.length==0">
                        <div class="index_nocontent">
                            <div>
                                <img src="../../images/asker/newNoContent.png" alt="">
                                <div class="nocontent_html">暂无该方面问题</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
        </v-scroll>
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
                navLists:[{title:'推荐'},{title:'情感困惑'},{title:'性心理'},{title:'人际关系'},{title:'职场事业'},{title:'婚姻家庭'},{title:'个人成长'},{title:'情绪管理'},{title:'心理健康'},{title:'亲子教育'}],
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false,
                list:[],
                type:0
            }
        },


        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll,
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            let _this=this;
            this.getClassList()
            var minHeight = $(window).height()-$('nav').height()-100
            //$('.index_box').css('minHeight',minHeight)
            $('.index_nocontent').css('minHeight',minHeight)
            var navSwiper = new Swiper('.navSwiper', {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
            });
            $('.navSwiper .swiper-slide').eq(0).addClass('nav_active')
            var swiperWidth = $('nav').width() //获取导航条宽度
            var maxTranslate = navSwiper.maxTranslate();//移动位置
            var maxWidth = -maxTranslate + swiperWidth / 2;
            navSwiper.on('tap', function(swiper) {

                //效果
                $('.navSwiper .swiper-slide').removeClass('nav_active')
                $('.navSwiper .swiper-slide').eq(swiper.clickedIndex).addClass('nav_active')
                var slide = swiper.slides[swiper.clickedIndex]
                var slideLeft = slide.offsetLeft
                var slideWidth = slide.clientWidth
                var slideCenter = slideLeft + slideWidth / 2
                swiper.setWrapperTransition(300)
                if (slideCenter < swiperWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    var nowTlanslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTlanslate)
                }
                _this.type = $('.navSwiper .swiper-slide').eq(swiper.clickedIndex).attr("value");
                //数据
                _this.page=1;
                _this.isPageEnd = false;
                _this.isShowMoreText = true;
                _this.getList();
            });

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
            goDetail:function (questionId) {
              this.$router.push("/asker/listen/detail?questionId="+questionId)
            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        let arr =[{"title":"全部",id:0}]
                        _this.navLists= data.body.data
                        _this.navLists =arr.concat(_this.navLists);
                    }
                }, function (error) {
                });
            },
            getList: function () {
                let vm= this;
                let url =web.API_PATH + 'come/listen/listen/list/_userId_/'+vm.type+'/'+vm.page+'/'+vm.row;
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
                    console.log(vm.list.length)
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
   .asker_listen_box .audio .audio_btn{ width: 52%}
    .index_li_bottom .problem_answer_yy{width:100%}
    .index_li_bottom .problem_answer_play{margin-left:0;left:12%;}
    nav{
        width: 100%;
        background: #FDFDFD;
        height:2.471rem;
        line-height: 2.471rem;
        font-size: 0.8235rem;
        color: #3E4042;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .navSwiper .swiper-slide{
        width:4.70588rem;
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
        padding:0.70588rem 0.88235rem 1.176471rem 0.88235rem;
        margin-top: 0.41176471rem;
    }

    .index_box li:active{
        background: #eee;
    }
    .index_box li:last-of-type{
        margin-bottom: 3.5294rem;
    }
    .index_li_header{
        font-size: 0.70588rem;
        color: #474747;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 2rem;
        margin-bottom: 0.588235rem;
    }
    .index_li_header span{
        color: #999;}
    .index_li_header img{
        height:2rem;
        width:2rem;
        display:block;
        border-radius: 50%;
        margin-right: 0.470588rem;
    }
    .index_li_content{
        font-size:0.88235rem;
        color: #474747;
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
        color: #999;
        bottom:0.588235rem;
    }
    .index_nocontent{
        background: #fff;
        margin-top: 1px;
        text-align: center;
        font-size: 0.76471rem;
        color: #B3B3B3;
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
</style>