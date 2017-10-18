<template id="fans">
    <div class="fansBox">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">
            <div>
                <header>共{{count}}位粉丝</header>
                <ul class="fansItem">
                    <li v-for="item in list">
                        <img :src="item.faceUrl" alt="">
                        <div class="right">
                            <div>{{item.nickName}}</div>
                            <div class="bottom">
                                <div><span>{{getFormatDate(item.followTime)}}</span><span>{{getFormatTime(item.followTime)}}</span></div>
                                <div><span>{{item.questionCount}}个问题</span><span>{{item.listenTimes}}次偷听</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </v-scroll>
        <div class="noFansBox"  v-if="false">
            <div>
                还没有粉丝
            </div>
        </div>
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
                count:0
            }
        },


        mounted: function () {
            this.getList()
            console.log(xqzs.dateTime.formatTime(1506477018))
        },
        methods:{
            getList: function () {
                let vm= this;
                let expertId = cookie.get('expertId')
                let url =web.API_PATH + 'come/expert/query/follows/page/'+expertId+'/'+vm.page+'/'+vm.row;
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
                    console.log(response.data.data.rows)
                    vm.count = response.data.data.total
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
                this.getList();
                done() // call done
            },
            getFormatDate: function (time) {
                return xqzs.dateTime.formatDate(time)
            },
            getFormatTime:function (time) {
                return xqzs.dateTime.formatTime(time)
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll,
        }


    }
</script>
<style>
    .fansBox{
        background: #fff;
    }
    .fansBox header{
        height: 2.588235rem;
        line-height: 2.588235rem;
        background: #f4f4f7;
        font-size: 0.88235rem;
        color: #999;
        text-align: center;
    }
    .fansItem li{
        height:3.6471rem;
        border-bottom: 1px solid #eee;
        padding-right:0.88235rem;
        font-size: 0.6471rem;
        color: #999;
        position: relative;
    }
    .fansItem li img{
        height: 2.588235rem;
        width:2.588235rem;
        border-radius: 50%;
        display: block;
        position: absolute;
        left:0.88235rem;
        top:50%;
        margin-top:-1.2941175rem;
    }
    .fansItem li .right{
        margin-left:4rem;
        line-height: 1;
        padding-top: 1rem;
    }
    .fansItem li .right>div:nth-of-type(1){
        color: #333;
        font-size: 0.88235rem;
        margin-bottom: 0.441176471rem;
    }
    .fansItem li .bottom>div:nth-of-type(1){
        float: left;
    }
    .fansItem li .bottom>div:nth-of-type(1) span:nth-of-type(1){
        margin-right:0.588235rem;
    }
    .fansItem li .bottom>div:nth-of-type(2){
        float: right;
    }
    .fansItem li .bottom>div:nth-of-type(2) span:nth-of-type(1){
        margin-right:1.0588235rem;
    }
    .noFansBox{
        color: #B3B3B3;
        font-size: 0.76471rem;
        text-align: center;
        height:100%;
        width:100%;
        position: relative;
    }
    .noFansBox div{
        position: absolute;
        width:100%;
        top:30%;
    }
</style>