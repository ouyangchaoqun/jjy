<template id="my_problem_detail">
    <div class="ask_detailBox">
        <div v-title>问题详情</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="my_problem_detail">
            <!--<div class="problem_detail_header">-->
                <!--问题类型:  <div class="titleColor">{{detail.title}}</div>-->
                <!--&lt;!&ndash;&ndash;&gt;-->
            <!--</div>-->
            <div class="add_askerInfo">
                <img :src="user.faceUrl" alt="">
                <span>{{user.nickName}}</span>
                <div>{{detail.title}}</div>  <!--￥{{formatPrice(detail.price)}}-->
            </div>
            <div class="problem_detail_content">
                {{detail.question}}
            </div>
            <div class="problem_wait_style">
                <!--待回答-->
                <div v-if="detail.questionStatus==0">
                    <span>待回答</span><span>还{{formatTimeLastText(detail.endTime)}}</span>
                </div>
                <!--超时未回答-->
                <div v-if="detail.questionStatus==2">
                    <span>超时未回答</span><span>提问酬金已原路返还</span>
                </div>
                <!--解答-->
                <div v-if="detail.questionStatus==1">
                    <span>已解答</span>
                </div>
            </div>


            <div class="steal_expert_info" :class="{answerInfo_border:detail.answerCount==0}">
                <img :src="detail.expert.faceUrl" alt="" @click="goDetail(detail.expertId)">
                <div>
                    <span class="steal_expert_name" @click="goDetail(detail.expertId)">{{detail.expert.nickName}}</span><span
                        class="steal_expert_fans">{{followCount}}人收听</span>
                </div>
                <div class="steal_expert_des">{{detail.expert.sign}}</div>
                <div class="followed_box" v-if="!detail.expert.isFollow" @click="follow(detail.expertId)">收听</div>
                <div class="followed_box isfollow_style"  v-if="detail.expert.isFollow" @click="follow(detail.expertId)" >已收听</div>
            </div>
            <template v-for="(item,index) in detail.answers">
                <div class="problem_answer_info" >
                    <!--回答，专家语音-->
                    <div class="problem_answer_yy" v-if="detail.questionStatus==1">
                        <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                            <div class="audio_btn" @click.stop="play(index)">
                                <span v-if="!item.playing&&!item.paused">点击播放</span>
                                <span v-if="item.playing">正在播放..</span>
                                <span v-if="item.paused">播放暂停</span>
                                <div class="second">{{item.voiceLength}}”</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div class="yy_bottomBorder"></div>
                <!--回答后底部显示详情-->
                <div class="problem_answer_bottom" v-if="detail.answerCount>0">
                    <div class="problem_answer_time">{{formatDateText(item.addTime)}}</div>
                    <div class="problem_answer_zan">
                        <div><span>听过</span><span>{{item.ListenTimes}}</span></div>
                        <div><span>收入分成￥</span><span>{{formatPrice(detail.inCome)}}</span></div>
                        <div @click="like(index)" class="good_care" :class="{good_cared:item.isLiked}"><span>{{item.likeTimes}}</span></div>
                    </div>
                </div>
                <div style="height:0.588235rem;background: rgba(245,245,245,1)"></div>
            </template>
        </div>


        <!--匿名评价-->
        <div class="problem_assess" v-if="detail.answers&&detail.answers.length>0&&detail.answers[0].evaluate&&detail.answers[0].evaluate.id==null"><!---->
            <h4>匿名评价</h4>
            <div class="star">
                <div v-for="(item,index) in comText">
                    <span :class="{on:item.click<=point}" @click="clickStar(item.click)" >
                    </span>
                    <div :class="{color_on:item.click==point}">{{item.text}}</div>
                </div>

            </div>
            <div class="problem_assess_item">
                <div class="problem_assess_input">
                    <textarea v-show="!isOver" placeholder="您的反馈将影响咨询师" @input="contentChange()" id="content"></textarea>
                    <div class="addIsOverHtml" v-show="isOver">{{contentOver}}</div>
                </div>
            </div>
            <div v-show="!isOver" class="problem_assess_btn">
                <div class="weui-btn weui-btn_disabled weui-btn_primary" @click="comment()">提交</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    var my_problem_detail = {
        template: '#my_problem_detail'
    };

    export default {
        data() {
            return {
                problem_assess_flag:true,
                detail:{
                    expert:{}
                },
                point:0,
                tags:[],
                MAX_TAG_COUNT:5,
                comText:[{click:1,text:'极差'},{click:2,text:'不满意'},{click:3,text:'一般'},{click:4,text:'满意'},{click:5,text:'非常满意'}],
                isOver:false,
                contentOver:'',
                showLoad: false,
                followCount:0
            }
        },
        props:{
            user:{
                type:Object
            }
        },
        mounted: function () {
            this.showLoad = true;
            this.id= parseInt(this.$route.query.id);
            this.getDetail();
//            this.getTags();
            xqzs.wx.setConfig(this);
            console.log(this.user)
        },
        methods: {
            goDetail:function (extId) {
                this.$router.push('/answer/detail/?id='+extId)
            },
            like:function (index) {
                let  item = this.detail.answers[index];
                if(item.isLiked){
                    xqzs.weui.tip("已经点赞");
                    return ;
                }
                let _this=this;
                this.$http.put(web.API_PATH + "come/user/like/answer/_userId_/"+item.id, {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            item.isLiked=1;
                            item.likeTimes=item.likeTimes+1;
                            _this.$set(_this.detail.answers,index,item);
                        }else if(bt.data.status==920006){
                            xqzs.weui.tip("已经点赞");

                        }
                    });
            },
            formatPrice:function (v) {
               return xqzs.string.formatPrice(v)
            },

            play:function (index) {

                let _this=this;
                let list = _this.detail.answers;
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.detail.answers,index,list[index])
                };

                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.detail.answers,i,list[i]);
                    }
                }
                let item= list[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    list[index].paused=false;
                    list[index].playing=true;
                    _this.$set(_this.detail.answers,index,list[index])
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        list[index].paused=true;
                        list[index].playing=false;
                        _this.$set(_this.detail.answers,index,list[index])
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        let answerId= item.id;
                        xqzs.voice.getAnswerVoice(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.detail.answers,index,list[index])
                        })
                    }

                }

            },


