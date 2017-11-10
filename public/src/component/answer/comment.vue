<template >
    <div style="height: 100%" class="answer_comment_box"> 
        <div v-title>专家点评</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <div class="nums">
                   总体印象
            </div>
            <div class="pointDetail">
                <div class="point">{{point.toFixed(1)}}</div>
                <div class="point_right">
                    <div v-for="item in tags">
                        <div class="starBox"> <span v-for="i in item.point"></span></div>
                        <div class="point_pre">
                            <div class="point_pre_inner" :style="'width:'+ item.count/allCount*100 +'%;'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pointDetail_bottom">
                <span>满分5分</span>
                <span>{{allCount}}个评价</span>
            </div>
            <div class="list_top"  @click="changeType()" >
                <span class="img" :class="{not_on:viewType==0}"></span><span>只看有内容的评价</span>
            </div>
            <div class="list">
                    <div class="item" v-for="item in list">
                    <div class="img"><img
                            :src="item.faceUrl">
                    </div>
                    <div class="info">
                        <div class="name">{{item.nickName}}
                            <span class="time">{{formatTime(item.addTime)}}</span>
                        </div> <!--该名字-->
                        <div class="star"><span class="on" v-for="i in item.point"></span><span   v-for="i in 5-item.point"></span>
                        </div>
                        <div class="word">{{item.content}}</div>
                        <div class="reply" v-if="item.replyContent">{{item.replyContent}}</div>
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
                point:0,
                commentCount:0,
                viewType:0,
                page: 1,
                row: 5 ,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                list:[],
                allCount:0
            }
        }, components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },
        mounted: function () {
            this.expertId = this.$route.query.expertId;
            this.getTags();
            this.getList();
            xqzs.wx.setConfig(this);
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
                        console.log(data)
                        _this.tags= data.body.data.pointGroup;
                        _this.allCount = data.body.data.count
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
    .answer_comment_box{background: #fff;}
    .answer_comment_box .nums{background: #fff; padding:0.8823529411764706rem;color:rgba(36,37,61,1);font-size: 1.0588235rem;font-weight: bold;line-height: 1;padding-bottom: 1.088235rem;}
    .answer_comment_box .nums .comment{ position: absolute; top:1rem; right:0.9rem; font-size:1.411764705882353rem;  }
    .answer_comment_box .title .txt{ font-size: 0.8823529411764706rem; color:rgba(36,37,61,1); font-weight: bold;line-height: 1;margin-bottom: 1.088235rem;}
    .answer_comment_box .title .star span{ background: url(../../images/star_no.png); width: 0.7647058823529412rem; height: 0.7647058823529412rem;  background-size: 0.7647058823529412rem; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .title .star span.on{background: url(../../images/star.png);background-size: 0.7647058823529412rem; }

    .answer_comment_box .comment_selects{ padding:0.8823529411764706rem; background: #fff; padding-bottom: 0.3rem;}
    .answer_comment_box .comment_selects span{display: inline-block; float:left; height: 1.352941176470588rem; line-height: 1.352941176470588rem; border: 1px solid #999; border-radius:0.676470588235294rem ; font-size: 0.76471rem; padding: 0 0.5rem; margin-right: 0.5882352941176471rem; margin-bottom: 0.5882352941176471rem; color:#999 }
    .answer_comment_box  .comment_selects span:first-child{border: 1px solid #D1D1D1; color:#D1D1D1 }

    .answer_comment_box .list_top{ border-top:0.471rem solid rgba(245,245,245,1); background: #fff;border-bottom: 1px solid #E0E0E1; font-size: 0.8823529411764706rem; height: 2.588235294117647rem; line-height: 2.588235294117647rem; padding: 0  0.8823529411764706rem }
    .answer_comment_box  .list_top span{ float:left; display: block}
    .answer_comment_box  .list_top .img{  background:url("../../images/asker/comment_per.png") no-repeat; width: 1.176470588235294rem; height: 1.176470588235294rem;border-radius: 50%; margin-top: 0.7058823529411765rem; margin-right:0.5rem;background-size: 1.176470588235294rem; border:1px solid #fff; }
    .answer_comment_box  .list_top .img.not_on{
        background: #fff; border:1px solid #ccc;
    }
    .pointDetail{position: relative;background: #fff;padding-bottom: 0.588235rem;}
    .pointDetail .point{color:rgba(255,89,2,1);font-size: 3.52941rem;line-height: 1;margin-left: 0.88235rem;width:5rem;text-align: center;}
    .pointDetail .point_right{line-height: 1;position: absolute;top:0;left:35%;width:60%;}
    .pointDetail .point_right>div{height: 0.5rem;margin-bottom: 0.1471rem;position: relative}
    .starBox{width:25%;text-align: right;}
    .pointDetail .point_right .point_pre{overflow:hidden;width:75%;background: rgba(245,245,245,1);border-radius: 2.5px;height:0.176471rem;position: absolute;right:-0.2rem;top:0.5rem;}
    .pointDetail .point_right span{width: 0.5rem; height: 0.5rem;background: url('../../images/point-star.png')no-repeat;margin-right: 0.1176rem;display: inline-block;background-size:100%}
    .point_pre_inner{background: rgba(255,89,2,1);border-radius: 3px;height:100%;}
    .pointDetail_bottom{color:rgba(36,37,61,0.6);padding:0 0.88235rem;font-size: 0.88235rem;line-height: 1;background: #fff;padding-bottom: 0.735294rem;}
    .pointDetail_bottom span:nth-of-type(1){width:5rem;text-align: center;display: inline-block}
    .pointDetail_bottom span:nth-of-type(2){float: right;font-size: 0.76471rem;}
    .answer_comment_box  .list .item{ background: #fff; padding:0.8823529411764706rem; border-bottom: 1px solid #E0E0E1 }
    .answer_comment_box .list .star span{ background: url(../../images/starNew_no.png)no-repeat; width: 0.91176471rem; height: 0.85294117647rem;  background-size: 100% 100%; display: inline-block; margin-right: 0.3rem; }
    .answer_comment_box  .list .star span.on{background: url(../../images/starNew.png)no-repeat;background-size: 100% 100%; }

    .answer_comment_box  .list .item .img{ width: 2rem; height: 2rem; float:left; }
    .answer_comment_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%; border: 1px solid #E0E0E1 }
    .answer_comment_box  .list .info{ float:left; margin-left:0.8823529411764706rem;  width: 83%}
    .answer_comment_box  .list .info .name{ font-size: 0.7058823529411765rem; color:rgba(36,37,61,0.5); margin-bottom: 0.2rem;}
    .answer_comment_box  .list .word{ font-size:0.8235rem; font-weight: bold;  color:rgba(36,37,61,1);}
    .answer_comment_box  .list .reply{ font-size: 0.76471rem;  color:rgba(36,37,61,1);background: rgba(245,245,245,1);border-radius: 0.294rem;padding:0.35294rem 0.588235rem;position: relative;margin-top: 0.88235rem;}
    .answer_comment_box  .list .reply:after{content: '';width:0.88235rem;height:0.88235rem;background:rgba(245,245,245,1);position: absolute;top:-0.471rem;left:1.76471rem ;transform:rotate(45deg);}
    .answer_comment_box  .list .time{ font-size:0.7058823529411765rem; color:rgba(36,37,61,0.5); float: right}
    .answer_comment_box  .list .info .class_s { clear: both; margin-top: 0.3rem;}
    .answer_comment_box  .list .info .class_s span{ display: block; float:left; text-align: center; border-radius:0.6176470588235294rem;  height: 1.235294117647059rem; line-height: 1.235294117647059rem;  border: 1px solid #C1C1C1 ; color:#C1C1C1 ; font-size: 0.7058823529411765rem; padding: 0 0.7rem; margin-right:0.55rem;}
    .answer_comment_box  .list .reply span{color:#999}

</style>