<template>
    <div style="height: 100%" class="asker_ask_box">

        <div v-title>提问</div>
        <div class="ask_type" >
            <div class="tab">选择问题类型：</div>
            <div class="select_box" @click="selectType()">{{type}}</div>
            <div class="clear"></div>
        </div>
        <div class="text_area">
            <textarea v-if="isSelectAnswer" class="content" placeholder="你匿名提问的回答每被偷听一次，你分成¥0.5"></textarea>
            <textarea v-if="!isSelectAnswer" class="content" placeholder="请输入您的问题，心情指数将为您匹配专业咨询师进行抢答。"></textarea>
            <div class="last_word_count">{{contentLength}}/{{MAX_LENGTH}}</div>
            <div class="price" v-if="isSelectAnswer">¥{{expertDetail.price}}</div>
        </div>
        <div class="tip" @click="tip()">提问须知</div>
        <div class="clear"></div>
        <div class="set_price" v-if="!isSelectAnswer">
            <div class="txt">设置赏金：</div>
            <input type="text" class="price" placeholder="10元起">
        </div>
        <div class="submit" @click="submit()">提交</div>


        <v-asker-bottom ></v-asker-bottom>

        <div id="select_type" style="display: none">
            <div class="dialog_select_type">
                <div class="title">选择问题类型</div>
                <div class="types">
                    <div class="item"   v-for="(item,index) in types"   :index="index"><span>{{item.title}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="yes">确定</div>


            </div>
        </div>
        <div id="tip" style="display: none">
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
                <div class="yes know" >知道了</div>


            </div>
        </div>
    </div>
</template>

<script type="es6">


    import askerBottom from "./include/bottom.vue";
    export default {
        data() {
            return {
                types:[],
                showTypes:false,
                showTip:false,
                isSelectAnswer: false, //是否针对专家提问
                type:'',
                typeSelectIndex:null,
                questionClass:0,
                expertId:0,
                expertDetail:{},
                contentLength:0,
                MAX_LENGTH:140

            }
        },
        components: {
            "v-asker-bottom": askerBottom
        },
        mounted: function () {
            this.expertId=this.$route.query.expertId;
            if( this.expertId&& this.expertId!=''){
                this.isSelectAnswer=true;
                this.getExpert();
            }else{
                this.getClassList()
            }

            //数字变化
            let _this=this;

            _this.$nextTick(function () {
                $(".content").keyup(function () {

                    let content  =  $(this).val();
                    console.log(content)
                    if(content.length>_this.MAX_LENGTH){
                        $(this).val(content.substr(0,_this.MAX_LENGTH));
                        _this.contentLength=_this.MAX_LENGTH;
                    }else{
                        _this.contentLength= content.length;
                    }


                })
            })


        },
        methods: {
            getExpert:function () {
                let _this= this;
                let id=  this.expertId;
                _this.$http.get(web.API_PATH + 'come/expert/show/to/user/'+id+'/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.expertDetail=data.body.data;
                        _this.types= data.body.data.domain
                    }
                }, function (error) {
                });
            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                            _this.types= data.body.data
                    }
                }, function (error) {
                });
            },
            submit:function () {

                if(this.questionClass==0){
                    xqzs.weui.tip("请选择类型")
                    return;
                }
                let content= $(".content").val();
                if(content==''){
                    xqzs.weui.tip("请选择填写问题内容");
                    return;
                }
                let _this = this;

                if( this.expertId&& this.expertId!=''){
                    this.$http.post(web.API_PATH + "come/expert/post/expert/question", {userId:"_userId_",content:content, questionClass: this.questionClass,expertId:this.expertId})
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {
                                //Todo 提示支付
                            }
                        });
                }else{
                    let price= $(".price").val();
                    if(price==''){
                        xqzs.weui.tip("请输入金额");
                        return;
                    }
                    if(!xqzs.string.checkPrice(price)){
                        xqzs.weui.tip("请输入正确的金额");
                        return;
                    }

                    this.$http.post(web.API_PATH + "come/user/post/grab/question", {userId:"_userId_",content:content, questionClass: this.questionClass,price:price})
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {

                                //创建支付订单并支付
                                _this.$http.put(web.API_PATH + 'power/plan/_userId_/' + 1 + '/' + 1 + '').then(function (res) {
                                    let config = res.data.data;
                                    xqzs.wx.pay.pay(config,function () {
                                        xqzs.weui.tip("正在跳转支付")
                                    },function () {//success
                                        xqzs.weui.tip("支付成功",function () {
                                            _this.$router.push("/asker/my/ask/list");
                                        });
                                    },function () {//error

                                    })

                                })
                            }
                        });

                }





            },



            select:function (index) {

                for(let i=0;i<this.types.length;i++){
                    this.types[i].isSelect=false;
                }
                this.types[index].isSelect=true

            },
            tip: function () {
                this.showTip=true;
                let _this= this;
                xqzs.weui.dialogCustom($("#tip").html());
                $(".know").click(function () {
                    _this.closeDialog()
                })
            },
            selectType: function () {
                let _this=this;
                this.showTypes=true;
                xqzs.weui.dialogCustom($("#select_type").html());
                if(_this.typeSelectIndex!=null){
                    $(".js_dialog .types .item").each(function (i) {

                        if(i==_this.typeSelectIndex){
                            $(this).addClass("on")
                        }
                    })
                }
                $(".types .item").click(function () {
                    $(".types .item").removeClass("on");
                    $(this).addClass("on");
                    let index=  parseInt($(this).attr("index"));
                    _this.typeSelectIndex=index;
                });
                $(".dialog_select_type .yes").click(function () {
                    if(_this.typeSelectIndex==null){
                        xqzs.weui.tip("请选择类型");
                    }else{
                        _this.type= _this.types[_this.typeSelectIndex].title;
                        _this.questionClass=_this.types[_this.typeSelectIndex].id;
                        xqzs.weui.dialogClose();

                    }
                })
            },
            closeDialog:function () {
                xqzs.weui.dialogClose()
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
        color: #333;
        margin-right: 0.3rem;
        float: left;
    }
    .asker_ask_box  .ask_type .select_box {
        border: 0.0588235294117647rem solid  rgba(255,158,25,1);
        height: 1.647058823529412rem;
        width: 7.529411764705882rem;
        float: left;
        border-radius: 6px;
        text-align: center;
        line-height: 1.647058823529412rem;
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
        height: 100%;
        resize: none;
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
        color: rgba(253,114,6,1);
        padding: 0 0.5rem;
        width: 4rem;
    }
    ::-webkit-input-placeholder {
        color: #ff9900;}
    .asker_ask_box .submit {
        background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));
        border-radius: 6px;
        color: #fff;
        text-align: center;
        line-height: 2.588235294117647rem;
        margin: 3rem 0.88rem;
    }

    .asker_ask_box .submit:active {
        background: #09a907
    }

     .dialog_select_type{ background: #fff; border-radius: 10px; width: 80%; height:19rem; position: fixed;
        top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;}
     .dialog_select_type .title{ text-align: center; line-height: 3rem; font-size: 1.058823529411765rem;  font-weight: bold;}
      .dialog_select_type .types{ margin: 0.9rem;}
     .dialog_select_type .types .item{ width: 27%; float:left;text-align: center; border: 1px solid #9E9E9E ; line-height: 1.411764705882353rem; border-radius:0.7058823529411765rem; margin: 0 2%; margin-bottom: 1.8rem; font-size: 0.7058823529411765rem;color:#999; padding: 0 0.5%; }
     .dialog_select_type .types .item.on{  border: 1px solid rgba(255,81,2,1); color:rgba(255,81,2,1)}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:rgba(255,81,2,1); text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% }
    .dialog_select_type .tip_content{ padding:0  1rem; line-height: 1.8; font-size: 0.8235294117647059rem; color:#666; height: 12rem; overflow: auto}
    .dialog_select_type .tip_content p{ margin-bottom: 0.6rem;}
</style>