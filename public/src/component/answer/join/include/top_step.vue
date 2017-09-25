<template>
    <div class="answer_join_top_box">
        <router-link :to="preUrl" v-if="preUrl!=''">上一项</router-link>
        <div  class="step">{{step}}/9</div>
        <router-link  :to="nextUrl"  v-if="nextUrl!=''">下一项</router-link>
    </div>
</template>
<style>
    .answer_join_top_box {

        line-height: 2.647058823529412rem;
        font-size: 0.9rem;
        background: #f1f1f1;
        border-bottom: 1px solid #eee;
        color: #333;
        width: 100%;
        position: relative;
    }

    .answer_join_top_box a {
        color: #333;
        text-align: center;
        width: 25%;
        position: absolute;
        top:0
    }
    .answer_join_top_box .step{ width: 100% ;text-align: center}

    .answer_join_top_box a:first-child {
        text-align: left;
        left:0.88235rem;
    }

    .answer_join_top_box a:last-child {
        text-align: right;
        right:0.88235rem;
    }


</style>
<script>
    export default {
        data() {
            return {}
        },
        props:{
            step:1,
            preUrl:'',
            nextUrl:''
        },
    }
</script>