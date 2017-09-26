<template id="fans">
    <div class="fansBox">
        <div>
            <header>共2位粉丝</header>
            <ul class="fansItem">
                <li>
                    <img src="../../../images/34.jpg" alt="">
                    <div class="right">
                        <div>陈小刚</div>
                        <div class="bottom">
                            <div><span>2017-09-12</span><span>12:00</span></div>
                            <div><span>7个问题</span><span>52次偷听</span></div>
                        </div>
                    </div>
                </li>
                <li>
                    <img src="../../../images/34.jpg" alt="">
                    <div class="right">
                        <div>陈小刚</div>
                        <div class="bottom">
                            <div><span>2017-09-12</span><span>12:00</span></div>
                            <div><span>7个问题</span><span>52次偷听</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="noFansBox"  v-if="false">
            <div>
                还没有粉丝 
            </div>
        </div>
    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {}
        },


        mounted: function () {


        },
        methods:{

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