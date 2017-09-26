<template>
    <div style="height: 100%" class="asker_my_answer_list_box wbg">

        <div v-title>我的收听</div>
        <div class="nothing answer" v-if="false" >
            没有任何收听
        </div>
        <div>
            <div class="top_tip">共2位咨询师</div>
            <div class="answer_list" >
                <div class="item arrow" v-for="item in [1,2,3,4,5]">
                    <router-link to="/answer/detail">
                    <div class="img"><img
                            src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg">
                    </div>
                    <div class="info">
                        <div class="address"><span>陈小刚</span> 浙江省-杭州</div>
                        <div class="title">帮你解决婚姻，情感中的困扰</div>
                        <div class="class_s">
                            <span>情感困惑</span>
                            <span>性心理</span>
                            <span>情感困惑</span>
                            <div class="clear"></div>
                        </div>
                            <div class="other">48个回答，135人收听</div>

                    </div>
                    <div class="clear"></div>
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
    .asker_my_answer_list_box .nothing.answer{ background: url(../../../images/asker/nothing_answer.png) no-repeat center top; background-size: 5.205882352941176rem; }
    .asker_my_answer_list_box  .answer_list .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; }
    .asker_my_answer_list_box  .answer_list .title{ width: 16rem; color:#666; font-size: 0.7647058823529412rem;}
    .asker_my_answer_list_box .answer_list .address{ color:#999}
    .asker_my_answer_list_box .answer_list .address span{ font-size: 0.88235rem; color:#333}
    .asker_my_answer_list_box .answer_list .class_s span{ color:#999; border: 1px solid #A8A8A8 }
    .asker_my_answer_list_box  .answer_list .item{ margin-top: 0; border-bottom: 1px solid #eee; position: relative}


</style>