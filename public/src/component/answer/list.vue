<template id="myCenter">
    <div style="height: 100% " class="answer_list_box">

        <div v-title>抢答</div>
        <div class="main_title">情感困惑专家</div>
        <div class="answer_list" style="display: none;">
            <div class="item" v-for="item in [1,2,3,4,5]">
                <div class="img"><img
                        src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg">
                </div>
                <div class="info">
                    <div class="title">帮你解决婚姻，情感中的困扰</div>
                    <div class="address"><span>陈小刚</span> 浙江省-杭州</div>
                    <div class="class_s">
                        <span>情感困惑</span>
                        <span>性心理</span>
                        <span>情感困惑</span>
                        <div class="clear"></div>
                    </div>
                    <div class="other">问价 <span class="price">¥14.14</span> <span class="ml">48个回答</span><span
                            class="ml">848次被偷听</span></div>
                    <div class="audio">
                        <div class="audio_btn">
                            点击播放
                        </div>
                        <div class="minute">60"</div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

        </div>
        <div class="no_body">

            <div class="img"></div>
            <div class="txt">暂无该方面专家</div>


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
    .answer_list_box .main_title{
        font-size: 0.8823529411764706rem;
        text-align: center;
        background:#F4F4F7;
        color:#999; line-height: 2.588235294117647rem;
         margin-bottom: -0.5882352941176471rem;
    }

    .answer_list_box .no_body{ background: #fff; height:95%; position: absolute; top:2.588235294117647rem; left:0; width: 100%}
    .answer_list_box .no_body .img { background: url(../../images/answer/no_body.png); width: 4.852941176470588rem; ;height: 5.823529411764706rem; background-size:4.852941176470588rem; margin: 0 auto; margin-top: 5rem; }
    .answer_list_box .no_body .txt{ color:#B3B3B3;font-size: 0.7647058823529412rem; text-align: center; width: 100%; margin-top: 0.8rem;}
</style>