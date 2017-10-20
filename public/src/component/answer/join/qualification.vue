<template >
    <div style="height: 100%" class="wbg answer_join_quali">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div v-title>入驻心理咨询师</div>
        <div class="stepStyle">4/10</div>
        <div class="joinStep_title">从业资质</div>
        <div class="sub_title">（如果没有资质证书请选择其它）</div>
        <div>
        <div class="checks">
            <div class="level_types">
                <div class="item"  v-for="(item,index) in level" @click="getItemClass(index)"  :index="index" ><div class="level_item " :class="{checked_item:item.name==jobTitle}"></div><span >{{item.name}}</span></div>
                <div class="clear"></div>
            </div>

        </div>

            <div v-if="!otherType">
                <div class="number">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">证书编号 <span>*</span></label></div>
                        <div class="weui-cell__bd">
                            <input style="color:#666;font-size: 0.8235rem" class="weui-input certificateNo"
                                   name="certificateNo" :value="certificateNo" @keyup="changeCertificateNo()"
                                   pattern="[0-9a-zA-Z]*" placeholder="输入编号"/>
                        </div>
                    </div>
                </div>

                <div class="photo">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">资质证书 <span>*</span></label></div>
                        <!--<div class="weui-cell__bd">-->
                        <!--<div class="upload" @click="upload()"><font>上传证书</font></div>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="photo_img">
                    <div class="img" @click="upload(1)">
                        <div>
                            <b>+</b>
                        </div>
                        <p>上传证书头像页面</p>
                        <img v-if="certificateFile1!=''" :src="certificateFile1" />
                    </div>
                    <div class="img" @click="upload(2)">
                        <div>
                            <b>+</b>
                        </div>
                        <p>上传证书信息页面</p>
                        <img  v-if="certificateFile2!=''" :src="certificateFile2" />
                    </div>
                </div>
            </div>
        </div>
        <v-answer-top-step step="4"  preUrl="./field" nextUrl="./introduce" title="从业资质" errorWord="请填写正确的证书" :canGoNext="canGoNext"></v-answer-top-step>

    </div>
</template>

