<template id="stealListen_index">
    <div>
        <!--头部导航栏-->
        <div class="weui-tab__panel main">
            <nav>
                <div class="swiper-container navSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="navList in navLists">{{navList.item}}</div>
                    </div>
                </div>
            </nav>
            <div>
                <div class="index_box">
                    <div class="index_content_active">
                        <ul>
                            <li>
                                <router-link to="/asker/stealListen/steal_detail">
                                    <div class="index_li_header">
                                        <img src="../../../images/34.jpg" alt=""><div>陈小刚 回答了</div>
                                    </div>
                                    <div class="index_li_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                                    <div class="index_li_bottom">
                                        <div class="index_li_voice">
                                            <img src="../../../images/charge.png" alt="">
                                            <div class="position_change1">1元偷听</div>
                                        </div>
                                        <div class="index_li_count">听过122</div>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/asker/stealListen/steal_detail">
                                    <div class="index_li_header">
                                        <img src="../../../images/34.jpg" alt=""><div>陈小刚 回答了</div>
                                    </div>
                                    <div class="index_li_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                                    <div class="index_li_bottom">
                                        <div class="index_li_voice">
                                            <img src="../../../images/nocharge.png" alt="">
                                            <div class="position_change2">点击播放</div>
                                        </div>
                                        <div class="index_li_count">听过122</div>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/asker/stealListen/steal_detail">
                                    <div class="index_li_header">
                                        <img src="../../../images/34.jpg" alt=""><div>陈小刚 回答了</div>
                                    </div>
                                    <div class="index_li_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                                    <div class="index_li_bottom">
                                        <div class="index_li_voice">
                                            <img src="../../../images/nocharge.png" alt="">
                                            <div class="position_change2">限时免费听</div>
                                        </div>
                                        <div class="index_li_count">听过122</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="index_nocontent">
                            <div>
                                <img src="../../../images/34.jpg" alt="">
                                暂无该方面问题
                            </div>

                        </div>
                    </div>
                    <div>性心理</div>
                    <div>人际关系</div>
                    <div>职场事业</div>
                    <div>婚姻家庭</div>
                    <div>个人成长</div>
                    <div>情绪管理</div>
                    <div>心理健康</div>
                    <div>亲子教育</div>
                </div>
            </div>

        </div>

        <v-asker-bottom ></v-asker-bottom>



    </div>

</template>
<script>
    import askerBottom from "../include/bottom.vue";
    var stealListen_index = {
        template: '#stealListen_index'
    };
    export default {
        data() {
            return {
                navLists:[{item:'全部'},{item:'情感困惑'},{item:'性心理'},{item:'人际关系'},{item:'职场事业'},{item:'婚姻家庭'},{item:'个人成长'},{item:'情绪管理'},{item:'心理健康'},{item:'亲子教育'}]
            }
        },
        components: {
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            var minHeight = $(window).height()-$('nav').height()-10
            //$('.index_box').css('minHeight',minHeight)
            $('.index_nocontent').css('minHeight',minHeight)
            console.log(minHeight)
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
                $('.navSwiper .swiper-slide').removeClass('nav_active')
                $('.navSwiper .swiper-slide').eq(swiper.clickedIndex).addClass('nav_active')
                $('.index_box>div').removeClass('index_content_active')
                $('.index_box>div').eq(swiper.clickedIndex).addClass('index_content_active')
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
            })
        }
    }


</script>
<style>
    nav{
        width: 100%;
        background: #fff;
        height:2.1176471rem;
        line-height: 2.1176471rem;
        font-size: 0.76471rem;
        color: #666;
        text-align: center;
    }
    .navSwiper .swiper-slide{
        width:4.70588rem;
    }
    .nav_active{
        font-size: 0.8235rem;
        color: #0DBC0B ;
        position: relative;
        transition:all .1s linear;
    }
    .nav_active:after{
        content: '';
        width:0.8235rem;
        height:2px;
        background: #0DBC0B;
        position: absolute;
        bottom:0;
        left:50%;
        margin-left: -0.41176rem;
    }

    .index_box{
        width:100%;
        height:auto;
    }
    .index_box>div{
        display: none;

    }
    .index_box .index_content_active{
        display: block;
    }
    .index_box li{
        background: #fff;
        padding:0.70588rem 0.88235rem 1.176471rem 0.88235rem;
        margin-top: 0.588235rem;
    }
    .index_box li:active{
        background: #eee;
    }
    .index_box li:last-of-type{
        margin-bottom: 3.5294rem;
    }
    .index_li_header{
        font-size: 0.70588rem;
        color: #666;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 29px;
        margin-bottom: 0.588235rem;
    }
    .index_li_header img{
        height:29px;
        width:29px;
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
        margin-bottom: 0.588235rem;
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
        margin-top: 0.588235rem;
        text-align: center;
        font-size: 0.76471rem;
        color: #B3B3B3;
        position: relative;
    }
    .index_nocontent img{
        display: block;
        width:90px;
        height:90px;
        margin:0 auto;
        margin-bottom: 1.5294rem;
    }
    .index_nocontent div{
        position: absolute;
        width:5.88235rem;
        top:5.588235rem;
        left: 50%;
        margin-left:-2.941175rem;
    }
</style>