<template>
    <div style="height: 100%" class="asker_my_answer_list_box wbg">

        <div v-title>我的收听</div>
        <div class="nothing answer" v-if="list.length==0&&!showLoad" >
            <div>
                <img src="../../../images/asker/newNoContent.png" alt="">
                <div class="nothing_bottom">
                    <p>您还没有任何收听</p>
                    在专家详情页面可以点击收听按钮进行收听
                    <div @click="goAnswerIndex()">去收听</div>
                </div>
            </div>

        </div>

        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText"  v-if="list.length>0">

            <div class="top_tip">共{{total}}位咨询师</div>

            <div class="answer_list">
                <div class="item" v-for="(item,index) in list">
                    <div @click="goDetail(item.expertId)">
                        <div class="itemHeader">
                            <div>{{item.nickName}} <span>{{item.cityName}}</span></div>
                        </div>
                        <div class="itemDetail">
                            <div class="img"><img :src="item.faceUrl"></div>
                            <div class="itemDetail_right">
                                <div class="title">{{item.sign}}</div>
                                <div class="class_s">
                                    <span v-for="(tag,tagIndex) in item.domains" class="tab_i_i" >{{tag.title}}</span>
                                </div>
                                <div class="class_s other"><span v-if="item.answerCount!=null">{{item.answerCount||0}}个回答</span><span>{{item.followCount||0}}人收听</span></div>
                            </div>
                        </div>
                    </div>
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
                row: 10,
                isPageEnd: false,
                isShowMoreText:false,
                showLoad:false,
                list:[],
                total:0
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
            goAnswerIndex:function () {
                this.$router.push("/answer/index")
            },
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time)
            },
            goDetail:function (id) {
                this.$router.push("/answer/detail/?id="+id)
            },
            getList: function (done) {

                let vm= this;
                let url =web.API_PATH + 'come/user/query/follow/page/_userId_/'+vm.page+'/'+vm.row;

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
                        vm.total=0
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
                        vm.isShowMoreText =false
                    }
                    Bus.$emit("scrollMoreTextInit", vm.isShowMoreText);

                    vm.total=response.data.data.total

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
    .asker_my_answer_list_box .item{border-bottom: 1px solid #E0E0E1;}
    .asker_my_answer_list_box .item:active{background: #f5f5f5}
    .asker_my_answer_list_box .answer_list .item{margin-top: 0}
    .answer_list .item .class_s{position: absolute;bottom:28%;margin-bottom: 0}
    .answer_list .item .other{bottom:0!important;padding-left: 0.294rem;}
    .tab_i_i{color: #FF9966;
        background: rgba(204,204,204,0.3);
        border-radius: 0.1470588235294118rem;
        padding: 0.2rem 0.3rem;
        margin: 0 0.3rem;}
</style>