<script type="es6">


    import showLoad from '../../include/showLoad.vue';
    import answerTopStep from "./include/top_step.vue";
    export default {
        data() {
            return {
                otherType:false,
                certificateNo:'',
                showLoad:false,
                canGoNext:false,
                certificateFile1:'',
                certificateFile2:'',
                alioss:null,
                uploadpicinfo:null,
                level:[
                    {name:'国家二级咨询师'},
                    {name:'国家三级咨询师'},
                    {name:'注册系统咨询师'},
                    {name:'注册系统督导师'},
                    {name:'其它'}
                ],
                jobTitle:''
            }
        },


        mounted: function () {


            xqzs.wx.setConfig(this);
            this.initOss();

            let certificateNo= cookie.get("certificateNo")
            console.log(certificateNo)
            if(certificateNo&&certificateNo!=''){
                this.certificateNo= unescape(certificateNo);
            }
            let jobTitle= cookie.get("jobTitle");
            if(jobTitle&&jobTitle!=''){
                this.jobTitle=unescape(jobTitle);
            }

            let certificateFile1= cookie.get("certificateFile1");
            if(certificateFile1&&certificateFile1!=''){
                this.certificateFile1= unescape(certificateFile1);
            }
            let certificateFile2= cookie.get("certificateFile2");
            if(certificateFile2&&certificateFile2!=''){
                this.certificateFile2= unescape(certificateFile2);
            }
            this.check()


        } ,
        components: {
            'v-showLoad': showLoad,
            "v-answer-top-step": answerTopStep
        },
        methods:{
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
            upload:function (v) {
                let _this=this;
                xqzs.wx.takePhotos(['camera','album'],1,_this.uploadpicinfo,_this.alioss,function (filecount) {
                    _this.showLoad=true;

                },function (json,ix) {
                    _this.showLoad=false;


                    if(v===1){
                        _this.certificateFile1 = json.data.path;
                        cookie.set("certificateFile1",escape(_this.certificateFile1))
                    }else{
                        _this.certificateFile2 = json.data.path;
                        cookie.set("certificateFile2",escape(_this.certificateFile2))
                    }

                    this.check()

                    console.log(json.data)
                },function (e) {
                    console.info(e);
                })
            },
            changeCertificateNo:function (v) {
                let certificateNo = $(".certificateNo").val();

                if(certificateNo!=''){
                    cookie.set("certificateNo",escape(certificateNo))
                }else{
                    cookie.set("certificateNo",'')
                }

                this.check()
            },
            getItemClass:function (index) {
                let _this = this;
                let v = _this.level[index].name
                console.log(index)
                console.log(v)
                this.jobTitle=v;
                cookie.set("jobTitle",escape(v));
                if(v=='其它'){
                    _this.otherType=true;
                    _this.canGoNext = true
                }else {
                    _this.otherType=false;
                    this.check()
                }


            },
            check:function () {
                let jobTitle= cookie.get("jobTitle");
                let certificateNo =(cookie.get("certificateNo"));
                let certificateFile1 =(cookie.get("certificateFile1"));
                let certificateFile2 =(cookie.get("certificateFile2"));

                if(jobTitle&&jobTitle!=''&&certificateNo&&certificateNo!=''&&certificateFile1&&certificateFile1!=''&&certificateFile2&&certificateFile2!=''){
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
            }
            
        }


    }
</script>
<style>
    .answer_join_quali .answer_join_top_box{position: static;margin-bottom: 1.471rem;padding-top: 3rem;}
    .answer_join_quali .sub_title{font-size: 0.70588235rem; color:#999;line-height: 1; text-align: center;}
    .answer_join_quali  .weui-cells:after, .weui-cells:before,.answer_join_quali  .weui-cell:before{ display: none}
    .answer_join_quali  .weui-check__label{ width: 42%; float:left; font-size: 0.823rem !important}

    .answer_join_quali  .weui-label span{ color:red;}
    .answer_join_quali .number{ margin-top: 0.8rem;}
    .answer_join_quali .number,.answer_join_quali .photo{ margin-left: 0.4rem;}
    .answer_join_quali .number input[type='number'], .upload{ background: #F4F4F7;  height: 2.352941176470588rem;line-height: 2.352941176470588rem; padding:0 0.6rem;font-size: 0.88235rem; border-radius: 0.3rem; width: 80%}
    .answer_join_quali  .upload { text-align: center; color:#A9A7A7}
    .answer_join_quali .upload span{ color:#09bb07; font-size: 1.4rem;line-height: 2.352941176470588rem; vertical-align: bottom
    }

    .weui-check__label:active{ background: none}
    .answer_join_quali .photo_img{display: flex;display: -webkit-flex;padding:0 0.88235rem;justify-content:space-between;padding-top:0.588235rem;}
    .answer_join_quali .photo_img .img{background:#f4f4f7;width:9.71rem;height:6.76471rem;position: relative}
    .answer_join_quali .photo_img .img img{ max-height: 100%; max-width: 100%}
    .img div{width:44px;height:44px;border-radius: 50%;background: #fff;text-align: center;line-height: 40px;position: absolute;top:25%;left:50%;margin-left:-22px;}
    .img div b{color:rgba(253,114,6,1);font-size: 1.6rem}
    .img p{color:#A9A7A7;font-size: 0.70588235rem;text-align: center;position: absolute;width:100%;top:75%;}
    .checks .level_types{padding:0 0.88235rem;padding-top: 4rem}
    .checks .level_types .item{width:38%;float: left;margin:0 6%;margin-bottom: 0.88235rem;position: relative;font-size:0.8235rem;color:#666}
    .checks .level_types .item span{margin-left: 1.470588235rem;}
    .checks .level_item{margin:0;height:14px;width:14px;position: absolute;border-radius: 50%;border:1px solid #D2D2D2;top:0.16rem;left:0}
    .checks .checked_item{border-color: rgba(253,114,6,1)}
    .checks .checked_item::after{  content: '';  width:10px;  height: 10px;  background: rgba(253,114,6,1);  border-radius: 50%;  position: absolute;  top:50%;  margin-top:-5px;  left: 50%;  margin-left:-5px;  }
    .photo,.number .weui-cell__hd{font-size: 0.8235rem;color:#666}
 </style>