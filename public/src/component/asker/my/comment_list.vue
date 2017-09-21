<template >
    <div style="height: 100%" class="asker_my_coment_list wbg">

        <div v-title>我的评价</div>
        <div class="nothing comment" v-if="false"  >
            您还没有做任何评价
        </div>
        <div>
            <div class="top_tip">共2条评价</div>
            <div class="list">
                <div class="item" v-for="item in [1,3,3,3,4,5,6]">
                    <div class="comment">
                        <div class="img"><img  src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0"></div>
                        <div class="info">
                            <div class="times">2017-09-11 14:20&nbsp; &nbsp;评价了<span>陈小刚</span>的回答</div>
                            <div class="star"><span class="on"></span><span  class="on"></span><span></span><span></span><span></span></div>
                            <div class="content">
                                老师很负责，很用心，赞一个
                                很专业，态度很好
                            </div>
                            <div class="tags">
                                <span>很专业</span>
                                <span>耐心</span>
                                <span>和蔼可亲</span>
                                <span>幽默风趣</span>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="reply">
                        <span>专家回复：</span>感谢信任，祝福你活出自己想要的经常～
                    </div>
                    <div class="question">
                        <div class="content">女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这
                            是不是一种病？</div>
                        <div class="answer">
                            <div class="img"><img  src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0"></div>
                            <div class="audio">
                                <div class="audio_btn">
                                    点击播放
                                </div>
                                <div class="minute">60"</div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {}
        },


        mounted: function () {


        }


    }
</script>
<style>

    .asker_my_coment_list .nothing.comment{ background: url(../../../images/asker/nothing_star.png) no-repeat center top; background-size: 5.852941176470588rem; }

   .asker_my_coment_list .item{ padding: 0.88235rem; border-bottom: 0.7058823529411765rem solid #F4F4F7;}
    .asker_my_coment_list .comment .img{ width: 2rem; height: 100%; float:left; margin-right: 0.5rem;}
    .asker_my_coment_list .comment .img img{width: 2rem; height: 2rem; border-radius: 1rem;}
    .asker_my_coment_list .comment .info{ width: 17rem; float:left;}
    .asker_my_coment_list  .comment .info .times{ color:#666; font-size:0.7058823529411765rem; }
    .asker_my_coment_list .comment .info .times span{ font-weight: bold; color:#444}
    .asker_my_coment_list .comment .info .content{ color:#333; font-size: 0.8235294117647059rem; margin: 0.2rem  0}
    .asker_my_coment_list .comment .info .tags{}
    .asker_my_coment_list .comment .info .tags span{ display: inline-block;
        border:1px solid #D1D1D1; color:#D1D1D1; text-align: center; line-height: 1.323529411764706rem; border-radius: 0.6617647058823529rem; padding: 0 0.5rem; font-size:0.7058823529411765rem;}
    .asker_my_coment_list .comment .info .star span{ display: inline-block; background: url(../../../images/star_no.png) no-repeat; background-size: 0.7647058823529412rem;  height: 0.7647058823529412rem; width: 0.7647058823529412rem; margin-right: 0.4rem; }
    .asker_my_coment_list .comment .info .star span.on{background: url(../../../images/star.png) no-repeat;background-size: 0.7647058823529412rem; }

    .asker_my_coment_list .reply{ background: #F1F1F5;  font-size:0.7058823529411765rem; color:#999; padding:0.5rem ; border-radius: 0.3rem; position: relative; margin-top: 0.88rem }
    .asker_my_coment_list .reply:before{ content:" " ; display: block; position: absolute; left:0.8rem; top:-0.6rem;  width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.7rem solid #F1F1F5;}


    .asker_my_coment_list .answer .img{ width: 2rem; height: 2rem; float:left; margin-top: 0.2rem;  margin-right: 0.5rem;}
    .asker_my_coment_list .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_coment_list .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_coment_list .answer .audio .audio_btn{ width: 47%}
    .asker_my_coment_list .question{ border: 0.1470588235294118rem solid #F1F1F5; border-radius: 0.4rem; padding: 0.6176470588235294rem; margin-top:0.5882352941176471rem; color:#666; font-size: 0.7058823529411765rem  }
    .asker_my_coment_list .question .content{ margin-bottom: 0.88325rem}

</style>