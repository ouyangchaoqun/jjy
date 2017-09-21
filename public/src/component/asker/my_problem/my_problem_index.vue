<template id="my_problem_index">
    <div>
        <div class="my_problem_tabs">
            <div class="my_problem_active">一对一咨询</div>
            <div>抢答模式</div>
        </div>
        <div class="my_problem_box">
            <div class="problem_box_active">
                <ul>
                    <li class="my_problem_list1">
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
                    </li>
                    <li class="my_problem_list1">
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
                    </li>
                </ul>
            </div>
            <div>222</div>
        </div>
    </div>
</template>

<script type="es6">
    var my_problem_index = {
        template: '#my_problem_index'
    };

    export default {
        data() {
            return {

            }
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
        font-size: 15px;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #eee;
        height:40px;
        line-height: 40px;
    }
    .my_problem_tabs>div{
        flex: 1;
        position: relative;
    }
    .my_problem_tabs>div:nth-of-type(1)::after{
        content: '';
        height:19px;
        width:1px;
        background: #E0E0E0;
        position: absolute;
        right:0;
        top:50%;
        margin-top:-9.5px;
    }
    .my_problem_active{
        border-bottom: 2px solid #6DC12E;
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
        padding:12px 15px 10px 15px;
        background: #fff;
        line-height: 30px;
        margin-bottom: 10px;
    }
    .problem_header{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #666;
        font-size: 12px;
        margin-bottom: 15px;
    }
    .wait_Answer{
        color: #69BA2D;
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
        margin-right: 10px;
    }
    .my_problem_content{
        color: #474747;
        font-size: 15px;
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 15px;
    }
    .my_problem_bottom{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        color: #999;
        font-size: 13px;
        line-height: 1;
    }
    .my_problem_bottom>div{
        margin-right: 15px;
    }
    .my_problem_bottom .my_problem_money{
        position: absolute;
        right:0;
        color: #FF9900;
        margin:0;
    }
</style>