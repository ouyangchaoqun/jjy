<template >
    <div class="personal_box">

        <div v-title>入驻心理咨询师</div>
        <header>个人简介</header>
        <div class="text_area">
            <textarea name="" class="goodAt introduction" @input="changeIntroduction()"   placeholder="请采用精简的语言介绍自己，以便用户快速地了解您！

例如：国家二级心理咨询师。专注婚恋情感咨询。擅长解
决恋爱婚姻中的情感创伤疗愈及应对，解决各种情感心理
纠葛。失恋安抚、恋人挽回、婚姻破裂挽回、婆媳关系处
理、婚外情等情感问题。幸福并不难，相信我，把问题交
给我、我们一起敲开幸福的大门。" cols="30" rows="8">{{introduction}}</textarea>
            <div class="count" >{{inputLength}}/{{MAX_INPUT_LENGTH}}</div>
        </div>

        <header>培训经历</header>
        <div class="text_area">
            <textarea name="" class="goodAt experience" @input="getexperience()"  placeholder="请填写您的专业培训经历！

例如：
#武汉大学心理咨询培训师
#丁健略婚恋咨询设计路径
#中级绘画治疗师" cols="30" rows="6">{{experience}}</textarea>

        </div>

        <header>擅长领域问题
        </header>
        <div class="text_area" style="margin-bottom: 3.0588235rem;">
            <textarea name=""  class="goodAt field"  @input="getfield()" placeholder="请对您擅长领域进行具体描述！

例如：
#家庭关系：婚姻挽救、情感修复、外遇分离、家暴危机、
婆媳关系、复婚帮助、离婚纠纷
#恋爱关系：失恋帮助、性格不和、沟通障碍、经常吵架、
父母反对、异地恋问题
#性心理：同性恋、恋母情节、偷窥幻想女性、性取向问
题" cols="30" rows="8">{{field}}</textarea>

        </div>
        <div class="personal_btn" v-if="!experience||!introduction||!field">保存</div>
        <div class="personal_btn personOver" @click="personalOver()" v-if="experience&&introduction&&field">保存</div>
    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                MAX_INPUT_LENGTH:200,
                inputLength:0,
                introduction:'',
                canGoNext:false,
                experience:'',
                field:'',
                isOver:false
            }
        },


        mounted: function () {
            let introduction= (cookie.get("introduction"));
            let experience= (cookie.get("experience"));
            let field= (cookie.get("field"));
            if(introduction&&introduction!=''){
                this.introduction=unescape(introduction)
            }
            if(experience&&experience!=''){
                this.experience=unescape(experience)
            }
            if(field&&field!=''){
                this.field=unescape(field)
            }

            this.inputLength = this.introduction.length
            xqzs.wx.setConfig(this);
        },
        methods: {
            changeIntroduction: function (v) {
                let introduction = $(".introduction").val();
                this.introduction = introduction
                if (introduction.length > this.MAX_INPUT_LENGTH) {
                    introduction = introduction.substr(0, this.MAX_INPUT_LENGTH)
                }
                this.inputLength =introduction.length;
                cookie.set("introduction",escape(introduction));
            },
            getexperience:function () {
                let experience = $('.experience').val();
                this.experience = experience;
                cookie.set("experience",escape(experience));
            },
            getfield:function () {
                let field = $('.field').val();
                this.field=field
                cookie.set("field",escape(field));
            },
            personalOver:function () {
                let _this = this;
                let data={
                    userId:"_userId_",
                    expertId:cookie.get("expertId"),
                    introduction:unescape(cookie.get("introduction")),
                    experience:unescape(cookie.get("experience")),
                    goodat:unescape(cookie.get("field")),
                };
                console.log(data)
                _this.$http.post(web.API_PATH + 'come/expert/modify', data)
                    .then(
                        (response) => {
                            _this.$router.go(-1)
                        }
                    );

            }

        }



    }
</script>
<style>
    .personal_box{background: #fff;}
    .personal_box header{line-height: 2.8235rem;color:rgba(36,37,61,1);font-size: 0.8235rem;padding-left: 0.88235rem;}
    .personal_box .text_area{background: rgba(245,245,245,1);margin:0;border:0;}
    .personal_box .text_area textarea{background: rgba(245,245,245,1);}
    .personal_box .personal_btn{width:100%;background: linear-gradient(rgba(255,158,25,0.5),rgba(253,115,1,0.5));color:rgba(255,255,255,1);font-size: 1.0588235rem;line-height: 2.588235rem;text-align: center}
    .personal_box .personOver{background: linear-gradient(rgba(255,158,25,1),rgba(253,115,1,1));}

</style>