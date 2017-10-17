

<template id="personal">
    <div class="personal_box">
        <div v-title>完善资料</div>

        <div class="list0 perfect_header active_tab" @click="changeHeadpic()">
            头像
            <img class="headerImg" :src="resizeImg(expert.faceUrl)" alt="">
            <img class="rightImg" src="../../../images/arrow.png" alt="">
        </div>

        <div class="list0 ">
            <span>姓名</span>
            <input type="text" class="realName" :value="user.realName " placeholder="还未填写（如张三）">
            <div class="line"></div>
        </div>
        <div class="list0 ">
            <span>昵称</span>
            <input type="text" class="nickName" :value="user.nickName" placeholder="填写昵称" maxlength="8">
            <div class="line"></div>
        </div>
        <div class="list0 list02" @click="changeSex()">
            <span>性别</span>
            <input type="text" class="sex" :value="sexs[sex-1].label" >
            <div class="line"></div>
        </div>


        <router-link to="/answer/join/mobile">
            <div class="list0  active_tab ">
                <img src="../../../images/arrow.png" alt="">
                <span>绑定手机号</span><span class="mobile">{{user.mobile}}</span>
                <div class="line"></div>
            </div>
        </router-link>
        <div class="list0 ">
            <span>身份证号</span>
            <input type="text" class="idcard" :value="user.idcard" placeholder="填写身份证号">
            <div class="line"></div>
        </div>
        <div class="list0 list02 " @click="showDate()">
            <span>生日</span>
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


        <div class="list0 box " id="localCity" @click="areaPicker()">
            <span>所在地区</span>
            <div class="showdL area">
                <span>中国</span>
                <span v-if="provinceName">{{provinceName}}</span>
                <span v-if="cityName">{{cityName}}</span>
                <span v-if="areaName">{{areaName}}</span>

            </div>
            <div style="clear: both"></div>
            <div class="line"></div>
        </div>
        <div class="list0 ">
            <span>详细地址</span>
            <input type="text" class="address" v-model:value="user.address" placeholder="还未填写">
        </div>
        <div class="list03" @click="msgSubmit()">
            <a class="weui-btn weui-btn_primary">提交</a>
        </div>
        <div style="height: 50px;"></div>
    </div>
</template>
<script type="text/javascript">
    var personal = {
        template: '#personal'
    }
    export default {
        data() {
            return {
                sexs:[{value:1,label:'男'},{value:2,label:'女'}],
                sex:1,
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
                expert:{},
                alioss:null,
                uploadpicinfo:null,
            }
        },
        mounted: function () {
            this.initOss();
            this.getExpertByUserId();
            let _this = this;
            var infokey = 'perfectinfo';
            xqzs.version.showed(infokey);
            //用户信息
            this.$http({
                method: 'GET',
                type: "json",
                url: web.API_PATH + 'user/find/by/user/Id/_userId_',
            }).then(function (data) {//es5写法
                if (data.data.data !== null) {

                    _this.user = eval(data.data.data);
                    _this.sex=  _this.user.sex;
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
                }
            }, function (error) {
                //error
            });
            xqzs.wx.setConfig(_this);

            this.lunarDateData=xqzs.dateTime.getLunarData(1949,2017);
            this.solarDateDate= xqzs.dateTime.getSolarData(1949,2017);
        },
        filters: {
            shortName: function (value, len) {
                return xqzs.shortname(value, len);
            }
        },
        methods: {
            resizeImg:function (v) {
                return   xqzs.oss.resizeImg(v,100,100)
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
            changeHeadpic:function () {
                let _this=this;
                xqzs.image.showClip(this.uploadpicinfo,this.alioss,function(){
                    _this.showLoad=true;
                },function (json,ix) {
                    _this.showLoad=false;
                    _this.expert.faceUrl=json.data.path;

                    let data ={

                        faceUrl: _this.expert.faceUrl,
                        expertId:cookie.get("expertId"),
                        userId:"_userId_"
                    }
                    _this.$http.post(web.API_PATH + "come/expert/modify", data)
                        .then(function (bt) {
                            if (bt.data && bt.data.status == 1) {

                            }
                        });


                    xqzs.image.hideClip()
                });


            },
            getExpertByUserId:function () {
                let _this=this;
                this.$http.get(web.API_PATH + 'come/expert/query/detail/by/userId/_userId_' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {

                        _this.expert = data.data.data;
                    }
                }, function (error) {
                });
            },
            changeSex:function () {
                let _this=this;
                weui.picker(  this.sexs, {
                    defaultValue: [_this.sex],
                    id:"id"+Math.random(),
                    onChange: function (result) {
                        console.log(result);
                    },
                    onConfirm: function (result) {

                        _this.sex= result[0].value;

                    },
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

                        },
                        id: 'cascadePicker'
                    });
                });

            },
            updateHeadpic: function () {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: web.API_PATH + 'user/update/user/headpic/_userId_',
                }).then(function (data) {//es5写法
                    if (data.data == 1) {
                        xqzs.weui.toast("success", "更新成功", function () {

                        });
                    }
                }, function (error) {
                    //error
                });

            },
            msgSubmit: function () {
                let _this = this;
                let nick = $('.nickName').val();
                let realName = $('.realName').val();
                let address = $('.address').val();
                let idcard= $(".idcard").val();
                let msg = {
                    "id": _this.user.id,
                    "realName": realName,
                    "nickName": nick,
                    "birthday": _this.birthday,
                    "countryId": 0,
                    "provinceId": _this.provinceId,
                    "cityId": _this.cityId,
                    "areaId": _this.areaId,
                    "address": address,
                    "sex":_this.sex,
                    "idcard":idcard,
                    "isLunar":_this.isLunar?_this.isLeapMonth?2:1:0
                };
                console.log(msg);
                _this.$http.post(web.API_PATH + 'user/update', msg)
                    .then(
                        (response) => {
                            if(response.body.status==1){
                                xqzs.weui.toast("success", "修改成功", function () {
                                    _this.$router.go(-1)
                                })
                            }else{
                                xqzs.weui.tip("修改失败")
                            }

                        }
                    );


            },
        },
        beforeDestroy:function () {
            xqzs.image.hideClip()
        },
    }
