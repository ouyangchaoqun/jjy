<template >
    <div style="height: 100%" class="answer_join_field_box wbg">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="2"  preUrl="./base/info" nextUrl="./qualification" title="擅长领域" errorWord="请选择擅长领域" :canGoNext="canGoNext"></v-answer-top-step>
        <div class="sub_title">（最多可选3个）</div>
        <div class="types">
            <div class="item" :class="{on:item.isSelect}" v-for="(item,index) in types" @click="select(index)"><span>{{item.title}}</span></div>

        </div>

    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

    export default {
        data() {
            return {
                types:[
                ],
                MAX_COUNT:3,
                canGoNext:false
            }
        },

        methods: {
            getClassList:function () {
                let _this=this;
                _this.$http.get(web.API_PATH + 'come/listen/question/class/list' ).then(function (data) {//es5写法
                    if (data.body.status == 1) {
                        _this.types= data.body.data;
                        let questionClassId = cookie.get("questionClassId")
                        if(questionClassId&&questionClassId!=''){
                            _this.canGoNext=true;
                           let ids=  questionClassId.split(",")
                            for(let i=0;i<_this.types.length;i++){
                                for(let j =0;j<ids.length;j++){
                                    if(_this.types[i].id==ids[j]){
                                        _this.types[i].isSelect=true;
                                    }
                                }
                            }
                        }else{
                            _this.canGoNext=false;
                        }
                    }
                }, function (error) {
                });
            },
            select:function (index) {
                let count=0;
                let types=this.types;
                console.log(index)
                if(types[index].isSelect){
                    types[index].isSelect=false
                }else{
                    for(let i=0;i<types.length;i++){
                        if(types[i].isSelect){
                            count++
                        }
                    }

                    if( count>=this.MAX_COUNT){

                    }else{
                        types[index].isSelect=true
                    }
                }
               this.$set(this.types,index,types[index]);
                //存入cookie
                let ids= '';
                for(let i=0;i<types.length;i++){
                    if(types[i].isSelect){
                        ids+=types[i].id+",";
                    }
                }

                if(ids.length>0){
                    ids=ids.substr(0,ids.length-1);
                    this.canGoNext=true;
                }else{
                    this.canGoNext=false;
                }
                cookie.set("questionClassId",ids);


            }
        },

        mounted: function () {
            this.getClassList();

        } ,
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .answer_join_field_box .sub_title{
        font-size: 0.88235rem; color:#999;     line-height: 1; text-align: center;
    }

    .answer_join_field_box .types{ margin:5rem  0.88235rem;}
    .answer_join_field_box .types .item{  width: 27%; margin: .8rem 3.166665% ; text-align: center ;    line-height:2.058823529411765rem; float:left;  }
    .answer_join_field_box .types .item span{border: 0.0588235294117647rem solid #E5E5E5 ; display: block;border-radius:1.029411764705882rem; font-size:0.8235294117647059rem; }
    .answer_join_field_box .types .item.on span{ color:rgba(254,115,1,1);border: 0.0588235294117647rem solid rgba(254,115,1,1); }
</style>