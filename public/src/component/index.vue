<template id="myCenter">
    <div style="height: 100%" >

        <div v-title>心情指数</div>
        <div class="weui-tabbar" id="tabs">
            <a   @click="record()" class="weui-tabbar__item  tab">
                <span  class="recordImg tab_icon"></span>
                <p class="weui-tabbar__label" :class="{tabOn:recordOn}">记录打卡</p>
            </a>

            <a  @click="calendar()" class="weui-tabbar__item tab " >
                <span  class="calendarImg tab_icon"></span>
                <p class="weui-tabbar__label"  :class="{tabOn:calendarOn}">本周排行</p>
            </a>

            <a class="weui-tabbar__item tab" @click="hideNewCircle('mood','/friendsMoods')">
                <span   class="friendsImg tab_icon"></span>
                <p class="weui-tabbar__label"  :class="{tabOn:friendsOn}">小树洞</p>
                <span v-show="hasNewFirendMood" class="hasnew" :style="newFirendMoodStyle"></span>
            </a>

            <a class="weui-tabbar__item tab" @click="hideNewCircle('perfect','/me')">
                <span  class="meImg tab_icon"></span>
                <p class="weui-tabbar__label"   :class="{tabOn:meOn}">我的</p>
                <span v-show="hasNewPerfect" class="hasnew" :style="newPerfectStyle"></span>
            </a>

        </div>
        <div class="weui-tab__panel" >
            <div class="banner" style="position: relative;">
                <ul class="birthdays">
                    <li @click="birthday(item.userId)" v-for="(item,index) in  birthdayList" :key="index" v-show="birthdayList.length>0&&index<4"><template  v-if="item.myself==1"><img :src="item.faceUrl" >我的生日 <i></i></template><template v-else=""><img :src="item.faceUrl" >好友生日 <i></i></template></li>
                </ul>
                <ul class="birthdays b_right">
                    <li  @click="birthday(item.userId)" v-for="(item,index) in  birthdayList" :key="index" v-show="birthdayList.length>=5&&index>=4" ><template v-if="item.myself==1"> <img :src="item.faceUrl" >我的生日 <i></i></template><template v-else=""><img :src="item.faceUrl" >好友生日 <i></i></template></li>
                </ul>
                <div v-show="isBirthday" class="brithBox">
                    <!--<img src="/dist/top_img/birthday.jpg"/>-->
                    <img src="/dist/top_img/bribg.jpg" alt="">
                    <img src="/dist/top_img/bribg.png" alt="" style="position: absolute;bottom: 0">
                    <img class="briCake" src="/dist/top_img/briCake.png" alt="">
                    <img class="brithText" src="/dist/top_img/brithText.png" alt="">
                    <img class="brithDayBg" src="/dist/top_img/brithDayBg.png" alt="">
                </div>
                <v-banner v-show="!isBirthday"></v-banner>
            </div>
            <!--banner end -->
            <router-link :to='noticeLink' class="weui-tabbar__item tab" style="padding: 0" v-if="notice.count">
                <div class="notice_box notice_box_p">
                    <div class="notice" >
                        <img class="notice_friend"  :src="wxFaceUrl(notice.lastuser.faceUrl)" />
                        <div>{{notice.count}} 条新消息</div>
                        <img  class="goNotice" src="../images/iconjt.png" alt="">
                    </div>
                </div>
            </router-link>


            <div class="mycenter_list">
                <!--mycenter start-->
                <div class="mycenter">
                    <a   @click="link('/myCenter/myIndex')">
                        <div class="list_left">
                            <img class="headerimg" :src="wxFaceUrl(user.faceUrl)"/>
                            <template v-if="myLastMood">
                                <div class="friend">
                                    <p class="friendName">{{user.nickName | shortName(8)}}</p>
                                    <p class="time">{{myLastMood.addTime}}</p>
                                </div>
                            </template>
                            <template v-if="!myLastMood">
                                <span>{{ user.nickName | shortName(8) }}</span>
                            </template>


                        </div>

                        <div class="list_right">
                            <template v-if="myLastMood!=null">
                                <img class="moodimg" :src="myLastMood.moodValueUrl"/>
                                <div class="interaction" @click.stop="link(myLastMood.careListUrl)">
                                    <div>{{ myLastMood.careCount }}</div>
                                    <img v-if="myLastMood.moodValue>=5 &&  myLastMood.careCount<=0"
                                         src="../images/list_icon_dianz_nor.png" alt=""/>
                                    <img v-if="myLastMood.moodValue>=5 &&  myLastMood.careCount>0"
                                         src="../images/list_icon_dianz_pre.png" alt=""/>
                                    <img v-if="myLastMood.moodValue<5 &&  myLastMood.careCount>0"
                                         src="../images/list_baob_pre.png" alt=""/>
                                    <img v-if="myLastMood.moodValue<5 &&  myLastMood.careCount<=0"
                                         src="../images/list_baob_nor.png" alt=""/>
                                </div>
                            </template>
                            <template v-if="myLastMood==null">
                                <span class="noRecord">还未记录</span>
                            </template>
                        </div>
                    </a>
                </div>
                <!--mycenter end-->
                <div class="mycenterFill"></div>
                <!--friendcenter start-->
                <div class="mycenter friendCenter" v-if="user.isLookFriend!=null&&user.isLookFriend!==0">
                    <div class="addBorder" v-for="friendMood in friendMoodsSpe">
                        <a @click="friendLink(friendMood.userId)">
                            <div class="list_left">
                                <img class="headerimg" :src="wxFaceUrl(friendMood.faceUrl)"/>
                                <div class="friend">
                                    <p class="friendName" v-if="friendMood.memoName!=null">{{friendMood.memoName | shortName(8)}}</p>
                                    <p class="friendName" v-if="friendMood.memoName==null">{{friendMood.nickName | shortName(8)}}</p>
                                    <p class="time">{{friendMood.outTime}}</p>
                                </div>
                            </div>

                            <div class="list_right">
                                <img class="moodimg" :src="friendMood.moodValueUrl"/>
                                <div class="interaction" @click.stop="care(friendMood.id)" >
                                    <div>{{ friendMood.careCount }}</div>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue>=5 &&  friendMood.isCare==null"
                                         src="../images/list_icon_dianz_nor.png" alt=""/>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue<5 &&  friendMood.isCare==null"
                                         src="../images/list_baob_nor.png" alt=""/>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue>=5 &&  friendMood.isCare!=null"
                                         src="../images/list_icon_dianz_pre.png" alt=""/>
                                    <img  :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue<5 &&  friendMood.isCare!=null"
                                          src="../images/list_baob_pre.png" alt=""/>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="mycenterFill" v-if="hasLine"></div><!--todo-->
                    <div class="addBorder" v-for="friendMood in friendMoods">
                        <a @click="friendLink(friendMood.userId)">
                            <div class="list_left">
                                <img class="headerimg" :src="wxFaceUrl(friendMood.faceUrl)"/>
                                <div class="friend">
                                    <p class="friendName" v-if="friendMood.memoName!=null">{{friendMood.memoName | shortName(8) }}</p>
                                    <p class="friendName" v-if="friendMood.memoName==null">{{friendMood.nickName | shortName(8) }}</p>

                                    <p class="time">{{friendMood.outTime}}</p>
                                </div>
                            </div>

                            <div class="list_right">
                                <img class="moodimg" :src="friendMood.moodValueUrl"/>
                                <div class="interaction" @click.stop="care(friendMood.id)" >
                                    <div>{{ friendMood.careCount }}</div>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue>=5 &&  friendMood.isCare==null"
                                         src="../images/list_icon_dianz_nor.png" alt=""/>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue<5 &&  friendMood.isCare==null"
                                         src="../images/list_baob_nor.png" alt=""/>
                                    <img :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue>=5 &&  friendMood.isCare!=null"
                                         src="../images/list_icon_dianz_pre.png" alt=""/>
                                    <img  :class="{heartUp:friendMood.hit}" v-if="friendMood.moodValue<5 &&  friendMood.isCare!=null"
                                          src="../images/list_baob_pre.png" alt=""/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <a class="share" @click="createinvite()">点击生成邀请卡</a>
                <div class="qun_qrcode">     <img src="http://oss.xqzs.cn/xqzs/qun_qrcode.png"  width="60%" :height="qunImgHeight"></div>

            </div>
            <!--friendcenter end-->
        </div>

        <div class="addMoodBg"></div>

    </div>