</script>
<style>

    .personal_box{ width: 100%;overflow: hidden}

    .list0.perfect_header{
        height:70px;
        line-height: 70px;
        position: relative;
        padding:0 0.88235rem;
    }
    .list0.perfect_header .headerImg{
        width:49px;
        height:49px;
        border-radius: 5px;
        position: absolute;
        right:2.1rem;
        top:50%;
        margin-top:-24.5px;
    }
    .list0.perfect_header .rightImg{top:27px}


    .lut{ float:left; background: #ececec; color:#333; height: 30px; line-height: 30px;  padding: 0 10px; margin-top: 6px; font-size: 14px; margin-left: 10px;}
    .lut:nth-child(3){ margin-left: 0}
    .lut.on{ float:left; background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1)); color:#fff;}


    .active_tab:active {
        background: #ececec
    }

    .personal_box {
        background: #f4f4f8;
    }


    .list0:nth-child(2) {
        margin-top: 12px;
    }

    .list0 .line {
        width: 100%;
        content: " ";
        background: #eee;
        display: block;
        height: 1px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0.88235rem;
    }



    .list0 {
        background: #fff;
        height: 44px;
        line-height: 44px;
        padding: 0 15px;
        position: relative;
    }

    .list0 input {
        margin: 0;
    }

    .list02 {
        margin-bottom: 15px
    }

    .list0 span {
        float: left;
        color: #333333;
        font-size: 15px;
    }

    .list0 .mobile {
        float: right;
        font-size: 15px;
        color: #999;
        margin-right: 20px
    }

    .list0 input {
        float: right;
        font-size: 14px;
        color: #999999;
        height: 44px;
        text-align: right;
        border: 0;
        outline: none;
    }

    .list0 input::-webkit-input-placeholder {
        color: #999;
    }

    .list0 input:-moz-placeholder {
        color: #999;
    }

    .list0 input::-moz-placeholder {
        color: #999;
    }

    .list0 input:-ms-input-placeholder {
        color: #999;
    }

    .list0 img {
        width: 16PX;
        position: absolute;
        top: 14px;
        right: 15px;
    }

    .showdL {
        float: right;
        color: #999;
        font-size: 15px;
        width: 150px;
        text-align: right;
    }

    .showdL span {
        margin-left: 5px;
        float: none;
        color: #999;
    }

    .list03 {
        border: 0;
        margin-top: 30px;
        padding: 0 15px;
    }

    .weui-picker__indicator {
        width: 100%;
        height: 34px;
        position: absolute;
        left: 0;
        top: 102px;
        z-index: 3;
        line-height: 34px;
    }

    #localCity {
        line-height: inherit;
        height: auto;
        padding-top: 9px;
        padding-bottom: 9px;
    }

    #localCity span {
        float: none;

    }

    .area {
        width: 65%;
        text-align: right;
    }


</style>


