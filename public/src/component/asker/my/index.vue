<template>
    <div style="height: 100%" class="asker_my_index_box">
        <div v-title>我的</div>
        <div class="top">
                <img class="img" src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg">
                <div class="name">
                   jacky小白
                </div>
            <div class="clear"></div>

        </div>
        <router-link to = "../my/income" >我的收益
            <div class="price">￥7.5</div>
        </router-link>
        <router-link to = "../my/income" >我的收益</router-link>
        <router-link to = "../my/listen/list" >我的偷听</router-link>
        <router-link to = "../my/answer/list" >我的收听</router-link>
        <router-link to = "../my/comment/list" >我的评价</router-link>


    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {}
        },


        mounted: function () {
            var obj =  $(".asker_my_index_box a")
            xqzs.weui.active(obj);

        }


    }
</script>
<style>
    .asker_my_index_box .top{ height:  2.588235294117647rem; line-height:  2.588235294117647rem; font-size: 0.88rem; background: #fff; padding: 0.88rem;}
    .asker_my_index_box .top img{ display: block; float:left; width:2.588235294117647rem; height: 2.588235294117647rem; border-radius: 6px;  margin-right: 0.5rem;}

    .asker_my_index_box a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem; background: #fff; margin-top: 0.4rem;
     color:#333; font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block }
    .asker_my_index_box a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .asker_my_index_box a .price{position: absolute;
        right:2.2rem;top:0rem ;}

</style>