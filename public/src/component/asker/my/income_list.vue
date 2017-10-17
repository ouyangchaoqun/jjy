<template >
    <div style="height: 100%" class="ask_my_income_list wbg">

        <div v-title>心情指数</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">

            <div class="top_tip">每份收入的90%为收益哦</div>
            <div class="list">
                <div class="item" v-for="item in list">
                    <div class="time">{{formatTime(item.addTime)}}</div>
                    <div class="type_txt">{{item.note}}</div>
                    <div class="price">¥{{formatPrice(item.amount)}}</div>
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
                row: 20,
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
            formatPrice:function (price) {
                return xqzs.string.formatPrice(price)
            },
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time);
            },
            getList: function () {

                let vm= this;
                let url =web.API_PATH + 'come/user/query/income/page/_userId_/'+vm.page+'/'+vm.row;

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


   .ask_my_income_list  .list .item{ height: 2.941176470588235rem; line-height: 2.941176470588235rem; border-bottom: 0.0588235294117647rem solid #eee; color:#666; font-size: 0.7647058823529412rem; position: relative  }
   .ask_my_income_list  .list .item .time{ margin-left:0.9705882352941176rem; }
   .ask_my_income_list .list .item .type_txt{ position: absolute; right:6rem; top:0;}
   .ask_my_income_list .list .item .price{ position: absolute; top:0; right:0.9705882352941176rem; color:#FF9900; font-size: 1.058823529411765rem;}
</style>