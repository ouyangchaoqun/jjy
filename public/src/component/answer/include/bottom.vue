<template >
    <div  class="answer_bottom_box">
        <router-link to='/answer/race/list' replace :class="{on:tabOnIndex==0}">
            <span class="icon race"></span>抢答
        </router-link>
        <router-link to='/answer/ask/list'  replace :class="{on:tabOnIndex==1}" >
            <span class="icon ask"></span>待答
        </router-link>
        <router-link to='/answer/my/index' replace :class="{on:tabOnIndex==2}">
            <span class="icon my"></span>我的
        </router-link>
    </div>
</template>
<style>
    .answer_bottom_box {
        height:2.882352941176471rem;
        border-top: 1px solid #eee;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: absolute; bottom: 0; left:0; line-height: 1; font-size: 0.9rem ; background: #fff;   color:rgba(36,37,61,1);
        width: 100%;
    }
    .answer_bottom_box a:active,.answer_bottom_box a.on{ color:#FE7301}
    .answer_bottom_box a{color:rgba(36,37,61,0.5);
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 0.588235rem;
        vertical-align: text-bottom;
    }
    .answer_bottom_box a .icon{ display: block;  width: 1.588235294117647rem;   margin: 0.1rem auto;background: url(../../../images/answer/tab_icon.png) no-repeat; background-size: 4.764705882352941rem; height: 1.588235294117647rem  }
    .answer_bottom_box a .icon.race{  background-position: 0 0;}
    .answer_bottom_box a .icon.ask{background-position: -1.588235294117647rem 0;}
    .answer_bottom_box a .icon.my{  background-position: -3.176470588235294rem  0;}

    .answer_bottom_box a:active .icon.race,.answer_bottom_box a.on .icon.race{ background-position: 0 -1.588235294117647rem ;}
    .answer_bottom_box a:active .icon.ask,.answer_bottom_box a.on  .icon.ask{background-position: -1.588235294117647rem -1.588235294117647rem ;}
    .answer_bottom_box a:active .icon.my,.answer_bottom_box a.on  .icon.my{   background-position: -3.176470588235294rem  -1.588235294117647rem ;}

</style>
<script>

    export default {
        props: {
            tabOnIndex: 0
        }
    }
</script>