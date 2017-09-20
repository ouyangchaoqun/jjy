<template id="myask">
    <div class="myask_box">
        <div class="myask_box_style">
            <div class="myask_top">
                选择问题类型：<span @click.stop="show_class_box()"></span>
            </div>
            <div class="myask_content">
                <textarea maxlength="140" placeholder="请输入您的问题，心情指数将为您匹配专业咨询师进行抢答。" @input="get_myask_content()" v-model="myask_content"></textarea>
                <div>{{content_num}}/140</div>
            </div>
            <div class="myask_need_know" @click.stop="show_know_box()">
                <img src="../../../images/asker/need_know.png" alt=""> 提问须知
            </div>
            <div class="myask_set_money">
                设置赏金：<input type="text" placeholder="10元起">
            </div>
            <div class="weui-btn weui-btn_disabled weui-btn_primary" v-if="!myask_content">提交</div>
            <div class="weui-btn weui-btn_primary" v-if="myask_content">提交</div>
        </div>
        <div class="weui-mask weui-animate-fade-in" v-if="myask_mask_flag" @click="hide_myask_mask()">
            <div class="myask_class" v-if="class_box_flag" @click.stop>
                <h3>选择问题类型</h3>
                <ul>
                    <li class="myask_class_list">
                        <div><span class="myask_class_listactive">情感困惑</span></div><div><span>性心理</span></div><div><span>人际关系</span></div>
                    </li>
                    <li class="myask_class_list">
                        <div><span>职场事业</span></div><div><span>婚姻家庭</span></div><div><span>个人成长</span></div>
                    </li>
                    <li class="myask_class_list myask_last_list">
                        <div><span>情绪管理</span></div><div><span>心理健康</span></div><div><span>亲子教育</span></div>
                    </li>
                </ul>
                <div class="myask_class_true" @click.stop="hide_box()">知道了</div>
            </div>
            <div class="myask_class myask_know_box" v-if="know_box_flag" @click.stop>
                <h3>提问须知</h3>
                <ul>
                    <li><b>1.</b>提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。<br/>（1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。<br/>（2）问题描述越清楚，咨询师的回答将精准。</li>
                    <li><b>2.</b>你可以选择做佳答案：<br/>（1）该回答将产生偷偷听收入；<br/>（2）其咨询师将获得全部赏金；</li>
                    <li><b>3.</b>48小时内无人抢答，则全额退款。</li>
                </ul>
                <div class="myask_class_true" @click="hide_box()">知道了</div>
            </div>
        </div>
    </div>
</template>
<script>
    var myask = {
        template: '#myask'
    };
    export default {
        data() {
            return {
                myask_content:'',
                know_box_flag:false,
                class_box_flag:false,
                myask_mask_flag:false,
                content_num:0
            }
        },
        mounted: function () {

        },
        updated:function () {
            $('.myask_class_list span').on('click',function (e) {
                e.stopPropagation();
                $('.myask_class_list span').removeClass('myask_class_listactive')
                $(this).addClass('myask_class_listactive')
            })
        },
        methods:{
            get_myask_content:function () {
                this.content_num = this.myask_content.length
            },
            show_class_box:function () {
                let _this = this;
                _this.class_box_flag = true;
                _this.myask_mask_flag = true;
            },
            show_know_box:function () {
                let _this = this;
                _this.know_box_flag = true;
                _this.myask_mask_flag = true;
            },
            hide_box:function () {
                let _this = this;
                _this.know_box_flag = false;
                _this.class_box_flag = false;
                _this.myask_mask_flag = false;
            },
            hide_myask_mask:function () {
                let _this = this;
                _this.myask_mask_flag = false;
            }
        }
    }


</script>
<style>
    .myask_box{
        background: #fff;
    }
    .myask_box_style{
        padding:26px 15px 0 15px;
    }
    .myask_top{
        font-size: 15px;
        color: #666;
        position: relative;
        height: 30px;
        line-height: 30px;
        margin-bottom: 25px;
    }

    .myask_top span{
        width:130px;
        height:29px;
        line-height: 29px;
        outline: none;
        border:1px solid #69BA2D;
        border-radius: 5px;
        position: absolute;
        margin-left:18px;
        top: 0;
    }
    .myask_content{
        height:189px;
        padding:12px 14px 8px 12px;
        background: rgba(241,241,245,0.7);
        color: #BAB9B9;
        position: relative;
        font-size: 13px;
        margin-bottom: 14px;
    }
    .myask_content textarea{
        height:100%;
        width:100%;
        outline: none;
        border:0;
        resize: none;
        background: rgba(241,241,245,0);
        border-radius: 5px;
        line-height: 20px;
    }
    .myask_content textarea::-webkit-input-placeholder{color:#BAB9B9;}
    .myask_content div{
        position: absolute;
        right:12px;
        bottom:8px;
    }
    .myask_need_know{
        color: #666;
        font-size: 12px;
        text-align: right;
        height:14px;
        line-height: 14px;
        position: relative;
        margin-bottom: 60px;
    }
    .myask_need_know img{
        width:14px;
        height:14px;
        display: inline-block;
        position: absolute;
        right:55px;
        top:0;
    }
    .myask_set_money{
        font-size: 15px;
        color: #333;
        text-align: center;
        margin-bottom: 40px;
    }
    .myask_set_money input{
        outline: none;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        width: 90px;
        text-align: center;
        font-size: 18px;
    }
    .myask_set_money input::-webkit-input-placeholder{color:#FF9900;}
    .myask_class{
        width:280px;
        text-align: center;
        padding-top: 32px;
        background: #fff;
        color: #999;
        font-size: 12px;
        border-radius: 5px;
        position: absolute;
        top:30%;
        left:50%;
        margin-left: -140px;
        overflow: hidden;
    }
    .myask_class h3{
        font-size:18px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:1;
        margin-bottom: 34px;
    }
    .myask_class_list{
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        margin-bottom: 38px;
        padding: 0 15px;
    }
    .myask_class_list div{
        flex: 1;
    }
    .myask_class_list span{
        border: 1px solid #999;
        border-radius: 12px;
        width: 75px;
        display: block;
        margin:0 auto;
        height:22px;
        line-height: 22px;
    }
    .myask_class_true{
        font-size: 18px;
        height:50px;
        line-height: 50px;
        color: #69BA2D;
        text-align: center;
        border-top: 1px solid #eee;
    }
    .myask_class_true:active{
        background: #ccc;
    }
    .myask_class_list .myask_class_listactive{
        border-color: #69BA2D;
        color: #69BA2D;
    }
    .myask_know_box{
        padding-top: 19px;
        text-align: left;
        color: #666;
        font-size: 14px;
        line-height: 20px;
    }
    .myask_know_box h3{
        text-align: center;
        margin-bottom: 15px;
    }
    .myask_know_box li{
        padding: 0 15px;
        margin-bottom: 10px;
    }
    .myask_know_box b{
        color: #333;
    }
    .myask_last_list{
        margin-bottom: 50px;
    }
</style>