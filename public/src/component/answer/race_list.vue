<template >
    <div style="height: 100%" class="answer_race_list" :class="{wbg:list.length==0&&!showLoad}">
        <div v-title>抢答</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="nothing comment" v-if="list.length==0&&!showLoad">
            <div>
                <img src="../../images/asker/newNoContent.png" alt="">
                <div class="nothing_bottom">
                    <p>暂无抢答问题</p>
                </div>
            </div>
        </div>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">


            <div class="list">
                <div class="item" v-for="item in list">
                    <div class="info">
                        <div class="img">
                            <img :src="item.faceUrl">
                        </div>
                        <div class="price">赏金 <span>￥{{item.price}}</span></div>
                        <div class="type">在哪方面：{{item.questionClassName}}</div>
                    </div>

                    <div class="content">
                        <div>{{item.content}}</div>
                        <div class="last_time">还{{formatDateText(item.endTime)}}</div>
                    </div>
                    <div class="clear"></div>
                    <div class="btn_race" @click="answer(item.id)">抢答</div>
                </div>
            </div>
        </v-scroll>
        <v-answer-bottom  tabOnIndex="0"></v-answer-bottom>
    </div>
</template>

<script type="es6">
    import answerBottom from "./include/bottom.vue";
    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus';
    export default {
        data() {
            return {
                expertId:null,
                showLoad:false,
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                list:[],
            }
        },
        mounted: function () {
            let expertId;
            let _this=this;
            if(cookie.get('expertId')==null){
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        console.log(data)
                        expertId = data.data.data.id;
                        cookie.set('expertId',expertId,300);
                        _this.expertId = expertId;
                        _this.getList()
                    }
                }, function (error) {
                });
            }else {
                this.expertId = cookie.get('expertId')
                this.getList()
            }
            xqzs.wx.setConfig(_this,function () {
                let localId = xqzs.localdb.get("voice_localId");
                console.log("voice_localId："+localId);
                if (localId && localId != "") {
                    wx.stopVoice(localId);
                    console.log(localId)
                }
            });

        },
        methods: {
            getList: function (done) {
                let vm= this;
                let url =web.API_PATH + 'come/expert/query/grab/page/'+this.expertId+'/_userId_/'+vm.page+'/'+vm.row;
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
                    let arr = response.data.data.rows;
//
                    if (arr.length < vm.row) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false
                    }else{
                        vm.isShowMoreText= true;
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
            answer:function (askId) {
                this.$router.push("../answer?askId="+askId);
            },
            formatDateText:function (time) {
                return xqzs.dateTime.getTimeFormatLastText(time)
            },
        },
        components: {
            "v-answer-bottom": answerBottom,
            'v-showLoad': showLoad,
            'v-scroll': scroll,
        }

    }
</script>
<style>
    .answer_race_list .list .item{ background: #fff; padding:0.8823529411764706rem; margin-bottom:0.41176471rem; }
    .answer_race_list  .list .item .img{ width: 1.70588235rem; height: 1.70588235rem;margin-right: 0.588235rem }
    .answer_race_list  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_race_list  .list .info{line-height: 1.70588235rem;display: flex;display:-webkit-flex;position: relative;margin-bottom: 2px;}
    .answer_race_list  .list .info .type{ font-size: 0.76471rem;   color:rgba(36,37,61,0.5);}
    .answer_race_list .item .content{ font-size: 0.8823529411764706rem;color:rgba(36,37,61,1);margin-bottom: 1.176471rem;padding-left: 2.26471rem}
    .answer_race_list .item .content>div:nth-of-type(1){margin-bottom:0.588235rem;}
    .answer_race_list .item .last_time{font-size: 0.70588235rem;color:rgba(36,37,61,0.5);line-height: 1}
    .answer_race_list  .list .info .price{ position:absolute;right:0;font-size: 0.70588235rem;color:rgba(254,115,1,1);text-align: right;width: 7rem;}
    .answer_race_list .list .btn_race:active{
        background: linear-gradient(to right, rgb(238, 146, 24), rgb(238, 109, 6));
    }
    .answer_race_list .list .btn_race{ color:#fff; text-align: center; width: 5.295rem; margin: 0 auto; line-height: 1.76471rem; border-radius: 1.2rem; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));font-size: 0.88235rem}



</style>