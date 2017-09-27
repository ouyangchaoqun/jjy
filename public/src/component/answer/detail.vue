<template >
    <div style="height: 100%" class="answer_detail_box">


        <div v-title>专家详情</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div class="answer_info">
                <div class="answer_banner">
                    <div class="answer_face"><img :src="detail.faceUrl"></div>
                    <div class="answer_name">{{detail.nickName}}</div>
                    <div class="answer_cs">
                        <div class="answer_ability">
                            <span v-for="good in detail.goodAt">{{good.title}}</span>
                        </div>
                    </div>

                    <div class="answer_address">{{detail.province}}-{{detail.city}}</div>
                </div>
                <div class="answer_count">
                    <div class="answer_countBox">
                        <div class="counts">{{detail.answerCount}}</div>
                        <div class="nr">个回答</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts" v-if="detail.listenCount!=null">{{detail.listenCount}}</div>
                        <div class="counts" v-if="detail.listenCount==null">0</div>
                        <div class="nr">次偷听</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts">99%</div>
                        <div class="nr">好评率</div>
                        <div class="line_1"></div>
                    </div>
                    <div class="answer_countBox">
                        <div class="counts">{{detail.followCount}}</div>
                        <div class="nr">人收听</div>
                    </div>

                </div>
            </div>
            <div class="answer_voice">
                <div class="ts">{{detail.sign}}</div>
                <div class="voice">
                    <span class="hello">您好：</span>
                    <span class="problem_answer_yy" v-if="true">
                        <img class="problem_answer_ly" src="../../images/nocharge.png" alt="">
                        <div class="problem_answer_play">点击播放</div>
                        <img class="problem_answer_sond" src="../../images/sond.png" alt="">
                        <div class="answer_play_time">60”</div>
                    </span>
                </div>
            </div>
            <div class="answer_detail">
                <div class="answer_title">详细介绍</div>
                <div class="content">
                    {{detail.introduction}}
                </div>
                <div class="btn_sq">收起</div>
            </div>
            <div class="answer_comments">
                <div class="answer_title">最新评价({{detail.evaluateCount}})</div>
                <div class="list">
                    <div class="item" v-for="item in commentList">
                        <div class="img"><img
                                :src="item.faceUrl">
                        </div>
                        <div class="info">
                            <div class="name">{{item.nickName}}</div> <!--该名字-->
                            <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span>
                            </div>
                            <div class="word">{{item.content}}
                            </div>
                            <div class="class_s">
                                <span v-for="tag in item.tag">{{tag.title}}</span>
                                <div class="clear"></div>
                            </div>
                            <div class="time">2017-09-11</div>
                        </div>
                        <div class="clear"></div>
                    </div>

                </div>
                <div class="btn_sq" @click="moreComment()">查看更多评价</div>
            </div>
            <div class="ask_answer">
                <div class="answer_title">问答({{detail.answerCount}})
                    <div class="new" @click="answerTypeChange()">{{answerTypeTxt}}<span class="sj"></span></div>
                </div>

                <div class="list">
                    <div class="item" v-for="item in answerList">
                        <div class="question">
                            <div class="img"><img :src="item.faceUrl">
                            </div>
                            <div class="info">
                                <div class="word">
                                    {{item.content}}
                                </div>
                                <div class="price">￥{{item.price}}</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="answer">
                            <div class="img"><img :src="item.expertUrl">
                            </div>
                            <div class="info">
                                <div class="reply" v-if="item.needPay">
                                    <div class="audio_btn">
                                        一元偷听
                                    </div>
                                    <span class="minute">58"</span>
                                </div>
                                <div class="status">
                                    <div class="ask_time">刚刚</div>
                                    <div class="ask_status">听过 {{item.listenTimes}}
                                        <div class="icon2"><span>{{item.likeTimes}}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>

            </div>

        </v-scroll>
        <div class="ask_bottom">
            <div class="listen"  @click="follow()">
                <div class="icon1">
                    <span>收听</span>
                </div>
            </div>
            <div class="pay_ask" @click="ask()">￥19.99提问</div>
        </div>
        </div>

