<template>
    <div style="height: 100%" class="transitionBox" >

        <transition :name="transitionName">


            <router-view class="child-view"    :user=user  :isGoIndex="isGoIndex"></router-view>


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
            console.log("mounted")
            var _this = this;
            Bus.$on("setFunny", function (v) {
                _this.isFunny = v;

            });
            Bus.$on("goIndex", function (v) {
                _this.isGoIndex = v;

            });



        },
        methods: {

        },

        beforeRouteUpdate (to, from, next) {
            var _this = this;
            console.log("beforeRouteUpdate")

            console.log(from.path);
            console.log(to.path);

            if (_this.isFunny === true) {
                _this.isFunny = false;
                Bus.$emit("closeFunnyWindow");
                next(false);
                return false;
            }

            $(".child-view").removeClass("page-xqzs-left-enter-active").removeClass("page-xqzs-left-leave-active").removeClass("page-xqzs-right-enter-active").removeClass("page-xqzs-right-leave-active");

            xqzs.weui.removeWhenPageChange();


//            let isBack = parseInt( Math.random()*10)%2;

//            console.log({to:to.fullPath,from:from.fullPath});

            let isBack = false;
            for (let i = 0; i < this.pagesIn.length; i++) {
//                console.log(this.pagesIn[i]);
                if (this.pagesIn[i].to == from.fullPath && this.pagesIn[i].from == to.fullPath) {
                    isBack = true;
                    this.pagesIn.splice(i, 1);
                    break;
                }
            }

            if(to.fullPath==='/')isBack=true;

            if (!isBack)
                this.pagesIn.push({to: to.fullPath, from: from.fullPath})

            console.log("bearbear");
//
            console.log(from.fullPath);

            let isBackStrIndex  =  to.fullPath.indexOf("isBack=1");
            if(isBackStrIndex>0 ){
                isBack= true;
            }

            if(_this.$route.query.isBack!=undefined &&　_this.$route.query.isBack==1){
                isBack= true;
            }
            //是否为点开心情页面；
            if ((from.fullPath === "/" || from.fullPath === "/#") && to.fullPath === "/record") {
                this.transitionName = 'page-xqzs-up'
            } else if (from.fullPath === "/record" && (to.fullPath === "/" || to.fullPath === "/#")) {
                this.transitionName = 'page-xqzs-down'

            }else if (isBack) {
                this.transitionName = 'page-xqzs-right'
            } else {
                this.transitionName = 'page-xqzs-left'
            }
            this.$nextTick(function () {
                setTimeout(function () {
                    next()
                },10)
            })
            var tt = document.querySelector('.child-view');
            tt.addEventListener("webkitAnimationEnd", function(){
                console.log("webkitAnimationEnd")
            }, false);

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

    .page-xqzs-up-enter-active .moodBox_bg, .page-xqzs-down-leave-active .moodBox_bg {
        background: none !important;
    }

    .page-xqzs-up-leave-active .addMoodBg{
        animation-name: goone;
        animation-duration: .3s;
    }

    .page-xqzs-down-enter-active .addMoodBg{
        animation-name: gozelo;
        animation-duration: .3s;
    }


    .page-xqzs-up-leave-active .addMoodBg, .page-xqzs-down-enter-active .addMoodBg {
        display: block;
        z-index: 10001;
    }

    .page-xqzs-down-leave-active .banner, .page-xqzs-up-enter-active .banner {
        display: none !important;
    }

    .page-xqzs-up-enter-active {
        animation-name: fold-up-in;
        animation-duration: .3s;
        background: none !important;
    }

    .page-xqzs-up-leave-active {
        animation-name: fold-up-out;
        animation-duration: .5s;

    }

    .page-xqzs-down-enter-active {

        animation-name: fold-down-in;
        animation-duration: .3s;

    }

    .page-xqzs-down-leave-active {
        animation-name: fold-down-out;
        animation-duration: .5s;
        background: none !important;

    }

    @keyframes gozelo {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes goone {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes fold-down-in {
        0% {
            transform: translate3d(0, 0%, 0);
            -webkit-transform: translate3d(0, 0%, 0);
        }

        100% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);

        }
    }

    @keyframes fold-down-out {
        0% {
            transform: translate3d(0%, 0, 0);
            -webkit-transform: translate3d(0%, 0, 0);
        }

        100% {
            transform: translate3d(0, 100%, 0);
            -webkit-transform: translate3d(0, 100%, 0);
        }
    }

    @keyframes fold-up-in {
        0% {
            transform: translate3d(0, 100%, 0);
            -webkit-transform: translate3d(0, 100%, 0);
        }
        5%{
            z-index: 2;
            transform: translate3d(0, 100%, 0);
            -webkit-transform: translate3d(0, 100%, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            z-index: 2;
        }
    }

    @keyframes fold-up-out {
        0% {
            transform: translate3d(0%, 0, 0);
            -webkit-transform: translate3d(0%, 0, 0);
        }

        95%{
            z-index: 1;
            transform: translate3d(0,0, 0);
            -webkit-transform: translate3d(0, 0, 0);
        }

        100% {
            z-index: 1;
            transform: translate3d(0, 0%, 0);
            -webkit-transform: translate3d(0, 0%, 0);
        }
    }


</style>