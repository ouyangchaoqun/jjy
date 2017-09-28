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
                <div v-for="item in types" v-if="item.isSelect">{{item.name}}</div>
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
                <div class="title" style="padding-top: 1.176471rem;padding-bottom: 0.88235rem">选择问题类型</div>
                <div class="title_bottom">（最多选择三个）</div>
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
                <div class="title" style="padding-top: 1.294rem;padding-bottom: 1.41176471rem">从业资质</div>
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
                    _this.typeSelectIndex=index;
                    if(_this.types[index].isSelect){
                        _this.types[index].isSelect=false;
                        $(this).removeClass('on')

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
    input::-webkit-input-placeholder {color:red !important;}
    .setQualification_box{  background: #fff;  color: #666;  font-size: 0.8235rem;  padding-bottom: 1.76471rem;  }
    .setQualification_box header{  padding:1.176471rem 0.88235rem 0.88235rem 0.88235rem;  border-bottom: 0.588235rem solid #F4F4F7;  }
    .header_top{ position: relative;margin-bottom: 0.35294117rem;font-size: 0.88235rem;  color: #333;}
    .setQualification_box .header-right{  position: absolute;  top:0px;  right:0;  padding:0.2941176471rem 0.588235rem;  border-radius: 0.6176471rem;  line-height: 1;  color: #fff;  font-size: 0.70588235rem;  background: #09bb07;  border:1px solid #09bb07;  }
    .setQualification_box .header_top .addStyle{  background: none;  color: #09bb07;  }
    .setQualification_box .textarea_box{  height:2.0588235rem;  border:1.5px solid #EAE7E7; line-height: 1.176471rem;  color: #666;  font-size: 0.8235rem;  padding:0.588235rem;  border-radius: 0.29411rem;  }
    .textarea_box textarea{  width:100%;  height:100%;  border:0;  outline: none;  resize: none;  background: none;  color: #666;  }
    .setQualification_box .goodat{  padding:0.88235rem;  border-bottom: 0.588235rem solid #F4F4F7; }
    .goodat .header_top{margin-bottom: 0.88235rem;}
    .goodat_class{display: -webkit-box;display: -webkit-flex;display: flex;}
    .goodat_class div{flex: 1;text-align: center;line-height:1.941176471rem;border-radius: 1rem;border:1px solid #999;margin-right:0.88235rem;}
    .goodat_class div:nth-of-type(3){margin:0;}
    .goodat .level{height:1.5294rem;line-height:1.5294rem;font-size:0.70588235rem;border:1px solid #999;border-radius: 1rem;text-align: center;padding:0 0.294rem;display: inline-block}
    .level_box{padding-top:0.35294rem;position: relative;padding-bottom:1.29411rem;}
    .cerpic{width:5.88235rem;height:4.1176471rem;background: pink;position: absolute;left:45%;top:-1.176471rem;}
    .goodat .textarea_box{min-height:5.88235rem;}
    .dialog_select_type{ background: #fff; border-radius: 0.588235rem; width: 80%; height:19rem; position: fixed; top: 50%; margin-top: -9.5rem; left:50%; margin-left: -40% ;    z-index: 10001;}
    .dialog_select_type .title{line-height: 1; text-align: center;font-size: 1.058823529411765rem;  font-weight: bold;}
    .dialog_select_type .types{ margin: 0.9rem;}
    .dialog_select_type .types .item{ width: 27%; float:left;text-align: center; border: 1px solid #9E9E9E ; line-height: 1.411764705882353rem; border-radius:0.7058823529411765rem; margin: 0 2%; margin-bottom: 1.8rem; font-size: 0.7058823529411765rem;color:#999; padding: 0 0.5%; }
    .dialog_select_type .types .item.on{  border: 1px solid  #69BA2D; color:#69BA2D}
    .dialog_select_type  .yes{ border-top: 1px solid #eee; color:#0BB20C; text-align: center; line-height: 2.588235294117647rem; position: absolute; bottom:0; left:0; width: 100% ;font-size: 1.0588235rem;display: flex}
    .dialog_select_type  .yes div{flex:1;text-align: center;position: relative}
    .dialog_select_type  .yes div:nth-of-type(1)::after{content: '';height:100%;width:1px;background:#eee;position: absolute;right:0;top:0}
    .dialog_select_type .level_types .item{width:46%;float: left;margin:0 2%;margin-bottom: 0.88235rem;position: relative;font-size:0.70588235rem;color:#666}
    .dialog_select_type .level_types{padding:0 0.88235rem;}
    .dialog_select_type .level_types .item span{margin-left: 1.470588235rem;}
    .dialog_select_type .level_item{height:14px;width:14px;position: absolute;border-radius: 50%;border:1px solid #D2D2D2;top:1.2px;left:0}
    .dialog_select_type .checked_item{border-color: #09bb07}
    .dialog_select_type .checked_item::after{  content: '';  width:10px;  height: 10px;  background: #09bb07;  border-radius: 50%;  position: absolute;  top:50%;  margin-top:-5px;  left: 50%;  margin-left:-5px;  }
    .dialog_select_type .levle_type_bottom{  padding:0.8235rem 0.88235rem;font-size: 0.70588235rem;  color: #666;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(1){  margin-bottom: 1rem;  }
    .dialog_select_type .levle_type_bottom>div:nth-of-type(2) .input_box{  line-height: 1.8235294rem;  color: #A9A7A7;  font-size: 0.70588235rem;  text-align: center;  }
    .dialog_select_type .levle_type_bottom input{width:100%;height:100%;background: none;}
    .dialog_select_type .levle_type_bottom .input_box{display:inline-block;width:10.88235rem;height:1.8235294rem;padding-left:0.588235rem;background:#F4F4F7;border-radius: 0.2941176471rem;margin-left:0.470588235rem;}
    .title_bottom{color:#999;font-size: 0.70588235rem;text-align: center;margin-bottom:0.335rem}
</style>