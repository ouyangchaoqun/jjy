<template >
    <div class="joinmore_box">
        <div v-title>入驻心理咨询师</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <header>
            <div class="headerImg_box">
                <div class="headerImg" @click="changeHeadpic()">
                    <img v-if="faceUrl!=''" :src="faceUrl" style="height: 100%; width: 100%">
                </div>
                <img class="smallImg" src="../../../images/joinAddImg.png" alt="">
            </div>
            <p><span>*</span>(设置头像，请选择一个清晰，辨识度高的个人照片作为头像，以便在用户心中建立您的个人品牌。）</p>
        </header>
        <div class="title">
            <span>*</span>
            擅长领域 <i>(最多可选三个)</i>
        </div>
        <div class="title_bottom">
            <div class="addClass" @click="selectType()">+</div>
        </div>
        <div class="title">
            <span>*</span>
            从业资质 <i>（如果没有资质证书请选择其他）</i>
        </div>
        <div class="title_bottom">
            <span class="bottom_left">必填</span>
            <span class="bottom_right" @click="goQualification()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            自我介绍
        </div>
        <div class="title_bottom">
            <span class="bottom_left">必填</span>
            <span class="bottom_right" @click="goPersonal()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            一句话签名
        </div>
        <div class="title_bottom">
            <span class="bottom_left">{{sign}}</span>
            <span class="bottom_right" @click="goSign()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            60秒语音寄语
        </div>
        <div class="title_bottom">
            <span class="bottom_left">必填</span>
            <span class="bottom_right" @click="goVoice()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            解答设置
        </div>
        <div class="title_bottom">
            <div class="set_box setPrice_box">设置提问酬金
                <input type="" class="priceInput" @input="changePrice()" :value="'￥'+price">
            </div>
            <div class="set_box"  @click="selectFreeTime()">设置限时免费听时间
                <input type="" readonly  :value="freeTimeText">
            </div>
        </div>

        <div id="select_type" class="select_type" v-show="showTypes" @click="select_typeFlag()">
            <div class="dialog_select_type">
                <div class="title">选择问题类型</div>
                <div class="types">
                    <div class="item" :class="{on:item.isSelect}" v-for="(item,index) in types" @click.stop="select(index)"><span>{{item.title}}</span></div>
                </div>
                <div class="yes">
                    <div>取消</div>
                    <div>确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                showLoad:false,
                faceUrl:'',
                types:[],
                MAX_COUNT:3,
                showTypes:false,
                sign:'必填',
                price:'10',
                times:[{
                    label: '不免费',
                    value: 0
                }, {
                    label: '30分钟',
                    value: 1
                }, {
                    label: '1小时',
                    value: 2
                },{
                    label: '2小时',
                    disabled: true,
                    value: 3
                }, {
                    label: '3小时',
                    value: 4
                },{
                    label: '4小时',
                    value: 4
                }],
                freeTime:null,
                freeTimeText:'',
                canGoNext:false
            }
        },

        mounted: function () {
            this.getClassList()
            this.getExpertByUserId();
            let sign= (cookie.get("sign"));
            let price = cookie.get("price");
            if(price)this.price= price;
            if(sign&&sign!=''){
                this.sign=unescape(sign)
            }
            xqzs.wx.setConfig(this);

        } ,
        methods:  {
            getExpertByUserId:function () {
                let _this=this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1&&data.body.data!=null) {

                        _this.faceUrl = data.data.data.faceUrl;
                    }
                }, function (error) {
                });
            },
            changeHeadpic:function () {
                let _this=this;
                xqzs.image.showClip(this.uploadpicinfo,this.alioss,function(){
                    _this.showLoad=true;
                },function (json,ix) {
                    _this.showLoad=false;
                    _this.faceUrl=json.data.path;
                    _this.canGoNext=_this.checkNext();
//
//                    let data ={
//
//                        faceUrl: _this.faceUrl,
//                        expertId:cookie.get("expertId"),
//                        userId:"_userId_"
//                    }
//                    _this.$http.post(web.API_PATH + "come/expert/modify", data)
//                        .then(function (bt) {
//                            if (bt.data && bt.data.status == 1) {
//
//                            }
//                        });
                    xqzs.image.hideClip()
                });
            },
            selectType: function () {
                let _this=this;
                _this.showTypes=true;

            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.types= data.body.data;
                        let questionClassId = cookie.get("questionClassId")
                        if(questionClassId&&questionClassId!=''){
                            _this.canGoNext=true;
                            let ids=  questionClassId.split(",")
                            for(let i=0;i<_this.types.length;i++){
                                for(let j =0;j<ids.length;j++){
                                    if(_this.types[i].id==ids[j]){
                                        _this.types[i].isSelect=true;
                                    }
                                }
                            }
                        }else{
                            _this.canGoNext=false;
                        }
                    }
                }, function (error) {
                });
            },
            select_typeFlag:function () {
              let _this = this;
              _this.showTypes = false
            },
            select:function (index) {
                let count=0;
                let types=this.types;
                console.log(index)
                if(types[index].isSelect){
                    types[index].isSelect=false
                }else{
                    for(let i=0;i<types.length;i++){
                        if(types[i].isSelect){
                            count++
                        }
                    }

                    if( count>=this.MAX_COUNT){

                    }else{
                        types[index].isSelect=true
                    }
                }
                this.$set(this.types,index,types[index]);
                //存入cookie
                let ids= '';
                for(let i=0;i<types.length;i++){
                    if(types[i].isSelect){
                        ids+=types[i].id+",";
                    }
                }

                if(ids.length>0){
                    ids=ids.substr(0,ids.length-1);
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
                cookie.set("questionClassId",ids);
            },
            changePrice:function () {
                let price= $(".priceInput").val()
                price=  price.replace('￥','');
                this.price=price;
                console.log(this.price)
            },
            selectFreeTime:function () {
                let  data= this.times;
                let _this=this;
                weui.picker(  data, {
                    id:"id"+Math.random(),
                    onChange: function (result) {
                        console.log(result);
                    },
                    onConfirm: function (result) {
                        _this.freeTime = result[0].value;
                        //cookie.set("freeTime", _this.freeTime );
                        _this.freeTimeText= result[0].label;
                        console.log(_this.freeTime)
                    },
                });
            },
            goQualification:function () {
                this.$router.push('qualification')
            },
            goPersonal:function () {
                this.$router.push('personal')
            },
            goSign:function () {
                this.$router.push('sign')
            },
            goVoice:function () {
                this.$router.push('voice')
            },
            beforeDestroy:function () {
                xqzs.image.hideClip()
            },

        },
        components: {
            'v-showLoad': showLoad,
        }

    }
