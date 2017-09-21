<template id="myCenter">
    <div style="height: 100%" class="ask_my_income_list wbg">

        <div v-title>心情指数</div>

        <div>
            <div class="top_tip">每份收入的90%为收益哦</div>
            <div class="list">
                <div class="item" v-for="item in [1,3,4,5,6,4,5,1]">
                    <div class="time">2017-09-12 12:00</div>
                    <div class="type_txt">偷听分成</div>
                    <div class="price">¥0.45</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script type="es6">



    export default {
        data() {
            return {}
        },


        mounted: function () {


        },
        methods:{

        }


    }
</script>
<style>


   .ask_my_income_list  .list .item{ height: 2.941176470588235rem; line-height: 2.941176470588235rem; border-bottom: 0.0588235294117647rem solid #eee; color:#666; font-size: 0.7647058823529412rem; position: relative  }
   .ask_my_income_list  .list .item .time{ margin-left:0.9705882352941176rem; }
   .ask_my_income_list .list .item .type_txt{ position: absolute; right:6rem; top:0;}
   .ask_my_income_list .list .item .price{ position: absolute; top:0; right:0.9705882352941176rem; color:#FF9900; font-size: 1.058823529411765rem;}
</style>