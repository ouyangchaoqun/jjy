<template >
    <div class="setQualification_box">
        <header>
            <div class="header_top">
                一句话签名
                <div class="header-right" v-if="false">审核中</div>
                <div class="header-right addStyle">修改</div>
            </div>
            <div class="textarea_box">
                <textarea disabled placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" maxlength="25"></textarea>
                <textarea v-if="false" placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" maxlength="25"></textarea>
            </div>
        </header>
        <div class="goodat">
            <div class="header_top">
                擅长领域
                <div class="header-right" v-if="false">审核中</div>
                <div class="header-right addStyle" @click="selectType()">修改</div>
            </div>
            <div class="goodat_class">
                <div v-for="item in types" v-if="item.isSelect"><span>{{item.name}}</span></div>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                从业资质
                <div class="header-right" v-if="false">审核中</div>
                <div class="header-right addStyle" @click="levle_type()">修改</div>
            </div>
            <div class="level_box">
                <div class="level">国家三级咨询师</div>
                <div class="cerpic"></div>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                自我介绍
                <div class="header-right">审核中</div>
                <div class="header-right addStyle" v-if="false">修改</div>
            </div>
            <div class="textarea_box">
                <textarea disabled placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" ></textarea>
                <textarea v-if="false" placeholder="星洲易渡，心河难逾，与你共觅心河之舟。"></textarea>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                专业培训经历
                <div class="header-right">审核中</div>
                <div class="header-right addStyle" v-if="false">修改</div>
            </div>
            <div class="textarea_box">
                <textarea v-if="false" disabled placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" >
                </textarea>
                <textarea  placeholder="1.武汉大学心理咨询培训师 2.丁健略婚恋咨询设计路径 3.中级绘画治疗师"></textarea>
            </div>
        </div>
        <div class="goodat">
            <div class="header_top">
                擅长领域问题
                <div class="header-right">审核中</div>
                <div class="header-right addStyle" v-if="false">修改</div>
            </div>
            <div class="textarea_box">
                <textarea v-if="false" disabled placeholder="星洲易渡，心河难逾，与你共觅心河之舟。" >
                </textarea>
                <textarea  placeholder="1.家庭关系：婚姻挽救、情感修复、外遇分离、 家暴危机、婆媳关系、复婚帮助、离婚纠纷 2.恋爱关系：失恋帮助、性格不和、沟通障"></textarea>
            </div>
        </div>
        <div id="select_type" style="display: none">
            <div class="dialog_select_type">
                <div class="title">选择问题类型</div>
                <div class="types">
                    <div class="item" v-for="(item,index) in types" :index="index"><span>{{item.name}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="yes">
                    <div>取消</div>
                    <div>确定</div>
                </div>
            </div>
        </div>
        <div id="levle_type" style="display: none;">
            <div class="dialog_select_type">
                <div class="title">从业资质</div>
                <div class="level_types">
                    <div class="item"  v-for="(item,index) in level"   :index="index" ><div class="level_item "></div><span >{{item.name}}</span></div>
                    <div class="clear"></div>
                </div>
                <div class="levle_type_bottom">
                    <div>证书编号<span style="color: #FF0000">*</span><div class="input_box"><input type="text" /></div></div>
                    <div>资质证书<span style="color: #FF0000">*</span><div class="input_box">上传证书</div></div>
                </div>
                <div class="yes">
                    <div>取消</div>
                    <div>确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        data() {
            return {
                types:[
                    {name:"情感困惑",isSelect:false},
                    {name:"性心理",isSelect:false},
                    {name:"人际关系",isSelect:false},
                    {name:"职场事业",isSelect:false},
                    {name:"婚姻家庭",isSelect:false},
                    {name:"个人成长",isSelect:false},
                    {name:"心理健康",isSelect:false},
                    {name:"亲子教育",isSelect:false},
                    {name:"情感困惑",isSelect:false},
                ],
                typeSelectIndex:null,
                type:[],
                level:[
                    {name:'国家二级咨询师'},
                    {name:'国家三级咨询师'},
                    {name:'注册系统咨询师'},
                    {name:'注册系统督导师'},
                    {name:'其他'}
                    ]
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
                    _this.type = [];
                    _this.typeSelectIndex=index;
                    if(_this.types[index].isSelect){
                        _this.types[index].isSelect=false;
                        $(this).removeClass('on')
                        _this.type.push(_this.types[index].name)

                    }else{
                        for(let i=0;i<_this.types.length;i++){
                            if(_this.types[i].isSelect){
                                count++
                            }
                        }
                        if( count>=3){
                            xqzs.weui.tip("最多选择三项",function () {
                                
                            });
                        }else{
                            $(this).addClass('on')
                            _this.types[index].isSelect=true
                            _this.type.push(_this.types[index].name)
                        }
                   }

                });
                $(".dialog_select_type .yes").click(function () {
                    if(_this.typeSelectIndex==null){
                        xqzs.weui.tip("请选择类型");
                    }else{
                        xqzs.weui.dialogClose();
                        console.log(_this.type)
                    }
                })
            },
            levle_type:function () {
                let _this=this;
                xqzs.weui.dialogCustom($("#levle_type").html());
                $('.level_types .item').click(function () {
                    $('.level_types .item').find('.level_item').removeClass('checked_item')
                    $(this).find('.level_item').addClass('checked_item')
                })
            },
        },


        mounted: function () {

        }
    }
