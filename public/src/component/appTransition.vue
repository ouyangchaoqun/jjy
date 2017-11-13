<template>
    <div style="height: 100%" class="transitionBox">
        <transition :name="transitionName">
            <router-view class="child-view" :user=user :isGoIndex="isGoIndex" :expert="expert"></router-view>
        </transition>
    </div>
</template>
<script>
    import Bus from '../js/bus.js';

    export default {
        data() {
            return {
                transitionName: 'page-xqzs-left',
                pagesIn: [],
                isFunny: false,
                user: {},
                expert:{},
                friendMoodsSpe: [],
                friendMoods: [],
                myLastMood: null,
                isGoIndex: false
            }
        },
        created: function () {
            console.log("create");
            var _this = this;
            _this.$http({
                method: 'GET',
                type: "json",
                url: web.API_PATH + 'user/find/by/user/Id/_userId_',
            }).then(function (data) {//es5写法
                if (data.data.data !== null) {
                    _this.user = eval(data.data.data);

                }
            }, function (error) {
                //error
            });
        },
        mounted: function () {
            let _this = this
            Bus.$on("goIndex", function (v) {
                _this.isGoIndex = v;
            });
            this.getExpert();
        },
        methods: {
            getExpert:function () {
                let _this=this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        let  expertId = data.data.data.id;
                        _this.expert= data.data.data;
                        cookie.set('expertId',expertId,300);

                    }
                }, function (error) {
                });
            },

            //清除声音
            clearAllVoice: function () {
//                xqzs.voice.pause();
//                wx.stopRecord();
//                let localId = xqzs.localdb.get("voice_localId");
//                console.log("voice_localId："+localId);
//                if (localId && localId != "") {
//                    wx.stopVoice(localId);
//                    console.log(localId)
//                }
            },

            //清除未关闭的控件
            clearPlugs: function () {
                $(".child-view").removeClass("page-xqzs-left-enter-active").removeClass("page-xqzs-left-leave-active").removeClass("page-xqzs-right-enter-active").removeClass("page-xqzs-right-leave-active");
                xqzs.weui.removeWhenPageChange();
            },
            isTabChange: function (from, to) {
                let userTabs = [
                    '/answer/index',
                    '/asker/listen/',
                    '/asker/ask/',
                    '/asker/my/ask/list',
                    '/asker/my/index'
                ];
                let answerabs = [
                    '/answer/race/list',
                    '/answer/ask/list',
                    '/answer/my/index'
                ];

                let flag = false;
                if ($.inArray(from.path, userTabs) != -1 && $.inArray(to.path, userTabs) != -1) {
                    flag = true;
                } else if ($.inArray(from.path, answerabs) != -1 && $.inArray(to.path, answerabs) != -1) {
                    flag = true;
                }
                return flag;
            }
        },

        beforeRouteUpdate(to, from, next) {
            this.clearPlugs();
            this.clearAllVoice();
            //是否底部tab切换
            if (this.isTabChange(from, to)) {
                this.transitionName = '';
            } else {
                let isBack = false;
                //左右滑动判断存储
                for (let i = 0; i < this.pagesIn.length; i++) {
//                console.log(this.pagesIn[i]);
                    if (this.pagesIn[i].to == from.fullPath && this.pagesIn[i].from == to.fullPath) {
                        isBack = true;
                        this.pagesIn.splice(i, 1);
                        break;
                    }
                }
                if (!isBack) {
                    this.pagesIn.push({to: to.fullPath, from: from.fullPath})
                }

                if (isBack) {
                    this.transitionName = 'page-xqzs-right'
                } else {
                    this.transitionName = 'page-xqzs-left'
                }
            }
            this.$nextTick(function () {
                setTimeout(function () {
                    next()
                }, 1)
            })
        }
    }
</script>

