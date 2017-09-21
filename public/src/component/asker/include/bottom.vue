<template >
    <div class="asker_bottom_box">

        <router-link to='/asker/stealListen/stealListen_index' class="on" >
            <span class="icon listen"></span>偷听
        </router-link>
        <router-link to='/answer/index'  >
            <span class="icon answer"></span>找专家
        </router-link>
        <router-link to='/asker/race/list' class="middle" >
            <div class="big_btn">问</div>
        </router-link>
        <router-link to='/asker/myask/myask' class="" >
            <span class="icon my_ask"></span>我问
        </router-link>
        <router-link to='/asker/my/index' class="" >
            <span class="icon my"></span>我的
        </router-link>

    </div>
</template>
<style>
    .asker_bottom_box {
        height:2.882352941176471rem;
        border-top: 1px solid rgba(0,0,0,0.2);
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: absolute; bottom: 0; left:0; line-height: 1; font-size: 0.9rem ; background: #fff;   color:#333;
    width: 100%;
    }
    .asker_bottom_box a:active,.asker_bottom_box a.on{ color:#0BB20C}
    .asker_bottom_box a{color:#333;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 0.588235rem;
        vertical-align: text-bottom;
    }

    .asker_bottom_box .middle{ position: relative}

    .asker_bottom_box .big_btn{width:2.617647058823529rem;
        height:2.617647058823529rem;
        border-radius: 50%;
        background: #0DBC0B;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height:2.588rem;
        position: absolute;
        left:50%;
        margin-left:-1.294rem;
        top:-0.58235rem;}
    .asker_bottom_box a .icon{ display: block;  height: 1.8rem; width: 1.4rem; margin: 0 auto; margin-top: 0.2rem; }
    .asker_bottom_box a .icon.listen{ background: url(../../../images/asker/tab_listen.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a .icon.answer{ background: url(../../../images/asker/tab_answer.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a .icon.my_ask{ background: url(../../../images/asker/tab_ask.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a .icon.my{ background: url(../../../images/asker/tab_my.png) no-repeat; background-size: 1.4rem;}

    .asker_bottom_box a:active .icon.listen,.asker_bottom_box a.on .icon.listen{ background: url(../../../images/asker/tab_listen_on.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a:active .icon.answer,.asker_bottom_box a.on  .icon.answer{ background: url(../../../images/asker/tab_answer_on.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a:active .icon.my_ask,.asker_bottom_box a.on  .icon.my_ask{ background: url(../../../images/asker/tab_ask_on.png) no-repeat; background-size: 1.4rem;}
    .asker_bottom_box a:active .icon.my,.asker_bottom_box a.on  .icon.my{ background: url(../../../images/asker/tab_my_on.png) no-repeat; background-size: 1.4rem;}



</style>