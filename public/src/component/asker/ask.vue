<template>
    <div style="height: 100%" class="asker_ask_box">
        <div v-title>提问</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div class="change_height">
            <!--<div class="ask_type_new" v-if="isSelectAnswer">-->
                <!--<div class="tab">问题类型 <span>点击选择</span></div>-->
                <!--<div class="select_box">-->
                    <!--<div v-for="item in types">{{item.title}}</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="ask_type" v-if="!isSelectAnswer" @click="selectType()">-->
                <!--<div class="tab">选择问题类型：</div>-->
                <!--<div class="select_box">{{type}}</div>-->
                <!--<div class="clear"></div>-->
            <!--</div>-->
            <div class="text_area">
                <textarea v-if="isSelectAnswer" placeholder="请详细描述您的问题，专家将第一时间帮您解答。" class="content answer_select" maxlength="200"></textarea>
                <textarea v-if="!isSelectAnswer" placeholder="请告知您的性别，年龄，症状或具体问题，有助于提高回复的准确性。48小时内无人抢答将全额退款。" class="content" maxlength="140"></textarea>
                <div v-if="!isSelectAnswer" class="last_word_count">{{contentLength}}/140</div>
                <div v-if="isSelectAnswer" class="last_word_count">{{contentLength}}/{{MAX_LENGTH}}</div>
                <div class="price" v-if="isSelectAnswer">¥{{expertDetail.price}}</div>
                <div class="price" v-if="!isSelectAnswer">¥10.00</div>
            </div>
            <div class="addAnonymous">
                <span>匿名 </span>
                <input type="checkbox" class="weui-switch" v-model="checked" @click="getChecked()">
            </div>
            <div class="tip" @click="tip()">提问须知</div>
            <div class="clear"></div>
            <!--<div class="set_price" v-if="!isSelectAnswer">-->
                <!--<div class="txt">设置赏金：</div>-->
                <!--<input type="number" class="price" placeholder="10元起">-->
            <!--</div>-->
            <div class="submit weui-btn weui-btn_primary weui-btn_disabled" v-if="!isSubFlag">提交</div>
            <div class="submit weui-btn weui-btn_primary" @click="submit()" v-if="isSubFlag">提交</div>
        </div>

        <v-asker-bottom v-if="!isSelectAnswer" tabOnIndex="2"></v-asker-bottom>

        <div id="select_type" style="display: none">
            <div class="dialog_select_type">
                <div class="select_title">选择问题类型</div>
                <div class="select_types">
                    <div class="item"   v-for="(item,index) in types"   :index="index"><span>{{item.title}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="select_yes">
                    <div class="hide_btn">取消</div>
                    <div class="sure_click">确定</div>
                </div>


            </div>
        </div>
        <div class="weui-mask weui-animate-fade-in" v-if="is_checked">
            <div class="addAnonymous_dialog">
                <div class="addAnonymous_title">匿名开启</div>
                <div class="addAnonymous_content">匿名后您的个人信息将保密</div>
                <div class="addAnonymous_btn" @click="hideAddAnonymous()">我知道了</div>
            </div>
        </div>

        <div id="tip" style="display: none">
            <div class="dialog_select_type dialog_select_Height">
                <div class="select_title">提问须知</div>
                <div class="tip_content" v-if="!isSelectAnswer">
                    <p>
                        1.  提交问题，付款成功后，好一点将为您匹配专业咨询师进行抢答。
                    </p>
                    <p>
                        2.  你可以从解答中选出最佳解答：<br>
                          1）  该解答将产生偷听收入；<br>
                          2）  并且该咨询师将获得全部赏金；<br>
                    </p>
                    <p>
                        3.  若48小时内无咨询师抢答，则赏金将原路径退还；<br>
                    </p>
                    <p>
                        4.  若您在48小时内没有选出最佳解答：<br>
                        1）  所有解答均不产生偷听收入；<br>
                        2）  参与抢答的咨询师将平分赏金；<br>
                    </p>
                    <p>
                        5.  最佳解答每被偷听一次，您将获得10%的偷听收益 。<br>
                    </p>
                </div>
                <div class="tip_content" v-if="isSelectAnswer">
                    <p>
                        1. 提问后将安排咨询师在第一时间为您解答，若超过48小时未解答，支付酬金将按原路径返还。
                    </p>
                    <p>
                        2. 专家解答每被偷听一次，您将获得10%的偷听收益；
                    </p>
                    <p>
                        3. 所有免费听的答案都不产生偷听收入，包括：<br>
                        1）该答主开启了限时免费听，例如“限时免费2小时”，则在解答2小时内该解答可被免费听；<br>
                        2）答主联合好一点平台的其他免费推广；<br>
                    </p>
                </div>

                <div class="yes know" >知道了</div>


            </div>
        </div>
    </div>
</template>

<script type="es6">


    import showLoad from '../include/showLoad.vue';
    import askerBottom from "./include/bottom.vue";
    export default {
        data() {
            return {
                showLoad:false,
                types:[],
                showTypes:false,
                showTip:false,
                isSelectAnswer: false, //是否针对专家提问
                type:'',
                typeSelectIndex:null,
                questionClass:1,//0
                expertId:0,
                expertDetail:{},
                contentLength:0,
                MAX_LENGTH:200,
                isSubFlag:false,
                checked:false,
                isAnonymous:0,
                is_checked:false,

            }
        },
        components: {
            'v-showLoad': showLoad,
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

                $(document).resize(function() {
                    $(".asker_ask_box .change_height").height($(document).height()-50)
                });
                $(".content").keyup(function () {

                    let content  =  $(this).val();
                    if(content.length>0){
                        _this.isSubFlag=true
                    }else{
                        _this.isSubFlag=false
                    }
                    if(content.length>_this.MAX_LENGTH){
                        $(this).val(content.substr(0,_this.MAX_LENGTH));
                        _this.contentLength=_this.MAX_LENGTH;
                    }else{
                        _this.contentLength= content.length;
                    }


                })
            });
            xqzs.wx.setConfig(this);


        },
        methods: {
            getChecked:function () {
                console.log(this.checked)
                if(!(this.checked)){
                    this.is_checked = true;
                }else{
                    this.isAnonymous = 0
                }
                //this.checked = !this.checked;
                console.log('getChecked:'+this.isAnonymous)
            },
            hideAddAnonymous:function () {
                this.is_checked = false;
                this.checked = true;
                this.isAnonymous = 1;

                console.log( 'hideAddAnonymous:'+this.isAnonymous)
            },
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
                _this.showLoad = true;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    _this.showLoad = false
                    if (data.body.status == 1) {
                            _this.types= data.body.data;

                    }
                }, function (error) {
                });
            },
            submit:function () {
                console.log(this.isAnonymous)
                 if(this.questionClass==0){
                    xqzs.weui.tip("请选择问题类型")
                    return;
                }
                let content= $(".content").val();
                if(content==''){
                    xqzs.weui.tip("请选择填写问题内容");
                    return;
                }
                let _this = this;
                if( this.expertId&& this.expertId!=''){
                    _this.showLoad=true;
                    this.$http.post(web.API_PATH + "come/expert/post/expert/question", {userId:"_userId_",content:content, questionClass: _this.questionClass,expertId:this.expertId,isAnonymous:this.isAnonymous})
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {
                                let result = bt.data.data;
                                let config =result.config;
                                console.log(config)
                                _this.showLoad=false;

                                xqzs.wx.pay.pay(result.order, function () {

                                }, function () {//success
                                    xqzs.weui.tip("支付成功", function () {
                                        _this.$router.push("/asker/my/ask/list");
                                    });
                                }, function () {//error

                                },web.BASE_PATH+"asker/my/ask/list")
                            }
                        });
                }else{
//                    let price= $(".price").val();
//                    if(price==''){
//                        xqzs.weui.tip("请输入金额");
//                        return;
//                    }
//                    if(!xqzs.string.checkPrice(price)){
//                        xqzs.weui.tip("请输入正确的金额");
//                        return;
//                    }
//                    if(parseFloat(price)>xqzs.price.MAX_ASK_PRICE||parseFloat(price)<xqzs.price.MIN_ASK_PRICE){
//                        xqzs.weui.tip("金额需在 "+xqzs.price.MIN_ASK_PRICE+"-"+xqzs.price.MAX_ASK_PRICE+" 之间！");
//                        return;
//                    }
                    _this.showLoad=true;

                    this.$http.post(web.API_PATH + "come/user/post/grab/question", {userId:"_userId_",content:content, questionClass: this.questionClass,price:10,isAnonymous:this.isAnonymous})
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {
                                let result = bt.data.data;
                                let config =result.config;
                                _this.showLoad=false;


                                xqzs.wx.pay.pay(result.order, function () {
                                 }, function () {//success
                                    xqzs.weui.tip("支付成功", function () {
                                        _this.$router.push("/asker/my/ask/list");
                                    });
                                }, function () {//error

                                },web.BASE_PATH+"asker/my/ask/list")


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
                    $(".js_dialog .select_types .item").each(function (i) {

                        if(i==_this.typeSelectIndex){
                            $(this).addClass("on")
                        }
                    })
                }
                $(".select_types .item").click(function () {
                    $(".select_types .item").removeClass("on");
                    $(this).addClass("on");
                    let index=  parseInt($(this).attr("index"));
                    _this.typeSelectIndex=index;
                });
                $(".dialog_select_type .select_yes .sure_click").click(function () {


                    if(_this.typeSelectIndex==null){
                        xqzs.weui.tip("请选择类型");
                    }else{
                        _this.type= _this.types[_this.typeSelectIndex].title;
                        _this.questionClass=_this.types[_this.typeSelectIndex].id;
                        console.log(_this.questionClass)
                        if( _this.questionClass==undefined){
                            _this.questionClass=_this.types[_this.typeSelectIndex].classId;
                        }
                        xqzs.weui.dialogClose();

                    }
                })
            },
            closeDialog:function () {
                xqzs.weui.dialogClose()
            }

        },
        updated:function () {
            let _this = this;
            $('.select_box div').on('click',function () {
                $('.select_box div').removeClass('on_new')
                $(this).addClass('on_new')
                let index=  $(this).index();
                _this.typeSelectIndex=index;
                _this.questionClass=_this.types[_this.typeSelectIndex].id;
                if( _this.questionClass==undefined){
                    _this.questionClass=_this.types[_this.typeSelectIndex].classId;
                }
            })

        }


    }
