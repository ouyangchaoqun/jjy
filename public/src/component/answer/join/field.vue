<template >
    <div style="height: 100%" class="answer_join_field_box">

        <div v-title>入驻心理咨询师</div>

        <v-answer-top-step step="2"  preUrl="./base/info" nextUrl="./qualification" title="擅长领域"></v-answer-top-step>
        <div class="sub_title">（最多可选3个）</div>
        <div class="types">
            <div class="item" :class="{on:item.isSelect}" v-for="(item,index) in types" @click="select(index)"><span>{{item.name}}</span></div>

        </div>

    </div>
</template>

<script type="es6">

    import answerTopStep from "./include/top_step.vue";

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
                ]
            }
        },

        methods: {
            select:function (index) {
                let count=0;

                if(this.types[index].isSelect){
                    this.types[index].isSelect=false
                }else{
                    for(let i=0;i<this.types.length;i++){
                        if(this.types[i].isSelect){
                            count++
                        }
                    }

                    if( count>=3){

                    }else{
                        this.types[index].isSelect=true
                    }
                }



            }
        },

        mounted: function () {


        } ,
        components: {
            "v-answer-top-step": answerTopStep
        }


    }
</script>
<style>
    .answer_join_field_box .sub_title{
        font-size: 0.88235rem; color:#999; margin-top: 0.3rem; text-align: center;
    }

    .answer_join_field_box .types{ margin: 0.88235rem;}
    .answer_join_field_box .types .item{  width: 25%; margin: .8rem 4.166665% ; text-align: center ;    line-height:2.5rem; float:left;  }
    .answer_join_field_box .types .item span{border: 1px solid #ccc; display: block;border-radius: 0.3rem; font-size: 0.88235rem; }
    .answer_join_field_box .types .item.on span{ color:#0BB20C;border: 1px solid #0BB20C; }
</style>