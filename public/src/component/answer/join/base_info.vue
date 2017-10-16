<template >
    <div style="height: 100%" class="wbg answer_join_base_info_box">

        <div v-title>入驻心理咨询师</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-answer-top-step step="1"  preUrl="" nextUrl="" title="填写基本信息"></v-answer-top-step>

        <div class="head">
        <div class="weui-cell ">
            <div class="weui-cell__hd"><label class="weui-label">设置头像<span>*</span></label> </div>
            <div class="weui-cell__bd" @click="changeHeadpic()">
                <div class="img" v-if="faceUrl==''">+</div>
                <div class="img" v-if="faceUrl!=''"><img :src="faceUrl" style="height: 100%; width: 100%"></div>
            </div>
            <div class="clear"></div>

        </div>
            <div class="tip">(设置头像，请选择一个清晰，辨识度高的个人照片作为头像，以便在用户心中建立您的个人品牌。）</div>
        </div>

        <div class="infos">
                <ul>
                    <li>
                        <div class="info_left">昵称</div>
                        <input type="text" class="nickName" :value="user.nickName" placeholder="填写昵称" maxlength="8">
                    </li>
                    <li>
                        <div class="info_left">真实姓名</div><span>*</span>
                        <input type="text" class="realName" :value="user.realName " @keyup="changeRealName()" placeholder="还未填写（如张三）">
                    </li>
                    <li>
                        <div class="info_left">性别</div><span>*</span>
                        <div class="info_right">
                            <div @click="changeSex(1)">
                                <span class="level_item" :class="{checked_item:sex==1}" ></span>
                                <span class="level_itemsex">男</span>
                            </div>
                            <div  @click="changeSex(2)">
                                <span class="level_item "  :class="{checked_item:sex==2}" ></span>
                                <span class="level_itemsex">女</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="info_left">出生年月</div><span>*</span>
                        <div class="list0 list02 list_bottom" @click="showDate()">

                            <div class="lut" :class="{on:!isLunar}" @click.stop="lutSelect(0)">阳历</div>
                            <div class="lut" :class="{on:isLunar}"  @click.stop="lutSelect(1)">阴历</div>
                            <div class="showdL" v-if="birthday">
                                <template v-if="!isLunar">
                                    <span>{{year}}年 </span>
                                    <span>{{month}}月 </span>
                                    <span>{{day}}日 </span>
                                </template>
                                <template v-if="isLunar">
                                    <span>{{yearN}} </span>
                                    <span>{{monthN}} </span>
                                    <span>{{dayN}} </span>
                                </template>
                            </div>
                            <div class="showdL" v-else>
                                请选择日期
                            </div>

                        </div>

                    </li>
                    <li  id="localCity" @click="areaPicker()">
                        <div class="info_left">所在城市</div><span>*</span>
                        <input type="text" :value="provinceName +' '+cityName +' '+areaName">
                    </li>




                    <!--<li>-->
                        <!--<div class="info_left"></div>-->
                        <!--<div class="info_right">-->
                            <!--<i @click="changeCardType(0)"  :class="{right_active:cardType==0}">身份证</i>-->
                            <!--<i @click="changeCardType(1)" :class="{right_active:cardType==1}">护照</i>-->
                        <!--</div>-->

                    <!--</li>-->
                    <!--<li>-->
                        <!--<div class="info_left">证件</div><span>*</span>-->
                        <!--<input type="text" class="idcard" :value="user.idcard ">-->
                    <!--</li>-->
                </ul>
        </div>
        <div class="btn_box">
            <a class="submit " :class="{cannotsub:canGoNext}" @click="msgSubmit()">下一项</a>
        </div>

    </div>
</template>

<script type="es6">

    import showLoad from '../../include/showLoad.vue';
    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                showLoad:false,
                birthday: '',
                user: '',
                year: '',
                month: '',
                day: '',
                defaultCity: '[330000, 330100, 330102]',
                provinceName: '',
                cityName: '',
                areaName: '',
                provinceId: '',
                cityId: '',
                areaId: '',
                isLunar: 0,
                lunarDateData:[],
                solarDateDate:[],
                isLeapMonth:false,
                alioss:null,
                uploadpicinfo:null,
                sex:1,
                cardType:0, //身份证,
                faceUrl:'',
                canGoNext:false
            }
        },

        mounted: function () {

            $('.info_right i').click(function () {
                $('.info_right i').removeClass('right_active')
                $(this).addClass('right_active')
            })
            let _this = this;
            this.initOss();
            var infokey = 'perfectinfo';
            xqzs.version.showed(infokey);
            this.getExpertByUserId();
            xqzs.wx.setConfig(_this);
            this.getUserInfo();
            this.lunarDateData=xqzs.dateTime.getLunarData(1949,2017);
            this.solarDateDate= xqzs.dateTime.getSolarData(1949,2017);
        },
        filters: {
            shortName: function (value, len) {
                return xqzs.shortname(value, len);
            }
        },
        methods: {
            //能否进入下一项
            checkNext:function (isTip) {
                let _this=this;
                let realName = $('.realName').val();
                if( !(_this.faceUrl&&_this.faceUrl!='')){
                    if(isTip)  xqzs.weui.tip("请上传头像");
                    return false;
                }else if(!(realName&&realName!='')){
                    if(isTip)   xqzs.weui.tip("请输入您的姓名");
                    return false;
                }else if(!(_this.birthday&&_this.birthday!='')){
                    if(isTip)   xqzs.weui.tip("请选择你的生日");
                    return false;
                }else if(!(_this.areaId&&_this.areaId!='')){
                    if(isTip)  xqzs.weui.tip("请选择所在城市");
                    return false;
                }
                return true;

            },
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
            getUserInfo:function () {
                let _this = this;
                //用户信息
                this.$http({
                    method: 'GET',
                    type: "json",
                    url: web.API_PATH + 'user/find/by/user/Id/_userId_',
                }).then(function (data) {//es5写法
                    if (data.data.data !== null) {

                        _this.user = eval(data.data.data);
                        _this.sex=_this.user.sex;
                        _this.cardType=_this.user.cardType;

                        _this.birthday = _this.user.birthday;
                        if (_this.birthday) {
                            let date = _this.birthday.split(',');
                            _this.year = date[0];
                            _this.month = date[1];
                            _this.day = date[2];
                            if( _this.user.isLunar==1||_this.user.isLunar==2){
                                _this.isLunar=true;
                                _this.yearN = date[0]+'年';
                                _this.monthN =  calendar.toChinaMonth(date[1]);
                                if(_this.user.isLunar==2) {
                                    _this.isLeapMonth=true;
                                    _this.monthN= "闰"+ _this.monthN;
                                }
                                _this.dayN = calendar.toChinaDay(date[2]);
                            }

                        }
                        _this.provinceName = _this.user.provinceName;
                        _this.cityName = _this.user.cityName;
                        _this.areaName = _this.user.areaName;
                        _this.provinceId = _this.user.provinceId;
                        _this.cityId = _this.user.cityId;
                        _this.areaId = _this.user.areaId;
                        _this.defaultCity = [_this.provinceId, _this.cityId, _this.areaId];
                        _this.canGoNext=_this.checkNext();
                    }
                }, function (error) {
                    //error
                });
            },
            getExpertByUserId:function () {
                let _this=this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1&&data.body.data!=null) {

                        _this.faceUrl = data.data.data.faceUrl;
                    }
                }, function (error) {
                });
            },
            changeSex:function (v) {
                this.sex=v;
            },
            changeRealName:function () {
                this.canGoNext=this.checkNext();
            },
            changeCardType:function (v) {
                this.cardType=v;
            },

            lutSelect:function (v) {
                let _this= this;
                if(v==0){
                    if( !this.isLunar) return ;

                    if(this.birthday&&this.birthday!=''){
                        let date = this.birthday.split(',');
                        let solar=  calendar.lunar2solar(parseInt(date[0]),parseInt(date[1]),parseInt(date[2]),_this.isLeapMonth); //阳历
                        this.birthday= solar.cYear+","+solar.cMonth+"," +solar.cDay ; //阳历
                        console.log(solar)
                        _this.year = solar.cYear;
                        _this.month = solar.cMonth;
                        _this.day = solar.cDay;
                    }
                    this.isLunar=false;

                }else if(v==1){
                    if( this.isLunar) return ;
                    this.isLunar=true;
                    if(this.birthday&&this.birthday!=''){
                        let date = this.birthday.split(',');
                        let lunar=  calendar.solar2lunar(date[0],date[1],date[2]); //农历
                        console.log(lunar)
                        this.birthday= lunar.lYear+","+lunar.lMonth+"," +lunar.lDay  //农历
                        _this.isLeapMonth=lunar.isLeap;
                        _this.yearN =  lunar.lYear+"年";
                        _this.monthN = lunar.IMonthCn;
                        _this.dayN =lunar.IDayCn;
                        _this.year = lunar.lYear;
                        _this.month = lunar.lMonth;
                        _this.day = lunar.lDay;
                        if(lunar.isLeap){
                            _this.month = lunar.lMonth+"_1";
                        }
                    }


                }
            },
            showDate: function () {
                let _this = this;
                let defaultValue = [1988, 1, 1];
                if (this.year != '' && this.month != '' && this.day != '') {
                    defaultValue = [this.year, this.month, this.day]
                }

                console.log(defaultValue)

                if (this.isLunar) {

                    weui.picker(  this.lunarDateData, {
                        depth: 3,
                        defaultValue: defaultValue,
                        id:"id"+Math.random(),
                        onChange: function (result) {
                            console.log(result);
                        },
                        onConfirm: function (result) {


                            _this.yearN = result[0].label;
                            _this.monthN = result[1].label;
                            _this.dayN = result[2].label;

                            console.log(  _this.monthN);

                            //闰月
                            let monthValue =  result[1].value;


                            if(typeof(monthValue)=="string"&&monthValue.indexOf("_")){
                                _this.isLeapMonth=true;
                                monthValue=result[1].value.split("_")[0];
                            }else{
                                _this.isLeapMonth=false;
                            }


                            _this.year = result[0].value;
                            _this.month = result[1].value;
                            _this.day = result[2].value;


                            _this.birthday = result[0].value + ',' +monthValue + ',' + result[2].value;
                            _this.canGoNext=_this.checkNext();
                        },
                    });

                } else {

                    weui.picker(  this.solarDateDate, {
                        depth: 3,
                        defaultValue: defaultValue,
                        id:"id"+Math.random(),
                        onChange: function (result) {
                            console.log(result);
                        },
                        onConfirm: function (result) {

                            _this.year = result[0].value;
                            _this.month = result[1].value;
                            _this.day = result[2].value;


                            _this.birthday = result[0].value + ',' + result[1].value + ',' + result[2].value;
                            _this.canGoNext=_this.checkNext();

                        },
                    });


                }
            },
            areaPicker: function () {
                let _this = this;
                $.get('/src/js/city.json', function (data) {
                    weui.picker(data, {
                        depth: 3,
                        defaultValue: _this.defaultCity,
                        onChange: function onChange(result) {

                        },
                        onConfirm: function onConfirm(result) {
                            if (result[0]) {
                                _this.provinceId = result[0].value;
                                _this.provinceName = result[0].label;
                            }
                            if (result[1]) {
                                _this.cityId = result[1].value;
                                _this.cityName = result[1].label;
                            }
                            if (result[2]) {
                                _this.areaId = result[2].value;
                                _this.areaName = result[2].label;
                            } else {
                                _this.areaId = '';
                                _this.areaName = '';
                            }
                            _this.canGoNext=_this.checkNext();

                        },
                        id: 'cascadePicker'
                    });
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

            msgSubmit: function () {
                if( !this.checkNext(true)){
                    return;
                }
                let _this = this;
                let nick = $('.nickName').val();
                let realName = $('.realName').val();
                let address = $('.address').val();
                 let msg = {
                    "id": _this.user.id,
                     "realName": realName,
                    "nickName": nick,
                    "sex": _this.sex,
                    "birthday": _this.birthday,
                    "countryId": 0,
                    "provinceId": _this.provinceId,
                    "cityId": _this.cityId,
                    "areaId": _this.areaId,
                    "address": address,
                    "isLunar":_this.isLunar?_this.isLeapMonth?2:1:0,
                    "faceUrl":_this.faceUrl
                };
                console.log(msg);
                _this.$http.post(web.API_PATH + 'come/expert/register', msg)
                    .then(
                        (response) => {
                            _this.$router.replace("../identity")

                        }
                    );


            },
            codeChange:function (v) {
                this.codeType=v;
            }

        },
        beforeDestroy:function () {
            xqzs.image.hideClip()
        },

        components: {
            'v-showLoad': showLoad,
            "v-answer-top-step": answerTopStep
        }

    }
</script>
<style>
    .answer_join_base_info_box .btn_box{position: absolute;bottom:1.471rem;width:100%;}
    .answer_join_base_info_box .submit{height:2.588235rem;line-height: 2.588235rem;color:#fff;background: linear-gradient(to right, rgba(255,158,25,0.4), rgba(253,114,6,0.4));text-align: center;
    border-radius: 1.176471rem;margin:0 0.88235rem}

    .cannotsub{    background: linear-gradient(to right, rgba(255,158,25,0.4), rgba(253,114,6,0.4)) !important; border: 1px solid #fff;}
    .answer_join_base_info_box .weui-cell__bd .img{
        width: 3.764705882352941rem; height: 3.764705882352941rem; background: #F4F4F7; color:#fff; font-size: 3.2rem; line-height: 3.2rem ; text-align: center; margin-left: 2rem
    }
    .answer_join_base_info_box .head{ margin-top:0.3rem; border-bottom: solid 0.5882352941176471rem #F4F4F7}
    .answer_join_base_info_box .tip{ margin-top: 0.2rem; font-size: 0.7058823529411765rem; padding: 10px 15px; color:#999}
    .answer_join_base_info_box  .weui-label span{ color:red;}

    .level_item{height:14px;width:14px;border-radius: 50%;border:1px solid #D2D2D2;display: inline-block;margin-right:0.8235rem;position: absolute;top:50%;margin-top:-8px;}
    .checked_item{border-color: rgba(254,115,1,1)}
    .checked_item::after{  content: '';  width:12px;  height: 12px;  background: rgba(254,115,1,1);  border-radius: 50%;  position: absolute;top:50%;margin-top:-6px;left:50%;margin-left:-6px;}
    .infos li{height:40px;line-height: 40px;color:#666;font-size: 0.8235rem;display: flex;margin-bottom: 0.88235rem;position: relative}
    .infos li input{height:100%;width:70%;background: #F4F4F7;border-radius: 5px;position: absolute;right:0;padding-left: 0.588235rem;color:#333;}
    .info_right{height:100%;text-align: center;padding-left: 4rem;display: flex}
    .info_left{width:20%;text-align: right;}
    .infos ul{padding:0.88235rem}
    .infos li span{color:red}
    .info_right>div{position: relative}
    .info_right>div:nth-of-type(1){margin-right: 1.76471rem}
    .info_right .level_itemsex{margin-left: 30px;color:#333;font-size: 0.88235rem}
    .info_right i{display: inline-block;color:#999;font-style: normal;width:60px;height:21px;font-size:0.70588235rem;line-height: 21px;border:1px solid #999;border-radius: 1rem;margin-right:25px;margin-top:10px;}
    .info_right .right_active{background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));border-color:rgba(254,115,1,1);color:#fff}

    .lut{ float:left; background: #ececec; color:#333; height: 30px; line-height: 30px;  padding: 0 10px; margin-top: 6px; font-size: 14px;  }
    .lut:nth-child(3){ margin-left: 0}
    .lut:nth-child(1){ margin-left:1.176470588235294rem;     }
    .lut.on{ float:left; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); color:#fff;}
    .showdL{ float:left; margin-left: 1rem;}
    .showdL span{ color:#333 !important}
    .answer_join_base_info_box .subBox{position: static;margin-bottom: 1.471rem}
</style>