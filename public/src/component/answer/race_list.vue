<template >
    <div style="height: 100%" class="answer_race_list" :class="{wbg:list.length==0&&!showLoad}">
        <div v-title>抢答</div>
        <v-showLoad v-if="showLoad"></v-showLoad>

        <div class="nothing comment" v-if="list.length==0&&!showLoad">
            <img src="../../images/asker/newNoContent.png" alt="">
            <div class="nothing_bottom">
                <p>暂无抢答问题</p>
            </div>
        </div>

        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div class="list">
                <div class="item" v-for="item in list">
                    <div class="img"><img :src="item.faceUrl"></div>
                    <div class="info">
                        <div class="price">赏金 <span>￥{{item.price}}</span></div>
                        <div class="type">在哪方面：{{item.questionClassName}}</div>
                        <div class="clear"></div>
                        <div class="content">{{item.content}}</div>
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
                        cookie.set('expertId',expertId,30);
                        _this.expertId = cookie.get('expertId');
                        _this.getList()
                    }
                }, function (error) {
                });
            }else {
                this.expertId = cookie.get('expertId');
                this.getList()
            }

        },
        methods: {
            getList: function () {
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
                        vm.isShowMoreText=true;
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
    .answer_race_list .list .item{ background: #fff; padding:0.8823529411764706rem; margin-bottom:0.5882352941176471rem; }
    .answer_race_list  .list .item .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; float:left; }
    .answer_race_list  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_race_list  .list .info{ float:left; margin-left:0.8823529411764706rem; width: 81% }
    .answer_race_list  .list .info .type{ font-size: 0.7058823529411765rem;   color:#999; margin-bottom: 0.4rem; width: 8rem; float:right; text-align: right}
    .answer_race_list  .list .info .content{ font-size: 0.8823529411764706rem;   color:#333;line-height:1.176470588235294rem; margin-bottom: 0.4rem}
    .answer_race_list  .list .info .last_time{ float:left;font-size: 0.7647058823529412rem;color:#666; width: 6rem;
    }
    .answer_race_list  .list .info .price{ float:left;font-size: 0.7647058823529412rem;color:#666;   width: 7rem;}
    .answer_race_list  .list .info .price span{ color:#FF9900; font-size: .8823529411764706rem;}
    .answer_race_list .list .btn_race{ color:#fff; text-align: center; width: 28%; margin: 0 auto; line-height: 2.4rem; border-radius: 1.2rem; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); margin-top: 0.6rem;}
    .answer_race_list .list .btn_race:active{
        background: linear-gradient(to right, rgb(238, 146, 24), rgb(238, 109, 6));
    }


</style>