<template >
    <div style="height: 100%" class="asker_my_coment_list wbg">

        <div v-title>我的评价</div>
        <div class="nothing comment" v-if="list.length==0">
            您还没有做任何评价
        </div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText"  v-if="list.length>0">
            <div class="top_tip">共2条评价</div>
            <div class="list">
                <div class="item" v-for="item in list">
                    <div class="comment">
                        <div class="img"><img  src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0"></div>
                        <div class="info">
                            <div class="times">{{formatTime(item.addTime)}}&nbsp; &nbsp;评价了<span>陈小刚</span>的回答</div>
                            <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span></div>
                            <div class="content">
                              {{item.content}}
                            </div>
                            <div class="tags">
                                <span>很专业</span>
                                <span>耐心</span>
                                <span>和蔼可亲</span>
                                <span>幽默风趣</span>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="reply" v-if="item&&item.replyContent!=undefined&&item.replyContent!=''">
                        <span>专家回复：</span>{{item.replyContent}}
                    </div>
                    <div class="question">
                        <div class="content">女，27岁，从没有谈过恋爱，也没有特别喜欢过一个人，这
                            是不是一种病？</div>
                        <div class="answer">
                            <div class="img"><img  src="http://wx.qlogo.cn/mmopen/EqFW7C97wDeyDm7TRdE6cb2BL4iarJSJ1C3kyXbDkqibT9dmk2UFgDByRSofI58koW44ajgY2SibdUffyhmYErlBw/0"></div>
                            <div class="audio">
                                <div class="audio_btn">
                                    点击播放
                                </div>
                                <div class="minute">60"</div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-scroll>
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
                isShowMoreText:true,
                showLoad:false,
                list:[]
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
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time)
            },

            getList: function () {

                let vm= this;
                let url =web.API_PATH + 'come/user/query/comment/page/_userId_/'+vm.page+'/'+vm.row;

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
                    console.log(response)

                    if(response.data.status!=1&&vm.page==1){
                        vm.list = [];
                        return;
                    }
                    let arr = response.data.data.rows;
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

    .asker_my_coment_list .nothing.comment{ background: url(../../../images/asker/nothing_star.png) no-repeat center top; background-size: 5.852941176470588rem; }

   .asker_my_coment_list .item{ padding: 0.88235rem; border-bottom: 0.7058823529411765rem solid #F4F4F7;}
    .asker_my_coment_list .comment .img{ width: 2rem; height: 100%; float:left; margin-right: 0.5rem;}
    .asker_my_coment_list .comment .img img{width: 2rem; height: 2rem; border-radius: 1rem;}
    .asker_my_coment_list .comment .info{ width: 17rem; float:left;}
    .asker_my_coment_list  .comment .info .times{ color:#666; font-size:0.7058823529411765rem; }
    .asker_my_coment_list .comment .info .times span{ font-weight: bold; color:#444}
    .asker_my_coment_list .comment .info .content{ color:#333; font-size: 0.8235294117647059rem; margin: 0.2rem  0}
    .asker_my_coment_list .comment .info .tags{}
    .asker_my_coment_list .comment .info .tags span{ display: inline-block;
        border:1px solid #D1D1D1; color:#D1D1D1; text-align: center; line-height: 1.323529411764706rem; border-radius: 0.6617647058823529rem; padding: 0 0.5rem; font-size:0.7058823529411765rem;}
    .asker_my_coment_list .comment .info .star span{ display: inline-block; background: url(../../../images/star_no.png) no-repeat; background-size: 0.7647058823529412rem;  height: 0.7647058823529412rem; width: 0.7647058823529412rem; margin-right: 0.4rem; }
    .asker_my_coment_list .comment .info .star span.on{background: url(../../../images/star.png) no-repeat;background-size: 0.7647058823529412rem; }

    .asker_my_coment_list .reply{ background: #F1F1F5;  font-size:0.7058823529411765rem; color:#999; padding:0.5rem ; border-radius: 0.3rem; position: relative; margin-top: 0.88rem }
    .asker_my_coment_list .reply:before{ content:" " ; display: block; position: absolute; left:0.8rem; top:-0.6rem;  width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.7rem solid #F1F1F5;}


    .asker_my_coment_list .answer .img{ width: 2rem; height: 2rem; float:left; margin-top: 0.2rem;  margin-right: 0.5rem;}
    .asker_my_coment_list .answer .img img{ width: 100%; height: 100%; border-radius: 50%;}
    .asker_my_coment_list .answer .audio{ width: 100%; margin-top: 0}
    .asker_my_coment_list .answer .audio .audio_btn{ width: 47%}
    .asker_my_coment_list .question{ border: 0.1470588235294118rem solid #F1F1F5; border-radius: 0.4rem; padding: 0.6176470588235294rem; margin-top:0.5882352941176471rem; color:#666; font-size: 0.7058823529411765rem  }
    .asker_my_coment_list .question .content{ margin-bottom: 0.88325rem}

</style>