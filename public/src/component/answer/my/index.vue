<template >
    <div style="height: 100%" class="answer_my_index_box">
        <div v-title>我的</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="weui-tab__panel main">
            <div class="main">
                <div class="top" @click="goJoin()">
                        <img class="img" :src="resizeImg(expert.faceUrl)">
                        <div class="name">
                            {{expert.nickName}}
                        </div>
                        <div class="perfect" >更新资质</div>
                        <div class="clear"></div>
                </div>
                <div class="main_lists">
                    <router-link to = "/answer/my/income"  class="income"  ><i></i>我的余额
                        <div class="price">￥{{formatPrice(user.balance)}}</div>
                    </router-link>
                    <!--<router-link to = "/answer/my/level" class="level" ><i></i>我的等级</router-link>-->
                    <!--<router-link to = "/answer/my/setanswer" class="setanswer" ><i></i>解答设置</router-link>-->
                    <router-link to = "/answer/my/answer/list" class="answer_list" ><i></i>我的回答</router-link>
                    <router-link to = "/answer/my/fans" class="fans" ><i></i>我的粉丝</router-link>
                    <router-link to = "/answer/my/comment/list" class="comment_list" ><i></i>收到的评价</router-link>
                    <!--<router-link to = "/answer/my/message" class="message" ><i></i>60”语音寄语</router-link>-->
                    <!--<router-link to = "/answer/my/set/qualification" class="qualification" ><i></i>入驻资质</router-link>-->
                </div>
            </div>
        </div>
        <v-asker-bottom tabOnIndex="2" ></v-asker-bottom>
    </div>
</template>

<script type="es6">

    import askerBottom from "../include/bottom.vue";
    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                user:'',
                income:0,
                showLoad:false,
            }
        },
        props:{
            expert:{
                type:Object
            }
        },
        components: {
            "v-asker-bottom": askerBottom,
            'v-showLoad':showLoad
        },

        mounted: function () {
            this.getUserInfo()
            var obj =  $(".asker_my_index_box .main a")
            xqzs.weui.active(obj);

            this.getExpertByUserId();
            this.getIncome();
            xqzs.wx.setConfig(this)

        },
        methods:{
            getUserInfo:function () {
                let _this = this;
                _this.$http({
                    method: 'GET',
                    type: "json",
                    url: web.API_PATH + 'user/find/by/user/Id/_userId_',
                }).then(function (data) {//es5写法
                    if (data.data.data !== null) {
                        _this.user = eval(data.data.data);
                        console.log( _this.user )
                    }
                }, function (error) {
                    //error
                });
            },
            resizeImg:function (v) {
                return   xqzs.oss.resizeImg(v,100,100)
            },
            formatPrice:function(price){
                return  xqzs.string.formatPrice(price)
            },
            goPerfect:function () {
                this.$router.push("./perfect")
            },
            join: function () {
                let _this= this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        if(data.data.data!=null){
                            let status = data.data.data.status;
//                            const NOT_AUTHENTICATED=0;//未认证
//                            const AUTHENTICATED = 1 ;//已认证
//                            const AUTHENTICATING = 2;//认证中
//                            const AUTHENTICATING = -1;//提交中
                            if(status==0||status==-1){
                                _this.goJoin()

                            }else{
                                if(status==1){
                                    xqzs.weui.tip("您已成功入驻咨询师，请从公众号移步到咨询师。")
                                }else{
                                    _this.$router.push("/answer/join/reviewing");
                                }
                            }
                        }else{
                            _this.goJoin()
                        }
                    }
                }, function (error) {
                });


            },
            goJoin:function () {
                //this.$router.push("/answer/join/joinstep?edit=true");
                this.showLoad = true;
                this.$router.push("/answer/join/join_update");
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
                            console.log(_this.expert)
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
    .answer_my_index_box .top{ height:  3.529411764705882rem; line-height:  1; font-size: 1.058823529411765rem; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); padding:0.8823529411764706rem;border-bottom: 0.41176471rem solid #f4f4f8;position: relative}
    .answer_my_index_box .top:after{background: url(../../../images/arrow.png) ;width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem;position: absolute; right:0.88235rem;top:50%;margin-top:-0.4705882355rem; content: " "}
    .answer_my_index_box .top:active{background: linear-gradient(to right, rgb(238, 148, 25), rgb(226, 92, 6));}
    .answer_my_index_box .top img{ display: block; float:left; width:3.529411764705882rem; height: 3.529411764705882rem;margin-right: 0.98rem;border-radius: 0.2941rem;}
    .answer_my_index_box .top .name{color:rgba(255,255,255,1);padding-top: 0.8235rem;margin-bottom:0.52941rem}
    .answer_my_index_box .top .perfect{color:rgba(255,255,255,1);font-size: 0.76471rem;}
    .main_lists a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem;
        color:rgba(36,37,61,1); font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; background: #fff;  }
    .main_lists a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .main_lists a:before{ content: " "; height: 0.0588235294117647rem; background: #eee; display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .main_lists .income .price{position: absolute; right:2.2rem;top:0rem;color:#FE7301}
    .main_lists a i{ display: block;width:1.471rem; height:1.471rem;  position: absolute; left: 0.75rem; top:50% ; margin-top: -0.852941176470588rem;}
    .main_lists a.income i{background: url("../../../images/answer/sy_icon.png") no-repeat;background-size: 100% 100%;}
    .main_lists a.level i{ background-position: 0 -1.705882352941176rem; }
    .main_lists a.setanswer i{}
    .main_lists a.answer_list i{ background: url("../../../images/answer/hd_icon.png") no-repeat;background-size: 100% 100%;}
    .main_lists a.fans i{ background: url("../../../images/answer/fs_icon.png") no-repeat;background-size: 100% 100%;}
    .main_lists a.comment_list i{ background: url("../../../images/answer/pj_icon.png") no-repeat;background-size: 100% 100%;}
    .main_lists a.message i{ background-position: 0 -10.23529411764706rem; }
    .main_lists a.qualification i{ background-position: 0 -11.94117647058823rem; }
    .main_lists a:active{background: #eee}




</style>