//            selectTag:function (index) {
//
//                let count= 0;
//                let tags=this.tags;
//                if(tags[index].selected==true){
//                    tags[index].selected=false;
//                }else{
//                    for(let i=0;i<tags.length;i++){
//                        if(tags[i].selected==true){
//                            count++;
//                        }
//                    }
//                    if(count>=this.MAX_TAG_COUNT){
//
//                    }else{
//                        tags[index].selected=true;
//                    }
//                }
//
//                this.$set(this.tags,index,tags[index])
//
//            },
//            getTags:function () {
//
//                let _this= this;
//                _this.$http.get(web.API_PATH + 'come/expert/evaluate/tag').then(function (data) {//es5写法
//                    if (data.body.status == 1) {
//
//                        _this.tags= data.body.data
//                    }
//                }, function (error) {
//                });
//
//            },
            clickStar:function (v) {
                console.log(v)
                this.point=v;
            },
            formatDateText:function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },
            formatTimeLastText:function (time) {
               return xqzs.dateTime.getTimeFormatLastText(time)
            },
            contentChange:function(){
                let content = $("#content").val();
                if(content.length>0){
                    $('.problem_assess_btn .weui-btn').removeClass('weui-btn_disabled')
                }else{
                    $('.problem_assess_btn .weui-btn').addClass('weui-btn_disabled')
                }
            },
            comment:function () {
                let that=this;
                that.showLoad = true;
                let content = $("#content").val();
                that.contentOver = content
                if(this.point==0){
                    xqzs.weui.toast('fail',"请选择分数",function () {

                    })
                    return;
                }

//                for(let i=0;i<this.tags.length;i++){
//                    if(this.tags[i].selected==true){
//                        tags .push(this.tags[i].id);
//                    }
//                }
//                if(tags.length==0){
//                    xqzs.weui.toast('fail',"请至少选择一个标签",function () {
//
//                    })
//                    return;
//                }
                if(content.length==0){
                    xqzs.weui.toast('fail',"请输入评论内容",function () {

                    })
                    return;
                }





                that.$http.put(web.API_PATH + "come/user/evaluate/answer", {userId:"_userId_",answerId:this.detail.bestAnswerId, point:this.point,content:content})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            xqzs.weui.toast("success","评论成功",function () {
                                that.isOver = true;
                                that.showLoad = false;
                                console.log(that.isOver)
//                                window.location.href=window.location.href
                            })
                        }
                    });
            },
            follow:function (id) {
                let that=this;

                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+id+"/_userId_", {})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            if(that.detail.expert.isFollow==0){
                                that.detail.expert.isFollow=1;
                                that.followCount = that.followCount+1;
                                xqzs.weui.toast("success","收听成功")
                            }else {
                                that.detail.expert.isFollow=0;
                                that.followCount = that.followCount-1;
                                xqzs.weui.toast("success","取消成功")
                            }


                        }else if(bt.data.status ==900004){
                            xqzs.weui.tip("已经收听")
                        }else if(bt.data.status ==9000003){
                            xqzs.weui.tip("不能收听自己")
                        }else {
                            xqzs.weui.tip("收听失败")
                        }
                    });
            },
            getDetail:function () {

                let _this= this;

                _this.$http.get(web.API_PATH + 'come/user/query/question/_userId_/'+this.id ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.showLoad = false
                        console.log(data.body.data.data)
                        _this.detail= data.body.data.data;
                        _this.followCount = _this.detail.expert.followCount;
                        console.log(_this.detail)
                    }
                }, function (error) {
                });

            }

        },
        components: {
            'v-showLoad': showLoad,
        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        }


    }
