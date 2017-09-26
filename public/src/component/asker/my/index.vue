<template>
    <div style="height: 100%" class="asker_my_index_box">
        <div v-title>我的</div>
        <div class="weui-tab__panel main">
            <div class="main">
            <div class="top">
                    <img class="img" src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0">
                    <div class="name">
                       jacky小白
                    </div>
                <div class="clear"></div>

            </div>
            <router-link to = "../my/income"  class="income"  >我的收益
                <div class="price">￥7.5</div>
            </router-link>
            <router-link to = "../my/listen/list" class="listen" >我的偷听</router-link>
            <router-link to = "../my/answer/list" class="answer" >我的收听</router-link>
            <router-link to = "../my/comment/list" class="comment" >我的评价</router-link>
            </div>
            <div class="join" @click="join()">入驻咨询师</div>
        </div>
        <v-asker-bottom tabOnIndex="4" ></v-asker-bottom>
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
        methods:{
          join:function () {
              this.$router.push("/answer/join/base/info");
          }
        },
        mounted: function () {
            $(".weui-tab__panel").height($(window).height()-100);
            var obj =  $(".asker_my_index_box .main a")
            xqzs.weui.active(obj);

        }


    }
</script>
<style>
    .asker_my_index_box .top{ height:  3.529411764705882rem; line-height:  3.529411764705882rem; font-size: 1.058823529411765rem; background: #fff; padding:0.8823529411764706rem;}
    .asker_my_index_box .top img{ display: block; float:left; width:3.529411764705882rem; height: 3.529411764705882rem; border-radius: 50%;  margin-right: 0.98rem;}

    .asker_my_index_box .main a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem; background: #fff;
     color:#333; font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; }
    .asker_my_index_box .main a:nth-child(2){margin-top: 0.88235rem;}
    .asker_my_index_box .main a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .asker_my_index_box .main a:before{ content: " "; height: 0.0588235294117647rem; background: #eee; display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .asker_my_index_box .main a .price{position: absolute;
        right:2.2rem;top:0rem ;}
    .asker_my_index_box .main a:last-child:before{
        display: none;}

    .asker_my_index_box .main a.income{ background: url(../../../images/asker/my_index_income.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }
    .asker_my_index_box .main a.listen{ background: url(../../../images/asker/my_index_listen.png) no-repeat #fff; background-size:0.9411764705882353rem; background-position: 1rem  1.02rem; }
    .asker_my_index_box .main a.answer{ background: url(../../../images/asker/my_index_answer.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }
    .asker_my_index_box .main a.comment{ background: url(../../../images/asker/my_index_star.png) no-repeat #fff; background-size:1.117647058823529rem; background-position: 1rem  1.02rem; }

    .join{ background: #fff; line-height:3.470588235294118rem; margin: 0.8823529411764706rem 0 ; text-align: center; font-size: 0.8823529411764706rem }

</style>