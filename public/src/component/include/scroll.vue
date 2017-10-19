<template lang="html">
    <div class="yo-scroll" :style="height"
         :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
         @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }" >
            <header class="pull-refresh">
                <slot name="pull-refresh">
                    <div v-show="!isNotRefresh">
                        <span class="down-tip loadFont">下拉更新</span>
                        <span class="up-tip loadFont">松开更新</span>
                        <span class="refresh-tip loadFont">更新中</span>
                    </div>
                </slot>
            </header>
            <slot></slot>
            <footer class="load-more">
                <slot name="load-more">
                    <span class="loadFont" v-show="!infiniteLoading">上拉加载更多</span>
                    <span class="loadFont" v-show="infiniteLoading">数据加载中..</span>
                </slot>
            </footer>
            <footer class="load-finish" style="display: none">
                <slot name="load-finish">
                    <span class="loadFont">已经加载完成</span>
                </slot>
            </footer>


        </section>
    </div>
</template>

<script type="es6">
    import Bus from '../../js/bus.js';

    export default {
        props: {
            offset: {
                type: Number,
                default: 40
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            onInfinite: {
                type: Function,
                default: undefined,
                require: false
            },
            isPageEnd: false,
            isShowMoreText: true,
            isNotRefresh: true,
            bottomHeight:0
        },
        data() {
            return {
                top: 0,
                state: 0,
                startY: 0,
                touching: false,
                infiniteLoading: false,
                height: "height:100px"
            }
        },
        mounted: function () {
            let _this=this;
            this.height = "height:" + (document.body.clientHeight - this.bottomHeight) + "px";
            this.loadMoreText();
            Bus.$on("scrollMoreTextInit", function (isShowMoreText) {
//                console.log("scrollMoreTextInit")
                _this.isShowMoreText=isShowMoreText;
                _this.loadMoreText();
            });
//
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY
                this.startScroll = this.$el.scrollTop || 0
                this.touching = true;

            },
            touchMove(e) {
                if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if (diff > 0) e.preventDefault()
                this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

                if (this.state === 2) { // in refreshing
                    return
                }
                if (this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            touchEnd(e) {

                if (!this.enableRefresh) return
                this.touching = false
                if (this.state === 2) { // in refreshing
                    this.state = 2
                    this.top = this.offset
                    return
                }
                if (this.top >= this.offset) { // do refresh
                    this.refresh()
                } else { // cancel refresh
                    this.state = 0
                    this.top = 0
                }
                this.loadMoreText();
            },
            refresh() {
                this.state = 2;
                this.top = this.offset
                if (this.isNotRefresh) {
                    this.refreshDone()
                } else {
                    this.onRefresh(this.refreshDone);
                }


            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },
            loadMoreText: function () {

                if (!this.isShowMoreText) {
                    $(".load-more").hide();
                    $(".load-finish").hide();
                } else {
                    if (this.isPageEnd) {
                        $(".load-more").hide();
                        $(".load-finish").show();
                    } else {
                        $(".load-finish").hide();
                        $(".load-more").show();
                    }
                }


            },
            infinite() {
                console.log("Loading")
                this.infiniteLoading = true
                this.onInfinite(this.infiniteDone);
            },

            infiniteDone() {

                console.log("done")
                this.infiniteLoading = false
            },

            onScroll(e) {


                if (!this.enableInfinite || this.infiniteLoading) {
                    return
                }
                let outerHeight = this.$el.clientHeight
                let innerHeight = this.$el.querySelector('.inner').clientHeight
                let scrollTop = this.$el.scrollTop
                let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
                let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
                let bottom = innerHeight - outerHeight - scrollTop - ptrHeight

                if (bottom < infiniteHeight) this.infinite()
            }
        }
    }
</script>
<style>
    html, body {
        height: 100%
    }

    .yo-scroll {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;

    }
    .yo-scroll .inner {
        position: absolute;
        top: -2rem;
        width: 100%;
        transition-duration: 300ms;
    }

    .yo-scroll .pull-refresh {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .yo-scroll.touch .inner {
        transition-duration: 0ms;
    }

    .yo-scroll.down .down-tip {
        display: block;
    }

    .yo-scroll.up .up-tip {
        display: block;
    }

    .yo-scroll.refresh .refresh-tip {
        display: block;
    }

    .yo-scroll .down-tip,
    .yo-scroll .refresh-tip,
    .yo-scroll .up-tip {
        display: none;
    }

    .yo-scroll .load-more {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .yo-scroll .load-finish {
        height: 2rem;
        text-align: center;
    }

    .loadFont {
        font-size: 12px;
        color: #999;
    }
</style>