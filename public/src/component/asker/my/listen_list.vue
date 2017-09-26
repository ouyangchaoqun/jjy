<template>
    <div style="height: 100%" class="asker_my_listen_list_box wbg">

        <div v-title>我的偷听</div>
        <div class="nothing listen" v-if="false" >
            没有任何偷听
        </div>

        <div>
            <div class="list">
                <div class="item" v-for="item in [1,23,4,5,6,12,23,1]">
                    <router-link to="/asker/listen/detail">
                    <div class="question">
                        <div class="img"></div>
                        <div class="title">女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这是不是一种病？
                        </div>
                    </div>
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
                    <div class="others">
                        <div class="time">2017-09-21 10:20</div>
                        <div class="listen_count">听过 48</div>
                        <div class="good">45</div>
                    </div>
                    </router-link>
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
    .asker_my_listen_list_box .item{ border-bottom: 1px solid #eee; padding-bottom: 0.85rem;}
    .asker_my_listen_list_box .nothing.listen{ background: url(../../../images/asker/nothing_listen.png) no-repeat center top; background-size: 4.5rem; }
    .asker_my_listen_list_box .question{ padding: 0.8rem; }
    .asker_my_listen_list_box .question .img{ height: 100%; float:left; }
    .asker_my_listen_list_box .question .img:before{background: #0BB20C; border-radius: 50%; width:2rem; height: 2rem; content: " "; display: block; margin-right:0.8235294117647059rem;  }
    .asker_my_listen_list_box .question .title{ font-size: 0.88235rem; color:#333 }

    .asker_my_listen_list_box .answer .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; margin-left: 0.88235rem; margin-right: 0.5rem;}
    .asker_my_listen_list_box .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_listen_list_box .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_listen_list_box .answer .audio .audio_btn{ width: 47%}

    .asker_my_listen_list_box .others{ color:#999; position: relative; font-size: 0.7058823529411765rem; padding: 0 0.88235rem; margin-top: 1.1rem;}
    .asker_my_listen_list_box .others .listen_count{ position: absolute; right:4.5rem; top:0}
    .asker_my_listen_list_box .others .good{ position: absolute; right:0.88235rem; top:0; background: url(../../../images/asker/zan_nor.png) no-repeat; background-size: 0.9411764705882353rem; padding-left: 1.3rem; background-position: 0.1rem;}




</style>