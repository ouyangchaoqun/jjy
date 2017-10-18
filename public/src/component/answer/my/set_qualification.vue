<template >
    <div class="setQualification_box">
        <header>
            <div class="header_top">
                一句话签名
                <template v-if="signStatus==null||(signStatus&&signStatus==1)" >
                    <div class="header-right" v-if="!tempData['signchange']">修改</div>
                    <div class="header-right addStyle" @click="sub_val('sign')" v-if="tempData['signchange']">保存</div>
                </template>
                <template v-if="signStatus!=null&&signStatus==2" >
                    <div class="header-right" v-if="!tempData['signchange']">审核失败，重新修改</div>
                    <div class="header-right addStyle" @click="sub_val('sign')" v-if="tempData['signchange']">保存</div>
                </template>
                <template v-if="signStatus!=null&&signStatus==0" >
                    <div class="header-right" >审核中</div>
                </template>

            </div>
            <div class="textarea_box">
                <textarea placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" maxlength="25" v-model="sign" @input="revise_val('sign')"></textarea>
            </div>
        </header>
        <div class="goodat">
            <div class="header_top">
                擅长领域
                <div class="header-right" v-if="!selectFlag" @click="selectType()">修改</div>
                <div class="header-right addStyle" v-if="selectFlag" @click="sub_selectType()">保存</div>
            </div>
            <div class="goodat_class">
                <div v-for="i in domains">{{i.title}}</div>

            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                从业资质

                <template v-if="cerApplying">
                    <div class="header-right" >审核中</div>
                </template>

                <template v-if="!cerApplying">
                    <div class="header-right" @click="levle_type()">修改</div>
                </template>




            </div>
            <div class="level_box">
                <div class="level">{{jobTitle}}</div>
                <img class="cerpic" :src="certificateFile" />
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                自我介绍


                <template v-if="introductionStatus!=null&&introductionStatus==0" >
                    <div class="header-right" >审核中</div>
                </template>
                <template v-if="introductionStatus!=null&&introductionStatus==2" >
                    <div class="header-right" v-if="!tempData['introductionchange']">审核失败，重新修改</div>
                    <div class="header-right addStyle" @click="sub_val('introduction')" v-if="tempData['introductionchange']">保存</div>
                </template>

                <template v-if="introductionStatus==null||(introductionStatus&&introductionStatus==1)" >
                    <div class="header-right" v-if="!tempData['introductionchange']">修改</div>
                    <div class="header-right addStyle" @click="sub_val('introduction')" v-if="tempData['introductionchange']">保存</div>
                </template>

            </div>
            <div class="textarea_box">
                <textarea placeholder="自我介绍" v-model="introduction" @input="revise_val('introduction')"></textarea>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                专业培训经历

                <template v-if="experienceStatus!=null&&experienceStatus==0" >
                    <div class="header-right" >审核中</div>
                </template>
                <template v-if="experienceStatus!=null&&experienceStatus==2" >
                    <div class="header-right" v-if="!tempData['experiencechange']">审核失败，重新修改</div>
                    <div class="header-right addStyle" @click="sub_val('experience')" v-if="tempData['experiencechange']">保存</div>
                </template>

                <template v-if="experienceStatus==null||(experienceStatus&&experienceStatus==1)" >
                    <div class="header-right" v-if="!tempData['experiencechange']">修改</div>
                    <div class="header-right addStyle" @click="sub_val('experience')" v-if="tempData['experiencechange']">保存</div>
                </template>


            </div>
            <div class="textarea_box">
                <textarea  placeholder="1.武汉大学心理咨询培训师
2.丁健略婚恋咨询设计路径
3.中级绘画治疗师" v-model="experience" @input="revise_val('experience')"></textarea>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                擅长领域问题
                <template v-if="goodatStatus!=null&&goodatStatus==0" >
                    <div class="header-right" >审核中</div>
                </template>
                <template v-if="goodatStatus!=null&&goodatStatus==2" >
                    <div class="header-right" v-if="!tempData['goodatchange']">审核失败，重新修改</div>
                    <div class="header-right addStyle" @click="sub_val('goodat')" v-if="tempData['goodatchange']">保存</div>
                </template>

                <template v-if="goodatStatus==null||(goodatStatus&&goodatStatus==1)" >
                    <div class="header-right" v-if="!tempData['goodatchange']">修改</div>
                    <div class="header-right addStyle" @click="sub_val('goodat')" v-if="tempData['goodatchange']">保存</div>
                </template>


            </div>
            <div class="textarea_box">
                <textarea  placeholder="1.家庭关系：婚姻挽救、情感修复、外遇分离、 家暴危机、婆媳关系、复婚帮助、离婚纠纷
