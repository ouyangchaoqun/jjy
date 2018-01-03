<template >
    <div style="height: 100%" class="ask_my_income_list wbg">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div v-title>收益明细</div>
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
    import Bus from '../../../js/bus';


    export default {
        data() {
            return {
                showLoad:false,
                page: 1,
                row: 15,
                isPageEnd: false,
                isShowMoreText:false,
                list:[],
            }
        },


        mounted: function () {
            this.getList();
            xqzs.wx.setConfig(this);
        },
        methods:{
            formatTime:function (v) {
              return xqzs.dateTime.formatDateTime(v)
            },
            formatPrice:function (v) {
              return xqzs.string.formatPrice(v)
            },
            getDateTime:function (t) {
                return xqzs.dateTime.formatDateTime(t);
            },
            getList: function (done) {
                let expertId = cookie.get('expertId')
                let vm= this;
                //let url =web.API_PATH + 'come/expert/query/income/page/'+expertId+'/_userId_/'+vm.page+'/'+vm.row;
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
                    console.log(response)
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