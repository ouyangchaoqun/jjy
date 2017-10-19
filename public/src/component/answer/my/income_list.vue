<template >
    <div style="height: 100%" class="ask_my_income_list wbg">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <div v-title>心情指数</div>
            <div>
                <div class="top_tip">每份收入的90%为收益哦</div>
                <div class="list">
                    <div class="item" v-for="item in list">
                        <div class="type_txt">{{item.note}}
                            <div class="time">{{formatTime(item.addTime)}}</div>
                        </div>


                        <div class="price">¥{{formatPrice(item.amount)}}</div>
                    </div>
                </div>
            </div>
        </v-scroll>

    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    import scroll from '../../include/scroll.vue';
    import Bus from '../../../js/bus';


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
            this.getList()
        },
        methods:{
            formatTime:function (v) {
              return xqzs.dateTime.formatDateTime(v)
            },
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
            },
            getList: function (done) {
                let expertId = cookie.get('expertId')
                let vm= this;
                let url =web.API_PATH + 'come/expert/query/income/page/'+expertId+'/_userId_/'+vm.page+'/'+vm.row;
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
                    console.log(response)

                    if((response.body.status!=1&&vm.page==1)||response.body.data.total==0){
                        vm.list = [];
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    console.log("ddddddd")
                    let arr = response.data.data.rows;
//
                    if (arr.length < vm.row) {
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false
                    }else{
                        vm.isShowMoreText = true
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
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        }


    }
</script>
<style>


    .ask_my_income_list  .list .item{ height: 3.52rem; line-height: 3.52rem; border-bottom: 0.0588235294117647rem solid #eee; position: relative;font-size: 0.88235rem;padding-left: 0.88235rem  }
    .ask_my_income_list  .list .item .time{padding-top: 0.6rem;font-size: 0.6471rem;color:#999;}
    .ask_my_income_list .list .item .type_txt{line-height: 1;color:#454B54;padding-top: 0.8rem}
    .ask_my_income_list .list .item .price{ position: absolute; top:0; right:0.9705882352941176rem; color:#FE7301;}
</style>