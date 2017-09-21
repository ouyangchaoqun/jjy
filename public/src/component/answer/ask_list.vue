<template >
    <div style="height: 100%" class="answer_ask_list_box">

        <div v-title>待答</div>
        <div class="list  weui-tab__panel">
            <div class="item" v-for="item in [2,1,3,4,1 ]" @click="answer(item)">
                <div class="img"><img
                        src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"></div>
                <div class="info">
                    <div class="names"><span>j**</span> 在哪方面：情感困惑</div>
                    <div class="content">六年的感情真的败给时间了，男朋友还是选择分手，说他厌恶我了。分手后我特别害怕早上醒来和入睡前的胡思乱想，而且一到上午就会变得好无力，不知所措怎么办呢？</div>
                    <div class="last_time">还剩42小时</div>
                    <div class="price">酬金 ￥13.14</div>

                </div>
                <div class="clear"></div>
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
                this.$router.push("../answer?askId="+askId)

            }
        },
        components: {
            "v-answer-bottom": answerBottom
        }


    }
</script>
<style>
    .answer_ask_list_box .list .item{ background: #fff; padding:0.8823529411764706rem; margin-bottom:0.5882352941176471rem; }
    .answer_ask_list_box  .list .item .img{ width: 2rem; height: 2rem; float:left; }
    .answer_ask_list_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_ask_list_box  .list .info{ float:left; margin-left:0.8823529411764706rem; width: 84% }
    .answer_ask_list_box  .list .info .names{ font-size: 0.8823529411764706rem; font-weight: bold; color:#333; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
    .answer_ask_list_box  .list .info .content{ font-size: 0.8823529411764706rem; line-height: 1.8; color:#333}
    .answer_ask_list_box  .list .info .last_time{ float:left;font-size: 0.8823529411764706rem;color:#333; width: 6rem;
    }
    .answer_ask_list_box  .list .info .price{ float:right;font-size: 0.8823529411764706rem;color:#333; text-align: right; width: 7rem;}
</style>