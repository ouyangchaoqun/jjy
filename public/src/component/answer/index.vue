<template id="myCenter">
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

    .answer_list .item{ background: #fff; padding:0.8823529411764706rem; margin-top:0.5882352941176471rem; }
   .answer_list .item .img{ width: 3.764705882352941rem; height: 3.764705882352941rem; float:left; }
   .answer_list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_list .info{ float:left; margin-left:0.8823529411764706rem; }
   .answer_list .info .title{ font-size: 0.8823529411764706rem; font-weight: bold; color:#333; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
   .answer_list .info .address{ font-size: 0.7058823529411765rem; }
   .answer_list .info .address span { display: inline-block; margin-right: 10px; color:#333;    }
    .answer_list .info .class_s { clear: both; margin-top: 0.3rem;}
   .answer_list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #EAE9E9; color:#999; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_list .info .other{ font-size: 0.7058823529411765rem;;color:#7F8288; margin-top: 0.3rem; }
   .answer_list .info .other .price{ color:#FF6600}
   .answer_list .info .other .ml{ margin-left:0.8rem; }
   .answer_list .info .audio{ margin-top: 0.8rem; margin-bottom: 0.3rem;}
    .answer_list .info .audio .audio_btn{   width:70%; float:left;
        height:2.4rem; line-height: 2.4rem;
        background:rgba(0,184,230,1);
        border-radius: 1.2rem ; text-align: center; color:#fff;  }
   .answer_list .info .audio .audio_btn:active{ background: rgb(0, 138, 182);
   }
   .answer_list .info .audio .minute{ color:#999; font-size: 1rem; margin-left: 0.8rem; float:left; line-height: 2.4rem;}
</style>