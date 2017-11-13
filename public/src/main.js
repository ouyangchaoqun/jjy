import App from './App.vue';
import appTransition from "./component/appTransition.vue"
Vue.use(VueRouter);
Vue.use(VueResource);
let routers =
    [
        {
            path: '/',
            name: 'appTransition',
            component: appTransition, // 引入页面切换组件
            children: [
                require('./routes/index'),
                require('./routes/asker/ask'),
                require('./routes/asker/my/index'),
                require('./routes/asker/my/income'),
                require('./routes/asker/my/income_list'),
                require('./routes/asker/my/listen_list'),
                require('./routes/asker/my/answer_list'),
                require('./routes/asker/my/comment_list'),
                require('./routes/asker/listen'),
                require('./routes/asker/listen_detail'),
                require('./routes/asker/my/ask_list'),
                require('./routes/asker/my/ask_detail'),
                require('./routes/asker/my/ask_race_detail'),
                require('./routes/answer/race_list'),
                require('./routes/answer/answer'),
                require('./routes/answer/detail'),
                require('./routes/answer/index'),
                require('./routes/answer/list'),
                require('./routes/answer/ask_list'),
                require('./routes/answer/comment'),
                require('./routes/answer/my/index'),
                require('./routes/answer/my/income'),
                require('./routes/answer/my/level'),
                require('./routes/answer/my/set_answer'),
                require('./routes/answer/my/comment_list'),
                require('./routes/answer/my/answer_list'),
                require('./routes/answer/my/fans'),
                require('./routes/answer/my/perfect'),
                require('./routes/answer/my/message'),
                require('./routes/answer/my/income_list'),
                require('./routes/answer/my/set_qualification'),
                require('./routes/answer/join/mobile'),
                require('./routes/answer/join/join_step'),
                require('./routes/answer/join/base_info'),
                require('./routes/answer/join/field'),
                require('./routes/answer/join/qualification'),
                require('./routes/answer/join/introduce'),
                require('./routes/answer/join/training'),
                require('./routes/answer/join/good_at'),
                require('./routes/answer/join/sign'),
                require('./routes/answer/join/voice'),
                require('./routes/answer/join/price'),
                require('./routes/answer/join/identity'),
                require('./routes/answer/join/reviewing')
            ]
        }
    ];

let router = new VueRouter({
    routes: routers
});

router.beforeEach((to, from, next) => {
    console.log('路由全局勾子：beforeEach');
    xqzs.voice.pause();
    wx.stopRecord();
    let localId = xqzs.localdb.get("voice_localId");
    if (localId && localId != "") {
        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
        wx.stopVoice({
            localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    }
    xqzs.localdb.set('voice_localId','');
    next()
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

Vue.directive('title', {
    inserted: function (el, binding) {
        console.log(el);
        document.title = el.innerText;




        el.remove()
    },
    update: function (el, binding) {
        document.title = el.innerText;

        el.remove()
    }
})
