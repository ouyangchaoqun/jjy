<template>
    <div style="height: 100%" class="transitionBox">
        <transition :name="transitionName">
            <router-view class="child-view" :user=user :isGoIndex="isGoIndex"></router-view>
        </transition>
    </div>
</template>
<script>
    import Bus from '../js/bus.js';
    export default {
        data () {
            return {
                transitionName: 'page-xqzs-left',
                pagesIn: [],
                isFunny: false,
                user:{},
                friendMoodsSpe:[],
                friendMoods:[],
                myLastMood:null,
                isGoIndex:false
            }
        },
        created:function () {
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
        },
        methods: {
            //清除未关闭的控件
            clearPlugs: function () {
                $(".child-view").removeClass("page-xqzs-left-enter-active").removeClass("page-xqzs-left-leave-active").removeClass("page-xqzs-right-enter-active").removeClass("page-xqzs-right-leave-active");
                xqzs.weui.removeWhenPageChange();
            },
            isTabChange: function (from, to) {
                let userTabs = [
                    '/answer/index',
                    '/asker/listen',
                    '/asker/ask',
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

        beforeRouteUpdate (to, from, next) {
            this.clearPlugs();
            //是否底部tab切换
            if(this.isTabChange(from,to)){
                this.transitionName='';
            }else{
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
                if (!isBack){
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
                },10)
            })
        }
    }
</script>

<style>
    .child-view {
        position: absolute !important;
        width: 100% !important;
        height: 100% !important;
        background: #f4f4f8;
        top: 0 !important;
        left: 0 !important;
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch
    }
    .transitionBox{ position: relative}
    .transitionBox .child-view:nth-child(1){ z-index: 2}
    .transitionBox .child-view:nth-child(2){ z-index: 1}

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
    @media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone4/4s */
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
    @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone5 */
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