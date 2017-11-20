<template >
    <div class="joinmore_box">
        <div class="weui-mask weui-animate-fade-in"  @click="hide_myask_mask()">
            <div class="myask_class myask_know_box" @click.stop>
                <h3>解答须知</h3>
                <ul style="overflow: auto;height: 12.35294rem;width:100%;">
                    <li><b>1.</b>提交问题，设置赏金支付后，心情指数将为您匹配专业咨询师开始抢答。
                        <p>（1）设置的赏金越高，匹配的咨询师等级越高，抢答的咨询师越多。</p>
                        <p>（2）问题描述越清楚，咨询师的回答将精准。</p>
                    </li>
                    <li><b>2.</b>你可以选择做佳答案：
                        <p>（1）该回答将产生偷偷听收入；</p>
                        <p>（2）其咨询师将获得全部赏金；</p>
                    </li>
                    <li><b>3.</b>48小时内无人抢答，则全额退款。</li>


                </ul>
                <div class="myask_class_true" @click="hide_myask_mask()">知道了</div>
            </div>
        </div>
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
        <div class="title_bottom" @click="selectType()">
            <img v-if="classType.length<=0" class="addClass" src="../../../images/addClassTypeBg.png" alt="" @click="selectType()">
            <span class="class_style" v-if="classType" v-for="item in classType">{{item.title}}</span>
        </div>
        <div class="title">
            <span>*</span>
            从业资质 <i>（如果没有资质证书请选择其他）</i>
        </div>
        <div class="title_bottom">
            <span class="bottom_left">{{jobTitle}}</span>
            <span class="bottom_right" @click="goQualification()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            自我介绍
        </div>
        <div class="title_bottom">
            <span class="bottom_left">{{introduction}}</span>
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
            <span class="bottom_left">
                 <div class="audio">
                    <div class="audio_btn" @click.stop="play(index)">
                        <template >点击播放</template><!--v-if="!item.playing&&!item.paused"-->
                        <!--<template v-if="item.playing">正在播放..</template>-->
                        <!--<template v-if="item.paused">播放暂停</template>-->
                        <div class="second"></div><!--{{item.voiceLength}}”-->
                    </div>

                    <div class="clear"></div>
                </div>
            </span>
            <span class="bottom_right" @click="goVoice()">编辑</span>
        </div>
        <div class="title">
            <span>*</span>
            解答设置
            <div class="need_know_box" @click="showMask()">
                <img src="../../../images/asker/need_know.png" alt="">
                解答须知
            </div>
        </div>
        <div class="title_bottom">
            <div class="set_box setPrice_box">设置提问酬金
                <input type="" class="priceInput" @input="changePrice()" :value="'￥'+price">
            </div>
            <div class="set_box"  @click="selectFreeTime()">设置限时免费听时间
                <input type="" readonly  :value="freeTimeText">
            </div>
        </div>
        <div v-show="!(jobTitle&&freeTimeText&&price>=10&&classType&&sign!='必填'&&introduction&&faceUrl)" class="subBtn_nor" @click="check_step()">提交</div>
        <div v-show="(jobTitle&&freeTimeText&&price>=10&&classType&&sign!='必填'&&introduction&&faceUrl)" class="subBtn_nor subBtn_per" @click="sub_more()">提交</div>

        <div id="select_type" class="select_type" v-show="showTypes" @click="select_typeFlag()">
            <div class="dialog_select_type">
                <div class="select_title">选择问题类型</div>
                <div class="select_types">
                    <div class="item" :class="{on:item.isSelect}" v-for="(item,index) in types" @click.stop="select(index)"><span>{{item.title}}</span></div>
                </div>
                <div class="select_yes">
                    <div>取消</div>
                    <div @click="sureClass()">确定</div>
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
                classType:[],
                showLoad:false,
                faceUrl:'',
                types:[],
                MAX_COUNT:3,
                showTypes:false,
                sign:'',
                price:'',
                times:[{
                    label: '不免费',
                    value: 0
                }, {
                    label: '30分钟',
                    value: 30
                }, {
                    label: '1小时',
                    value: 60
                },{
                    label: '2小时',
                    disabled: true,
                    value: 120
                }, {
                    label: '3小时',
                    value: 180
                },{
                    label: '4小时',
                    value: 240
                }],
                freeTime:null,
                freeTimeText:'',
                canGoNext:false,
                alioss:null,
                uploadpicinfo:null,
                introduction:'',
                jobTitle:'',
                ids:[],
                expertId:'',
                myask_mask_flag:false,

            }
        },
        mounted: function () {

            this.$http.get(web.API_PATH+'come/expert/query/detail/by/userId/_userId_').then(function (data) {
                if(data.data.status==1&&data.data.data !=null){
                    let  expertId = data.data.data.id;
                    this.expertId = expertId;
                    cookie.set('expertId',expertId,300);
                    this.getGoodAt()
                    this.getClassList()
                    this.getExpertByUserId();
                }
            })

            this.initOss();
            let sign= (cookie.get("sign"));
            if(sign&&sign!=''){
                this.sign=unescape(sign)
            }

            xqzs.wx.setConfig(this);
        } ,
        methods:  {
            initOss:function () {
                this.uploadpicinfo = {
                    token: xqzs.string.guid(),
                    smallpic: xqzs.constant.PIC_SMALL,
                    middlepic: xqzs.constant.PIC_MIDDLE,
                    removepicurl: web.BASE_PATH + 'api/removepicture',
                    uploadbase64url: web.BASE_PATH + 'api/upfilebase64',
                    aliossgeturl: web.BASE_PATH + 'api/aliyunapi/oss_getsetting'
                };
                this.alioss = new aliyunoss({
                    url:this.uploadpicinfo.aliossgeturl,
                    token:this.uploadpicinfo.token
                });
            },
            getExpertByUserId:function () {
                let _this=this;
                _this.showLoad = true
                _this.$http.get(web.API_PATH + 'come/expert/query/detail/for/edit/'+ _this.expertId+'/_userId_' ).then(function (data) {//es5写法
                    _this.showLoad = false;
                    console.log(data.data.data+'******************')
                    if (data.body.status == 1&&data.body.data!=null) {
                        _this.jobTitle = data.data.data.jobTitle||'必填';
                        _this.sign = data.data.data.sign||'必填';
                        _this.introduction = data.data.data.introduction||'必填';
                        _this.freeTime=data.data.data.freeTime;
                            for(let i =0;i<_this.times.length;i++){
                                if(_this.times[i].value== _this.freeTime){
                                    _this.freeTimeText=cookie.get('freeTimeTextChange')==null? _this.times[i].label:cookie.get('freeTimeTextChange');
                                }
                            }

                        _this.price =cookie.get('priceChange')==null?parseInt (data.data.data.price):cookie.get('priceChange');
                        _this.faceUrl =cookie.get('faceUrl')==null? data.data.data.faceUrl:cookie.get('faceUrl');
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
                    cookie.set('faceUrl',_this.faceUrl)
                    xqzs.image.hideClip()
                });
            },
            selectType: function () {
                let _this=this;
                for (let i = 0,l=_this.types.length; i < l; i++) {
                    for (let j = 0, jl = _this.classType.length; j < jl; j++) {
                        if(_this.types[i].id == _this.classType[j].classId){
                            _this.types[i].isSelect = true;
                            _this.$set(_this.types, i, _this.types[i]);
                        }
                    }
                }
                _this.showTypes=true;

            },
            showMask:function () {
                this.myask_mask_flag = true
            },
            hide_myask_mask:function () {
                this.myask_mask_flag = false
            },
            getGoodAt:function () {
                let _this = this;
                _this.$http.get(web.API_PATH + 'come/expert/good/at/'+ _this.expertId ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.classType = data.data.data;
                        console.log( _this.classType)
                        for(let i = 0;i<_this.classType.length;i++){
                             _this.ids.push(_this.classType[i].classId)

                        }
                        console.log(_this.ids)
                    }
                }, function (error) {
                });
            },
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.types= data.body.data;
                    }
                }, function (error) {
                });
            },
            select_typeFlag:function () {
              let _this = this;
              _this.showTypes = false
            },
            select:function (index) {
                let count = 0;
                let types = this.types;
                //
                if (types[index].isSelect) {
                    types[index].isSelect = false
                } else {
                    for (let i = 0; i < types.length; i++) {
                        if (types[i].isSelect) {
                            count++
                        }
                    }

                    if (count >= this.MAX_COUNT) {

                    } else {
                        types[index].isSelect = true
                    }
                }
                this.$set(this.types, index, types[index]);
                //
                console.log(this.classType)
            },
            sureClass:function () {
                var selectClassTypes = [];
                this.ids=[];
                for (let i = 0,l=this.types.length,_ci =0; i < l; i++) {
                    if (this.types[i].isSelect) {
                        selectClassTypes.push(this.types[i]);
                    }
                }
                this.classType = selectClassTypes;
                console.log( this.classType)
                for(let j=0;j<this.classType.length;j++){
                    console.log(this.classType[j].id)
                    this.ids.push(this.classType[j].id)
                }
                let _this = this;
                let msg = {
                    'userId':"_userId_",
                    'questionClassId':_this.ids,
                };
                _this.$http.post(web.API_PATH + 'come/expert/register', msg)
                    .then(
                        (response) => {
                        }
                    );
            },
            changePrice:function () {
                let _this = this;
                let price= $(".priceInput").val()
                price=  price.replace('￥','');
                _this.price=price;
                cookie.set("priceChange",escape(price))
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
                        _this.freeTimeText= result[0].label;
                        cookie.set('freeTimeTextChange',_this.freeTimeText)
                    },
                });
            },
            goQualification:function () {
                this.$router.replace('qualification')
            },
            goPersonal:function () {
                this.$router.replace('personal')
            },
            goSign:function () {
                this.$router.replace('sign')
            },
            goVoice:function () {
                this.$router.replace('voice')
            },
            beforeDestroy:function () {
                xqzs.image.hideClip()
            },
            initVoice:function () {
                if(xqzs.voice.audio==null){
                    xqzs.voice.audio=document.createElement("audio");
                }
            },
            play:function (index) {
                this.initVoice();
                let _this=this;
                console.log(_this.detail.answers)
                let list = _this.detail.answers;
                xqzs.voice.onEnded=function () {
                    list[index].paused=false;
                    list[index].playing=false;
                    _this.$set(_this.detail.answers,index,list[index])
                };
                //重置其他列表内容
                for(let i = 0;i<list.length;i++){
                    if(index!=i&&(list[i].playing||list[i].paused)){
                        list[i].paused=false;
                        list[i].playing=false;
                        _this.$set(_this.detail.answers,i,list[i]);
                    }
                }
                let item= this.detail.answers[index];
                if(item.paused){  //暂停中也就是已经获取到且为当前音频
                    list[index].paused=false;
                    list[index].playing=true;
                    _this.$set(_this.list,index,list[index])
                    xqzs.voice.play();
                }else{
                    if(item.playing){    //播放中去做暂停操作
                        list[index].paused=true;
                        list[index].playing=false;
                        _this.$set(_this.detail.answers,index,list[index])
                        xqzs.voice.pause();
                    }else{     //重新打开播放
                        let answerId= item.answerId;
                        this.getVoiceUrl(answerId,function (url) {
                            xqzs.voice.play(url);
                            list[index].playing=true;
                            list[index].paused=false;
                            _this.$set(_this.detail.answers,index,list[index])
                        })
                    }

                }

            },
            /**
             * 获取音频地址
             * callFun(url) 回调 用户播放
             */
            getVoiceUrl:function (answerId,callFun) {
                let _this=this;
                this.showLoad=true;
                this.$http.put(web.API_PATH + "come/listen/get/voice/_userId_/"+answerId, {})
                    .then(function (bt) {
                        _this.showLoad=false;
                        if (bt.data && bt.data.status == 1) {
                            if(typeof (callFun) =="function"){
                                callFun(bt.data.data.path)
                            }
                        }
                    });
            },
            check_step:function () {
                let _this = this;
                if(_this.classType.length==0){
                      xqzs.weui.tip("请选择擅长领域")
                }else if(_this.freeTimeText==''){
                    xqzs.weui.tip("请设置免费时间")
                }else if(_this.price<10){
                    xqzs.weui.tip("请设置提问酬金(大于等于10)")
                }else if(_this.jobTitle==''||_this.jobTitle=='必填'){
                    xqzs.weui.tip("请编辑从业资质")
                }else if(_this.introduction==''||_this.introduction=='必填'){
                    xqzs.weui.tip("请编辑自我介绍")
                }else if(_this.sign==''||_this.sign=='必填'){
                    xqzs.weui.tip("请编辑个性签名")
                }else if(_this.faceUrl==''){
                    xqzs.weui.tip("请上传个人头像")
                }
            },
            sub_more:function () {
                console.log('提交')
                let _this = this;
                _this.showLoad=true;
                let msg = {
                    'userId':"_userId_",
                    "faceUrl":_this.faceUrl,
                    'price':_this.price,
                    'freeTime':_this.freeTime,
                    'questionClassId':_this.ids,
                    'finish':'yes'
                };

                console.log(msg);
                _this.$http.post(web.API_PATH + 'come/expert/register', msg)
                    .then(
                        (response) => {
                            console.log(response)
                            _this.showLoad = false
                            if(response.data.status==9000006){
                                xqzs.weui.tip("您已经提交过审核",function () {
                                    window.history.go(-1);
                                })
                            }else if(response.data.status==1){
                                _this.$router.replace("./reviewing")
                            }

                        }
                    );

            }

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
    .joinmore_box .title span{color:rgba(255,0,0,1);font-size: 0.76471rem;position: absolute;left:0.88235rem;height:2rem;top:50%;margin-top:-1rem;line-height: 2.2rem;}
    .joinmore_box .title i{font-style: normal;color:rgba(36,37,61,0.5);font-size: 0.6471rem;margin-left: 0.6471rem;}
    .joinmore_box .title_bottom{border-bottom: 0.471rem solid rgba(245,245,245,1);padding:0.588235rem 0.88235rem 0.588235rem 1.6rem;position: relative}
    .joinmore_box .title_bottom .set_box{background: rgba(245,245,245,1);line-height: 2.35rem;color:rgba(36,37,61,0.5);font-size: 0.76471rem;padding-left: 0.588235rem;}
    .joinmore_box .title_bottom .set_box input{margin-left:1rem;line-height:2.35rem;color:rgba(253,115,1,1);border:0;outline: none;background: none;font-size: 0.76471rem;width:50%;}
    .joinmore_box .title_bottom .setPrice_box{margin-bottom: 0.941rem;}
    .joinmore_box .addClass{width:5.294rem;height:2.1176471rem;display: block}
    .joinmore_box .bottom_left{font-size: 0.76471rem;color:rgba(36,37,61,0.5);display: inline-block;width:85%;overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;}
    .joinmore_box .bottom_right{font-size: 0.70588235rem;color:rgba(253,115,1,1);float: right;position: absolute;right:0.88235rem;top:0.588235rem;}

    .joinmore_box .title_bottom .class_style{font-size: 0.7058823529411765rem;background: rgba(253,115,1,1);color:#fff;margin-right: 0.588235rem;padding: 0.294rem 0.588235rem;border-radius: 0.294rem;}
    .joinmore_box .subBtn_nor{background: linear-gradient(rgba(255,158,25,0.5),rgba(253,115,1,0.5)); line-height: 2.588235rem;color:rgba(255,255,255,1);font-size: 1.0588235rem;text-align: center;margin-top: 1.4rem;}
    .joinmore_box .subBtn_per{background: linear-gradient(rgba(255,158,25,1),rgba(253,115,1,1)); }
    .joinmore_box .need_know_box{color:rgba(36,37,61,0.5);display: inline-block;float: right;font-size: 0.70588235rem;position: relative;}
    .joinmore_box .need_know_box img{width:0.8235rem;height:0.8235rem;position: absolute;left:-1.176471rem;top:50%;margin-top: -0.41176471rem;}

    .joinmore_box .myask_know_box{
        padding-top: 1.1176471rem;
        text-align: left;
        color: #666;
        font-size:0.8235rem;
        line-height: 1.176471rem;
    }
    .joinmore_box .myask_know_box li{
        padding: 0 0.88235rem;
        margin-bottom: 0.588235rem;
    }
    .joinmore_box .myask_know_box b{
        color: #333;
    }
    .joinmore_box .myask_class{
        width:16.470588rem;
        text-align: left;
        padding-top: 1.1176471rem;
        background: pink;
        color: #999;
        font-size: 0.70588rem;
        border-radius: 5px;
        position: absolute;
        top:20%;
        left:50%;
        margin-left: -8.235294rem;
        overflow: hidden;
        z-index: 1001;
    }
    .joinmore_box .myask_class h3{
        font-size:1.0588235rem;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:1;
        margin-bottom: 1.23588rem;
        width:100%;
        text-align: center;
    }
    .joinmore_box .myask_class_true{
        font-size: 1.0588235rem;
        height:2.941176rem;
        line-height: 2.941176rem;
        color: rgba(253,114,6,1);
        text-align: center;
        border-top: 1px solid #eee;
    }
    .joinmore_box .myask_class_true:active{
        background: #ccc;
    }


</style>