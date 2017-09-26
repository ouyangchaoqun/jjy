<template >
    <div style="height: 100%" class="answer_ask_list_box">

        <div v-title>待答</div>
        <div class="list  weui-tab__panel">
            <div class="item" v-for="item in [2,1,3,4,1 ]" @click="answer(item)">
                <div class="img"><img
                        src="http://wx.qlogo.cn/mmopen/C2rEUskXQiblFYMUl9O0G05Q6pKibg7V1WpHX6CIQaic824apriabJw4r6EWxziaSt5BATrlbx1GVzwW2qjUCqtYpDvIJLjKgP1ug/0"></div>
                <div class="info">
                    <div class="names"><span>j**</span> 在哪方面：情感困惑</div>
                    <div class="content">六年的感情真的败给时间了，男朋友还是选择分手，说他厌恶我了。分手后我特别害怕早上醒来和入睡前的胡思乱想，而且一到上午就会变得好无力，不知所措怎么办呢？</div>
                    <div class="last_time">还剩42小时</div>
                    <div class="price">酬金 <span>￥13.14</span></div>

                </div>
                <div class="clear"></div>
            </div>
        </div>
        <v-answer-bottom tabOnIndex="1" ></v-answer-bottom>

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
    .answer_ask_list_box  .list .item .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; }
    .answer_ask_list_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_ask_list_box  .list .info{ float:left; margin-left:0.8823529411764706rem; width: 81% }
    .answer_ask_list_box  .list .info .names{ font-size: 0.7058823529411765rem; font-weight: bold; color:#666; margin-bottom: 0.4rem; width: 14.11764705882353rem;}
    .answer_ask_list_box .list .info .names span{ color:#535353; font-size: 0.8823529411764706rem; margin-right: 0.4rem}
    .answer_ask_list_box  .list .info .content{ font-size: 0.8823529411764706rem; color:#333; line-height:1.176470588235294rem; margin-bottom: 0.4rem }
    .answer_ask_list_box  .list .info .last_time{ float:left;font-size: 0.7647058823529412rem;color:#666; width: 6rem;
    }
    .answer_ask_list_box  .list .info .price{ float:right;font-size: 0.7647058823529412rem;color:#666; text-align: right; width: 7rem;}
    .answer_ask_list_box .list .info .price span{ color:#FF9900}
</style>