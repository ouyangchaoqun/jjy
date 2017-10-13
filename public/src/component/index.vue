<template >
    <div style="height: 100%">

        <div v-title>心情指数</div>

        <div style="height: 500px;" class="diididdid">
            <router-link to="/comeon/asker/listen">用户</router-link>
            <router-link to="/comeon/answer/race/list">咨询师</router-link>




        </div>
    </div>
</template>

<script type="es6">


    export default {
        data() {
            return {}
        },


        mounted: function () {


        }


    }
</script>
<style>
.diididdid a{ width: 100%; display: block; color:#333; line-height: 44px; border-bottom: 1px  solid #eee; text-align: center; background: #fff}
</style>