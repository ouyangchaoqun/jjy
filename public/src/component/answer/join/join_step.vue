<template >
    <div class="join_stepBox">
        <div v-title>入驻心理咨询师</div>
        <header>填写基本信息</header>
        <div class="step_detailBox">
            <ul>
                <li>
                    <span class="li_left">*</span>真实姓名
                    <div class="li_right">
                        <input type="text" class="realName" @keyup="changeRealName()" placeholder="还未填写（如张三）" :value="user.realName">
                        <i></i>
                    </div>
                </li>
                <li @click="getSexPicker()">
                    <span class="li_left">*</span>性别
                    <div class="li_right">
                        <div>{{sex[sexIndex]}}</div>
                        <i></i>
                    </div>
                </li>
                <li @click="showDate()">
                    <span class="li_left">*</span>生日
                    <div class="lut_box">
                        <span class="lut" :class="{on:!isLunar}" @click.stop="lutSelect(0)">阳历</span>
                        <span class="lut" :class="{on:isLunar}"  @click.stop="lutSelect(1)">阴历</span>
                    </div>

                    <!--<div class="lut" :class="{on:!isLunar}" @click.stop="lutSelect(0)">阳历</div>-->
                    <!--<div class="lut" :class="{on:isLunar}"  @click.stop="lutSelect(1)">阴历</div>-->
                    <div class="li_right" style="width:40%" >
                        <div v-if="birthday">
                            <template v-if="!isLunar">
                                <span>{{year}}年 </span>
                                <span>{{month}}月 </span>
                                <span>{{day}}日 </span>
                            </template>
                            <template v-if="isLunar">
                                <span>{{year}}年 </span>
                                <span>{{month}}月 </span>
                                <span>{{day}}日 </span>
                            </template>
                        </div>
                        <i></i>
                    </div>
                </li>
                <li>
                    <span class="li_left">*</span>手机号码
                    <div class="li_right">
                        <div>15715725580</div>
                        <i></i>
                    </div>
                </li>
                <li>
                    <span class="li_left"></span>邮 箱
                    <div class="li_right">
                        <input type="text">
                        <i></i>
                    </div>
                </li>
                <li @click="areaPicker()">
                    <span class="li_left">*</span>常驻城市
                    <div class="li_right">
                        <div>
                            <span v-if="provinceName">{{provinceName}}</span>
                            <span v-if="cityName">{{cityName}}</span>
                            <span v-if="areaName">{{areaName}}</span>
                        </div>
                        <i></i>
                    </div>
                </li>
                <li>
                    <span class="li_left">*</span>身份证号
                    <div class="li_right">
                        <input type="text" class="identityNo"  @input="changeidentityNo()" :value="identityNo" pattern="[0-9a-zA-Z]*">
                        <i></i>
                    </div>
                </li>
            </ul>
            <div class="imgBox">
                <img v-if="identityFile1!=''"  :src="identityFile1" alt="" @click="upload(1)">
                <img v-else="" src="../../../images/positive.png" alt="" @click="upload(1)">
                <img v-if="identityFile2!=''" :src="identityFile2" alt="" @click="upload(2)">
                <img v-else="" src="../../../images/negative.png" alt="" @click="upload(2)">
            </div>
        </div>
        <div class="join_subBtn" @click="msgSubmit()">下一步</div>
    </div>
</template>