</script>
<style>
    .setQualification_box{  background: #fff;  color: #666;  font-size: 0.8235rem;  padding-bottom: 30px;  }
    .setQualification_box header{  padding:20px 15px 15px 15px;  border-bottom: 10px solid #F4F4F7;  }
    .header_top{ position: relative;margin-bottom: 6px;font-size: 15px;  color: #333;}
    .setQualification_box .header-right{  position: absolute;  top:0px;  right:0;  padding:5px 10px;  border-radius: 10.5px;  line-height: 1;  color: #fff;  font-size: 12px;  background: #00BB05;  border:1px solid #00BB05;  }
    .setQualification_box .header_top .addStyle{  background: none;  color: #00BB05;  }
    .setQualification_box .textarea_box{  height:35px;  border:1.5px solid #EAE7E7; line-height: 20px;  color: #666;  font-size: 14px;  padding:10px;  border-radius: 5px;  }
    .textarea_box textarea{  width:100%;  height:100%;  border:0;  outline: none;  resize: none;  background: none;  color: #666;  }
    .setQualification_box .goodat{  padding:15px;  border-bottom: 10px solid #F4F4F7; }
    .goodat .header_top{margin-bottom: 15px;}
    .goodat_class{display: -webkit-box;display: -webkit-flex;display: flex;}
    .goodat_class div{flex: 1;text-align: center;line-height: 1;line-height:35px;}
    .goodat_class div span{border:1px solid #999;padding:0.35294rem 1.4117647rem;border-radius: 1rem}
    .goodat .level{width:104px;height:26px;line-height:26px;font-size:12px;border:1px solid #999;border-radius: 14px;text-align: center}
    .level_box{padding-top:6px;position: relative;padding-bottom:22px;}
    .cerpic{width:100px;height:70px;background: pink;position: absolute;left:137px;top:-20px;}
    .goodat .textarea_box{min-height:100px;}
    .dialog_select_type{ background: #fff; border-radius: 10px; width: 80%; height:19rem; position: fixed; top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;}
    .dialog_select_type .title{ text-align: center; line-height: 3rem; font-size: 1.058823529411765rem;  font-weight: bold;}
    .dialog_select_type .types{ margin: 0.9rem;}
    .dialog_select_type .types .item{ width: 27%; float:left;text-align: center; border: 1px solid #9E9E9E ; line-height: 1.411764705882353rem; border-radius:0.7058823529411765rem; margin: 0 2%; margin-bottom: 1.8rem; font-size: 0.7058823529411765rem;color:#999; padding: 0 0.5%; }
    .dialog_select_type .types .item.on{  border: 1px solid  #69BA2D; color:#69BA2D}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:#0BB20C; text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% ;font-size: 18px;display: flex}
    .dialog_select_type  .yes div{flex:1;text-align: center;position: relative}
    .dialog_select_type  .yes div:nth-of-type(1)::after{content: '';height:100%;width:1px;background:#eee;position: absolute;right:0;top:0}
    .dialog_select_type .level_types .item{width:50%;float: left;margin-bottom: 15px;position: relative;font-size: 0.8235rem;color:#666}
    .dialog_select_type .level_types{padding:0 15px;}
    .dialog_select_type .level_types .item span{margin-left: 25px;}
    .dialog_select_type .level_item{height:14px;width:14px;position: absolute;border-radius: 50%;border:1px solid #D2D2D2;top:4px;left:0}
    .dialog_select_type .checked_item::after{  content: '';  width:10px;  height: 10px;  background: #09bb07;  border-radius: 50%;  position: absolute;  top:50%;  margin-top:-5px;  left: 50%;  margin-left:-5px;  }
    .dialog_select_type .levle_type_bottom{  padding:14px 15px;font-size: 12px;  color: #666;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(1){  margin-bottom: 1rem;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(2) .input_box{  line-height: 31px;  color: #A9A7A7;  font-size: 12px;  text-align: center;  }
    .dialog_select_type .levle_type_bottom input{width:100%;height:100%;background: none;}
    .dialog_select_type .levle_type_bottom .input_box{display:inline-block;width:185px;height:31px;padding-left:10px;background:#F4F4F7;border-radius: 5px;margin-left:8px;}
</style>