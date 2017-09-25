<template>
    <div class="answer_join_top_box">
        <div class="answer_join_top">
            <router-link :to="preUrl" v-if="preUrl!=''">上一项</router-link>
            <div class="step">{{step}}/9</div>
            <router-link :to="nextUrl" v-if="nextUrl!=''">下一项</router-link>
        </div>
        <div class="title">{{title}}</div>
    </div>
</template>
<style>
    .answer_join_top_box .title{
        color: #333; font-size: 0.88235rem;  text-align: center; line-height: 1.5rem;}
    .answer_join_top {

        line-height: 2.647058823529412rem;
        font-size: 0.9rem;
        background: #f1f1f1;
        border-bottom: 1px solid #eee;
        color: #333;
        width: 100%;
        position: relative;
    }

    .answer_join_top a {
        color: #333;
        text-align: center;
        width: 25%;
        position: absolute;
        top: 0
    }

    .answer_join_top .step {
        width: 100%;
        text-align: center
    }

    .answer_join_top a:first-child {
        text-align: left;
        left: 0.88235rem;
    }

    .answer_join_top a:last-child {
        text-align: right;
        right: 0.88235rem;
    }


    .text_area{ margin: 0 0.88235rem; border: 1px solid #ccc; border-radius: 0.3rem; overflow: hidden; background: #fff; padding: 0.5rem; position: relative }
    .text_area textarea{ width: 100%; font-size: 0.88235rem; line-height: 1.8rem; border: none; max-height:17rem; }
    .text_area .count{ color:#999; position: absolute; right:0.4rem; bottom:0.4rem; font-size: 0.77rem;}

</style>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            step: 1,
            preUrl: '',
            nextUrl: '',
            title:''
        },
    }
</script>