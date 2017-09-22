<template >
    <div style="height: 100%" class="answer_race_list">

        <div v-title>抢答</div>
        <div class="list weui-tab__panel">
            <div class="item" v-for="item in [2,1,3,4,1 ]" @click="answer(item)">
                <div class="img"><img
                        src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"></div>
                <div class="info">
                    <div class="price">赏金 <span>￥13.14</span></div>
                    <div class="type">在哪方面：情感困惑</div>
                    <div class="clear"></div>
                    <div class="content">六年的感情真的败给时间了，男朋友还是选择分手，说他厌恶我了。分手后我特别害怕早上醒来和入睡前的胡思乱想，而且一到上午就会变得好无力，不知所措怎么办呢？</div>
                    <div class="last_time">还剩42小时</div>


                </div>
                <div class="clear"></div>
                <div class="btn_race">抢答</div>
            </div>
        </div>

        <v-answer-bottom ></v-answer-bottom>
    </div>
</template>

<script type="es6">
    import answerBottom from "./include/bottom.vue";


    export default {
        data() {
            return {}
        },
        mounted: function () {
            $(".weui-tab__panel").height($(window).height()-90);
        },
        methods: {
            answer:function (askId) {
                this.$router.push("../answer?askId="+askId);
            }
        },
        components: {
            "v-answer-bottom": answerBottom
        }

    }
</script>
<style>
    .answer_race_list .list .item{ background: #fff; padding:0.8823529411764706rem; margin-bottom:0.5882352941176471rem; }
    .answer_race_list  .list .item .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; }
    .answer_race_list  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_race_list  .list .info{ float:left; margin-left:0.8823529411764706rem; width: 81% }
    .answer_race_list  .list .info .type{ font-size: 0.7058823529411765rem;   color:#999; margin-bottom: 0.4rem; width: 8rem; float:right; text-align: right}
    .answer_race_list  .list .info .content{ font-size: 0.8823529411764706rem;   color:#333;line-height:1.176470588235294rem; margin-bottom: 0.4rem}
    .answer_race_list  .list .info .last_time{ float:left;font-size: 0.7647058823529412rem;color:#666; width: 6rem;
    }
    .answer_race_list  .list .info .price{ float:left;font-size: 0.7647058823529412rem;color:#666;   width: 7rem;}
    .answer_race_list  .list .info .price span{ color:#FF9900; font-size: .8823529411764706rem;}
    .answer_race_list .list .btn_race{ color:#fff; text-align: center; width: 28%; margin: 0 auto; line-height: 2.4rem; border-radius: 1.2rem; background: #0BB20C; margin-top: 0.6rem;}



</style>