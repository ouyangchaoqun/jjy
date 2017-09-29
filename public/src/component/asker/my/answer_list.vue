<template>
    <div style="height: 100%" class="asker_my_answer_list_box wbg">

        <div v-title>我的收听</div>
        <div class="nothing answer" v-if="list.length==0" >
            没有任何收听
        </div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="0"
                  :isShowMoreText="isShowMoreText"  v-if="list.length>0">


            <div class="top_tip">共{{total}}位咨询师</div>
            <div class="answer_list" >
                <div class="item arrow" v-for="item in list">
                    <a @click="goDetail(item.expertId)">
                    <div class="img"><img
                            :src="item.faceUrl">
                    </div>
                    <div class="info">
                        <div class="address"><span>{{item.nickName}}</span> {{item.provinceName}}-{{item.cityName}}</div>
                        <div class="title">{{item.sign}}</div>
                        <div class="class_s">
                            <span v-for="tag in item.domains">{{tag.title}}</span>

                            <div class="clear"></div>
                        </div>
                            <div class="other">{{item.answerCount}}个回答，{{item.listenCount}}人收听</div>

                    </div>
                    <div class="clear"></div>
                    </a>
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
                isShowMoreText:true,
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

        },
        methods:{
            formatTime:function (time) {
                return xqzs.dateTime.formatDateTime(time)
            },
            goDetail:function (id) {
                this.$router.push("/answer/detail?id="+id)
            },
            getList: function () {

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
                this.getList();
                done() // call done
            },
        }


    }
</script>
<style>
    .asker_my_answer_list_box .nothing.answer{ background: url(../../../images/asker/nothing_answer.png) no-repeat center top; background-size: 5.205882352941176rem; }
    .asker_my_answer_list_box  .answer_list .img{ width: 2.588235294117647rem; height: 2.588235294117647rem; }
    .asker_my_answer_list_box  .answer_list .title{ width: 16rem; color:#666; font-size: 0.7647058823529412rem;}
    .asker_my_answer_list_box .answer_list .address{ color:#999}
    .asker_my_answer_list_box .answer_list .address span{ font-size: 0.88235rem; color:#333}
    .asker_my_answer_list_box .answer_list .class_s span{ color:#999; border: 1px solid #A8A8A8 }
    .asker_my_answer_list_box  .answer_list .item{ margin-top: 0; border-bottom: 1px solid #eee; position: relative}


</style>