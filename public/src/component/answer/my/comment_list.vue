<template >
    <div style="height: 100%" class="answer_my_coment_list wbg">

        <div v-title>我的评价</div>
        <div class="nothing comment" v-show="list.length==0"  >
            您还没收到任何评价
        </div>
        <div>
            <v-showLoad v-if="showLoad"></v-showLoad>
            <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                      :bottomHeight="0"
                      :isShowMoreText="isShowMoreText">

                <div class="top_tip">收到的评价</div>
                <div class="list">
                    <div class="item" v-for="(item,index) in list">
                        <div class="comment">
                            <div class="img"><img :src="item.userFaceUrl">
                            </div>
                            <div class="info">
                                <div class="name"><span>{{item.nickName}}</span>评价了我的回答</div>
                                <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span></div>
                                <div class="content">
                                   {{item.content}}
                                </div>
                                <div class="tags">
                                    <span v-for="i in item.tag">{{i.title}}</span>

                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="reply" v-show="item.replyContent&&item.replyContent!=''">
                            <span>我的回复：</span>{{item.replyContent}}
                        </div>
                        <div class="question">
                            <div class="content">{{item.questionContent}}
                            </div>
                            <div class="answer">
                                <div class="img"><img
                                        :src="item.expertFaceUrl">
                                </div>
                                <div class="audio">
                                    <div class="audio_btn">
                                        点击播放
                                    </div>
                                    <div class="minute">{{item.length}}"</div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>
                        <div class="time">{{formatTime(item.addTime)}}</div>
                        <div class="reply_btn" @click="reply(item,index)" v-if="!(item.replyContent&&item.replyContent!='')">回复</div>
                    </div>
                </div>
            </v-scroll>
        </div>
    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    import scroll from '../../include/scroll.vue';
    import Bus from '../../../js/bus.js';


    export default {
        data() {
            return {
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText: true,
                showLoad: false,
                list: [],
            }
        },


        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            this.getList();

        },
        methods:{
            formatTime:function(time){
               return   xqzs.dateTime.formatDateTime(time)
            },
            reply:function (item,index) {
                let _this=this;
                xqzs.weui.actionSheetEdit( "回复", function (value) {
                    //回复操作

                    let data ={
                        userId:item.expertUserId,
                        expertId:item.expertId,
                        content:value,
                        id:item.id
                    }
                    _this.$http.put(web.API_PATH + "come/comment/reply", data)
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {

                                item.replyContent=value;
                                _this.$set(_this.list,index,item);

                            }
                        });
                    console.log(value)

                }, function () {
                    
                }, "回复 "+item.nickName,50,item.replyContent)
            },
            getList: function () {
                let expertId = cookie.get('expertId')
                let vm = this;
                let url = web.API_PATH + 'come/comment/query/page/' +expertId + '/' + vm.page + '/' + vm.row;
                this.rankUrl = url + "?";
                if (web.guest) {
                    this.rankUrl = this.rankUrl + "guest=true"
                }
                if (vm.isLoading || vm.isPageEnd) {
                    return;
                }
                if (vm.page == 1) {
                    vm.showLoad = true;
                }
                vm.isLoading = true;
                vm.$http.get(vm.rankUrl).then((response) => {
                    vm.showLoad = false;
                    vm.isLoading = false;
//                    console.log(response)

                    if (response.data.status != 1 && vm.page == 1) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        vm.list = [];
                        return;
                    }
                    let arr = response.data.data;
//
                    if (arr.length < vm.row) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false
                    }
                    Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);


                    if (vm.page == 1) {
                        vm.list = arr;
                    } else {
                        vm.list = vm.list.concat(arr);
                    }
                    if (arr.length == 0) return;
                    vm.page = vm.page + 1;

                }, (response) => {
                    vm.isLoading = false;
                    vm.showLoad = false;
                });

            },
            onInfinite(done) {
                this.getList();
                done() // call done
            },
        }


    }
</script>
<style>

    .answer_my_coment_list .nothing.comment{ background: url(../../../images/asker/nothing_star.png) no-repeat center top; background-size: 5.852941176470588rem; margin-top: 8rem; padding-top: 8rem; }

    .answer_my_coment_list .item{ padding: 0.88235rem; border-bottom: 0.7058823529411765rem solid #F4F4F7;}
    .answer_my_coment_list .comment .img{ width: 2rem; height: 100%; float:left; margin-right: 0.5rem;}
    .answer_my_coment_list .comment .img img{width: 2rem; height: 2rem; border-radius: 1rem;}
    .answer_my_coment_list .comment .info{ width: 17rem; float:left;}
    .answer_my_coment_list  .comment .info .name{ color:#666; font-size:0.7058823529411765rem; }
    .answer_my_coment_list  .comment .info .name span{ color:#333; margin-right: 0.6rem;}
    .answer_my_coment_list .comment .info .times span{ font-weight: bold; color:#444}
    .answer_my_coment_list .comment .info .content{ color:#333; font-size: 0.8235294117647059rem; margin: 0.2rem  0}
    .answer_my_coment_list .comment .info .tags{}
    .answer_my_coment_list .comment .info .tags span{ display: inline-block;
        border:1px solid #D1D1D1; color:#D1D1D1; text-align: center; line-height: 1.323529411764706rem; border-radius: 0.6617647058823529rem; padding: 0 0.5rem; font-size:0.7058823529411765rem; margin-right: 0.3rem;}
    .answer_my_coment_list .comment .info .star span{ display: inline-block; background: url(../../../images/star_no.png) no-repeat; background-size: 0.7647058823529412rem;  height: 0.7647058823529412rem; width: 0.7647058823529412rem; margin-right: 0.4rem; }
    .answer_my_coment_list .comment .info .star span.on{background: url(../../../images/star.png) no-repeat;background-size: 0.7647058823529412rem; }

    .answer_my_coment_list .reply{ background: #F1F1F5;  font-size:0.7058823529411765rem; color:#999; padding:0.5rem ; border-radius: 0.3rem; position: relative; margin-top: 0.88rem }
    .answer_my_coment_list .reply:before{ content:" " ; display: block; position: absolute; left:0.8rem; top:-0.6rem;  width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.7rem solid #F1F1F5;}


    .answer_my_coment_list .answer .img{ width: 2rem; height: 2rem; float:left; margin-top: 0.2rem;  margin-right: 0.5rem;}
    .answer_my_coment_list .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .answer_my_coment_list .answer .audio{ width: 100%; margin-top: 0}
    .answer_my_coment_list .answer .audio .audio_btn{ width: 47%}
    .answer_my_coment_list .question{ border: 0.1470588235294118rem solid #F1F1F5; border-radius: 0.4rem; padding: 0.6176470588235294rem; margin-top:0.5882352941176471rem; color:#666; font-size: 0.7058823529411765rem  }
    .answer_my_coment_list .question .content{ margin-bottom: 0.88325rem}
    .answer_my_coment_list .item .time{ color:#666; font-size: 0.78rem; margin-left: 0.01rem; margin-top: 0.3rem}
    .answer_my_coment_list .item{ position: relative}
    .answer_my_coment_list .item .reply_btn{ border-radius: 0.4rem; line-height: 1.8rem; text-align: center; font-size: 0.88235rem; color:#fff; position: absolute; background: #09bb07;
        top:0.88235rem; right:0.88235rem;padding: 0 0.8rem;}
    .answer_my_coment_list .item .reply_btn:active{ background: #09ab07;
    }


</style>