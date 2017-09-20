<template id="myCenter">
    <div style="height: 100%" class="asker_ask_box">

        <div v-title>提问</div>
        <div class="ask_type" v-if="!isSelectAnswer">
            <div class="tab">选择问题类型：</div>
            <div class="select_box" @click="selectType()"></div>
            <div class="clear"></div>
        </div>
        <div class="text_area">
            <textarea v-if="isSelectAnswer" placeholder="你匿名提问的回答每被偷听一次，你分成¥0.5"></textarea>
            <textarea v-if="!isSelectAnswer" placeholder="请输入您的问题，心情指数将为您匹配专业咨询师进行抢答。"></textarea>
            <div class="last_word_count">0/140</div>
            <div class="price" v-if="isSelectAnswer">¥19.9</div>
        </div>
        <div class="tip" @click="tip()">提问须知</div>
        <div class="clear"></div>
        <div class="set_price" v-if="!isSelectAnswer">
            <div class="txt">设置赏金：</div>
            <div class="price">10元起</div>
        </div>
        <div class="submit">提交</div>

        <div id="select_type" style="display: none;">
        <div class="dialog_select_type">
            <div class="title">选择问题类型</div>
            <div class="types">
                <div class="item on">情感困惑</div>
                <div class="item">人际关系</div>
                <div class="item">性心理</div>
                <div class="item">心理健康</div>
                <div class="item">情感困惑</div>
                <div class="item">人际关系</div>
                <div class="item">性心理</div>
                <div class="item">心理健康</div>
                <div class="item">人际关系</div>
                <div class="clear"></div>
            </div>
            <div class="yes">确定</div>


        </div>
        </div>
        <div id="tip" style="display: none;">
            <div class="dialog_select_type">
                <div class="title">提问须知</div>
                <div class="tip_content">
                    <p>
                    1、提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。<br>
                    （1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。<br>
                    （2）问题描述越清楚，咨询师的回答将精准。
                    </p>

                    <p>
                        2、你可以选择做佳答案：<br>
                        （1）该回答将产生偷偷听收入；<br>
                        （2）其咨询师将获得全部赏金；<br>
                    </p>
                    <p>
                        3、48小时内无人抢答，则全额退款。
                    </p>

                    <p>
                        3、48小时内无人抢答，则全额退款。
                    </p>
                    <p>
                        3、48小时内无人抢答，则全额退款。
                    </p>
                    <p>
                        3、48小时内无人抢答，则全额退款。
                    </p>
                    <p>
                        3、48小时内无人抢答，则全额退款。
                    </p>
                </div>
                <div class="yes">知道了</div>


            </div>
        </div>
    </div>
</template>

<script type="es6">


    export default {
        data() {
            return {
                isSelectAnswer: true
            }
        },
        mounted: function () {

        },
        methods: {

            tip: function () {
                let html = $("#tip").html()
                xqzs.weui.dialogCustom(html)
            },
            selectType: function () {
                let html = $("#select_type").html()
                xqzs.weui.dialogCustom(html)
            }

        }


    }
</script>
<style>
    .asker_ask_box {
        background: #fff
    }
    .asker_ask_box .ask_type {
        margin: 1.2rem 0.8823529411764706rem; margin-bottom: 0;
    }
    .asker_ask_box .ask_type .tab {
        line-height: 1.705882352941176rem;
        font-size: 0.8823529411764706rem;
        color: #666;
        margin-right: 0.3rem;
        float: left;
    }
    .asker_ask_box  .ask_type .select_box {
        border: 0.0588235294117647rem solid #69BA2D;
        height: 1.647058823529412rem;
        width: 7.529411764705882rem;
        float: left;
        border-radius: 6px;
    }
    .asker_ask_box .text_area {
        position: relative;
        margin: 0 0.8823529411764706rem;
        background: #F1F1F5;
        border-radius: 6px;
        font-size: 0.7647058823529412rem;
        padding: 1rem;
        height: 10rem;
        margin-top: 0.8823529411764706rem;
    }
    .asker_ask_box .text_area .price{
        color: #666;
        position: absolute;
        left: 0.6rem;
        bottom: 0.6rem;
    }
    .asker_ask_box  .text_area textarea {
        border: none;
        background: none;
        width: 100%;
        height: 100%
    }
    .asker_ask_box .text_area .last_word_count {
        color: #999;
        position: absolute;
        right: 0.6rem;
        bottom: 0.6rem;
    }
    .asker_ask_box .tip {
        display: inline-block;
        float: right;
        background: url(../../images/asker/tip.png) no-repeat;
        background-size: 0.8235294117647059rem;
        height: 0.8235294117647059rem;
        line-height: 0.8235294117647059rem;
        padding-left: 0.99rem;
        font-size: 0.7058823529411765rem;
        margin-right: 0.8823529411764706rem;
        margin-top: 0.8rem;
    }
    .asker_ask_box .set_price {
        margin-top: 3rem;
        text-align: center;
        line-height: 2rem;
    }
    .asker_ask_box .set_price .txt {
    }
    .asker_ask_box .set_price div {
        display: inline-block
    }
    .asker_ask_box .set_price .price {
        font-size: 1.058823529411765rem;
        border-bottom: 1px solid #ccc;
        color: #FF9900;
        padding: 0 0.5rem;
    }
    .asker_ask_box .submit {
        background: #69BA2D;
        border-radius: 6px;
        border: 1px solid #539322;
        color: #fff;
        text-align: center;
        line-height: 2.588235294117647rem;
        margin: 3rem 0.88rem;
    }

    .asker_ask_box .submit:active {
        background: #4d9126
    }

     .dialog_select_type{ background: #fff; border-radius: 10px; width: 80%; height:19rem; position: fixed;
        top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;}
     .dialog_select_type .title{ text-align: center; line-height: 3rem; font-size: 1.058823529411765rem;  font-weight: bold;}
      .dialog_select_type .types{ margin: 0.9rem;}
     .dialog_select_type .types .item{ width: 27%; float:left;text-align: center; border: 1px solid #9E9E9E ; line-height: 1.411764705882353rem; border-radius:0.7058823529411765rem; margin: 0 2%; margin-bottom: 1.8rem; font-size: 0.7058823529411765rem;color:#999; padding: 0 0.5%; }
     .dialog_select_type .types .item.on{  border: 1px solid  #69BA2D; color:#69BA2D}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:#0BB20C; text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% }
    .dialog_select_type .tip_content{ padding:0  1rem; line-height: 1.8; font-size: 0.8235294117647059rem; color:#666; height: 12rem; overflow: auto}
    .dialog_select_type .tip_content p{ margin-bottom: 0.6rem;}
</style>