</template>

<script type="es6">
    import banner from "./banner.vue";
    import Bus from './bus.js';
    let myCenter = {
        template: '#myCenter'
    };

    export default {
        data() {
            return {
                myLastMood:null,
                notice:{count:0},
                linkTo:"#",
                noticeLink:'/notice',
                fillFlag:false,
                hasNewFirendMood:false,
                newFirendMoodStyle:'',
                hasNewPerfect:false,
                newPerfectStyle:'',
                scrollTop:0,
                birthdayList:[],
                isBirthday:false,
                qunImgHeight:300
            }
        },
        filters:{
            shortName:function(value,len){

                return xqzs.shortname(value,len);

            }
        },
        props:{
            user:{
                type:Object
            },friendMoodsSpe: {
                type:Object
            },
            friendMoods: {
                type:Object
            },
            myLastMood:{
                type:Object
            }
        },
        methods: {
            birthday:function (userId) {
                this.$router.push("/birthday?userId="+userId)
            },
            record:function () {
                var  _this=this;
                Bus.$emit("goIndex",false);
                setTimeout(function () {
                    _this.$router.push("/record")
                },2)
            },
            calendar:function () {
                var  _this=this;
                setTimeout(function () {
                    let date = new Date();
                    _this.$router.push("/ranklist/w/"+date.getFullYear()+"-"+ now_week );
                },2)
            },
            care: function (id) {
                let _this = this;
                _this.$http.put(web.API_PATH + 'mood/care/add', {"moodId": id, "userId": "omg"}).then(function (data) {//es5写法
                    if (data.data.status === 1) {
                        for(var i = 0; i<_this.friendMoodsSpe.length;i++){
                            if(_this.friendMoodsSpe[i].id===id){
                                _this.friendMoodsSpe[i].careCount =data.data.data;
                                _this.friendMoodsSpe[i].hit=true;
                                _this.friendMoodsSpe[i].isCare=true;
                            }


                        }
                        for( i = 0; i<_this.friendMoods.length;i++){
                            if(_this.friendMoods[i].id===id){
                                _this.friendMoods[i].hit=true;
                                _this.friendMoods[i].careCount =data.data.data;
                                _this.friendMoods[i].isCare=true;

                            }
                        }

                        console.log(_this.friendMoods)

                    }
                }, function (error) {
                    //error
                });
                return false;
            },
            link: function (url) {
                this.$router.push(url)
            },
            friendLink:function (userId) {
                this.$router.push({name: 'friendUrl', params: {Id:userId}})
            },
            _createinvite:function (type,callback) {
                this.$http({
                    method: 'GET',
                    type: "json",
                    url: web.API_PATH + 'wei/xin/create/invite/' + type + '/_userId_',
                }).then(function (data) {
                    if (data && data.data.status == 1) {
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                })
            },
            createinvite:function () {
                let that = this;
                that._createinvite('link',function () {
                    that._createinvite('card',function () {});
                    xqzs.weui.dialog({
                        title:'邀请卡已经发送',
                        msg:'前往公众号查看你的专属名片',
                        submitText:'查看',
                        submitFun:function () {
                            try {
                                WeixinJSBridge.call('closeWindow');
                            }catch (e){
                            }
                        }
                    })
                });
            },
            canWriteMood:function () {

            },

            getFriendLastMood:function () {
                var that = this;
                //好友是否有新心情
                var lastfriendmoodid = xqzs.friendmood.getlast();
                if(lastfriendmoodid!=''){
                    that.$http.get(web.API_PATH + "mood/find/friendlast/_userId_")
                        .then(function (bt) {
                            if(bt && bt.data.status == 1){
                                var data = bt.data.data;
                                var newId = data.id;
                                console.info(newId+'   '+lastfriendmoodid)
                                if(newId > parseFloat(lastfriendmoodid)){
                                    that.hasNewFirendMood=true;
                                    var container = $('#tabs .tab:eq(0)');
                                    var right = (container.width() - 32) / 2;
                                    that.newFirendMoodStyle = 'right:'+right+'px';
                                }
                            }
                        })
                }
            },
            getNewPerfect:function () {
                var infokey = 'perfectinfo';
                if(xqzs.version.isshow(infokey)){
                    this.hasNewPerfect=true;
                    var container = $('#tabs .tab:eq(0)');
                    var right = (container.width() - 32) / 2;
                    this.newPerfectStyle = 'right:'+right+'px';
                }
            },
            hideNewCircle:function (key,url) {
                var _this =this ;
                if(key == 'mood'){
                    this.hasNewFirendMood = false;
                }
                if(key == 'perfect'){
                    this.hasNewPerfect = false;
                }
                setTimeout(function () {
                    _this.$router.push(url)
                },2)

            },
            wxFaceUrl:function (faceUrl) {
                return xqzs.mood.wxface(faceUrl);
            }
        },
        computed:{
            hasLine:function () {
                return this.friendMoodsSpe!=null && this.friendMoodsSpe.length > 0
                    && this.friendMoods!=null && this.friendMoods.length > 0 ;
            }
        },

        mounted: function () {

            let _this =this;
            xqzs.wx.setConfig(_this);
             if( xqzs.localdb.get("isBirthday")==="1"){
                 _this.isBirthday=true;
             }else{
                 _this.isBirthday=false;
             }

             this.qunImgHeight =  $(window).width() * 400 *0.6 / 300;
             $(".weui-tab__panel").height($(window).height()-50);




            let date=new Date();
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate()
            //好友生日/api/v1/birthday/get/list/{year}/{month}/{day}/{userId}
            _this.$http.get(web.API_PATH + 'birthday/get/list/'+year+'/'+month+'/'+day+'/_userId_').then(function (data) {//es5写法
                console.log(data)
                if(data.body.status==1){
                    _this.birthdayList=data.body.data;
                    let isbirthday=false;
                    for(let i=0;i<_this.birthdayList.length;i++){
                        if(_this.birthdayList[i].myself==1){

                            isbirthday=true;
                            break;
                        }
                    }
                    _this.isBirthday=isbirthday;
                    if(isbirthday){
                        xqzs.localdb.set("isBirthday",1);
                    }else{
                        xqzs.localdb.set("isBirthday",0);
                    }
                }


            }, function (error) {

            });

            $(".weui-tab__panel").scroll(function () {
                xqzs.localdb.set("indexScrollTop",$(this).scrollTop())
            });


            _this.noticeLink=_this.noticeLink +"/?time="+ xqzs.dateTime.getTimeStamp();




            Bus.$emit('initHomeData');
            _this.getFriendLastMood();
            _this.getNewPerfect();
            _this.$http({
                method: 'GET',
                type: "json",
                url: web.API_PATH + 'notice/find/new/_userId_',
            }).then(function (data) {
                if (data.data.data !== null) {
                    _this.notice = eval(data.data.data);
                    console.log(_this.notice);
                }
            }, function (error) {
                //error
            });


            if(window.screen.height==$(window).height()){
                if(window.screen.width==320&& window.screen.availHeight==548){
                    var style ="<style id='iphone5style'>.transitionBox .child-view{height:504px !important;}</style>";
                    $(".child-view").append(style);
                }
            }else{
                $("#iphone5style").remove();
            }

//           setTimeout(function () {
//               $(".weui-tab__panel").scrollTop(   xqzs.localdb.get("indexScrollTop"));
//           },100)

        },
        updated:function () {
            var obj =  $(".mycenter>a ,.addBorder>a")
            xqzs.weui.active(obj);

            $(".interaction").on("touchstart",function () {
                event.stopPropagation();
            })

        },
        components: {
            "v-banner": banner
        }

    }


</script>
<style>
    .qun_qrcode{ text-align: center;  margin-bottom: 15px;}
    .birthdays{  position: absolute; top:4%;left:0;z-index: 1001}
    .birthdays li{ background: rgba(7,7,7,0.5); border-radius: 1.058823529411765rem; border-top-left-radius: 0; border-bottom-left-radius: 0; height: 2.117647058823529rem; font-size: 0.7058823529411765rem; color:#fff; width: 6.6rem; line-height:  2.117647058823529rem; margin-bottom: 1rem }
    .birthdays li:active{background: rgba(7,7,7,0.8);}
    .birthdays li img{ width: 1.529411764705882rem ; height: 1.529411764705882rem; border-radius: 50%; float:left; margin-top: 0.2941176470588235rem; margin-left: 0.2rem;margin-right: 0.3rem; }
    .birthdays li i{ display: inline-block;float:right; width: 0.9rem; height: 0.9rem; background: url(../images/go.png) no-repeat; background-size: 100% 100%; margin-top: 0.56rem; margin-right: 0.5rem;}

    .birthdays.b_right{left:inherit; right:0;}
    .birthdays.b_right li{border-radius: 1.058823529411765rem; border-top-right-radius: 0; border-bottom-right-radius: 0; }
    .birthdays.b_right li img{margin-left: 0.4rem;}
    .birthdays.b_right li i{ margin-right: 0.2rem;}

    .tab{position: relative; padding-top: 0 !important;}
    #tabs a .tab_icon{ background: url(../images/tab_icons.png) no-repeat; background-size: 116px; height: 27px; width: 29px; display: inline-block; margin-top: 1px;}
    #tabs a .tab_icon.recordImg{ background-position: 0 0px}
    #tabs a .tab_icon.calendarImg{ background-position: -29px 0px}
    #tabs a .tab_icon.friendsImg{ background-position: -58px 0px}
    #tabs a .tab_icon.meImg{ background-position: -87px 0px}

    #tabs a:active span.recordImg{ background-position: 0  -29px}
    #tabs a:active span.calendarImg{ background-position: -29px -29px}
    #tabs a:active span.friendsImg{ background-position: -58px -29px}
    #tabs a:active span.meImg{ background-position: -87px -29px}
    #tabs a:active .weui-tabbar__label{ color:#00bd00}
    .brithBox{
        position: relative;
        overflow: hidden;
    }
    .brithBox img{
        display: block;
    }
    .brithBox .briCake{
        position: absolute;width:5.88rem;right: 1.76rem;
        height:5.71rem;
        animation: mybriCake 1s ease 1s forwards ;
        -webkit-animation:mybriCake 1s ease 1s forwards ;
    }
    .brithBox .brithText{
        position: absolute;width: 10.6rem;bottom:5.88rem;opacity: 0;left:3.88rem;
        animation: mybrithText 2s linear .5s forwards;
        -webkit-animation:mybrithText 2s linear .5s forwards;
    }
    .brithBox .brithDayBg{
        position: absolute;
        animation: mybrithDayBg 4s linear 1.2s;
        -webkit-animation:mybrithDayBg 4s linear 1.2s;
    }
    @keyframes mybriCake
    {
        0%  {bottom: -5.88rem;}
        50% {bottom:2rem;height:6.47rem;}
        70% {bottom:1.76rem;height:5.71rem;}
        100%{bottom:1.76rem;}
    }
    @-webkit-keyframes mybriCake
    {
        0%  {bottom: -5.88rem;}
        50% {bottom:2rem;height:6.47rem;}
        70% {bottom:1.76rem;height:5.71rem;}
        100%{bottom:1.76rem;}
    }

    @keyframes mybrithText
    {
        0%   {opacity: 0;}
        100% {opacity: 1;}
    }
    @-webkit-keyframes mybrithText
    {
        0%   {opacity: 0;}
        100% {opacity: 1;}
    }
    @keyframes mybrithDayBg
    {
        0%   {top: -32rem;}
        25%   {top: -16rem;}
        50%   {top:0}
        75%   {top: 16rem;}
        100% {top: 32rem;}
    }
    @-webkit-keyframes mybrithDayBg
    {
        0%   {top: -32rem;}
        25%   {top: -16rem;}
        50%   {top:0}
        75%   {top: 16rem;}
        100% {top: 32rem;}
    }


    .tab .hasnew{position:absolute;background-color:#ff0000;border-radius: 50%;position: absolute;top:1px;height: 8px !important;width: 8px!important;}
    .tab img{
        height: 24px;  width:24px;
    }
    .friendCenter .addBorder{
        border-bottom: 1px solid #eeeeee;
    }

    #tabs {
        z-index:10000;
        background: #fff;
        height: 47px;
        border-top:1px solid #ddd;padding-top:1px;
    }
    #tabs:before{  display: none }
    #tabs .weui-tabbar__label{ color:#777}






    body, html {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
    }

    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }


    .addMoodBg{ background: rgba(0,0,0,0.6); height: 100%; width: 100%; z-index: 0; position: fixed;top:0; display: none}


    .mycenter {
        background: #ffffff;

    }

    /*.mycenter_list {
        height: 100%;
    }*/

    .mycenter a {
        height: 72px;
        display: block;
        padding: 0 15px;
        /*-webkit-tap-highlight-color: rgba(0,0,0,.2);*/
        padding-right: 0;
    }

    .friend {
        margin-left: 59px;
        padding-top: 12px
    }

    .friendName {
        font-size: 16px;
        color: #333;
        width:144px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .time {
        font-size: 14px;
        color: #999999;
    }

    .list_left {
        float: left;
        position: relative;
        height: 100%;
    }

    .headerimg {
        height: 44px;
        width: 44px;
        display: inline-block;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        margin-top: -22px;
    }

    .list_left span {
        font-size: 15px;
        line-height: 72px;
        color: #000000;
        margin-left: 59px;
    }

    .list_right {
        float: right;
        height: 72px;
    }

    .list_right span {
        color: #666666;
        font-size: 15px;
        line-height: 72px;
    }
    .list_right span.noRecord{
        margin-right:24px
    }

    .moodimg {
        width: 34px;
        height: 34px;
        float: left;
        margin-top: 17px;
        margin-right: 4px;
    }

    .interaction {
        float: left;
        text-align: center;
        padding: 15px;
        padding-top: 16px;
        padding-left: 16px;

        padding-right: 14px;
        font-size: 13px;
        color: #aeaeae;
        overflow: hidden;
    }
    .interaction div{
        line-height: 14px;
    }

    .interaction img {
        display:block; margin-top: 2px;
        width: 20px;
        height: 20px;
    }
    .interaction a{

        height:20px;
        padding:0;
    }

    .mycenterFill {
        width: 100%;
        height: 12px;
        background: #f4f4f8;
    }

    .friendCenter {
        padding:0;
    }

    .share {
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        margin: 25px 15px 30px 15px;
        color: #696969;
        display: block;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background: #FFFFFF;
        border-radius: 5px;
        text-align: center;

    }
    .share:active{
        background: #ECECEC;
    }
    .notice_box{
        background: #ffffff;
        border-bottom: 1px solid #eee;
    }
    .notice_box_p{ padding: 16px 0}
    .notice{
        height: 40px;
        width: 180px;
        background: #393939;
        border-radius: 5px;
        margin: 0 auto;

    }
    .notice:active{ background: #1f1f1f}
    .notice_friend{
        height:32px;
        width: 32px;
        float: left;
        margin-left:5px;
        margin-top:5px;
        display: block;
    }
    .notice div{
        float: left;
        height:40px;
        line-height: 40px;
        color: #fff;
        margin-left:32px;
        font-size: 13px;
    }
    .notice .goNotice{
        width:16px;
        height:16px;
        display: block;
        float: right;
        margin-right: 14px;
        margin-top:12px;
    }
    .notice img{
        height: 30px;
        width:30px;
    }



</style>