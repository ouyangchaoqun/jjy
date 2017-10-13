<template>
    <div class="answer_join_top_box">
        <div class="answer_join_top">

            <div class="step">{{step}}<span>/10</span></div>

        </div>
        <div :class="{title:true,addStyle:step==2}">{{title}}</div>
        <div class="btn_box">
            <router-link replace :to="preUrl" v-if="preUrl!=''">上一项</router-link>
            <a   class="nextBtn"   @click="goNext()" v-if="nextUrl!=''">下一项</a>
            <a id="subBtn"  v-if="nextUrl==''&&step!=1" >提交审核</a>
        </div>
    </div>
</template>
<style>
    .answer_join_top_box .title{
        color: #333; font-size: 0.9411764705882353rem;  text-align: center; line-height:2.647058823529412rem;}
    .answer_join_top {

        line-height: 2.647058823529412rem;
        font-size: 0.7647058823529412rem;
        background: #FEFEFE ;
        border-bottom: 1px solid #E5E5E5;
        color: #333;
        width: 100%;
        position: relative;
    }

    .answer_join_top .step {
        width: 100%;
        text-align: center;
         font-size: 0.8235294117647059rem;
    }

    .answer_join_top .step span{ font-size:0.9411764705882353rem; }
    .btn_box{width:100%;position: absolute;bottom:1.471rem;display: flex;display: -webkit-flex;text-align: center;line-height: 2.35rem}
    .btn_box a{flex: 1;border:1px solid rgba(253,115,1,1);margin:0 0.88235rem;border-radius: 1.176471rem;color:rgba(253,115,1,1);background: #fff;}
    .btn_box a:last-of-type{color:#fff;background:linear-gradient(to right, rgba(255,158,25,1), rgba(253,114,6,1))}
    .text_area{ margin: 0 0.88235rem; margin-top: 1.5rem; border: 1px solid #EAE7E7; border-radius: 0.3rem; overflow: hidden; background: #fff; padding: 0.5rem; position: relative }
    .text_area textarea{ width: 100%; font-size: 0.7647058823529412rem; line-height: 1.2rem; border: none; max-height:13.23529411764706rem; }
    .text_area .count{ color:#999; position: absolute; right:0.4rem; bottom:0.4rem; font-size: 0.77rem;}
    .answer_join_top_box .addStyle{color:#999;height:2.117671rem;line-height: 2.1176471rem;font-size: 0.70588235rem;background: #f4f4f7}
</style>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            step: 1,
            preUrl: '',
            nextUrl: '',
            title:'',
            canGoNext:false,
            errorWord:''
        },
        methods:{
            goNext:function () {
                if(this.canGoNext){
                    this.$router.replace(this.nextUrl)
                }else{
                    xqzs.weui.tip(this.errorWord,function () {
                        
                    })
                }
            },
            submit:function () {
                let that=this;
                let data={
                    userId:"_userId_",
                    price:cookie.get("price"),
                    freeTime:cookie.get("freeTime"),
                    sign:unescape(cookie.get("sign")),
                    mediaId:cookie.get("mediaId"),
                    voiceLength:cookie.get("voiceLength"),
                    questionClassId:cookie.get("questionClassId").split(','),
                    jobTitle:unescape(cookie.get("jobTitle")),
                    certificateNo:unescape(cookie.get("certificateNo")),
                    certificateFile:cookie.get("certificateFile"),
                    introduction:unescape(cookie.get("introduction")),
                    experience:unescape(cookie.get("experience")),
                    goodat:unescape(cookie.get("goodAt"))

                };
                that.$http.put(web.API_PATH + "come/expert/register", data)
                    .then(function (bt) {
                        if (bt.data && bt.data.status == 1) {
                            this.$router.push("./reviewing")
                        }
                    });


            }
        }
    }
</script>