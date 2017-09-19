<template id="stealListen_index">
    <div style="background: #f4f4f8;">
        <!--头部导航栏-->
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
                        </li>
                        <li>
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
                        </li>
                        <li>
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







        <!--底部菜单栏-->
        <div class="moodGasStation_menu">
            <div><img src="../../../images/34.jpg" alt="">偷听</div>
            <div><img src="../../../images/34.jpg" alt="">找专家</div>
            <div><span class="moodGasStation_wen">问</span></div>
            <div><img src="../../../images/34.jpg" alt="">我问</div>
            <div><img src="../../../images/34.jpg" alt="">我的</div>
        </div>
    </div>

</template>
<script>
    var stealListen_index = {
        template: '#stealListen_index'
    };
    export default {
        data() {
            return {
                navLists:[{item:'全部'},{item:'情感困惑'},{item:'性心理'},{item:'人际关系'},{item:'职场事业'},{item:'婚姻家庭'},{item:'个人成长'},{item:'情绪管理'},{item:'心理健康'},{item:'亲子教育'}]
            }
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
        height:36px;
        line-height: 36px;
        font-size: 13px;
        color: #666;
        text-align: center;
    }
    .navSwiper .swiper-slide{
        width:80px;
    }
    .nav_active{
        font-size: 14px;
        color: #0DBC0B ;
        position: relative;
        transition:all .1s linear;
    }
    .nav_active:after{
        content: '';
        width:14px;
        height:2px;
        background: #0DBC0B;
        position: absolute;
        bottom:0;
        left:50%;
        margin-left: -7px;
    }
    .moodGasStation_menu{
        height:44px;
        border-top: 1px solid rgba(0,0,0,0.2);
        display: flex;
        position: fixed;
        bottom: 0;
        width:100%;
        padding-top: 5px;
        background: #fff;
    }
    .moodGasStation_menu div{
        flex: 1;
        text-align: center;
        font-size: 10px;
        vertical-align: text-bottom;
    }
    .moodGasStation_menu img{
        display: block;
        width:27px;
        height:27px;
        margin:0 auto;
    }
    .moodGasStation_menu div:nth-of-type(3){
        position: relative;
    }
    .moodGasStation_wen{
        width:44px;
        height:44px;
        border-radius: 50%;
        background: #0DBC0B;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height:44px;
        position: absolute;
        left:50%;
        margin-left:-22px;
        top:-15px;
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
        padding:12px 15px 20px 15px;
        margin-top: 10px;
    }
    .index_box li:last-of-type{
        margin-bottom: 60px;
    }
    .index_li_header{
        font-size: 12px;
        color: #666;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 29px;
        margin-bottom: 10px;
    }
    .index_li_header img{
        height:29px;
        width:29px;
        display:block;
        border-radius: 50%;
        margin-right: 8px;
    }
    .index_li_content{
        font-size:15px;
        color: #474747;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
    }
    .index_li_bottom{
        position: relative;
    }
    .index_li_voice{
       position: relative;
        font-size: 15px;
        color: #fff;
        width: 174px;
    }
    .index_li_voice img{
        width:100%;
        height:auto;
        display: block;
    }
    .index_li_voice div{
        width: 100px;
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-50px;
        text-align: center;

    }
    .position_change1{
        margin-top: -3px;
    }
    .position_change2{
        margin-top: -15px;
    }
    .index_li_count{
        position: absolute;
        right:0;
        font-size: 13px;
        color: #999;
        bottom:10px;
    }
    .index_nocontent{
        background: #fff;
        margin-top: 10px;
        text-align: center;
        font-size: 13px;
        color: #B3B3B3;
        position: relative;
    }
    .index_nocontent img{
        display: block;
        width:90px;
        height:90px;
        margin:0 auto;
        margin-bottom: 26px;
    }
    .index_nocontent div{
        position: absolute;
        width:100px;
        top:95px;
        left: 50%;
        margin-left:-50px;
    }
</style>