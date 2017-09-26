<template >
    <div>
        <div class="my_problem_tabs">
            <div class="my_problem_active">一对一咨询</div>
            <div>抢答模式</div>
        </div>
        <div class="my_problem_box">
            <!--一对一列表-->
            <div class="problem_box_active">
                <ul>
                    <li class="my_problem_list1">
                        <router-link to="/asker/my/ask/detail">
                            <div class="problem_header">
                                <img src="../../../images/asker/34.jpg" alt="">
                                <div>陈小刚</div>
                                <div class="wait_Answer">待回答</div>
                            </div>
                            <div class="my_problem_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                            <div class="my_problem_bottom">
                                <div>4分钟前</div>
                                <div>听过0</div>
                                <div>收入分成￥0.00</div>
                                <div class="my_problem_money">￥19.99</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="my_problem_list1">
                        <router-link to="/asker/my/ask/detail">
                            <div class="problem_header">
                                <img src="../../../images/asker/34.jpg" alt="">
                                <div>陈小刚</div>
                                <div class="wait_Answer">待回答</div>
                            </div>
                            <div class="my_problem_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                            <div class="my_problem_bottom">
                                <div>4分钟前</div>
                                <div>听过0</div>
                                <div>收入分成￥0.00</div>
                                <div class="my_problem_money">￥19.99</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--抢答列表-->
            <div>
                <ul>
                    <li class="my_problem_list1">
                        <router-link to="/asker/my_problem/rob/problem">
                            <div class="problem_header">
                                问题类型：<div style="color: #333;margin-left: 10px">情感困惑</div>
                                <div class="wait_Answer">正在进行</div>
                            </div>
                            <div class="my_problem_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                            <div class="my_problem_bottom">
                                <div>4分钟前</div>
                                <div>回复2</div>
                                <div class="my_problem_money">￥19.99</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="my_problem_list1">
                        <router-link to="/asker/my_problem/rob/problem">
                            <div class="problem_header">
                                问题类型：<div style="color: #333;margin-left: 10px">情感困惑</div>
                                <div class="wait_Answer">正在进行</div>
                            </div>
                            <div class="my_problem_content">六年的感情败给时间了，男朋友还是选择分手男朋友是选选择分手，是选择分手是选择分手是选择分手是选择分手?选择分手是选择分手?选择分手...</div>
                            <div class="my_problem_bottom">
                                <div>4分钟前</div>
                                <div>回复2</div>
                                <div class="my_problem_money">￥19.99</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <v-asker-bottom  tabOnIndex="3"></v-asker-bottom>
    </div>
</template>

<script type="es6">

    import askerBottom from "../include/bottom.vue";
    export default {
        data() {
            return {

            }
        },
        components: {
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            $('.my_problem_tabs>div').click(function () {
                $('.my_problem_tabs>div').removeClass('my_problem_active')
                $('.my_problem_box>div').removeClass('problem_box_active')
                $(this).addClass('my_problem_active')
                $('.my_problem_box>div').eq($(this).index()).addClass('problem_box_active')
            })
        },
        methods: {

        }


    }
</script>
<style>
    .my_problem_tabs{
        color: #333;
        font-size: 0.88235rem;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #eee;
        height:2.35294rem;
        line-height: 2.35294rem;
    }
    .my_problem_tabs>div{
        flex: 1;
        position: relative;
    }
    .my_problem_tabs>div:nth-of-type(1)::after{
        content: '';
        height:1.1176rem;
        width:1px;
        background: #E0E0E0;
        position: absolute;
        right:0;
        top:50%;
        margin-top:-0.5588rem;
    }
    .my_problem_active{
        border-bottom: 2px solid #09bb07;
    }
    .my_problem_box{
        position: relative;
        width: 100%;
        height:auto;
    }
    .my_problem_box>div{
        display: none;
        width:100%;
    }
    .my_problem_box .problem_box_active{
        display: block;
    }
    .my_problem_list1{
        padding:12px 0.88235rem 0.588235rem 0.88235rem;
        background: #fff;
        line-height: 1.76471rem;
        margin-bottom: 0.588235rem;
    }
    .my_problem_list1:active{
        background: #eee;
    }
    .problem_header{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #666;
        font-size: 0.70588rem;
        margin-bottom: 0.88235rem;
    }
    .wait_Answer{
        color: #09bb07;
    }
    .problem_header>div:nth-of-type(2){
        position: absolute;
        right:0;
    }
    .problem_header img{
        height:29px;
        width:29px;
        display: block;
        border-radius: 50%;
        margin-right: 0.588235rem;
    }
    .my_problem_content{
        color: #474747;
        font-size: 0.88235rem;
        line-height: 1.235rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 0.88235rem;
    }
    .my_problem_bottom{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #999;
        font-size: 0.76471rem;
        line-height: 1;
    }
    .my_problem_bottom>div{
        margin-right: 0.88235rem;
    }
    .my_problem_bottom .my_problem_money{
        position: absolute;
        right:0;
        color: #FF9900;
        margin:0;
    }
</style>