<template>
    <div class="music_bg">
         <ul class="music_list">
            <li v-for="(music,index) in musicList"  :key="index" @click="select(index)">
                 <div class="icon" :class="{ on:music.on}" ></div>
                <span class="name" :class="{txt_on:music.on}">{{music.name}}</span>
            </li>
        </ul>
        <div class="music_controller">
            <div class="playing " :class="{play:isPlay}">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="music_note" >{{noteTime}}</div>
            <div class="music_play" :class="{stop:isPlay}"@click="play()"></div>
            <div class="music_auto_close" @click="changeRTime()">
                <span class="time">{{autoCloseTime}}</span>
                <span class="txt">定时关闭</span>
            </div>
        </div>

    </div>
</template>
<script>

    var musicPath= "http://oss.xqzs.cn/2017-08/17/";

     export default {
        data() {
            return {
                showLoad:false,
                time:0,
                timeout:null,
                audio:null,
                isPlay:false,
                url:musicPath+"C226C451614BD17FC04AF36FADCF084E.mp3",
                autoCloseTime: 20,
                noteTime:"20:00后停止",
                musicList: [
                    {
                        pic: web.IMG_PATH + '/music/music_1.png',
                        picOn: web.IMG_PATH + '/music/music_1_on.png',
                        name: '大海',
                        url:musicPath+"36D52D026C189BC32B92AE3E1CA322EE.mp3"
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_2.png',
                        picOn: web.IMG_PATH + '/music/music_2_on.png',
                        name: '火焰燃烧',
                        url:musicPath+"7680A0402DD1E1CB9C997B32915DD547.mp3"
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_3.png',
                        picOn: web.IMG_PATH + '/music/music_3_on.png',
                        name: '下雨的声音',
                        url: musicPath+'B1F99E43188CF4265F7EAD68CAB0DB6A.mp3'
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_4.png',
                        picOn: web.IMG_PATH + '/music/music_4_on.png',
                        name: '空灵冥想',
                        url: musicPath+'9345B970BBA7FB4AE5C6512243052B12.mp3'
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_5.png',
                        picOn: web.IMG_PATH + '/music/music_5_on.png',
                        name: '森林',
                        on:true,
                        url: musicPath+'C226C451614BD17FC04AF36FADCF084E.mp3'

                    },
                    {
                        pic: web.IMG_PATH + '/music/music_6.png',
                        picOn: web.IMG_PATH + '/music/music_6_on.png',
                        name: '风吹草地',
                        url: musicPath+'13AD945A10F80489BAC91112569C1423.mp3'
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_7.png',
                        picOn: web.IMG_PATH + '/music/music_7_on.png',
                        name: '鸟叫空谷回响',
                        url: musicPath+'D4D18174DBFD22D095FD1553DF4A032F.mp3'
                    },
                    {
                        pic: web.IMG_PATH + '/music/music_8.png',
                        picOn: web.IMG_PATH + '/music/music_8_on.png',
                        name: '小溪流水',
                        url:musicPath+'0E53AD917CC49D46C6086526E74E9B93.mp3'
                    }
                ]
            }
        },
        methods: {
            select:function (index) {
                for(let i=0;i<this.musicList.length;i++){
                    this.musicList[i].on=false
                }
                this.musicList[index].on=true;
                this.$set(this.musicList, index, this.musicList[index]);
                this.url=this.musicList[index].url;

                if(this.timeout!=null)clearTimeout(this.timeout);
                if( this.audio!=null){
                    this.audio.pause()
                }
                this.audio=document.createElement("audio");
                this.audio.loop="loop";
                this.audio.src=this.url;//路径
                this.isPlay=false;
                this.audio.autobuffer=true;
                this.play()
            },
            play:function () {
                if(this.timeout!=null)clearTimeout(this.timeout);
                if(this.audio!=null){
                    if (this.audio.paused) {
                        this.audio.play();
                        this.isPlay=true;
                        this.time=0;
                        this.setTimeout();
                    } else {
                        this.audio.pause();// 这个就是暂停
                        this.noteTime="已经停止播放";
                        this.isPlay=false;
                    }
                }

            },
            changeRTime:function(){
                if(this.autoCloseTime<60){
                    this.autoCloseTime +=20
                }else{
                    this.autoCloseTime =20;
                }
                this.time=0;
                if(this.timeout!=null)clearTimeout(this.timeout);
                if(this.audio!=null){
                    if (this.audio.paused) {
                    }else{
                        this.setTimeout();
                    }
                }

            },
            setTimeout:function () {
                let _this=this;
                this.time ++;
                let lastTime = this.autoCloseTime*60 - this.time;

                let lastMin=parseInt(lastTime / 60);
                if(lastMin<10&&lastMin!=0){
                    lastMin="0"+lastMin;
                }else if(lastMin==0){
                    lastMin="00";
                }

                let lastSen=lastTime % 60;
                if(lastSen<10&&lastSen!=0){
                    lastSen="0"+lastSen;
                }else if(lastSen==0){
                    lastSen="00";
                }

                if(this.audio!=null) {

                    // 获取已缓冲部分的 TimeRanges 对象
                    var timeRanges = this.audio.buffered;// 获取以缓存的时间
                  //  var timeBuffered = timeRanges.end(timeRanges.length - 1);// 获取缓存进度，值为0到1
                  //  var bufferPercent = timeBuffered / this.audio.duration;
                    console.log(timeRanges)
                    if(timeRanges.length!=1){this.showLoad=true}else{this.showLoad=false}
                }


                this.noteTime= lastMin+":"+lastSen+"后停止";
                console.log(this.time)
                if( this.time >= this.autoCloseTime*60||(this.audio!=null&&this.audio.paused) ){
                    if(this.audio!=null){
                        this.audio.pause();// 这个就是暂停
                        this.isPlay=false;
                        this.noteTime="已经停止播放";
                        if(this.timeout!=null)clearTimeout(this.timeout);
                    }
                }else{
                    this.timeout = setTimeout(function () {
                        _this.setTimeout()
                    },1000)
                }

            },

        },
        mounted: function () {
            xqzs.wx.setConfig(this);
            this.audio=document.createElement("audio");
            this.audio.loop="loop";
            this.audio.autobuffer=true;
            this.audio.src=this.url;

        },
        beforeDestroy:function () {
            if(this.audio!=null){
                if (this.audio.paused) {
                }else{
                    this.play();
                }
            }
        }
    }


