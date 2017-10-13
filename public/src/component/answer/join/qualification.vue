<template >
    <div style="height: 100%" class="wbg answer_join_quali">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="4"  preUrl="./field" nextUrl="./introduce" title="从业资质" errorWord="请填写正确的证书" :canGoNext="canGoNext"></v-answer-top-step>


        <div class="checks">

            <!--<div class="weui-cells weui-cells_checkbox">-->
                <!--<label class="weui-cell weui-check__label" for="s11">-->
                    <!--<div class="weui-cell__hd">-->
                        <!--<input type="radio" class="weui-check"  value="国家二级咨询师" name="jobTitle" id="s11" @click="jobTitleChange('国家二级咨询师')" />-->
                        <!--<i class="weui-icon-checked"></i>-->
                    <!--</div>-->
                    <!--<div class="weui-cell__bd">-->
                        <!--<p>国家二级咨询师</p>-->
                    <!--</div>-->
                <!--</label>-->
                <!--<label class="weui-cell weui-check__label" for="s12">-->
                    <!--<div class="weui-cell__hd">-->
                        <!--<input type="radio" name="jobTitle"  value="国家三级咨询师" class="weui-check" id="s12" @click="jobTitleChange('国家三级咨询师')" />-->
                        <!--<i class="weui-icon-checked"></i>-->
                    <!--</div>-->
                    <!--<div class="weui-cell__bd">-->
                        <!--<p>国家三级咨询师</p>-->
                    <!--</div>-->
                <!--</label>-->

                <!--<label class="weui-cell weui-check__label" for="s13">-->
                    <!--<div class="weui-cell__hd">-->
                        <!--<input type="radio" name="jobTitle"  value="注册系统咨询师" class="weui-check" id="s13" @click="jobTitleChange('注册系统咨询师')" />-->
                        <!--<i class="weui-icon-checked"></i>-->
                    <!--</div>-->
                    <!--<div class="weui-cell__bd">-->
                        <!--<p>注册系统咨询师</p>-->
                    <!--</div>-->
                <!--</label>-->
                <!--<label class="weui-cell weui-check__label" for="s14">-->
                    <!--<div class="weui-cell__hd">-->
                        <!--<input type="radio" name="jobTitle"  value="注册系统督导师" class="weui-check" id="s14" @click="jobTitleChange('注册系统督导师')" />-->
                        <!--<i class="weui-icon-checked"></i>-->
                    <!--</div>-->
                    <!--<div class="weui-cell__bd">-->
                        <!--<p>注册系统督导师</p>-->
                    <!--</div>-->
                <!--</label>-->
                <!--<label class="weui-cell weui-check__label" for="s15">-->
                    <!--<div class="weui-cell__hd">-->
                        <!--<input type="radio" name="jobTitle" value="其它" class="weui-check" id="s15" @click="jobTitleChange('其它')" />-->
                        <!--<i class="weui-icon-checked"></i>-->
                    <!--</div>-->
                    <!--<div class="weui-cell__bd">-->
                        <!--<p>其它</p>-->
                    <!--</div>-->
                <!--</label>-->

                <!--<div class="clear"></div>-->
            <!--</div>-->
            <div class="level_types">
                <div class="item"  v-for="(item,index) in level" @click="getItemClass(index)"  :index="index" ><div class="level_item "></div><span >{{item.name}}</span></div>
                <div class="clear"></div>
            </div>

        </div>


        <div class="number">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">证书编号 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input style="color:#666" class="weui-input certificateNo" name="certificateNo" :value="certificateNo" @keyup="changeCertificateNo()" pattern="[0-9a-zA-Z]*" placeholder="证件号码"/>
                </div>
            </div>
        </div>

        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">资质证书 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <div class="upload" @click="upload()"><font>上传证书</font></div>
                </div>
            </div>
        </div>
        <div class="photo_img">
            <div class="img">
                <div>
                    <b>+</b>
                </div>
                <p>上传证书头像页面</p>
            </div>
            <div class="img">
                <div>
                    <b>+</b>
                </div>
                <p>上传证书信息页面</p>
                <img :src="certificateFile" >
            </div>
        </div>

    </div>
</template>