</script>
<style>
    .ask_detailBox{
        background: #fff;
    }
    .ask_detailBox .good_care{
        margin-right:0;
    }
    .problem_detail_header .titleColor{
        color:rgba(102,102,153,1);
    }
    .ask_detailBox .problem_detail_header{
        line-height: 2.11764rem;
        background: rgba(245,245,245,1);
        padding:0;
        padding-left: 0.88235rem;
        margin-bottom: 0.88235rem;
    }
    .ask_detailBox .my_problem_detail .add_askerInfo{
        line-height: 1.70588rem;
        display: flex;
        font-size: 0.76471rem;
        padding:0 0.88235rem;
        position: relative;
        margin-bottom: 0.588235rem;
        padding-top: 0.88235rem;
    }
    .ask_detailBox .my_problem_detail .add_askerInfo img{
        width:1.70588rem;
        height:1.70588rem;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    .ask_detailBox .my_problem_detail .add_askerInfo span{
        color:rgba(51,51,51,0.5);
    }
    .ask_detailBox .my_problem_detail .add_askerInfo div{
        color:rgba(51,51,51,0.5);
        position: absolute;
        right:0.88235rem;
    }
    .ask_detailBox .steal_expert_info{
        padding-left:4.176rem;
        padding-bottom: 1.5rem;
        border-top:0.588235rem solid rgba(245,245,245,1);
    }
    .problem_wait_style{
        color:rgba(36,37,61,0.5);
        font-size: 0.70588rem;
        line-height: 1;
        padding:0.88235rem;
    }
    .problem_wait_style span{
        margin-right: 0.88235rem;
    }
    .ask_detailBox .answerInfo_border{border-bottom:1px solid rgba(224,224,225,1);}
    .ask_detailBox .yy_bottomBorder{height:0.5px;width:80%;margin: 0 auto;border-bottom: 1px solid rgba(210,210,210,1);margin-bottom: 1.058rem;padding-top:1.5rem;}
    .ask_detailBox .problem_answer_bottom{padding:0;margin:0 auto;width:80%;margin-bottom: 0.8235rem;}
    .problem_assess_btn .weui-btn{border-radius: 50px;}
    .problem_assess .star>div{display: inline-block;line-height: 1;color:rgba(36,37,61,0.5);font-size: 0.6471rem;margin-bottom: 1.852rem}
    .problem_assess .star span{ position:relative;display: inline-block;  height:1.6470588235rem; width: 1.735294rem; background: url(../../../images/starNew_no.png) no-repeat; background-size: 1.735294rem; margin: 1.176471rem  0.70588235rem 0.67647rem 0.70588235rem;  }
    .problem_assess .star span.on{ background: url(../../../images/starNew.png) no-repeat; background-size: 1.735294rem;}
    .problem_assess .star>div .color_on{color:rgba(253,198,10,1)}
    .ask_detailBox .problem_answer_info{
        padding:0 0.88235rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 2.8235rem;
        font-size: 0.8235rem;
        color: rgba(36,37,61,0.5);
    }
    .problem_assess{
        background: #fff;
        padding-top:1.176471rem;
        font-size: 0.70588rem;
        color: rgba(36,37,61,0.5);
        text-align: center;
        border-top: 0.41176rem solid #f4f4f8;
        padding-bottom: 2.35rem;
    }
    .problem_assess h4{
        color: rgba(36,37,61,1);
        font-size: 0.88235rem;
        font-weight: normal;
        line-height: 1;
    }
    .problem_assess img{
        display: inline-block;
        margin:0.588235rem 0.20588rem;
        width: 0.941176rem;
    }
    .problem_assess_item span{
        padding:0 0.50588rem;
        height:1.35294rem;
        line-height: 1.35294rem;
        border:1px solid rgba(36,37,61,0.5);
        border-radius: 1rem;
        display: inline-block;
        margin-bottom:0.70588rem;
        margin-right: 0.235294rem;
    }
    .problem_assess_item span.on{
        border:1px solid rgba(255,158,25,1);
        color:rgba(253,114,6,1);
    }
    .problem_assess_class{
        margin-bottom: 0.88235rem;
        padding:0 2.1176471rem;
        text-align: left;
    }
    .problem_assess_input{
       padding: 0 0.88235rem 1.6471rem 0.88235rem;
    }
    .problem_assess_item textarea{
        height:4.1176471rem;
        background: #EBEBEC;
        resize: none;
        border:0;
        outline: none;
        width:94%;
        font-size: 0.70588rem;
        color: rgba(36,37,61,1);
        border-radius: 5px;
        padding:3%;
        line-height: 1.6;
        letter-spacing: 2px;
    }
    .problem_assess_btn{
        padding: 0 0.88235rem;
    }
    .problem_wait_style>span:nth-of-type(1){
        font-size: 0.70588rem;
        margin-right: 1.235294rem;;
    }
    .problem_wait_style>span:nth-of-type(2){
        color: rgba(36,37,61,0.5) ;
        font-size: 0.70588rem;
    }
    .problem_box_background{
        background: #F4F4F7;
    }
    .problem_answer_info .problem_answer_yy{margin:0 auto;}
    .problem_assess_input .addIsOverHtml{text-align: left;background: #EBEBEC;border-radius: 0.294rem;padding:0.294rem 0.88235rem;}
    .ask_detailBox .addContentStyle{margin-bottom: 0}
</style>