<template >
    <div style="height: 100%" class="answer_answer_box">

        <div v-title>回答</div>
        <div class="answer" >
            <div class="img"><img
                    src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"></div>
            <div class="info">
                <div class="names"><span>j**</span> </div>
                <div class="type"><span>在哪方面：</span>情感困惑</div>
                <div class="content">六年的感情真的败给时间了，男朋友还是选择分手，说他厌恶我了。分手后我特别害怕早上醒来和入睡前的胡思乱想，而且一到上午就会变得好无力，不知所措怎么办呢？</div>
                <div class="last_time">5分钟前</div>
            </div>
            <div class="price">酬金 ￥13.14</div>

            <div class="clear"></div>
        </div>


        <div class="answer" >
            <div class="img"><img
                    src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"></div>
            <div class="info">
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

        <div class="audio_img"></div>
        <div class="btns">
            <div class=" btn audio_btn_begin">开始</div>
            <div class=" btn audio_btn_re">重录</div>
            <div class=" btn audio_btn_submit">发布</div>
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
    .answer_answer_box .answer{ background: #fff; padding:0.8823529411764706rem; margin-bottom:0.5882352941176471rem; position: relative }
   .answer_answer_box .answer .img{ width: 2rem; height: 2rem; float:left; }
   .answer_answer_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%}
   .answer_answer_box .answer .info{ float:left; margin-left:0.8823529411764706rem; width: 84% }
   .answer_answer_box .answer .info .names{ font-size: 0.8823529411764706rem; font-weight: bold; color:#333; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
   .answer_answer_box .answer .info .content{ font-size: 0.8823529411764706rem; line-height: 1.8; color:#333}
   .answer_answer_box .answer .info .last_time{ float:left;font-size: 0.8823529411764706rem;color:#333; width: 6rem;
    }
   .answer_answer_box .answer .price{ font-size: 0.8823529411764706rem;color:#333; text-align: right; width: 7rem; position: absolute; right:0.8823529411764706rem; top:0.8823529411764706rem }

   .btns { text-align: center; width: 90%; margin: 0 auto ;}
    .btns .btn{ border-radius: 1.2rem; height: 2.4rem;line-height: 2.4rem; text-align: center; background: #0BB20C;   color:#fff; font-size:0.8823529411764706rem; width: 23%; display: inline-block; }




</style>