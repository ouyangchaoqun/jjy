<template >
    <div style="height: 100%" class="answer_my_index_box">
        <div v-title>我的</div>
        <div class="weui-tab__panel main">
            <div class="main">
                <div class="top" @click="goPerfect()">
                        <img class="img" :src="resizeImg(expert.faceUrl)">
                        <div class="name">
                            {{expert.nickName}}
                        </div>
                        <div class="perfect" >完善资料</div>
                        <div class="clear"></div>
                </div>
                <div class="main_lists">
                    <router-link to = "/answer/my/income"  class="income"  ><i></i>我的收益
                        <div class="price" v-if="income!=0">￥{{formatPrice(income)}}</div>
                    </router-link>
                    <!--<router-link to = "/answer/my/level" class="level" ><i></i>我的等级</router-link>-->
                    <router-link to = "/answer/my/setanswer" class="setanswer" ><i></i>解答设置</router-link>
                    <router-link to = "/answer/my/answer/list" class="answer_list" ><i></i>我的回答</router-link>
                    <router-link to = "/answer/my/fans" class="fans" ><i></i>我的粉丝</router-link>
                    <router-link to = "/answer/my/comment/list" class="comment_list" ><i></i>收到的评价</router-link>
                    <router-link to = "/answer/my/message" class="message" ><i></i>60”语音寄语</router-link>
                    <router-link to = "/answer/my/set/qualification" class="qualification" ><i></i>入驻资质</router-link>
                </div>
            </div>
        </div>
        <v-asker-bottom tabOnIndex="2" ></v-asker-bottom>
    </div>
</template>

<script type="es6">

    import askerBottom from "../include/bottom.vue";

    export default {
        data() {
            return {
                user:{
                    income:0
                },
                income:0

            }
        },
        props:{
            expert:{
                type:Object
            }
        },
        components: {
            "v-asker-bottom": askerBottom
        },

        mounted: function () {
            var obj =  $(".asker_my_index_box .main a")
            xqzs.weui.active(obj);

            this.getExpertByUserId();
            this.getIncome();
            xqzs.wx.setConfig(this)

        },
        methods:{
            resizeImg:function (v) {
                return   xqzs.oss.resizeImg(v,100,100)
            },
            formatPrice:function(price){
                console.log(price)
                return  xqzs.string.formatPrice(price)
            },
            goPerfect:function () {
                this.$router.push("./perfect")
            },
            getIncome:function () {

                let _this= this;
                let expertId= cookie.get("expertId")
                _this.$http.get(web.API_PATH + 'come/expert/query/income/'+expertId+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.income= data.body.data.inCome
                    }
                }, function (error) {
                });

            },
            getExpertByUserId:function () {
                let _this=this;
                if(_this.expert.id&&_this.expert.id!=null){

                }else{
                    this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                        if (data.body.status == 1) {

                            _this.expert = data.data.data;
                        }
                    }, function (error) {
                    });
                }

            }

        }


    }
</script>
<style>
    .answer_my_index_box{background: #fff}
    .answer_my_index_box .top{ height:  3.529411764705882rem; line-height:  1; font-size: 1.058823529411765rem; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); padding:0.8823529411764706rem;border-bottom: 0.41176471rem solid #f4f4f8;}
    .answer_my_index_box .top:active{background: linear-gradient(to right, rgb(238, 148, 25), rgb(226, 92, 6));}
    .answer_my_index_box .top img{ display: block; float:left; width:3.529411764705882rem; height: 3.529411764705882rem;margin-right: 0.98rem;}
    .answer_my_index_box .top .name{color:rgba(255,255,255,1);padding-top: 0.8235rem;margin-bottom:0.52941rem}
    .answer_my_index_box .top .perfect{color:rgba(255,255,255,1);font-size: 0.76471rem;}
    .main_lists a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem;
        color:#333; font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; background: #fff;  }
    .main_lists a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .main_lists a:before{ content: " "; height: 0.0588235294117647rem; background: #eee; display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .main_lists .income .price{position: absolute; right:2.2rem;top:0rem;color:#ff6600}
    .main_lists a i{ display: block;background: url(../../../images/answer/answer_my_left_icon1.png) no-repeat ; background-size: 1.705882352941176rem; width:1.705882352941176rem; height:1.705882352941176rem;  position: absolute; left: 0.75rem; top:50% ; margin-top: -0.852941176470588rem;}
    .main_lists a.income i{ background-position: 0 0 }
    .main_lists a.level i{ background-position: 0 -1.705882352941176rem; }
    .main_lists a.setanswer i{ background-position: 0 -3.411764705882352rem}
    .main_lists a.answer_list i{ background-position: 0 -5.117647058823528rem; }
    .main_lists a.fans i{ background-position: 0 -6.823529411764704rem }
    .main_lists a.comment_list i{ background-position: 0 -8.52941176470588rem; }
    .main_lists a.message i{ background-position: 0 -10.23529411764706rem; }
    .main_lists a.qualification i{ background-position: 0 -11.94117647058823rem; }





</style>
