<template>
    <div :class="{wbg:list.length==0&&!showLoad}">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-scroll :on-refresh="onRefresh" :isNotRefresh="true" :on-infinite="onInfinite" :isPageEnd="isPageEnd"
                  :bottomHeight="50"
                  :isShowMoreText="isShowMoreText">

            <div class="my_problem_tabs">
                <div class="my_problem_active">一对一咨询</div>
                <div>抢答模式</div>
            </div>

            <div class="nothing answer" v-if="list.length==0&&!showLoad" >
                <img src="../../../images/asker/newNoContent.png" alt="">
                <div class="nothing_bottom">
                    <p>您还没有任何提问</p>
                    到问页面可以进行提问
                    <div @click="goAsk()">去提问</div>
                </div>
            </div>
            <div class="my_problem_box">
                <!--一对一列表-->
                <div class="problem_box_active">
                    <ul>
                        <li class="my_problem_list1" v-for="item in list" v-if="type==2">
                            <a  @click="goDetail(item.questionId)">
                                <div class="problem_header">
                                    <img :src="item.faceUrl" alt="">
                                    <div>{{item.nickName}}</div>
                                    <div class="wait_Answer wait_style" v-if="item.questionStatus==0">待回答</div>
                                    <div class="wait_Answer over_style" v-if="item.questionStatus==1">已回答</div>
                                    <div class="wait_Answer" v-if="item.questionStatus==2">结束</div>
                                    <div class="wait_Answer nop_style" v-if="item.questionStatus==3">未支付</div>
                                </div>
                                <div class="my_problem_content">
                                    {{item.question}}
                                </div>
                                <div class="my_problem_bottom">
                                    <div>{{formatDateText(item.addTime)}}</div>
                                    <div>听过 {{item.listenCount}}</div>
                                    <div>收入分成￥{{formatPrice(item.inCome)}}</div>
                                    <div class="my_problem_money">￥{{formatPrice(item.price)}}</div>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
                <!--抢答列表-->
                <div>
                    <ul>
                        <li class="my_problem_list1" v-if="type==1" v-for="item in list">
                            <a @click="goRaceDetail(item.questionId)">
                                <div class="problem_header headerStyle">
                                    问题类型：
                                    <div style="color: #333;margin-left: 10px">情感困惑</div>
                                    <div class="wait_Answer wait_style" v-if="item.questionStatus==0">正在进行</div>
                                    <div class="wait_Answer over_style" v-if="item.questionStatus==1">已回答</div>
                                    <div class="wait_Answer" v-if="item.questionStatus==2">结束</div>
                                    <div class="wait_Answer nop_style" v-if="item.questionStatus==3">未支付</div>
                                </div>
                                <div class="my_problem_content">
                                    {{item.question}}
                                </div>
                                <div class="my_problem_bottom">
                                    <div>{{formatDateText(item.addTime)}}</div>
                                    <div>{{item.answerCount}}个回答</div>
                                    <div class="my_problem_money">￥{{formatPrice(item.price)}}</div>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

        </v-scroll>
        <v-asker-bottom tabOnIndex="3"></v-asker-bottom>
    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    import scroll from '../../include/scroll.vue';
    import Bus from '../../../js/bus.js';
    import askerBottom from "../include/bottom.vue";

    export default {
        data() {
            return {
                page: 1,
                row: 10,
                isPageEnd: false,
                isShowMoreText: false,
                showLoad: false,
                list: [],
                type: 2
            }
        },


        components: {
            'v-showLoad': showLoad,
            'v-scroll': scroll,
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            let _this = this;
            $('.my_problem_tabs>div').click(function () {
                $('.my_problem_tabs>div').removeClass('my_problem_active')
                $('.my_problem_box>div').removeClass('problem_box_active')
                $(this).addClass('my_problem_active')
                $('.my_problem_box>div').eq($(this).index()).addClass('problem_box_active');
                if ($(this).index() == 0) {
                    _this.changeType(2);
                } else {
                    _this.changeType(1);
                }

            });
            this.getList();
            xqzs.wx.setConfig(this);
        },
        methods: {
            goAsk:function () {
                if(this.type==2){
                    this.$router.push("/answer/index");
                }else{
                    this.$router.push("/asker/ask");
                }

            },
            initActive:function () {
                var obj =  $(".my_problem_list1")
                xqzs.weui.active(obj);
            },
            formatPrice:function (price) {
              return xqzs.string.formatPrice(price)
            },
            formatDateText: function (time) {
                return xqzs.dateTime.getTimeFormatText(time)
            },
            goRaceDetail: function (id) {
                this.$router.push("/asker/my/ask/race/detail?id=" + id);
            },
            goDetail: function (id) {
                this.$router.push("/asker/my/ask/detail?id=" + id);
            },
            changeType: function (v) {
                this.type = v;
                this.page = 1;
                this.list = [];
                this.isPageEnd = false;
                this.isShowMoreText = false;
                this.getList();
            },
            getList: function (done) {

                let vm = this;
                let url = web.API_PATH + 'come/user/query/question/' + this.type + '/page/_userId_/' + vm.page + '/' + vm.row;
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

                    if (response.data.status != 1 && vm.page == 1) {
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
                    }else{
                        vm.isShowMoreText = true;
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
        updated:function () {
            this.initActive();
        }


    }
</script>
<style>
    .my_problem_tabs {
        color: #333;
        font-size: 0.88235rem;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #eee;
        height: 2.35294rem;
        line-height: 2.35294rem;
    }

    .my_problem_tabs > div {
        flex: 1;
        position: relative;
    }

    .my_problem_tabs > div:nth-of-type(1)::after {
        content: '';
        height: 1.1176rem;
        width: 1px;
        background: #E0E0E0;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.5588rem;
    }

    .my_problem_active {
        border-bottom: 2px solid rgba(253,114,6,1);
    }

    .my_problem_box {
        position: relative;
        width: 100%;
        height: auto;
    }

    .my_problem_box > div {
        display: none;
        width: 100%;
    }

    .my_problem_box .problem_box_active {
        display: block;
    }

    .my_problem_list1 {
        padding: 0.70588235rem 0.88235rem 0.9rem 0.88235rem;
        background: #fff;
        line-height: 2rem;
        margin-bottom: 0.41176471rem;
    }

    .problem_header {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #333;
        font-size: 0.70588rem;
        margin-bottom: 0.588235rem;
    }
    .problem_header > div:nth-of-type(2) {
        position: absolute;
        right: 0;
    }

    .problem_header img {
        height: 2rem;
        width: 2rem;
        display: block;
        border-radius: 50%;
        margin-right: 0.588235rem;
    }

    .my_problem_content {
        color: #333;
        font-size: 0.8235rem;
        line-height: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 0.5rem;
    }

    .my_problem_bottom {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #999;
        font-size: 0.701588235rem;
        line-height: 1;
    }

    .my_problem_bottom > div {
        margin-right: 0.88235rem;
    }

    .my_problem_bottom .my_problem_money {
        position: absolute;
        right: 0;
        color: #FE7301;
        margin: 0;
    }
    .wait_style{color:rgba(51,141,255,1)}
    .nop_style{color:rgba(51,51,51,1)}
    .over_style{color:rgba(153,153,153,1)}
    .headerStyle{margin-bottom: 0}
</style>