</script>
<style>
    .addAnonymous_dialog{
        width:74%;
        background: #fff;
        border-radius: 0.3rem;
        position: absolute;
        top:40%;
        text-align: center;
        padding-top: 1.70588rem;
        font-size: 1.0588rem;
        left:50%;
        margin-left: -37%;
        overflow: hidden;
    }
    .addAnonymous_title{
        color:rgba(36,37,61,1);
    }
    .addAnonymous_dialog div{
        line-height: 1;
    }
    .addAnonymous_content{
        color:rgba(36,37,61,0.5);
        font-size: 0.88235rem;
        padding:0.94rem 0;
        border-bottom: 1px solid rgba(224,224,225,1);
    }
    .addAnonymous_btn{
        color:rgba(253,87,57,1);
        padding:0.94rem 0;
    }
    .addAnonymous_btn:active{
        background: #f5f5f5;
    }
    .addAnonymous{
        color:rgba(36,37,61,0.5);
        float: left;
        margin-top: 0.8rem;
        margin-left: 0.88235rem;
        font-size: 0.7058823529411765rem;
        line-height: 20px;
    }
    .addAnonymous span{
        float: left;
        margin-right: 0.294rem;
    }
    .addAnonymous .weui-switch, .weui-switch-cp__box{
        width:42px;height:22px;
    }
    .addAnonymous .weui-switch-cp__box:before, .weui-switch:before{
        width:40px;height:20px;
    }
    .addAnonymous .weui-switch-cp__box:after, .weui-switch:after{
        width:20px;height:20px;
    }
    .change_height{ height: 100%; overflow-y: scroll; width: 100%;}
    .asker_ask_box {
        background: #fff
    }
    .asker_ask_box .ask_type {
        margin: 1.471rem 0.8823529411764706rem 1.176471rem 0.88235rem;
        background: rgba(245,245,245,1);
        border-radius: 6px;
    }
    .asker_ask_box .ask_type .tab {
        line-height: 2.588235rem;
        font-size: 0.8823529411764706rem;
        color: rgba(36,37,61,0.5);
        margin-right: 0.3rem;
        float: left;
        margin-left: 0.7rem;
    }
    .asker_ask_box  .ask_type .select_box {
        width: 7.529411764705882rem;
        float: left;
        text-align: center;
        line-height: 2.588235rem;
        height: 2.588235rem;
        color: rgba(36,37,61,1);
        font-size: 0.88235rem;
    }
    .asker_ask_box .text_area {
        position: relative;
        margin: 0 0.8823529411764706rem;
        background: #F1F1F5;
        border-radius: 6px;
        font-size: 0.7647058823529412rem;
        padding: 1rem;
        height: 9rem;
        margin-top: 0.8823529411764706rem;
        padding-top: 0.588235rem;
    }
    /*.asker_ask_box .text_area p{*/
        /*font-size: 0.8235rem;*/
        /*line-height: 1.4rem;*/
        /*color:rgba(36,37,61,0.5);*/
        /*margin-bottom: 0.294rem;*/
    /*}*/
    .asker_ask_box .text_area .price{
        color: rgba(253,114,6,1);
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
        color: rgba(36,37,61,0.5);
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
        color:rgba(36,37,61,0.5);
    }
    .asker_ask_box .set_price {
        margin-top: 2rem;
        text-align: center;
        line-height: 2rem;
    }
    .asker_ask_box .set_price .txt {
        color:rgba(36,37,61,1);
    }
    .asker_ask_box .set_price div {
        display: inline-block
    }
    .asker_ask_box .set_price .price {
        font-size: 1.058823529411765rem;
        color: #FE7301;
        color: rgba(253,114,6,1);
        padding: 0 0.5rem;
        width: 4rem;
        height:1.5294rem;
        border: none;
        border-bottom: 1px solid #ccc;
    }
    ::-webkit-input-placeholder {
        color: #ff9900;}
    .asker_ask_box .submit {
        border-radius: 50px;
        margin: 3rem 0.88rem 5rem;
    }

    .asker_ask_box .submit:active {
        background: linear-gradient(to right, rgb(239, 143, 25), rgb(211, 105, 6));
    }
     .dialog_select_Height{ height:19rem;}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:#FE7301; text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% }
    .dialog_select_type  .yes:active{background: #eee}
    .dialog_select_type .tip_content{ padding:0  1rem; line-height: 1.8; font-size: 0.8235294117647059rem; color:#666; height: 13rem; overflow: auto}
    .dialog_select_type .tip_content p{ margin-bottom: 0.6rem;}
    .asker_ask_box .ask_type_new{padding:1.176471rem 0.88235rem;padding-bottom: 0.2941rem}
    .asker_ask_box .ask_type_new .tab{color:rgba(36,37,61,1);font-size: 1rem;line-height: 1;margin-bottom: 1.176471rem;}
    .asker_ask_box .ask_type_new .tab span{color:rgba(36,37,61,0.5);font-size: 0.70588rem;}
    .asker_ask_box .ask_type_new .select_box{display: flex;text-align: center;height:2.1176471rem;line-height: 2.1176471rem;}
    .asker_ask_box .ask_type_new .select_box div{flex:1;color:rgba(36,37,61,0.7);font-size: 0.88235rem;background: rgba(245,245,245,1);border-radius: 5px;}
    .asker_ask_box .ask_type_new .select_box div:nth-of-type(2){margin:0 0.88235rem;}
    .asker_ask_box .ask_type_new .select_box .on_new{background: rgba(253,114,6,1);color:#fff;}
    .asker_ask_box  .text_area .content{ font-size: 0.76471rem; color:rgba(36,37,61,1); height: 90%; line-height: 1.41rem}
    /*.asker_ask_box  .text_area  .answer_select{ height: 90%}*/
</style>