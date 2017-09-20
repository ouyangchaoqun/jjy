<template >
    <div style="height: 100%" class="answer_comment_box">
        <div v-title>咨询师点评</div>
        <div class="nums">
            <div class="title">
                <div class="txt">总体印象</div>
                <div class="star"><span class="on"></span><span class="on"></span><span></span><span></span><span></span></div>
            </div>
            <div class="comment">4.5</div>
        </div>
        <div class="comment_selects">
            <span class="first">全部 1205</span><span>和蔼可亲 124</span><span>和蔼可 225</span><span>和蔼可亲 23</span><span>和蔼可亲 321</span><span>和蔼可亲 33</span><span>和蔼可亲 212</span><span>和蔼可 23</span>
            <div class="clear"></div>
        </div>
        <div class="list_top">
            <span class="img"></span><span>只看评价内容</span>
        </div>
        <div class="list">
            <div class="item" v-for="item in [1,2,3,4]">
                <div class="img"><img
                        src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg">
                </div>
                <div class="info">
                    <div class="name">陈**</div>
                    <div class="star"><span class="on"></span><span class="on"></span><span></span><span></span><span></span></div>
                    <div class="word">帮你解决婚姻，情感中的困扰</div>
                    <div class="class_s">
                        <span>情感困惑</span>
                        <span>性心理</span>
                        <span>情感困惑</span>
                        <div class="clear"></div>
                    </div>
                    <div class="time">2017-09-11</div>
                    <div class="reply"><span>专家回复：</span>感谢信任，祝福你活出自要的经常～</div>
                </div>
                <div class="clear"></div>
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
    .answer_comment_box .nums{
        position: relative; background: #fff; border-bottom: 1px solid #EDEDED; padding:0.8823529411764706rem; ;
    }
    .answer_comment_box .nums .comment{ position: absolute; top:1rem; right:0.9rem; font-size:1.411764705882353rem;  }
    .answer_comment_box .title .txt{ font-size: 0.8823529411764706rem; color:#333; font-weight: bold}
    .answer_comment_box .title .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .title .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_comment_box .comment_selects{ padding:0.8823529411764706rem; background: #fff; padding-bottom: 0.3rem;}
    .answer_comment_box .comment_selects span{display: inline-block; float:left; height: 1.352941176470588rem; line-height: 1.352941176470588rem; border: 1px solid #666; border-radius:0.676470588235294rem ; font-size: 0.8823529411764706rem; padding: 0 0.5rem; margin-right: 0.5882352941176471rem; margin-bottom: 0.5882352941176471rem; color:#666 }
    .answer_comment_box  .comment_selects span:first-child{border: 1px solid #D1D1D1; color:#D1D1D1 }

    .answer_comment_box .list_top{ margin-top:0.8823529411764706rem; background: #fff;border-bottom: 1px solid #EDEDED; font-size: 0.8823529411764706rem; height: 2.588235294117647rem; line-height: 2.588235294117647rem; padding: 0  0.8823529411764706rem }
    .answer_comment_box  .list_top span{ float:left; display: block}
    .answer_comment_box  .list_top .img{  background: url(../../images/answer/finish.png); width: 1.176470588235294rem; height: 1.176470588235294rem; background-size: 1.176470588235294rem; margin-top: 0.7058823529411765rem; margin-right:0.5rem; }



    .answer_comment_box  .list .item{ background: #fff; padding:0.8823529411764706rem; border-bottom: 1px solid #EDEDED }
    .answer_comment_box .list .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .list .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_comment_box  .list .item .img{ width: 2rem; height: 2rem; float:left; }
    .answer_comment_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%; border: 1px solid #EEEAEA }
    .answer_comment_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_comment_box  .list .info .name{ font-size: 0.7058823529411765rem; color:#999; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
    .answer_comment_box  .list .word{ font-size:0.7647058823529412rem; font-weight: bold;  color:#333; margin-bottom: 0.2rem;;}
    .answer_comment_box  .list .reply{ font-size: 0.8823529411764706rem;  color:#333; margin-bottom: 0.2rem;}
    .answer_comment_box  .list .time{ font-size:0.7058823529411765rem; color:#C1C1C1; margin-top: 0.6rem;margin-bottom: 0.6rem;}
    .answer_comment_box  .list .info .class_s { clear: both; margin-top: 0.3rem;}
    .answer_comment_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #C1C1C1 ; color:#C1C1C1 ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_comment_box  .list .reply{
        background:rgba(241,241,245,1);
        border-radius: 10px ; padding:0.6470588235294118rem; color:#666; font-size:0.7058823529411765rem;  }
    .answer_comment_box  .list .reply span{color:#999}

</style>