2.恋爱关系：失恋帮助、性格不和、沟通障" v-model="goodat" @input="revise_val('goodat')"></textarea>
            </div>
        </div>
        <div id="select_type" style="display: none">
            <div class="dialog_select_type">
                <div class="title" style="padding-top: 1.176471rem;padding-bottom: 0.88235rem">选择问题类型</div>
                <div class="title_bottom">（最多选择三个）</div>
                <div class="types">
                    <div class="item" v-for="(item,index) in types" :index="index"><span>{{item.title}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="yes">
                    <div class="cancel">取消</div>
                    <div  class="y">确定</div>
                </div>
            </div>
        </div>
        <div id="levle_type" style="display: none;">
            <div class="dialog_select_type">
                <div class="title" style="padding-top: 1.294rem;padding-bottom: 1.41176471rem">从业资质</div>
                <div class="level_types">
                    <div class="item"  v-for="(item,index) in level"   :index="index" ><div class="level_item "></div><span >{{item.name}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="levle_type_bottom">
                    <div>证书编号<span style="color: #FF0000">*</span><div class="input_box"><input type="text"    :placeholder="certificateNo" :value="certificateNo" class="certificateNo"  ></div></div>
                    <div>资质证书<span style="color: #FF0000">*</span><div class="input_box uploadFile">上传证书</div></div>
                </div>
                <div class="yes certbox">
                    <div class="cancel">取消</div>
                    <div class="y">确定</div>
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
                showLoad:false,
                types:[],
                typeSelectIndex:null,
                level:[
                    {name:'国家二级咨询师'},
                    {name:'国家三级咨询师'},
                    {name:'注册系统咨询师'},
                    {name:'注册系统督导师'},
                    {name:'其他'}
                    ],
                sign:'',
                tempData:{},
                experience:'',
                introduction:'',
                goodat:'',
                certificateNo:'',
                certificateFile:'',
                titles:[],
                change:false,
                questionId:{},
                selectFlag:false,
                jobTitle:'',
                jobTitleTemp:'',
                signStatus:null,
                experienceStatus:null,
                introductionStatus:null,
                goodatStatus:null,
                jobTitleStatus:null,
                certificateNoStatus:null,
                certificateFileStatus:null,
                cerApplying:false,
                alioss:null,
                uploadpicinfo:null,
                certificateFileTemp:''

            }
        },
        methods:{
            selectType: function () {
                let _this=this;
                xqzs.weui.dialogCustom($("#select_type").html());
                $('.js_dialog').find(".types .item").each(function (ix) {
                    if(_this.types[ix].isSelect){
                        $(this).addClass('on')
                    }
                })
                $(".types .item").click(function () {
                    let count=0;
                    let index= parseInt($(this).attr("index"));
                    _this.typeSelectIndex=index;
                    if(_this.types[index].isSelect){
                        _this.types[index].isSelect=false;
                        $(this).removeClass('on')

                    }else{
                        let questionClassId = []
                        for(let i=0;i<_this.types.length;i++){
                            if(_this.types[i].isSelect){
                                questionClassId.push(_this.types[i].id)
                                count++
                            }
                        }
                        if( count>=3){
                            xqzs.weui.tip("最多选择三项",function () {
                                
                            });
                        }else{
                            $(this).addClass('on')
                            _this.types[index].isSelect=true
                            _this.titles = []

                            questionClassId.push(_this.types[index].id)
                            _this.questionId = questionClassId;
                        }
                   }

                });
                $(".dialog_select_type .yes .y").click(function () {
                    if(_this.typeSelectIndex==null){
                        xqzs.weui.tip("请选择类型");
                    }else{
                        xqzs.weui.tipClose();
                        _this.selectFlag = true;
                        _this.domains=[];
                        for(let i=0;i<_this.types.length;i++){
                            if(_this.types[i].isSelect==true){
                                _this.domains.push(_this.types[i]);
                            }
                        }
                        xqzs.weui.dialogClose();
                    }
                })
                $(".dialog_select_type .yes .cancel").click(function () {
                    xqzs.weui.tipClose();
                    _this.selectFlag = false;
                    xqzs.weui.dialogClose();

                })
            },
            levle_type:function () {
                let _this=this;
                xqzs.weui.dialogCustom($("#levle_type").html());

                $('.level_types .item').click(function () {
                    $('.level_types .item').find('.level_item').removeClass('checked_item')
                    $(this).find('.level_item').addClass('checked_item')
                    _this.jobTitleTemp = $(this).find('span').html()
                });
                
                $(".level_types .item").each(function () {
                   if( _this.jobTitle ==$(this).find("span").html()){
                       $(this).find(".level_item ").addClass("checked_item");
                   }
                });

                $(".uploadFile").click(function () {

                    xqzs.wx.takePhotos(['camera','album'],1,_this.uploadpicinfo,_this.alioss,function (filecount) {
                        _this.showLoad=true;

                    },function (json,ix) {
                        _this.showLoad=false;
                        _this.certificateFileTemp = json.data.path
                        console.log(json.data)
                    },function (e) {
                        console.info(e);
                    })
                });

                $(".certbox .y").click(function () {
                    console.log($(".certificateNo").val())
                    if( _this.jobTitleTemp==''){
                        xqzs.weui.tip("请选择等级");
                        return ;
                    }else if($(".certificateNo").val()==''){
                        xqzs.weui.tip("请输入证件号码");
                        return;
                    } else if(_this.certificateFileTemp==''){
                        xqzs.weui.tip("请上传证件");
                        return;
                    }
                    let expertId=cookie.get("expertId")
                    let msg = {
                        expertId:expertId,
                        userId:"_userId_",
                        jobTitle:_this.jobTitleTemp,
                        certificateNo:_this.certificateNo,
                        certificateFile:_this.certificateFileTemp
                    };
                    xqzs.weui.tipClose();
                    _this.$http.post(web.API_PATH + 'come/expert/modify/certificate', msg)
                        .then(
                            (response) => {
                                _this.jobTitle= _this.jobTitleTemp;
                                _this.certificateFile= _this.certificateFileTemp;
                                _this.cerApplying=true;
                                xqzs.weui.dialogClose();

                            });
                });
                $(".certbox .cancel").click(function () {
                    xqzs.weui.tipClose();
                    xqzs.weui.dialogClose();
                })
            },
            revise_val:function (key) {//修改
                let _this = this;
                _this.isChangeValue(key);
                console.log(_this[key]);
            },
            sub_val:function (key) {//提交
                let _this = this;
                let expertId = cookie.get('expertId');
                let msg = {
                    expertId:expertId,
                    userId:"_userId_",
                }
                msg[key] = _this[key];

                _this.$http.post(web.API_PATH + 'come/expert/modify', msg)
                    .then(
                        (response) => {
                            _this[key+"Status"]=0
                        });
            },
            initTempData:function (keyArray,res) {
                for (var i =0,l=keyArray.length;i<l;i++) {
                    this.tempData[keyArray[i]] = res[keyArray[i]];
                    this.tempData[keyArray[i]+'change'] = false;
                }
            },
            isChangeValue:function(key){
                var isChange = this.tempData[key]!=this[key];
                this.tempData[key+'change']=isChange;
                return isChange;
            },
            sub_selectType:function () { //擅长领域修改提交
                let _this = this;
                let expertId = cookie.get('expertId');
                let msg = {
                    expertId:expertId,
                    userId:1289,
                    questionClassId:_this.questionId
                };
                _this.$http.post(web.API_PATH + 'come/expert/modify/domain', msg)
                    .then(
                        (response) => {
                            _this.selectFlag=false
                        });
            }
        },

        components: {
            'v-showLoad': showLoad,
         },
        mounted: function () {

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

            let expertId = cookie.get('expertId');
            let _this =this;
            xqzs.wx.setConfig(_this);
            this.$http.get(web.API_PATH+'come/expert/query/detail/for/edit/'+expertId+"/_userId_").then(response => {
                var res  = response.data.data
                console.log(res);
                _this.sign = res.sign;
                _this.titles = res.domains;
                _this.domains=res.domains;
                _this.experience = res.experience;
                _this.introduction = res.introduction;
                _this.goodat = res.goodat;
                _this.certificateFile =res.certificateFile;
                _this.certificateNo =res.certificateNo;
                _this.jobTitle = res.jobTitle;
                if(res.signStatus!=undefined) _this.signStatus = res.signStatus;
                if(res.experienceStatus!=undefined) _this.experienceStatus = res.experienceStatus;
                if(res.introductionStatus!=undefined) _this.introductionStatus = res.introductionStatus;
                if(res.goodatStatus!=undefined)_this.goodatStatus = res.goodatStatus;
                if(res.certificateNoStatus!=undefined)_this.certificateNoStatus = res.certificateNoStatus;
                if(res.jobTitleStatus!=undefined)_this.jobTitleStatus = res.jobTitleStatus;
                if(res.certificateFileStatus!=undefined)_this.certificateFileStatus = res.certificateFileStatus;




                if(res.certificateNoStatus===0||res.jobTitleStatus===0||res.certificateFileStatus===0){
                    _this.cerApplying=true;
                }



                this.initTempData(['sign','experience','introduction','goodat'],res);

            }, response => {
                // error

            });
            this.$http.get(web.API_PATH+'come/listen/question/class/list').then(response => {
                console.log(response)
                this.types = response.data.data
            },response =>{
                // error
            })
        },
        updated:function () {

        }
    }
