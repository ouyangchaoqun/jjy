<template >
    <div style="height: 100%" class="wbg answer_join_price_box">

        <div v-title>入驻心理咨询师</div>
        <v-showLoad v-if="showLoad"></v-showLoad>
        <v-answer-top-step step="2"  preUrl="./base/info" nextUrl="./field" :canGoNext="canGoNext"title="请拍摄身份证正反面，该信息仅用于心情加油站身份验证" errorWord="请上传身份认证"></v-answer-top-step>
        <div class="identity_tabs">
            <div class="identity_tabs_active">身份证</div>

        </div>
        <div class="identity_content">
            <div class="content_active">
                <div class="content_list1">
                    身份证 <span>*</span><input type="text" class="identityNo" @keyup="changeidentityNo()" pattern="[0-9a-zA-Z]*" >
                </div>
                <div class="content_list2">
                    <img :src="identityFile1?identityFile1:'../../../images/positive.png'" alt="" @click="upload(1)">
                    <img :src="identityFile2?identityFile2:'../../../images/negative.png'" alt="" @click="upload(2)">
                </div>
            </div>

        </div>



    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    import showLoad from '../../include/showLoad.vue';
    export default {
        data() {
            return {
                identityFile1:'',
                identityFile2:'',
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


            let identityFile1= cookie.get("identityFile1")
            if(identityFile1&&identityFile1!=''){
                this.identityFile1= unescape(identityFile1);
            }

            let identityFile2= cookie.get("identityFile2")
            if(identityFile2&&identityFile2!=''){
                this.identityFile2= unescape(identityFile2);
            }
            this.check()

        } ,
        methods:  {
            upload:function (v) {
                let _this=this;
                xqzs.wx.takePhotos(['camera','album'],1,_this.uploadpicinfo,_this.alioss,function (filecount) {
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
            }
        },
        components: {
            'v-showLoad': showLoad,
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .identity_tabs{padding: 1.5294rem 28% 0 28%;display: flex;display: -webkit-flex;}
    .identity_tabs div{width:60px;text-align: center;font-size: 0.70588235rem;height:21px;border:1px solid #D2D2D2;line-height: 21px;border-radius: 11px;margin:0 auto;color:#B0B0B0;}
    .identity_tabs .identity_tabs_active{color:#fff;background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));border-color:rgba(253,114,6,1) }
    .content_list1{height:2.35294rem;line-height: 2.35294rem;color:#666;padding:0.88235rem 0.88235rem 1.5294rem 0.8235rem;font-size: 0.8235rem;}
    .content_list1 span{color:red;}
    .content_list1 input{width:16rem;height:2.35294rem;background:#f4f4f7;border-radius:0.294rem;float: right}
    .content_list2{padding:0 0.88235rem;}
    .content_list2 img{display:block;width:9.4rem;float: left}
    .content_list2 img:nth-of-type(2){float: right}
    .identity_content>div{display: none}
    .identity_content .content_active{display: block}
</style>