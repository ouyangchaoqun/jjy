<template id="my_problem_detail">
    <div :class="{problem_box_background:problem_assess_flag}">
        <div class="my_problem_detail">
            <div class="problem_detail_header">
                问题类型:  <div>{{detail.title}}</div>
                <div>￥{{detail.price}}</div>
            </div>
            <div class="problem_detail_content">
                {{detail.question}}
            </div>
            <div class="problem_answer_info">
                <!--待回答-->
                <div class="problem_wait_style" v-if="detail.questionStatus==0">
                    <span>待回答</span><span>还{{formatTimeLastText(detail.endTime)}}</span>
                </div>
                <!--超时未回答-->
                <div class="problem_wait_style" v-if="detail.questionStatus==2">
                    <span>超时未回答</span><span>提问酬金已原路返还</span>
                </div>
            </div>

            <template v-for="(item,index) in detail.answers">
                <div class="problem_answer_info">
                    <img :src="item.expertFaceUrl" alt="">
                    <!--回答，专家语音-->
                    <div class="problem_answer_yy" v-if="detail.questionStatus==1">
                        <div class="audio" :class="{playing:item.playing,paused:item.paused}">
                            <div class="audio_btn" @click.stop="play(index)">
                                <span v-if="!item.playing&&!item.paused">点击播放</span>
                                <span v-if="item.playing">正在播放..</span>
                                <span v-if="item.paused">播放暂停</span>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="answer_play_time">{{item.voiceLength}}”</div>
                    </div>
                </div>

                <!--回答后底部显示详情-->
                <div class="problem_answer_bottom" v-if="detail.answerCount>0">
                    <div class="problem_answer_time">{{formatDateText(item.addTime)}}</div>
                    <div class="problem_answer_zan">
                        <div><span>听过</span><span>{{item.ListenTimes}}</span></div>
                        <div><span>收入分成￥</span><span>{{item.inCome}}</span></div>
                        <div><img src="../../../images/asker/zan_nor.png" alt=""><span>{{item.likeTimes}}</span></div>
                    </div>
                </div>
                <div class="steal_expert_info">
                    <div>
                        <span class="steal_expert_name">{{detail.expert.nickName}}</span><span
                            class="steal_expert_fans">{{detail.expert.listenCount}}人收听</span>
                    </div>
                    <div class="steal_expert_des">{{detail.expert.sign}}</div>
                    <img src="../../../images/asker/listenin.png" alt="" @click="follow(detail.expertId)">
                </div>
            </template>
        </div>


        <!--匿名评价-->
        <div class="problem_assess" v-if="detail.answers&&detail.answers.length>0&&detail.answers[0].evaluate&&detail.answers[0].evaluate.id==null">
            <h4>匿名评价此回答</h4>
            <div class="star">

                <span v-for="item in 5" :class="{on:item<=point}" @click="clickStar(item)" ></span>

            </div>
            <div class="problem_assess_item">
                <div class="problem_assess_class">
                    <span v-for="(item,index) in tags" @click="selectTag(index)" :class="{on:item.selected==true}">{{item.title}}</span>

                </div>
                <div class="problem_assess_input">
                    <textarea placeholder="您的反馈将影响咨询师" id="content"></textarea>
                </div>
            </div>
            <div class="problem_assess_btn">
                <div class="weui-btn weui-btn_disabled weui-btn_primary" @click="comment()">提交</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    var my_problem_detail = {
        template: '#my_problem_detail'
    };

    export default {
        data() {
            return {
                problem_assess_flag:true,
                detail:{},
                point:0,
                tags:[],
                MAX_TAG_COUNT:5
            }
        },
        mounted: function () {

            this.id= parseInt(this.$route.query.id);
            this.getDetail();
            this.getTags();

        },
        methods: {

            play:function (index) {
                let _this=this;
                let list = _this.detail.answers;
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
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.detail.answers,index,list[index])
                        })
                    }

                }

            },
            /**
             * 获取音频地址
             * callFun(url) 回调 用户播放
             */
            getVoiceUrl:function (answerId,callFun) {
                let _this=this;
                this.showLoad=true;
                this.$http.put(web.API_PATH + "come/listen/get/voice/_userId_/"+answerId, {})
                    .then(function (bt) {
                        _this.showLoad=false;
                        if (bt.data && bt.data.status == 1) {
                            if(typeof (callFun) =="function"){
                                callFun(bt.data.data.path)
                            }
                        }
                    });
            },

            selectTag:function (index) {

                let count= 0;
                let tags=this.tags;
                if(tags[index].selected==true){
                    tags[index].selected=false;
                }else{
                    for(let i=0;i<tags.length;i++){
                        if(tags[i].selected==true){
                            count++;
                        }
                    }
                    if(count>=this.MAX_TAG_COUNT){

                    }else{
                        tags[index].selected=true;
                    }
                }

                this.$set(this.tags,index,tags[index])

            },
            getTags:function () {

                let _this= this;
                _this.$http.get(web.API_PATH + 'come/expert/evaluate/tag').then(function (data) {//es5写法
                    if (data.body.status == 1) {

                        _this.tags= data.body.data
                    }
                }, function (error) {
                });

            },
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
            comment:function () {
                let that=this;
                let content = $("#content").val();
                let tags=[];
                if(this.point==0){
                    xqzs.weui.toast('fail',"请选择分数",function () {

                    })
                    return;
                }

                for(let i=0;i<this.tags.length;i++){
                    if(this.tags[i].selected==true){
                        tags .push(this.tags[i].id);
                    }
                }
                if(tags.length==0){
                    xqzs.weui.toast('fail',"请至少选择一个标签",function () {

                    })
                    return;
                }
                if(content.length==0){
                    xqzs.weui.toast('fail',"请输入评论内容",function () {

                    })
                    return;
                }





                that.$http.put(web.API_PATH + "come/user/evaluate/answer", {userId:"_userId_",answerId:this.detail.bestAnswerId, point:this.point,content:content,"tags":tags})
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            xqzs.weui.toast("success","评论成功",function () {
                                window.location.href=window.location.h
                            })
                        }
                    });
            },
            follow:function (id) {
                let that=this;
                that.$http.put(web.API_PATH + "come/expert/follow/expert/"+id+"/_userId_", {})
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
            getDetail:function () {

                let _this= this;
                _this.$http.get(web.API_PATH + 'come/user/query/question/_userId_/'+this.id ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        console.log(data.body.data.data)
                        _this.detail= data.body.data.data
                    }
                }, function (error) {
                });

            }

        },
        beforeDestroy:function () {
            xqzs.voice.pause();
        }


    }
