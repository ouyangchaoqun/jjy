<template id="myask">
    <div class="myask_box">
        <div class="myask_box_style weui-tab__panel">
            <div class="myask_top">
                选择问题类型：<span @click.stop="show_class_box()"></span>
            </div>
            <div class="myask_content">
                <textarea maxlength="140" placeholder="请输入您的问题，心情指数将为您匹配专业咨询师进行抢答。" @input="get_myask_content()" v-model="myask_content"></textarea>
                <div>{{content_num}}/140</div>
            </div>
            <div class="myask_need_know">
                <div @click.stop="show_know_box()" style="float: right">
                    <img src="../../../images/asker/need_know.png" alt="">
                    <div>提问须知</div>
                </div>
            </div>
            <div class="myask_set_money">
                设置赏金：<input type="text" placeholder="10元起">
            </div>
            <div class="weui-btn weui-btn_disabled weui-btn_primary" v-if="!myask_content">提交</div>
            <div class="weui-btn weui-btn_primary" v-if="myask_content">提交</div>
        </div>
        <v-asker-bottom ></v-asker-bottom>
        <!--弹出层-->
        <div class="weui-mask weui-animate-fade-in" v-if="myask_mask_flag" @click="hide_myask_mask()">
            <!--类别框-->
            <div class="myask_class" v-if="class_box_flag" @click.stop>
                <h3>选择问题类型</h3>
                <div class="myask_class_box">
                    <div><span class="myask_class_listactive">情感困惑</span></div>
                    <div><span>性心理</span></div>
                    <div><span>人际关系</span></div>
                    <div><span>职场事业</span></div>
                    <div><span>婚姻家庭</span></div>
                    <div><span>个人成长</span></div>
                    <div><span>情绪管理</span></div>
                    <div><span>心理健康</span></div>
                    <div><span>亲子教育</span></div>
                </div>
                <div class="myask_class_true" @click.stop="hide_box()">知道了</div>
            </div>
            <!--须知框-->
            <div class="myask_class myask_know_box" v-if="know_box_flag" @click.stop>
                <h3>提问须知</h3>
                <ul style="overflow: auto;height: 12.35294rem;">
                    <li><b>1.</b>提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。<br/>（1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。<br/>（2）问题描述越清楚，咨询师的回答将精准。</li>
                    <li><b>2.</b>你可以选择做佳答案：<br/>（1）该回答将产生偷偷听收入；<br/>（2）其咨询师将获得全部赏金；</li>
                    <li><b>3.</b>48小时内无人抢答，则全额退款。</li>
                </ul>
                <div class="myask_class_true" @click="hide_box()" >知道了</div>
            </div>
        </div>
    </div>
</template>
<script>
    import askerBottom from "../include/bottom.vue";
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
        components: {
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            $(".weui-tab__panel").height($(window).height()-100);
        },
        updated:function () {
            $('.myask_class_box span').on('click',function (e) {
                console.log(111)
                e.stopPropagation();
                $('.myask_class_box span').removeClass('myask_class_listactive')
                $(this).addClass('myask_class_listactive')
                console.log($(this).html())
                $('.myask_top span').html($(this).html())
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
                _this.know_box_flag = false;
                _this.class_box_flag = false;
            }
        }
    }


</script>
<style>

    .myask_class_box{
        padding:0 0.88235rem;
        height:8.470588rem;
        margin-bottom: 2.588235rem;
    }
    .myask_class_box div{
        width: 33.3333%;
        float: left;
        margin-bottom: 2.1176471rem;
        font-size: 0.70588rem;
        color: #999;
    }
    .myask_class_box span{
        border:1px solid #ccc;
        width:4.41176471rem;
        height:1.2941176471rem;
        display: block;
        margin:0 auto;
        border-radius: 0.70588rem;
        line-height: 1.2941176471rem;
    }
    .myask_box{
        background: #fff;
    }
    .myask_box_style{
        padding:1.5294rem 0.88235rem 0 0.88235rem;
    }
    .myask_top{
        font-size: 0.88235rem;
        color: #666;
        position: relative;
        height: 1.76471rem;
        line-height: 1.76471rem;
        margin-bottom: 1.470588rem;
    }

    .myask_top span{
        width:7.6471rem;
        height:1.70588rem;
        line-height: 1.70588rem;
        outline: none;
        border:1px solid #69BA2D;
        border-radius: 5px;
        position: absolute;
        margin-left:1.0588235rem;
        top: 0;
        text-align: center;
        font-size: 0.88235rem;
    }
    .myask_content{
        height:11.117647rem;
        padding:0.70588235rem 0.8235rem 0.470588rem 0.70588235rem;
        background: rgba(241,241,245,0.7);
        color: #BAB9B9;
        position: relative;
        font-size: 0.76471rem;
        margin-bottom: 0.8235rem;
    }
    .myask_content textarea{
        height:100%;
        width:100%;
        outline: none;
        border:0;
        resize: none;
        background: rgba(241,241,245,0);
        border-radius: 5px;
        line-height: 1.176471rem;
        color: #666;
    }
    .myask_content textarea::-webkit-input-placeholder{color:#BAB9B9;}
    .myask_content div{
        position: absolute;
        right:0.70588rem;
        bottom:0.470588rem;
    }
    .myask_need_know{
        color: #666;
        font-size: 0.70588rem;
        text-align: right;
        height:0.8235rem;
        line-height: 0.8235rem;
        position: relative;
        margin-bottom: 3.5294rem;
    }
    .myask_need_know>div div{
        float: left;
        line-height:1;
        margin-top:1px;
    }
    .myask_need_know img{
        width:14px;
        height:14px;
        display: inline-block;
        float: left;
        margin-right: 5px;
    }
    .myask_set_money{
        font-size: 0.88235rem;
        color: #333;
        text-align: center;
        margin-bottom: 2.3529rem;
    }
    .myask_set_money input{
        outline: none;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        width: 5.294rem;
        text-align: center;
        font-size: 1.0588235rem;
    }
    .myask_set_money input::-webkit-input-placeholder{color:#FF9900;}
    .myask_last_list{
        margin-bottom: 2.941176rem;
    }
</style>