</script>

<style>


    .music_bg {
        height: 100%;
        background:#00b9e8; background-size: 100% 100%
    ;
    }

    .music_list {
        height: 81%;
        overflow: scroll
    }

    .music_list li {
        width: 60%;
        clear: both;
        margin-left: 30%;
        padding: 2rem 0
    }

    .music_list li:last-child {
        padding-bottom: 5rem;
    }

    .music_list .icon{ background:#09bb07; background-size:14.11764705882353rem }
    .music_list .icon {
        height: 3.529411764705882rem;
        width: 3.529411764705882rem;
        float: left
    }
    .music_list li:nth-child(1) .icon{
        background-position: 0 0;
    }
    .music_list li:nth-child(1) .icon.on{
        background-position: 0 -3.529411764705882rem;
    }
    .music_list li:nth-child(2) .icon{
        background-position: -3.529411764705882rem 0;
    }
    .music_list li:nth-child(2) .icon.on{
        background-position: -3.529411764705882rem -3.529411764705882rem;
    }
    .music_list li:nth-child(3) .icon{
        background-position: -7.058823529411764rem 0;
    }
    .music_list li:nth-child(3) .icon.on{
        background-position: -7.058823529411764rem -3.529411764705882rem;
    }
    .music_list li:nth-child(4) .icon{
        background-position: -10.58823529411765rem 0;
    }
    .music_list li:nth-child(4) .icon.on{
        background-position: -10.58823529411765rem -3.529411764705882rem;
    }

    .music_list li:nth-child(5) .icon{
        background-position: 0 -7.058823529411764rem;
    }
    .music_list li:nth-child(5) .icon.on{
        background-position: 0 -10.58823529411765rem;
    }
    .music_list li:nth-child(6) .icon{
        background-position: -3.529411764705882rem -7.058823529411764rem;
    }
    .music_list li:nth-child(6) .icon.on{
        background-position: -3.529411764705882rem -10.58823529411765rem;
    }
    .music_list li:nth-child(7) .icon{
        background-position: -7.058823529411764rem -7.058823529411764rem;
    }
    .music_list li:nth-child(7) .icon.on{
        background-position: -7.058823529411764rem -10.58823529411765rem;
    }
    .music_list li:nth-child(8) .icon{
        background-position: -10.58823529411765rem -7.058823529411764rem;
    }
    .music_list li:nth-child(8) .icon.on{
        background-position: -10.58823529411765rem -10.58823529411765rem;
    }
    .music_list .name {
        color: #8382a8;
        float: left;
        font-size: 0.8823529rem;
        margin-left: 1.2rem;
        height:3.529411764705882rem;
        width: 5.8470588rem;
        line-height: 3.529411764705882rem;
        display: inline-block
    }

    .music_controller {
        height: 19%;
        background: #1b1b33;
        position: relative
    }


    .music_note{   left:1.7rem;position: absolute;top: 50%;   margin-top:0.856rem  ;color:#6a6485; font-size: 0.70588rem;}

    .playing{   width:2.5rem;
        height: 1.3rem; position: absolute; top: 50%;
        left:2.5rem;
        margin-top: -0.8rem}
    .playing div{ width: 0.15rem; height: 100%; position: absolute; bottom:0; left:0; margin: 0 2px; background: #6a6485}
    .playing.play div{

        animation:playing 1s infinite;
        -webkit-animation:playing 1s infinite;

    }
    @keyframes playing {
        0% {
            height: 0;
        }
        50% {
            height: 100%;
        }
        100% {
            height: 0;
        }
    }
    .playing div:nth-child(1){
        left:0%;
        height: 10%;
        animation-delay:0.1s;
        -webkit-animation-delay:0.1s;
    }
    .playing div:nth-child(2){
        left:20%;
        height: 40%;
        animation-delay:0.3s;
        -webkit-animation-delay:0.3s;
    }
    .playing div:nth-child(3){
        left:40%;
        height: 20%;
        animation-delay:0.2s;
        -webkit-animation-delay:0.2s;
    }
    .playing div:nth-child(4){
        left:60%;
        height: 80%;
        animation-delay:0.6s;
        -webkit-animation-delay:0.6s;
    }
    .playing div:nth-child(5){
        left:80%;
        height: 100%;
        animation-delay:0.5s;
        -webkit-animation-delay:0.5s;
    }




    .music_play {

        background-size: 3.7058823529rem 3.7058823529rem;
        width: 3.7058823529rem;
        height: 3.7058823529rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1.8529411rem;
        margin-top: -1.8529411rem
    }
    .music_play.stop{
        background-size: 3.7058823529rem 3.7058823529rem;}

    .music_auto_close {
        position: absolute;
        top: 50%;
        right: 10%;
        width: 3.7058823529rem;
        height: 3.7058823529rem;
        margin-top: -1.8529411rem;
        text-align: center
    }

    .music_auto_close .time {
        color: #6a6485;
        line-height: 2.029411rem;
        border: 1px solid #645c81;
        border-radius: 50%;
        height: 2.029411rem;
        width: 2.029411rem;
        display: inline-block;
        margin-top: 0.2rem;
    }

    .music_auto_close .txt {
        color: #6a6485;
        font-size: 0.7058823rem;
        display: block;
        margin-top: 6px;
    }
    .music_list .name.txt_on{ color:#77c7f5 }
</style>