<style>

    .audio .audio_btn:before {
        width: 0.6764705882352941rem;
        position: absolute;
        content: " ";
        display: block;
        height: 0.97rem;
        background: url(../images/sond_blue.png) no-repeat;
        background-size: 0.6764705882352941rem;
        top: 30%;
        left: 0.6rem;
        z-index: 2;
    }

    .audio .audio_btn.pay:before {
        width: 0.6764705882352941rem;
        position: absolute;
        content: " ";
        display: block;
        height: 0.97rem;
        background: url(../images/sond_yello.png) no-repeat;
        background-size: 0.6764705882352941rem;
        top: 30%;
        left: 0.6rem;
        z-index: 2;
    }

    .audio .audio_btn:after{ position: absolute;     top: -0.06rem;
        left: -0.5rem;height: 2.6727272727272727272727272727273rem; background: url(../images/audio_blue_left.png) no-repeat; width:2.8636363636363636363636363636364rem; background-size: 2.8636363636363636363636363636364rem;  display: block; content:" "; z-index: 1}
    .audio .audio_btn.pay:after{ position: absolute;     top: -0.06rem;
        left: -0.5rem; height: 2.6727272727272727272727272727273rem; background: url(../images/audio_yellow_left.png) no-repeat; width:2.8636363636363636363636363636364rem; background-size: 2.8rem;  display: block; content:" "; z-index: 1}


    .arrow:after {
        background: url(../images/arrow.png);
        width: 0.9411764705882353rem;
        height: 0.9411764705882353rem;
        background-size: 0.9411764705882353rem;
        position: absolute;
        right: 0.88235rem;
        top: 50%;
        margin-top: -0.4705882352941177rem;
        content: " "
    }

    .good_care.good_cared {
        background: url("../images/asker/zan_por1.png") no-repeat;
        background-size: 0.94117647058823529411764705882353rem;
        background-position: 0,0.3rem;
    }
    .good_care {
        float: left;
        display: inline-block;
        margin-right: 0.2rem;
        background: url("../images/asker/zan_nor.png") no-repeat;
        background-position: 0,0.3rem;
        background-size: 0.94117647058823529411764705882353rem;padding-left: 1.1rem; margin-left: 0.3rem;
    }

    .child-view {
        position: absolute !important;
        width: 100% !important;
        height: 100% !important;
        background: #f5f5f5;
        top: 0 !important;
        left: 0 !important;
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch
    }

    .transitionBox {
        position: relative
    }

    .transitionBox .child-view:nth-child(1) {
        z-index: 2
    }

    .transitionBox .child-view:nth-child(2) {
        z-index: 1
    }

    .page-xqzs-left-enter-active {
        animation-name: fold-in;
        animation-duration: .38s;
    }

    .page-xqzs-left-leave-active {
        animation-name: fold-out;
        animation-duration: .38s;
    }

    .page-xqzs-right-enter-active {
        animation-name: fold-right-in;
        animation-duration: .25s;
    }

    .page-xqzs-right-leave-active {
        animation-name: fold-right-out;
        animation-duration: .25s;
    }

    @media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {
        /* 兼容iphone4/4s */
        .page-xqzs-left-enter-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-left-leave-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-right-enter-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-right-leave-active {
            animation-name: noA;
            animation-duration: 0s;
        }
    }

    @media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
        /* 兼容iphone5 */
        .page-xqzs-left-enter-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-left-leave-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-right-enter-active {
            animation-name: noA;
            animation-duration: 0s;
        }

        .page-xqzs-right-leave-active {
            animation-name: noA;
            animation-duration: 0s;
        }
    }

    @keyframes fold-right-in {
        0% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
        }
    }

    @keyframes fold-right-out {
        0% {
            transform: translate3d(0%, 0, 0);
            -webkit-transform: translate3d(0%, 0, 0);
        }

        100% {
            transform: translate3d(100%, 0, 0);
            -webkit-transform: translate3d(100%, 0, 0);
        }
    }

    @keyframes fold-in {
        0% {
            transform: translate3d(100%, 0, 0);
            -webkit-transform: translate3d(100%, 0, 0);
        }
        15% {
            transform: translate3d(100%, 0, 0);
            -webkit-transform: translate3d(100%, 0, 0);
            z-index: 2;
        }
        100% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            z-index: 2;
        }
    }

    @keyframes fold-out {
        0% {
            transform: translate3d(0%, 0, 0);
            -webkit-transform: translate3d(0%, 0, 0);
        }
        15% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            z-index: 1;
        }
        100% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            z-index: 1;
        }
    }




</style>