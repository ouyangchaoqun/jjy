<template >
    <div style="height: 100%" class="answer_race_list">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div v-title>抢答</div>

            <div class="list weui-tab__panel">
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
                isShowMoreText:true,
                list:[],
            }
        },
        mounted: function () {
            let expertId;
            if(cookie.get('expertId')==null){
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/1289' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        console.log(data)
                        expertId = data.data.data.id;
                        cookie.set('expertId',expertId,30)
                    }
                }, function (error) {
                });
            }else {
                this.expertId = cookie.get('expertId')
            }
            this.getList()
        },
        methods: {
            getList: function () {
                let vm= this;
                let url =web.API_PATH + 'come/expert/query/grab/page/'+this.expertId+'/1289/'+vm.page+'/'+vm.row;
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
    .answer_race_list .list .btn_race{ color:#fff; text-align: center; width: 28%; margin: 0 auto; line-height: 2.4rem; border-radius: 1.2rem; background: #09bb07; margin-top: 0.6rem;}



</style>