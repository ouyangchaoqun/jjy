<template >
    <div style="height: 100%" class="answer_index">
        <div v-title>加加油</div>
        <div class="class_list">
            <div class="class_item" v-for="(item,index) in classList"><span>{{item.name}}</span></div>
            <div class="clear"></div>
        </div>

        <div class="answer_list">
            <div class="item" v-for="item in [1,2,3,4,5]">
                <div class="img"><img src="http://g.hiphotos.baidu.com/exp/w=480/sign=0b2f2cb8972397ddd679990c6982b216/f2deb48f8c5494ee9e081a462bf5e0fe99257e42.jpg"> </div>
                <div class="info">
                    <div class="title">帮你解决婚姻，情感中的困扰</div>
                    <div class="address"><span>陈小刚</span> 浙江省-杭州</div>
                    <div class="class_s">
                        <span>情感困惑</span>
                        <span>性心理</span>
                        <span>情感困惑</span>
                        <div class="clear"></div>
                    </div>
                    <div class="other">问价 <span class="price">¥14.14</span> <span class="ml">48个回答</span><span class="ml">848次被偷听</span></div>
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



    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {
                classList:[{name:"情感困惑",id:1},
                    {name:"婚姻家庭",id:1},
                    {name:"个人成长",id:1},
                    {name:"情感困惑",id:1},
                    {name:"情绪管理",id:1},
                    {name:"情感困惑",id:1},
                    {name:"情感困惑",id:1},
                    {name:"情感困惑",id:2},
                    {name:"情感困惑",id:1},


                ]
            }
        },


        mounted: function () {


        }


    }
</script>
<style>
   .answer_index  .class_list{
        padding:0.7058823529411765rem; padding-top: 0.9rem; background: #fff; padding-bottom: 0.2rem;
    }
   .answer_index  .class_list .class_item{
        float:left ; width: 33.333333%;
   }
   .answer_index  .class_list .class_item span{ display: block; background: #EAE9E9; height:2.058823529411765rem;line-height:2.058823529411765rem; width: 88% ; margin: 0 auto; text-align: center; border-radius: 1.029411764705883rem; margin-bottom: 0.7058823529411765rem}



</style>