<template>
    <div style="height: 100%" class="asker_my_index_box">
        <div v-title>我的</div>
        <div class="weui-tab__panel main">
            <div class="main">
            <div class="top">
                    <img class="img" :src="user.faceUrl">
                    <div class="name">
                       {{user.nickName}}
                    </div>
                <div class="clear"></div>

            </div>
            <router-link to = "../my/income"  class="income"  ><i></i>我的收益
                <div class="price">￥{{income}}</div>
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

    export default {
        data() {
            return {
                income:0,
                user:{}
            }
        },
        components: {
            "v-asker-bottom": askerBottom
        },
        methods: {
            join: function () {
                let _this= this;

                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        console.log(data)
                        if(data.data.data!=null){
                            let status = data.data.data.status;
                            if(status==0){
                                this.$router.push("/answer/join/reviewing");
                            }else{
                                if( _this.user.mobile&& _this.user.mobile.length==11){
                                    this.$router.push("/answer/join/base/info");
                                }else{
                                    this.$router.push("/answer/join/mobile");
                                }
                            }
                        }else{
                            if( _this.user.mobile&& _this.user.mobile.length==11){
                                this.$router.push("/answer/join/base/info");
                            }else{
                                this.$router.push("/answer/join/mobile");
                            }
                        }


                    }
                }, function (error) {

                });


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
            _this.$http({
                method: 'GET',
                type: "json",
                url: web.API_PATH + 'user/find/by/user/Id/_userId_',
            }).then(function (data) {//es5写法
                if (data.data.data !== null) {
                    _this.user = eval(data.data.data);


                }
            }, function (error) {
                //error
            });
            $(".weui-tab__panel").height($(window).height() - 100);
            var obj = $(".asker_my_index_box .main a ,.join")
            xqzs.weui.active(obj);
            this.getIncome();

        }


    }
</script>
<style>
    .asker_my_index_box .top{ height:  3.529411764705882rem; line-height:  3.529411764705882rem; font-size: 1.058823529411765rem; background: #fff; padding:0.8823529411764706rem;}
    .asker_my_index_box .top img{ display: block; float:left; width:3.529411764705882rem; height: 3.529411764705882rem; border-radius: 50%;  margin-right: 0.98rem;}

    .asker_my_index_box .main a{ position: relative; height:3.470588235294118rem;    line-height:3.470588235294118rem; background: #fff;
     color:#333; font-size: 0.8823529411764706rem; padding:  0  0.8823rem;display: block; overflow: hidden; padding-left: 2.66rem; }
    .asker_my_index_box .main a:nth-child(2){margin-top: 0.41176471rem;}
    .asker_my_index_box .main a:after{ background: url(../../../images/arrow.png) ; width: 0.9411764705882353rem; height: 0.9411764705882353rem; background-size: 0.9411764705882353rem; position: absolute;
        right:0.88235rem;top:1.25rem ; content: " "}
    .asker_my_index_box .main a:before{ content: " "; height: 0.0588235294117647rem; background: #eee; display: block; position: absolute; bottom:0;left: 0.9411764705882353rem; width: 100%}
    .asker_my_index_box .main a .price{position: absolute; right:2.2rem;top:0rem ;color:#ff6600}
    .asker_my_index_box .main a:last-child:before{
        display: none;}



    .asker_my_index_box .main  a i{ display: block;background: url(../../../images/asker/asker_my_left_icon.png) no-repeat ; background-size: 1.705882352941176rem; width:1.705882352941176rem; height:1.705882352941176rem;  position: absolute; left: 0.75rem; top:50% ; margin-top: -0.852941176470588rem;}
    .asker_my_index_box .main  a.income i{ background-position: 0 0 }
    .asker_my_index_box .main  a.listen i{ background-position: 0 -1.705882352941176rem; }
    .asker_my_index_box .main  a.answer i{ background-position: 0 -3.411764705882352rem}
    .asker_my_index_box .main  a.comment i{ background-position: 0 -5.117647058823528rem; }



   .asker_my_index_box .join{ background: #fff; line-height:3.470588235294118rem; margin: 0.41176471rem 0 ; text-align: center; font-size: 0.8823529411764706rem }

</style>