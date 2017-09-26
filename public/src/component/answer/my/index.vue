<template >
    <div style="height: 100%" class="asker_my_index_box">
        <div v-title>我的</div>
        <div class="weui-tab__panel main">
            <div class="main">
                <div class="top" @click="goPerfect()">
                        <img class="img" src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0">
                        <div class="name">
                            jacky小白
                        </div>
                        <div class="perfect" >完善资料</div>
                        <div class="clear"></div>
                </div>
                <div class="main_lists">
                    <router-link to = "/answer/my/income"  class="income"  >我的收益
                        <div class="price">￥7.5</div>
                    </router-link>
                    <router-link to = "/answer/my/level" class="listen" >我的等级</router-link>
                    <router-link to = "/answer/my/setanswer" class="answer" >解答设置</router-link>
                    <router-link to = "/answer/my/answer/list" class="comment" >我的回答</router-link>
                    <router-link to = "/answer/my/fans" class="listen" >我的粉丝</router-link>
                    <router-link to = "/answer/my/comment/list" class="listen" >收到的评价</router-link>
                    <router-link to = "/answer/my/message" class="answer" >60”语音寄语</router-link>
                    <router-link to = "/answer/my/enter" class="comment" >入驻资质</router-link>
                </div>
            </div>
        </div>
        <v-asker-bottom tabOnIndex="3" ></v-asker-bottom>
    </div>
</template>

<script type="es6">

    import askerBottom from "../include/bottom.vue";

    export default {
        data() {
            return {}
        },
        components: {
            "v-asker-bottom": askerBottom
        },

        mounted: function () {
            $(".weui-tab__panel").height($(window).height()-100);
            var obj =  $(".asker_my_index_box .main a")
            xqzs.weui.active(obj);

        },
        methods:{
            goPerfect:function () {
                this.$router.push("./perfect")
            }
        }


    }
</script>
<style>
    .asker_my_index_box{background: #fff}
    .asker_my_index_box .top{ height:  3.529411764705882rem; line-height:  1; font-size: 1.058823529411765rem; background: #fff; padding:0.8823529411764706rem;border-bottom: 0.88235rem solid #f4f4f8;}
    .asker_my_index_box .top:active{background:#eee}
    .asker_my_index_box .top img{ display: block; float:left; width:3.529411764705882rem; height: 3.529411764705882rem; border-radius: 50%;  margin-right: 0.98rem;}
    .asker_my_index_box .top .name{color:#333;padding-top: 0.8235rem;margin-bottom:0.52941rem}
    .asker_my_index_box .top .perfect{color:#666;font-size: 0.76471rem;}
    .main_lists a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem; background: #fff;
        color:#333; font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; }
    .main_lists a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .main_lists a:before{ content: " "; height: 0.0588235294117647rem; background: #eee; display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .main_lists a .price{position: absolute;
        right:2.2rem;top:0rem ;}

    .main_lists a.income{ background: url(../../../images/asker/my_index_income.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }
    .main_lists a.listen{ background: url(../../../images/asker/my_index_listen.png) no-repeat #fff; background-size:0.9411764705882353rem; background-position: 1rem  1.02rem; }
    .main_lists a.answer{ background: url(../../../images/asker/my_index_answer.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }
    .main_lists a.comment{ background: url(../../../images/asker/my_index_star.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }


</style>