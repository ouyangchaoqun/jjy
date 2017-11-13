<template >
    <div class="join_stepBox">
        <div v-title>入驻心理咨询师</div>
        <header>填写基本信息</header>
        <div class="step_detailBox">
            <ul>
                <li>
                    <span class="li_left">*</span>真实姓名
                    <div class="li_right">
                        <input type="text">
                        <i></i>
                    </div>
                </li>
                <li @click="getSexPicker()">
                    <span class="li_left">*</span>性别
                    <div class="li_right">
                        <div>{{sex}}</div>
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
                        <input type="text">
                        <i></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="es6">


    export default {
        data() {
            return {
                sex:null,
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
                birthday:''
            }
        },


        mounted: function () {
            this.lunarDateData=xqzs.dateTime.getLunarData(1949,2017);
            this.solarDateDate= xqzs.dateTime.getSolarData(1949,2017);
        },
        methods: {
            getSexPicker:function () {
                let _this = this;
                weui.picker([{
                    label: '男',
                    value: 0
                }, {
                    label: '女',
                    value: 1
                }], {
                    onChange: function (result) {

                    },
                    onConfirm: function (result) {
                       _this.sex=result[0].label

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
    .join_stepBox .lut.on{float: left;
        background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));
        color: #fff;}

</style>