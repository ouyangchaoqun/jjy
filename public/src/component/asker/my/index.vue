<template>
    <div style="height: 100%" class="asker_my_index_box">
        <div v-title>我的</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="weui-tab__panel main">
            <div class="main">
            <div class="top">
                    <img class="img" :src="user.faceUrl">
                    <div class="name">
                       {{user.nickName}}
                    </div>
                <div class="clear"></div>

            </div>
            <router-link to = "../my/income"  class="income"  ><i></i>我的余额
                <div class="price">￥{{formatPrice(user.balance)}}</div>
            </router-link>
            <router-link to = "../my/listen/list" class="listen" ><i></i>我的偷听</router-link>
            <router-link to = "../my/answer/list" class="answer" ><i></i>我的收听</router-link>
            <router-link to = "../my/comment/list" class="comment" ><i></i>我的评价</router-link>
            </div>
            <div class="join" @click="join()">入驻咨询师</div>
        </div>
        <v-asker-bottom tabOnIndex="4" ></v-asker-bottom>
    </div>
</template>

<script type="es6">

    import askerBottom from "../include/bottom.vue";
    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                income:0,
                showLoad:false,
            }
        },
        props:{
            user:{
                type:Object
            }
        },
        components: {
            "v-asker-bottom": askerBottom,
            'v-showLoad':showLoad
        },
        methods: {
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
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
                this.showLoad = true;
                this.$router.push("/answer/join/join_remind");
            },
            getIncome:function () {
                let _this= this;
                _this.$http.get(web.API_PATH + 'come/user/query/income/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.income= data.body.data.inCome
                    }
                }, function (error) {
                });

            }

        },
        mounted: function () {
            let _this=this;
            _this.showLoad = true;
            _this.$http({
                method: 'GET',
                type: "json",
                url: web.API_PATH + 'user/find/by/user/Id/_userId_',
            }).then(function (data) {//es5写法
                _this.showLoad = false;
                if (data.data.data !== null) {
                    _this.user = eval(data.data.data);
                    console.log(_this.user)
                }
            }, function (error) {
                //error
            });
            $(".weui-tab__panel").height($(window).height() - 100);
            var obj = $(".asker_my_index_box .main a ,.join")
            xqzs.weui.active(obj);
            this.getIncome();
            xqzs.wx.setConfig(this);

        }


    }
</script>
<style>
    .asker_my_index_box .top{ height:  3.176471rem; line-height:  3.176471rem;color:#fff; font-size: 1.058823529411765rem; background:url("../../../images/asker/topBackground.png") no-repeat; padding:0.8823529411764706rem;background-size: 100% 100%;}
    .asker_my_index_box .top img{ display: block; float:left; width:3.176471rem; height: 3.176471rem; border-radius: 50%;  margin-right: 0.735rem;border: 1px solid #fff}

    .asker_my_index_box .main a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem; background: #fff;
     color:rgba(36,37,61,1); font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; }
    .asker_my_index_box .main a:nth-child(2){margin-top: 0.41176471rem;}
    .asker_my_index_box .main a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .asker_my_index_box .main a:before{ content: " "; height: 0.0588235294117647rem; background: rgba(238,238,238,1); display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .asker_my_index_box .main a .price{position: absolute; right:2.2rem;top:0rem ;color:#FE7301}
    .asker_my_index_box .main a:last-child:before{
        display: none;}



    .asker_my_index_box .main  a i{ display: block;background: url(../../../images/asker/asker_my_left_icon1.png) no-repeat ; background-size: 1.705882352941176rem; width:1.705882352941176rem; height:1.705882352941176rem;  position: absolute; left: 0.75rem; top:50% ; margin-top: -0.852941176470588rem;}
    .asker_my_index_box .main  a.income i{ background-position: 0 0 }
    .asker_my_index_box .main  a.listen i{ background-position: 0 -1.705882352941176rem; }
    .asker_my_index_box .main  a.answer i{ background-position: 0 -3.411764705882352rem}
    .asker_my_index_box .main  a.comment i{ background-position: 0 -5.117647058823528rem; }



   .asker_my_index_box .join{ background: #fff; line-height:3.470588235294118rem; margin: 0.41176471rem 0 ; text-align: center; font-size: 0.8823529411764706rem;color:rgba(36,37,61,1); }

</style>