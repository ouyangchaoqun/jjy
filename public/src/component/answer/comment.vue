<template >
    <div style="height: 100%" class="answer_comment_box">
        <div v-title>咨询师点评</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <div class="nums">
                <div class="title">
                    <div class="txt">总体印象</div>
                    <div class="star"><span class="on" v-for="i in point"></span><span v-for="i in 5-point"></span>
                    </div>
                </div>
                <div class="comment">{{point}}</div>
            </div>
            <div class="comment_selects">
                <span class="first">全部 {{commentCount}}</span><span
                    v-for="item in tags">{{item.title}} {{item.count}}</span>
                <div class="clear"></div>
            </div>
            <div class="list_top"  @click="changeType()" >
                <span class="img":class="{not_on:viewType==0}"></span><span>只看有内容的评价</span>
            </div>
            <div class="list">
                    <div class="item" v-for="item in list">
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
                        <div class="time">{{formatTime(item.addTime)}}</div>
                    </div>
                    <div class="clear"></div>
                </div>


            </div>
        </v-scroll>
    </div>

</template>

<script type="es6">
    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';

    export default {
        data() {
            return {
                expertId:0,
                tags:[],
                point:5,
                commentCount:0,
                viewType:0,
                page: 1,
                row: 5 ,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                list:[]
            }
        }, components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            this.expertId = this.$route.query.expertId;
            this.getTags();
            this.getList();
        },
        methods: {
            changeType:function () {
                if(this.viewType==0){
                    this.viewType=1;
                }else{
                    this.viewType=0
                }
                this.page=1;
                this.isPageEnd=false;
                this.getList();
            },
            formatTime:function (time) {
                return xqzs.dateTime.formatDate(time);
            },
            getTags:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/expert/get/tag/'+this.expertId ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.tags= data.body.data.tag;
                        _this.point=data.body.data.point;
                        for(let i=0;i<_this.tags.length;i++){
                            _this.commentCount += _this.tags[i].count;
                        }

                    }
                }, function (error) {
                });
            },
            getList: function (done) {

                let vm= this;
                let url =web.API_PATH + 'come/expert/get/evaluate/'+this.expertId+"/"+vm.viewType+'/'+vm.page+'/'+vm.row;

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
                    if(done&&typeof(done)==='function'){
                        done()
                    }
                    vm.showLoad = false;
                    vm.isLoading = false;
//                    console.log(response)

                    if(response.data.status!=1&&vm.page==1){
                        vm.list = [];
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    let arr = response.data.data;
//
                    if (arr.length < vm.row) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false
                    }else{
                        vm.isShowMoreText =true;
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
                this.getList(done);

            },
        }
    }
</script>
<style>
    .answer_comment_box .nums{
        position: relative; background: #fff; border-bottom: 1px solid #EDEDED; padding:0.8823529411764706rem; ;
    }
    .answer_comment_box .nums .comment{ position: absolute; top:1rem; right:0.9rem; font-size:1.411764705882353rem;  }
    .answer_comment_box .title .txt{ font-size: 0.8823529411764706rem; color:#333; font-weight: bold}
    .answer_comment_box .title .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .title .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_comment_box .comment_selects{ padding:0.8823529411764706rem; background: #fff; padding-bottom: 0.3rem;}
    .answer_comment_box .comment_selects span{display: inline-block; float:left; height: 1.352941176470588rem; line-height: 1.352941176470588rem; border: 1px solid #999; border-radius:0.676470588235294rem ; font-size: 0.76471rem; padding: 0 0.5rem; margin-right: 0.5882352941176471rem; margin-bottom: 0.5882352941176471rem; color:#999 }
    .answer_comment_box  .comment_selects span:first-child{border: 1px solid #D1D1D1; color:#D1D1D1 }

    .answer_comment_box .list_top{ margin-top:0.8823529411764706rem; background: #fff;border-bottom: 1px solid #EDEDED; font-size: 0.8823529411764706rem; height: 2.588235294117647rem; line-height: 2.588235294117647rem; padding: 0  0.8823529411764706rem }
    .answer_comment_box  .list_top span{ float:left; display: block}
    .answer_comment_box  .list_top .img{  background:url("../../images/asker/comment_per.png") no-repeat; width: 1.176470588235294rem; height: 1.176470588235294rem;border-radius: 50%; margin-top: 0.7058823529411765rem; margin-right:0.5rem;background-size: 1.176470588235294rem; border:1px solid #fff; }
    .answer_comment_box  .list_top .img.not_on{
        background: #fff; border:1px solid #ccc;
    }



    .answer_comment_box  .list .item{ background: #fff; padding:0.8823529411764706rem; border-bottom: 1px solid #EDEDED }
    .answer_comment_box .list .star span{ background: url(../../images/answer/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .list .star span.on{background: url(../../images/answer/star.png);background-size: 0.7647058823529412rem; }

    .answer_comment_box  .list .item .img{ width: 2rem; height: 2rem; float:left; }
    .answer_comment_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%; border: 1px solid #EEEAEA }
    .answer_comment_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_comment_box  .list .info .name{ font-size: 0.7058823529411765rem; color:#999; margin-bottom: 0.2rem; width: 14.11764705882353rem;}
    .answer_comment_box  .list .word{ font-size:0.7647058823529412rem; font-weight: bold;  color:#333; margin-bottom: 0.2rem;;}
    .answer_comment_box  .list .reply{ font-size: 0.8823529411764706rem;  color:#333; margin-bottom: 0.2rem;}
    .answer_comment_box  .list .time{ font-size:0.7058823529411765rem; color:#C1C1C1; margin-top: 0.6rem;margin-bottom: 0.6rem;}
    .answer_comment_box  .list .info .class_s { clear: both; margin-top: 0.3rem;}
    .answer_comment_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #C1C1C1 ; color:#C1C1C1 ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_comment_box  .list .reply{
        background:rgba(241,241,245,1);
        border-radius: 10px ; padding:0.6470588235294118rem; color:#666; font-size:0.7058823529411765rem;  }
    .answer_comment_box  .list .reply span{color:#999}

</style>