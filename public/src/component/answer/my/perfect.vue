<template id="perfect">
    <div class="perfect_box">
        <ul>
            <li class="perfect_header">
                头像
                <img class="headerImg" src="../../../images/34.jpg" alt="">
                <img class="rightImg" src="../../../images/arrow.png" alt="">
            </li>
        </ul>
        <ul class="perfect_Item">
            <li>
                真实姓名
                <input class="Item_right" type="text" placeholder="张三">
            </li>
            <li>
                昵称
                <div class="Item_right">旋风小子</div>
            </li>
            <li style="border: 0;">
                性别
                <input class="Item_right" type="text" maxlength="1" placeholder="女"/>
            </li>
        </ul>
        <ul class="perfect_Item">
            <li>
                绑定手机号
                <input class="Item_right" type="text" maxlength="11" placeholder="13700*****">
            </li>
            <li>
                身份证号
                <input class="Item_right" type="text" maxlength="18" placeholder="************"/>
            </li>
            <li class="item_active" @click="areaPicker()">
                所在地区
                <div class="Item_right">
                    <span>中国</span>
                    <span v-if="provinceName">{{provinceName}}</span>
                    <span v-if="cityName">{{cityName}}</span>
                    <span v-if="areaName">{{areaName}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {
                provinceName: '',
                cityName: '',
                areaName: '',
            }
        },


        mounted: function () {

        },
        methods:{
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
        }


    }
</script>
<style>
    .perfect_box{
        background: #fff;
    }
    .perfect_header:active{background: #eee}
    .perfect_Item .item_active{margin-left: 0;padding-left: 0.88235rem}
    .item_active:active{background: #eee;}
    .perfect_header{
        height:70px;
        line-height: 70px;
        position: relative;
        padding:0 0.88235rem;
    }
    .perfect_header .headerImg{
        width:49px;
        height:49px;
        border-radius: 5px;
        position: absolute;
        right:2.1rem;
        top:50%;
        margin-top:-24.5px;
    }
    .rightImg{
        position: absolute;
        right:0.88235rem;
        height:11px;
        display: block;
        top:50%;
        margin-top: -6px;
    }
    .perfect_Item{
        border-top: 10px solid #F4F4F7;
    }
    .perfect_Item li{
        height:50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        margin-left: 0.88235rem;
        padding-right: 0.88235rem;
        position: relative;
    }
    .Item_right{
        position: absolute;
        right:0.88235rem;
        top:0;
        outline: none;
        height:100%;
        text-align: right;
        font-size: 14px;
        width: 70%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>