<script type="es6">


    import showLoad from '../../include/showLoad.vue';
    import answerTopStep from "./include/top_step.vue";
    export default {
        data() {
            return {
                certificateNo:'',
                showLoad:false,
                canGoNext:false,
                certificateFile:'',
                alioss:null,
                uploadpicinfo:null,
                level:[
                    {name:'国家二级咨询师'},
                    {name:'国家三级咨询师'},
                    {name:'注册系统咨询师'},
                    {name:'注册系统督导师'},
                    {name:'其他'}
                ],
            }
        },


        mounted: function () {
            $('.level_types .item').click(function () {
                $('.level_types .item').find('.level_item').removeClass('checked_item')
                $(this).find('.level_item').addClass('checked_item')
                this.jobTitleTemp = $(this).find('span').html()
            });

            $(".level_types .item").each(function () {
                if( this.jobTitle ==$(this).find("span").html()){
                    $(this).find(".level_item ").addClass("checked_item");
                }
            });
            xqzs.wx.setConfig(this);
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

            let certificateNo= cookie.get("certificateNo")
            console.log(certificateNo)
            if(certificateNo&&certificateNo!=''){
                this.certificateNo= unescape(certificateNo);
            }
            let jobTitle= cookie.get("jobTitle");

            if(jobTitle&&jobTitle!=''){
                console.log(unescape(jobTitle));
                $(".checks input ").each(function (i) {
                    if(unescape(jobTitle)== $(this).val()){
                        $(this).click();
                    }
                })
            }

            let certificateFile= cookie.get("certificateFile")
            if(certificateFile&&certificateFile!=''){
                this.certificateFile= unescape(certificateFile);
            }
            this.check()


        } ,
        components: {
            'v-showLoad': showLoad,
            "v-answer-top-step": answerTopStep
        },
        methods:{
            upload:function () {
                let _this=this;
                xqzs.wx.takePhotos(['camera','album'],1,_this.uploadpicinfo,_this.alioss,function (filecount) {
                    _this.showLoad=true;

                },function (json,ix) {
                    _this.showLoad=false;
                    _this.certificateFile = json.data.path;
                    cookie.set("certificateFile",escape(_this.certificateFile))
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
                cookie.set("jobTitle",escape(v));
                this.check()
            },
//            jobTitleChange:function (v) {
//                console.log(v)
//                cookie.set("jobTitle",escape(v));
//                this.check()
//            },
            check:function () {
                let jobTitle= cookie.get("jobTitle");
                let certificateNo =(cookie.get("certificateNo"));
                let certificateFile =(cookie.get("certificateFile"));

                if(jobTitle&&jobTitle!=''&&certificateNo&&certificateNo!=''&&certificateFile&&certificateFile!=''){
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
            }
            
        }


    }
</script>
<style>
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
    .answer_join_quali .photo_img{display: flex;display: -webkit-flex;padding:0 0.88235rem;justify-content:space-between;padding-top:2rem;}
    .answer_join_quali .photo_img .img{background:#f4f4f7;width:9.71rem;height:6.76471rem;position: relative}
    .answer_join_quali .photo_img .img img{ max-height: 100%; max-width: 100%}
    .img div{width:44px;height:44px;border-radius: 50%;background: #fff;text-align: center;line-height: 40px;position: absolute;top:25%;left:50%;margin-left:-22px;}
    .img div b{color:rgba(253,114,6,1);font-size: 1.6rem}
    .img p{color:#A9A7A7;font-size: 0.70588235rem;text-align: center;position: absolute;width:100%;top:75%;}
    .checks .level_types{padding:0 0.88235rem;padding-top: 4rem}
    .checks .level_types .item{width:36%;float: left;margin:0 7%;margin-bottom: 0.88235rem;position: relative;font-size:0.70588235rem;color:#666}
    .checks .level_types .item span{margin-left: 1.470588235rem;}
    .checks .level_item{margin:0;height:14px;width:14px;position: absolute;border-radius: 50%;border:1px solid #D2D2D2;top:0.07rem;left:0}
    .checks .checked_item{border-color: rgba(253,114,6,1)}
    .checks .checked_item::after{  content: '';  width:10px;  height: 10px;  background: rgba(253,114,6,1);  border-radius: 50%;  position: absolute;  top:50%;  margin-top:-5px;  left: 50%;  margin-left:-5px;  }
    .photo,.number .weui-cell__hd{font-size: 0.8235rem;color:#666}
 </style>