</script>
<style>
    .joinmore_box{background: #fff;}
    .joinmore_box header{background: rgba(36,37,61,0.3);height: 11.76471rem;padding: 0 0.88235rem;color:#fff;font-size: 0.76471rem;position: relative}
    .joinmore_box header span{color:rgba(255,0,0,1)}
    .joinmore_box header p{position: absolute;bottom:1.176471rem;}
    .joinmore_box header .headerImg_box{width:5.1471rem;height:5.1471rem;background: #fff;margin:0 auto;position: relative;top:1.471rem;}
    .joinmore_box header .headerImg{width:5.1471rem;height:5.1471rem;background: url("../../../images/joinHeaderImg.png") no-repeat;background-size: 100% 100%;}
    .joinmore_box header .headerImg_box .smallImg{position: absolute;right:-1rem;bottom:-0.5rem;width:2rem;height:2rem;}
    .joinmore_box .title{border-bottom:1px solid rgba(224,224,225,1);color:rgba(36,37,61,1);font-size: 0.8235rem;line-height: 2.529rem;padding-left:1.8235rem;padding-right:0.88235rem;position: relative}
    .title span{color:rgba(255,0,0,1);font-size: 0.76471rem;position: absolute;left:0.88235rem;height:2rem;top:50%;margin-top:-1rem;line-height: 2.2rem;}
    .title i{font-style: normal;color:rgba(36,37,61,0.5);font-size: 0.6471rem;margin-left: 0.6471rem;}
    .title_bottom{line-height:1;border-bottom: 0.471rem solid rgba(245,245,245,1);padding:1.176471rem 0.88235rem 1.176471rem 1.6rem;}
    .title_bottom .set_box{background: rgba(245,245,245,1);line-height: 2.35rem;color:rgba(36,37,61,0.5);font-size: 0.76471rem;padding-left: 0.588235rem;}
    .title_bottom .set_box input{margin-left:1rem;line-height:2.35rem;color:rgba(253,115,1,1);border:0;outline: none;background: none}
    .title_bottom .setPrice_box{margin-bottom: 0.941rem;}
    .addClass{width:5.294rem;height:2.1176471rem;background: rgba(245,245,245,1);border-radius: 0.1471rem;color:rgba(224,224,225,1);text-align: center;font-size: 2rem;line-height:1.85rem;}
    .bottom_left{font-size: 0.76471rem;color:rgba(36,37,61,0.5)}
    .bottom_right{font-size: 0.70588235rem;color:rgba(253,115,1,1);float: right;margin-top: 0.176471rem;}
    .select_type{width:100%;height:100%;background: rgba(36,37,61,0.7);position: absolute;top:0;}
    .dialog_select_type{ background: #fff; border-radius: 10px; width: 80%; height:16rem; position: fixed;
        top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;overflow: hidden}
    .joinmore_box .dialog_select_type .title{ text-align: center; line-height: 3rem; font-size: 1rem;  font-weight: bold;}
    .dialog_select_type .types{ margin:  1rem 0;}
    .dialog_select_type .types .item{margin: 0 auto; width: 27%; float:left;text-align: center; line-height: 1.8235rem; border-radius:0.294rem; margin: 0 3%; margin-bottom: 0.88235rem; font-size: 0.7058823529411765rem;color:rgba(36,37,61,0.8);
        background: rgba(245,245,245,1);
    }
    .dialog_select_type .types .item.on{ color:rgba(255,81,2,1);background: rgba(253,115,1,1) ;color:#fff;}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:#FE7301; text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% ;display: flex}
    .yes div{flex: 1}
    .yes div:active{background: #eee}
    .yes div:nth-of-type(1){border-right:1px solid rgba(224,224,225,1)}
</style>