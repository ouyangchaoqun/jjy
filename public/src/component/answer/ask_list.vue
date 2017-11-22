<template >
    <div style="height: 100%" class="answer_ask_list_box"  :class="{wbg:list.length==0&&!showLoad}">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div v-title>待答</div>
        <div class="nothing comment" v-if="list.length==0">
            <div>
                <img src="../../images/asker/newNoContent.png" alt="">
                <div class="nothing_bottom">
                    <p>暂无待答问题</p>
                </div>
            </div>

        </div>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div v-title>待答</div>
            <div class="list  ">
                <div class="item" v-for="item in list" @click="answer(item.id)">
                    <div class="img">
                        <img :src="item.faceUrl">
                    </div>
                    <div class="info">
                        <div class="names"><span>{{item.nickName}}</span>
                            <div class="price">酬金￥{{item.price}}</div>
                        </div>
                        <div class="content">{{item.content}}

                        </div>
                        <div class="last_time"> 在哪方面：{{item.questionClassName}}</div>
                        <div class="last_time">还{{formatDateText(item.endTime)}}</div>

                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </v-scroll>
        <v-answer-bottom tabOnIndex="1" ></v-answer-bottom>

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
                showLoad:false,
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                list:[],
            }
        },


        mounted: function () {
            this.getList();
            xqzs.wx.setConfig(this);
        },
        methods: {
            getList: function (done) {
                let vm= this;
                let expertId = cookie.get('expertId')
                let url =web.API_PATH + 'come/expert/query/to/be/answered/page/'+expertId+'/_userId_/'+vm.page+'/'+vm.row;
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
                    console.log(response.data.data.rows)
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
                this.getList(done);

            },
            answer:function (askId) {
                this.$router.push("/answer/answer?askId="+askId)
            },
            formatDateText:function (time) {
                return xqzs.dateTime.getTimeFormatLastText(time)
            }
        },
        components: {
            "v-answer-bottom": answerBottom,
            'v-showLoad': showLoad,
            'v-scroll': scroll,
        }


    }
</script>
<style>
    .answer_ask_list_box .list .item{ background: #fff; padding:1.176471rem 0.8823529411764706rem 0.3529rem 0.88235rem; margin-bottom:0.41176471rem; }
    .answer_ask_list_box .list .item:active{background: #eee}
    .answer_ask_list_box  .list .item .img{ width: 1.70588235rem; height: 1.70588235rem; float:left; }
    .answer_ask_list_box  .list .item .img img{ width: 100%; height: 100%; border-radius: 50%}
    .answer_ask_list_box  .list .info .names{ font-size: 0.7058823529411765rem;color:rgba(36,37,61,0.5);line-height:1.70588235rem }
    .answer_ask_list_box .list .info .names span{ color:rgba(36,37,61,0.5); font-size: 0.76471rem; margin-left: 0.588235rem}
    .answer_ask_list_box  .list .info .content{ font-size: 0.8823529411764706rem; color:rgba(36,37,61,1);margin-bottom: 0.5rem }
    .answer_ask_list_box  .list .info .last_time{line-height:1;font-size: 0.76471rem;color:rgba(36,37,61,0.5);margin-bottom: 0.529rem;}
    .answer_ask_list_box  .list .info .price{ float:right;font-size: 0.70588235rem;color:#FE7301; text-align: right; width: 7rem;}
</style>