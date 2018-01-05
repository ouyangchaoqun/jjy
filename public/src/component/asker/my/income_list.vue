<template >
    <div style="height: 100%" class="ask_my_income_list wbg">

        <div v-title>余额明细</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <ul>
                <li class="moneyOut_item" v-for="item in list">
                    <div class="time">
                        <span>{{getDateTime(item.addTime)}}</span>
                    </div>
                    <div class="item_type">{{item.type}}</div>
                    <div class="item_right">
                        <span v-if="item.status==0">审核中</span>
                        <template v-if="item.type!='提现'">+</template>
                        <template v-if="item.type=='提现'">-</template>
                        ¥{{item.amount}}
                    </div>
                </li>
            </ul>
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
                row: 15,
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
            xqzs.wx.setConfig(this);
        },
        methods:{
            formatPrice:function (price) {
                return xqzs.string.formatPrice(price)
            },
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time);
            },
            getList: function (done) {

                let vm= this;
               // let url =web.API_PATH + 'come/user/query/income/page/_userId_/'+vm.page+'/'+vm.row;
                let url = web.API_PATH + 'user/withdraw/detail' + '/_userId_/' + vm.row+ '/' + vm.page;
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

                    if(response.data.status!=1&&vm.page==1){
                        vm.list = [];
                        vm.isPageEnd = true;
                        vm.isShowMoreText = false;
                        Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);
                        return;
                    }
                    let arr = response.data.data;
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
                this.getList(done);

            },
            getDateTime:function (t) {
                return xqzs.dateTime.formatDateTime(t);
            },
        }


    }
</script>
<style>
    .ask_my_income_list .moneyOut_item{
        height:2.88235rem;
        line-height: 2.88235rem;
        border-bottom: 1px solid rgba(238,238,238,1);
        padding:0 0.88235rem;
        display: flex;
    }
    .time{
        color:rgba(153,153,153,1);
        font-size: 0.6471rem;
        float: left;
    }
    .item_right{
        font-size: 0.88235rem;
        float: right;
        color:rgba(255,157,24,1);
    }
    .item_right span{
        font-size: 0.76471rem;
        color:rgba(69,75,84,1);
        margin-right: 0.735rem;
    }
    .item_type{
        margin: 0 auto;
        text-align: center;
        color:rgba(36,37,61,0.5);
        font-size: 0.76471rem;
    }
</style>