</script>
<style>
    .goodat:nth-child(6){
        margin-bottom: 1.76471rem;
    }
    .cancel{ color:#666}
    .setQualification_box{  background: #fff;  color: #666;  font-size: 0.8235rem;   }
    .setQualification_box header{  padding:1.176471rem 0.88235rem 0.88235rem 0.88235rem;  border-bottom: 0.588235rem solid #F4F4F7;  }
    .header_top{ position: relative;margin-bottom: 0.35294117rem;font-size: 0.88235rem;  color: #474747;}
    .setQualification_box .header-right{  position: absolute;  top:0px;  right:0;  padding:0.2941176471rem 0.588235rem;  border-radius: 0.6176471rem;  line-height: 1;  color: #fff;  font-size: 0.70588235rem;  background: linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1));}
    .setQualification_box .header_top .addStyle{  background: none;  color: rgba(253,114,6,1);  }
    .setQualification_box .textarea_box{  height:2.0588235rem;  border:1.5px solid #EAE7E7; line-height: 1.176471rem;  color: #666;  font-size: 0.8235rem;  padding:0.588235rem;  border-radius: 0.29411rem;  }
    .textarea_box textarea{  width:100%;  height:100%;  border:0;  outline: none;  resize: none;  background: none;  color: #666;  }
    .setQualification_box .goodat{  padding:0.88235rem;  border-bottom: 0.588235rem solid #F4F4F7; }
    .goodat .header_top{margin-bottom: 0.88235rem;}
    .goodat_class{display: -webkit-box;display: -webkit-flex;display: flex;}
    .goodat_class div{flex: 1;text-align: center;line-height:1.941176471rem;border-radius: 1rem;border:1px solid #999;margin-right:0.88235rem;}
    .goodat_class div:nth-of-type(3){margin:0;}
    .goodat .level{height:1.5294rem;line-height:1.5294rem;font-size:0.70588235rem;border:1px solid #999;border-radius: 1rem;text-align: center;padding:0 0.294rem;display: inline-block}
    .level_box{padding-top:0.35294rem;position: relative;padding-bottom:1.29411rem;}
    .cerpic{width:5.88235rem;height:4.1176471rem;position: absolute;left:45%;top:-1.176471rem;}
    .goodat .textarea_box{min-height:5.88235rem;}
    .dialog_select_type{ background: #fff; border-radius: 0.588235rem; width: 80%; height:19rem; position: fixed; top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;}
    .dialog_select_type .title{line-height: 1; text-align: center;font-size: 1.058823529411765rem;  font-weight: bold;}
    .dialog_select_type .types{ margin: 0.9rem;}
    .dialog_select_type .types .item{ width: 27%; float:left;text-align: center; border: 1px solid #9E9E9E ; line-height: 1.411764705882353rem; border-radius:0.7058823529411765rem; margin: 0 2%; margin-bottom: 1.8rem; font-size: 0.7058823529411765rem;color:#999; padding: 0 0.5%; }
    .dialog_select_type .types .item.on{  border: 1px solid rgba(253,114,6,1); color:rgba(253,114,6,1)}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:rgba(253,114,6,1); text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% ;font-size: 1.0588235rem;display: flex}
    .dialog_select_type  .yes div{flex:1;text-align: center;position: relative}
    .dialog_select_type  .yes div:nth-of-type(1)::after{content: '';height:100%;width:1px;background:#eee;position: absolute;right:0;top:0}
    .dialog_select_type .level_types .item{width:46%;float: left;margin:0 2%;margin-bottom: 0.88235rem;position: relative;font-size:0.70588235rem;color:#666}
    .dialog_select_type .level_types{padding:0 0.88235rem;}
    .dialog_select_type .level_types .item span{margin-left: 1.470588235rem;}
    .dialog_select_type .level_item{height:14px;width:14px;position: absolute;border-radius: 50%;border:1px solid #D2D2D2;top:1.2px;left:0}
    .dialog_select_type .checked_item{border-color: rgba(253,114,6,1)}
    .dialog_select_type .checked_item::after{  content: '';  width:10px;  height: 10px;  background: rgba(253,114,6,1);  border-radius: 50%;  position: absolute;  top:50%;  margin-top:-5px;  left: 50%;  margin-left:-5px;  }
    .dialog_select_type .levle_type_bottom{  padding:0.8235rem 0.88235rem;font-size: 0.70588235rem;  color: #666;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(1){  margin-bottom: 1rem;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(2) .input_box{  line-height: 1.8235294rem;  color: #A9A7A7;  font-size: 0.70588235rem;  text-align: center;  }
    .dialog_select_type .levle_type_bottom input{width:100%;height:100%;background: none;}
    .dialog_select_type .levle_type_bottom .input_box{display:inline-block;width:10.88235rem;height:1.8235294rem;padding-left:0.588235rem;background:#F4F4F7;border-radius: 0.2941176471rem;margin-left:0.470588235rem;}
    .title_bottom{color:#999;font-size: 0.70588235rem;text-align: center;margin-bottom:0.335rem}
</style>