<template >
    <div style="height: 100%" class="wbg answer_join_quali">
        <v-showLoad v-if="showLoad"></v-showLoad>
        <div v-title>入驻心理咨询师</div>
        <v-answer-top-step step="3"  preUrl="./field" nextUrl="./introduce" title="从业资质" errorWord="请填写正确的证书" :canGoNext="canGoNext"></v-answer-top-step>


        <div class="checks">

            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="s11">
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check"  value="国家二级咨询师" name="jobTitle" id="s11" @click="jobTitleChange('国家二级咨询师')" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>国家二级咨询师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s12">
                    <div class="weui-cell__hd">
                        <input type="radio" name="jobTitle"  value="国家三级咨询师" class="weui-check" id="s12" @click="jobTitleChange('国家三级咨询师')" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>国家三级咨询师</p>
                    </div>
                </label>

                <label class="weui-cell weui-check__label" for="s13">
                    <div class="weui-cell__hd">
                        <input type="radio" name="jobTitle"  value="注册系统咨询师" class="weui-check" id="s13" @click="jobTitleChange('注册系统咨询师')" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>注册系统咨询师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s14">
                    <div class="weui-cell__hd">
                        <input type="radio" name="jobTitle"  value="注册系统督导师" class="weui-check" id="s14" @click="jobTitleChange('注册系统督导师')" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>注册系统督导师</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s15">
                    <div class="weui-cell__hd">
                        <input type="radio" name="jobTitle" value="其它" class="weui-check" id="s15" @click="jobTitleChange('其它')" />
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>其它</p>
                    </div>
                </label>

                <div class="clear"></div>
            </div>


        </div>


        <div class="number">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">证书编号 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input certificateNo" name="certificateNo" :value="certificateNo" @keyup="changeCertificateNo()" pattern="[0-9a-zA-Z]*" placeholder="证件号码"/>
                </div>
            </div>
        </div>

        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">资质证书 <span>*</span></label></div>
                <div class="weui-cell__bd">
                    <div class="upload" @click="upload()"><span>+</span><font>上传证书</font></div>
                </div>
            </div>
        </div>
        <div class="photo">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label"></label> </div>
                <div class="weui-cell__bd">
                    <div class="img"><img :src="certificateFile" > </div>
                </div>
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
            }
        },


        mounted: function () {
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
            jobTitleChange:function (v) {
                console.log(v)
                cookie.set("jobTitle",escape(v));
                this.check()
            },
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
    .answer_join_quali .weui-cell__bd img{ width: 80%}

 </style>