</template>

<script type="es6">

    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';

    export default {
        data() {
            return {
                detail:{},
                id:0,
                viewType:0,
                commentList:[],
                answerList:[],
                answerType:1,
                answerTypeTxt:"最新",
                page: 1,
                row: 5  ,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            this.id = this.$route.query.id;
            this.getDetail();
            this.getComment();
            this.getAnswer();
        },
        methods:{
            follow:function () {
                let that=this;
                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+this.id+"/_userId_", {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            xqzs.weui.toast("success","收听成功",function () {

                            })
                        }else if(bt.data.status ==900004){
                            xqzs.weui.toast("success","已经收听",function () {
                                
                            })
                        }else if(bt.data.status ==9000003){
                            xqzs.weui.toast("fail","不能收听自己",function () {

                            })
                        }else {
                            xqzs.weui.toast("fail","收听失败",function () {

                            })
                        }
                    });
            },
            answerTypeChange:function () {
                let _this=this;
                let　answerTypes=[{label:"最新",value:1},{label:"热门",value:2}]
                weui.picker(answerTypes, {
                    defaultValue: _this.answerType,
                    onConfirm: function (result) {
                        console.log(result);
                        _this.answerTypeTxt = result[0].label;
                        _this.answerType = result[0].value;
                        _this.page=1;
                        _this.getAnswer();

                    }
                });
            },
            moreComment:function () {
               this.$router.push("comment?expertId="+this.id );
            },
            ask:function () {
                this.$router.push("/asker/ask")
            },
            getComment:function () {
                let _this= this;
                let id=  this.id;
                _this.$http.get(web.API_PATH + 'come/expert/get/evaluate/'+id+"/"+_this.viewType+'/1/1' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.commentList= data.body.data
                        console.log(data.body.data)
                    }
                }, function (error) {
                });
            },
            onInfinite(done) {
                this.getAnswer();
                done() // call done
            },
            getAnswer:function () {
                let _this= this;
                let id=  this.id;

                if (_this.page == 1) {_this.showLoad=true;}
                if(   _this.isLoading ){return ;}
                _this.isLoading = true;
                _this.$http.get(web.API_PATH + 'come/expert/get/answer/'+id+"/"+_this.answerType+'/'+_this.page+'/'+_this.row+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
//                        _this.answerList= data.body.data;

                        _this.showLoad = false;
                        _this.isLoading = false;
//                    console.log(response)

                        if( data.body.status!=1&&_this.page==1){
                            _this.list = [];
                            return;
                        }
                        let arr = data.body.data;
//
                        if (arr.length < _this.row) {
                            _this.isPageEnd = true;
                            _this.isShowMoreText = false
                        }
                        Bus.$emit("scrollMoreTextInit", _this.isShowMoreText);



                        if (_this.page == 1) {
                            _this.answerList = arr;
                        } else {
                            _this.answerList = _this.answerList.concat(arr);
                        }
                        if (arr.length == 0) return;
                        _this.page = _this.page + 1;
                    }
                }, function (error) {
                    _this.isLoading = false;
                    _this.showLoad = false;
                });
            },
            getDetail:function () {
                let _this= this;
                let id=  this.id;
                _this.$http.get(web.API_PATH + 'come/expert/show/to/user/'+id+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.detail= data.body.data
                    }
                }, function (error) {
                });

            }
        }


    }