<script type="es6">


    export default {
        data() {
            return {
                sex:['女','男'],
                sexIndex:'',
                defaultCity: '[330000, 330100, 330102]',
                provinceName: '',
                cityName: '',
                areaName: '',
                isLunar: 0,
                year: '',
                month: '',
                day: '',
                provinceId: '',
                cityId: '',
                areaId: '',
                lunarDateData:[],
                solarDateDate:[],
                isLeapMonth:false,
                birthday:'',
                user:'',
                identityNo:'',
                identityFile1:'',
                identityFile2:'',
            }
        },


        mounted: function () {
            xqzs.wx.setConfig(this);

            let identityFile1= cookie.get("identityFile1")
            if(identityFile1&&identityFile1!=''){
                this.identityFile1= unescape(identityFile1);
            }

            let identityFile2= cookie.get("identityFile2")
            if(identityFile2&&identityFile2!=''){
                this.identityFile2= unescape(identityFile2);
            }
            this.check();
            xqzs.wx.setConfig(this);
            let _this = this;
            this.getExpertByUserId();
            xqzs.wx.setConfig(_this);
            this.getUserInfo();
            this.lunarDateData=xqzs.dateTime.getLunarData(1949,2017);
            this.solarDateDate= xqzs.dateTime.getSolarData(1949,2017);
        },
        methods: {
            //能否进入下一项
            checkNext:function (isTip) {
                let _this=this;
                let realName = $('.realName').val();
                if( !(_this.sexIndex&&_this.sexIndex!='')){
                    if(isTip)  xqzs.weui.tip("请选择性别");
                    return false;
                }else if(!(realName&&realName!='')){
                    if(isTip)   xqzs.weui.tip("请填写您的姓名");
                    return false;
                }else if(!(_this.birthday&&_this.birthday!='')){
                    if(isTip)   xqzs.weui.tip("请选择你的生日");
                    return false;
                }else if(!(_this.areaId&&_this.areaId!='')){
                    if(isTip)  xqzs.weui.tip("请选择常驻城市");
                    return false;
                }
                return true;

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
                        console.log(_this.user)
                        _this.sexIndex=_this.user.sex;
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
            changeRealName:function () {
                this.canGoNext=this.checkNext();
            },
            getSexPicker:function () {
                let _this = this;
                weui.picker([{
                    label: '女',
                    value: 0
                }, {
                    label: '男',
                    value: 1
                }], {
                    onChange: function (result) {

                    },
                    onConfirm: function (result) {
                       _this.sexIndex=result[0].value

                    }
                });
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

                        },
                        id: 'cascadePicker'
                    });
                });

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
            upload:function (v) {
                let _this=this;
                xqzs.wx.takePhotos(['camera','album'],1,xqzs.oss.config.uploadpicinfo,xqzs.oss.config.alioss,function (filecount) {
                    _this.showLoad=true;

                },function (json,ix) {
                    _this.showLoad=false;
                    if(v==1){
                        _this.identityFile1 = json.data.path;
                        cookie.set("identityFile1",escape(_this.identityFile1))
                    }else{
                        _this.identityFile2 = json.data.path;
                        cookie.set("identityFile2",escape(_this.identityFile2))
                    }
                    _this.check();

                },function (e) {
                    console.info(e);
                })
            },
            changeidentityNo:function (v) {
                let identityNo = $(".identityNo").val();

                if(identityNo!=''){
                    cookie.set("identityNo",escape(identityNo))
                }else{
                    cookie.set("identityNo",'')
                }
                this.identityNo=identityNo;
                this.check()
            },
            check:function () {
                let identityNo= cookie.get("identityNo");
                let identityFile1 =(cookie.get("identityFile1"));
                let identityFile2 =(cookie.get("identityFile2"));

                console.log("identityNo:"+identityNo)
                console.log("identityFile1:"+identityFile1)
                console.log("identityFile2:"+identityFile2)

                if(identityFile1&&identityFile1!=''&&identityFile2&&identityFile2!=''&&identityNo&&identityNo!=''){
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
            },
            msgSubmit: function () {
                if( !this.checkNext(true)){
                    return;
                }
                let _this = this;
                let realName = $('.realName').val();
                let msg = {
                    "id": _this.user.id,
                    "realName": realName,
                    "sex": _this.sexIndex,
                    "birthday": _this.birthday,
                    "countryId": 0,
                    'identityNo':unescape(cookie.get("identityNo")),
                    'cardImage':[unescape(cookie.get("identityFile1")),unescape(cookie.get("identityFile2"))],
                    "provinceId": _this.provinceId,
                    "cityId": _this.cityId,
                    "areaId": _this.areaId,
                    "isLunar":_this.isLunar?_this.isLeapMonth?2:1:0
                };
                console.log(msg);
                _this.$http.post(web.API_PATH + 'come/expert/register', msg)
                    .then(
                        (response) => {
                            _this.$router.push("/answer/join/joinmore")

                        }
                    );


            },

        },
        components: {

        }


    }
</script>
<style>
    .join_stepBox{background: #fff;}
    .join_stepBox input{color:rgba(36,37,61,0.5)}
    .join_stepBox header{color:rgba(36,37,61,1);font-size: 1rem;text-align: center;line-height: 2.7rem;border-bottom: 1px solid rgba(224,224,225,1)}
    .join_stepBox .step_detailBox{padding-left:  0.88235rem;}
    .join_stepBox .step_detailBox li{line-height: 2.471rem;color:rgba(36,37,61,1);border-bottom: 1px solid rgba(224,224,225,1);padding-right: 0.88235rem;
        font-size: 0.8235rem;position: relative;
    }
    .join_stepBox .li_left{color:rgba(255,0,0,1);margin-right: 0.588235rem;}
    .join_stepBox .step_detailBox li .li_right{float: right;color:rgba(36,37,61,0.6);padding-right:1.5rem;font-size: 0.76471rem;height:2.471rem; width:65%;overflow: hidden;text-align: right}
    .li_right input{border:0;outline: none;text-align: right;height:80%;}
    .join_stepBox .step_detailBox li .li_right i{background: url('../../../images/arrow.png');width: 0.9411764705882353rem;  height: 0.9411764705882353rem;  background-size: 0.9411764705882353rem;  position: absolute;  right: 0.88235rem;  top: 50%;margin-top: -0.5rem;  }
    .join_stepBox .lut_box{position: absolute;top:0;left:5rem}
    .join_stepBox .lut{float: left;background: #ececec;color: rgba(36,37,61,1);height: 1.76471rem;line-height: 1.76471rem;padding: 0 0.588235rem;margin-top: 0.35294rem;font-size: 0.8235rem;}
    .join_stepBox .lut.on{float: left;background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));color: #fff;}
    .join_subBtn{width:100%;color:#fff;background: linear-gradient(rgba(255,158,25,1),rgba(253,115,1,1));line-height: 2.588235rem;text-align: center;position: absolute;bottom:0;font-size: 1.0588235rem;}
    .imgBox{padding-right: 0.88235rem;padding-top:2.35rem;}
    .imgBox img{display: block;width: 9.4rem;float: left;height:6.0294rem}
    .imgBox img:nth-of-type(2){float: right}
</style>