</script>
<style>


    .star span{ display: inline-block;  height:0.9411764705882353rem; width: 0.9411764705882353rem; background: url(../../../images/star_no.png) no-repeat; background-size: 0.9411764705882353rem; margin: 0.9rem  0.4rem;  }
    .star span.on{ background: url(../../../images/star.png) no-repeat; background-size: 0.9411764705882353rem;}
    .problem_answer_info{
        padding:0 0.88235rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 2.8235rem;
        font-size: 0.8235rem;
        color: #999;
        margin-bottom: 0.88235rem;
    }
    .problem_answer_info img{
        height:44px;
        display: block;
        width:44px;
        border-radius: 50%;
        margin-right: 0.88235rem;
    }
    .problem_assess{
        background: #fff;
        padding-top:1.176471rem;
        font-size: 0.70588rem;
        color: #999;
        text-align: center;
        border-top: 0.41176rem solid #f4f4f8;
        padding-bottom: 2.35rem;
    }
    .problem_assess h4{
        color: #333;
        font-size: 0.88235rem;
        font-weight: normal;
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
        border:1px solid #999;
        border-radius: 1rem;
        display: inline-block;
        margin-bottom:0.70588rem;
        margin-right: 0.235294rem;
    }
    .problem_assess_item span.on{
        border:1px solid #09bb07;
        color:#09bb07;
    }
    .problem_assess_class{
        margin-bottom: 0.88235rem;
        padding:0 2.1176471rem;
        text-align: left;
    }
    .problem_assess_input{
       padding: 0 2.1176471rem 1.6471rem 2.1176471rem;
    }
    .problem_assess_item textarea{
        height:4.1176471rem;
        background: #EBEBEC;
        resize: none;
        border:0;
        outline: none;
        width:94%;
        font-size: 0.70588rem;
        color: #999;
        border-radius: 5px;
        padding:3%;
        line-height: 1.6;
        letter-spacing: 2px;
    }
    .problem_assess_btn{
        padding: 0 0.88235rem;
    }
    .problem_wait_style>span:nth-of-type(1){
        color: rgba(51,141,255,1) ;
        font-size: 0.88235rem;
        margin-right: 1.235294rem;;
    }
    .problem_wait_style>span:nth-of-type(2){
        color: #999 ;
        font-size: 0.76471rem;
    }
    .problem_box_background{
        background: #fff;
    }
    .problem_answer_info .problem_answer_yy{margin-top: 3px}
</style>