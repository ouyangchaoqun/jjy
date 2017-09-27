<template  >
    <div style="height: 100% " class="answer_list_box">

        <div v-title>抢答</div>
        <v-showLoad v-if="showLoad"></v-showLoad>

        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd" :bottomHeight="0"
                  :isShowMoreText="isShowMoreText">
            <div class="main_title">{{name}}</div>
            <div class="answer_list">
                <div class="item" v-for="item in list">
                    <div @click="goDetail(item.expertId)">
                        <div class="img"><img :src="item.faceUrl"></div>
                        <div class="info">
                            <div class="title">{{item.sign}}</div>
                            <div class="address"><span>{{item.nickName}}</span> {{item.province}}-{{item.city}}</div>
                            <div class="class_s">
                                <span v-for="good in item.goodAt">{{good.title}}</span>
                                <div class="clear"></div>
                            </div>
                            <div class="other">问价 <span class="price">¥{{item.price}}</span> <span class="ml"
                                                                                                   v-if="item.answerCount!=null">{{item.answerCount}}个回答</span><span
                                    class="ml" v-if="item.listenCount!=null">{{item.listenCount}}次被偷听</span></div>
                            <div class="audio">
                                <div class="audio_btn">
                                    点击播放
                                </div>
                                <div class="minute">60"</div>
                                <div class="clear"></div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>

            </div>

        </v-scroll>
        <div class="no_body" v-if="false">

            <div class="img"></div>
            <div class="txt">暂无该方面专家</div>

        </div>


    </div>
</template>

<script type="es6">
    import showLoad from '../include/showLoad.vue';
    import scroll from '../include/scroll.vue';
    import Bus from '../../js/bus.js';

    export default {
        data() {
            return {
                list:[],
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText:true,
                showLoad:false,name:''
            }
        },
        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll
        },

        mounted: function () {
            this.name= this.$route.query.name;
            this.getList();
        },
        methods:{
            goDetail:function (extId) {

                this.$router.push('./detail?id='+extId)
            },
            getList: function () {

                let vm= this;
                let classId= vm.$route.query.id;
                vm.showLoad=true;
                let url = web.API_PATH + "come/expert/get/by/class/"+classId+"/"+vm.page+"/"+vm.row+"";

                this.rankUrl = url + "?";
                if (web.guest) {
                    this.rankUrl = this.rankUrl + "guest=true"
                }



                console.log(vm.isLoading);
                console.log(vm.isPageEnd);
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

                    if(response.data.status==9000003){
                        vm.list = [];
                        return;
                    }
                    let arr = response.data.data;
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
    .answer_list_box .main_title{
        font-size: 0.8823529411764706rem;
        text-align: center;
        background:#F4F4F7;
        color:#999; line-height: 2.588235294117647rem;
         margin-bottom: -0.5882352941176471rem;
    }

    .answer_list_box .no_body{ background: #fff; height:95%; position: absolute; top:2.588235294117647rem; left:0; width: 100%}
    .answer_list_box .no_body .img { background: url(../../images/answer/no_body.png); width: 4.852941176470588rem; ;height: 5.823529411764706rem; background-size:4.852941176470588rem; margin: 0 auto; margin-top: 5rem; }
    .answer_list_box .no_body .txt{ color:#B3B3B3;font-size: 0.7647058823529412rem; text-align: center; width: 100%; margin-top: 0.8rem;}
</style>