</script>
<style>
    .answer_detail_box .answer_info{
        width: 100%;
    }
    .answer_detail_box .answer_banner{
        background: url("../../images/answer/banner.jpg") top center  no-repeat;
        background-size: 100%;
        height: 12.03rem;
        padding-top: 0.88rem;
    }
    .answer_detail_box .answer_face{
        width: 5.29rem;
        height: 5.29rem;
        border-radius: 50%;
        margin: 0 auto;
    }
    .answer_detail_box  .answer_face img{
        width: 100%;
        border-radius: 50%;
    }
    .answer_detail_box .answer_name{
        margin-top: 16px;
        font-size: 18px;
        line-height: 1;
        color: white;
        text-align: center;
    }
    .answer_detail_box .answer_cs{
        margin-top: 14px;
        text-align: center;
    }
    .answer_detail_box  .answer_ability{
      display: inline-block;
    }
    .answer_detail_box  .answer_ability span{
        display: block;
        float:left;
        text-align: center;
        border-radius:0.6176470588235294rem;
        height: 1.235294117647059rem;
        line-height: 1.235294117647059rem;
        border: 1px solid rgba(211,213,215,1);
        color:rgba(211,213,215,1);
        font-size: 0.7058823529411765rem;
        padding: 0 0.7rem;
        margin-right:0.55rem;
    }
    .answer_detail_box .answer_address{
        margin-top: 4px;
        text-align: center;
        color: rgba(211,213,215,1);
        line-height: 1;
    }
    .answer_detail_box .answer_count{
        display: flex;
        background: white;
    }
    .answer_detail_box   .answer_countBox{
        width: 100%;
        text-align: center;
        position: relative;
    }
    .answer_detail_box .counts{
        font-size:1.05rem;

        color:rgba(102,102,102,1);
    }
    .answer_detail_box .nr{
        font-size:0.705rem;

        color:rgba(149,149,149,1);
        line-height: 1;
        margin-top: 0.1rem;
        margin-bottom: 0.64rem;
    }
    .answer_detail_box .line_1{
        width: 1px;
        height: 1rem;
        background:rgba(219,219,219,1);
        position: absolute;
        right: 0;
        top:50%;
        margin-top: -0.5rem;
    }
    .answer_detail_box .answer_voice{
        height: 6.18rem;
        margin-top: 0.41176471rem;
        background: white;
        padding-bottom: 0.88rem;
    }
    .answer_detail_box .ts{
        padding-top: 0.88rem;
        padding-left: 0.88rem;
        font-size:0.88rem;

        color:rgba(51,51,51,1);
    }
    .answer_detail_box .voice{
        margin-top: 0.88rem;
    }
    .answer_detail_box .audio_btn{   width:50%; float:left; position: relative;
        height:2.4rem; line-height: 2.4rem;
        background:rgba(0,184,230,1);
        border-radius: 1.2rem ; text-align: center; color:#fff;  }
    .answer_detail_box  .audio_btn:active{ background: rgb(0, 138, 182);
    }
    .answer_detail_box .hello{
        padding-left: 0.88rem;
        color:#999; font-size: 1rem;
        float: left;
        margin-top: 0.88rem;
        margin-right: 0.588235rem;
    }
    .answer_detail_box .minute{ color:#999; font-size: 1rem; margin-left: 0.8rem; float:left; line-height: 2.4rem;}
    .answer_detail_box .audio_btn:before{ width: 0.6764705882352941rem; position: absolute;
        content:" "; display: block; height: 0.97rem; background: url(../../images/sond.png); background-size: 0.6764705882352941rem;  top:0.6rem; left:0.8rem;}
    .answer_detail_box  .audio_btn:after {
        content: " ";
        display: block;
        position: absolute;
        bottom: -0.6rem;
        left: 0.9rem;
        width: 0;
        height: 0;
        border-top: 0.6764705882352941rem solid #00B8E6;
        border-right: 0.6764705882352941rem solid transparent;
    }


    .answer_detail_box  .audio_btn:active:after{
        border-top: 0.6764705882352941rem solid rgb(0, 138, 182);;
    }
    .answer_detail_box .answer_detail{
        background: white;
        margin-top: 0.41176471rem;
        padding-bottom: 1.2rem;
    }
    .answer_detail_box .answer_title{
        height: 2.59rem;
        line-height: 2.59rem;
        font-size: 0.88rem;
        padding-left: 0.88rem;
        border-bottom: 1px solid #EEEEEE;
        background: white;
    }
    .answer_detail_box .content{
        font-size: 13px;
        padding:0.88rem ;
        color:#999
    }
    .answer_detail_box .btn_sq{
        width:5.235rem;
        height:1.352rem;
        border-radius: 0.66rem ;
        border: 1px solid #09bb07;
        margin:0 auto;
        text-align: center;
        color: #09bb07;
        line-height: 1.352rem;
        font-size: 0.70588235rem;
    }
    .answer_detail_box .answer_comments{
        background: white;
        margin-top: 0.41176471rem;
        padding-bottom: 0.88rem;
    }
   .answer_detail_box  .list .item{ background: #fff; padding: 0.8823529411764706rem 0.8823529411764706rem 1.23rem 0.8823529411764706rem;margin-bottom: 0.41176471rem  }
    .answer_detail_box .list .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_detail_box  .list .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_detail_box  .list .item .img{ width: 2rem; float:left; }
    .answer_detail_box  .list .item .img img{ width: 100%; border-radius: 50%; border: 1px solid #EEEAEA }
    .answer_detail_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_detail_box  .list .info .name{ font-size: 0.7058823529411765rem; color:#999; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
    .answer_detail_box  .list .word{ font-size:0.7647058823529412rem;  color:#333; margin-bottom: 0.2rem;;}
    .answer_detail_box  .list .time{ font-size:0.7058823529411765rem; color:#C1C1C1; margin-top: 0.6rem;margin-bottom: 0.6rem;}
    .answer_detail_box  .list .info .class_s { clear: both; margin-top: 0.3rem;}
    .answer_detail_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #C1C1C1 ; color:#C1C1C1 ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_detail_box .ask_answer{
        margin-top: 0.41176471rem;
    }
    .answer_detail_box .sj{
        width: 0;
        height: 0;
        border-top: 5px solid #999999 ;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        position: absolute;
        top:1.17rem;
        margin-left: 0.294rem;
    }
    .answer_detail_box .new{float: right;margin-right: 0.58rem; position: relative; padding-right: 1.17rem; color: #999999 ;}
    .answer_detail_box .price{
        font-size: 0.74rem;
        color: #666;
    }
    .answer_detail_box .reply{height: 50px;}
    .answer_detail_box .status{color: #999999; font-size:0.70rem;margin-top: 0.58rem }
    .answer_detail_box .ask_time{float: left;}
    .answer_detail_box .answer{margin-top: 0.88rem}
    .answer_detail_box .ask_status{float: right;}
    .answer_detail_box .ask_status img{width: 0.94rem;}

    .answer_detail_box .ask_bottom{
        margin-top: 2rem;
        height: 2.588rem;
        text-align: center;
        position: absolute;
        bottom:0;
        left: 0;
        width: 100%;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    .answer_detail_box .listen{
        float: left;
        width: 25%;
        background: white;
        box-shadow: #eee 0 -5px 5px -5px;
        height: 2.588rem;
    }
    .answer_detail_box .listen span{color: #999;}
   .answer_detail_box .icon1{
       margin-top: 0.588rem;
       background: url("../../images/answer/listen.png") no-repeat;
       background-size: 1.05rem;
       padding-left: 0.8rem;
       background-position: 0.9rem 0.294rem;
   }
    .answer_detail_box .icon2{
        float: right;
        background: url("../../images/answer/good.png") no-repeat;
        background-size: 1.05rem;
        padding-left: 2rem;
        background-position: 0.9rem 0;
    }
    .answer_detail_box .pay_ask{width: 75%;float: right; background: #09bb07;color: white;line-height: 2.588rem;height: 2.588rem}
</style>