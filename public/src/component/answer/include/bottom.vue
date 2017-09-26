<template >
    <div  class="answer_bottom_box">
        <router-link to='/answer/race/list'  :class="{on:tabOnIndex==0}">
            <span class="icon race"></span>抢答
        </router-link>
        <router-link to='/answer/ask/list'  :class="{on:tabOnIndex==1}" >
            <span class="icon ask"></span>待答
        </router-link>
        <router-link to='/answer/my/index' :class="{on:tabOnIndex==2}">
            <span class="icon my"></span>我的
        </router-link>
    </div>
</template>
<style>
    .answer_bottom_box {
        height:2.882352941176471rem;
        border-top: 1px solid rgba(0,0,0,0.2);
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: absolute; bottom: 0; left:0; line-height: 1; font-size: 0.9rem ; background: #fff;   color:#333;
        width: 100%;
    }
    .answer_bottom_box a:active,.answer_bottom_box a.on{ color:#0BB20C}
    .answer_bottom_box a{color:#333;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 0.588235rem;
        vertical-align: text-bottom;
    }
    .answer_bottom_box a .icon{ display: block;  height: 1.8rem; width: 1.4rem; margin: 0 auto; margin-top: 0.2rem; }
    .answer_bottom_box a .icon.race{ background: url(../../../images/answer/tab_race.png) no-repeat; background-size: 1.35rem;}
    .answer_bottom_box a .icon.ask{ background: url(../../../images/answer/tab_ask_list.png) no-repeat top center; background-size: 1.05rem;}
    .answer_bottom_box a .icon.my{ background: url(../../../images/answer/tab_my_index.png) no-repeat; background-size: 1.4rem;}

    .answer_bottom_box a:active .icon.race,.answer_bottom_box a.on .icon.race{ background: url(../../../images/answer/tab_race_on.png) no-repeat; background-size: 1.35rem;}
    .answer_bottom_box a:active .icon.ask,.answer_bottom_box a.on  .icon.ask{ background: url(../../../images/answer/tab_ask_list_on.png) no-repeat top center; background-size: 1.05rem;}
    .answer_bottom_box a:active .icon.my,.answer_bottom_box a.on  .icon.my{ background: url(../../../images/answer/tab_my_index_on.png) no-repeat; background-size: 1.4rem;}

</style>
<script>

    export default {
        props: {
            tabOnIndex: 0
        }
    }
</script>