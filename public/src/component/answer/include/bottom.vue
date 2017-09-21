<template >
    <div  class="answer_bottom_box">
        <router-link to='/answer/race/list' class="on" >抢答</router-link>
        <router-link to='/answer/ask/list' >待答</router-link>
        <router-link to='/answer/my/index' >我的</router-link>
    </div>
</template>
<style>
    .answer_bottom_box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: absolute; bottom: 0; left:0; line-height: 2.647058823529412rem; font-size: 0.9rem ; background: #f1f1f1; border-top: 1px solid #eee; color:#333;
    width: 100%;
    }
    .answer_bottom_box a.on{ color:#0BB20C}
    .answer_bottom_box a{color:#333;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
    }


</style>