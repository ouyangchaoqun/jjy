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
                require('./routes/asker/index'),
                require('./routes/asker/my/index'),
                require('./routes/asker/my/income'),
                require('./routes/asker/my/income_list'),
                require('./routes/asker/my/listen_list'),
                require('./routes/asker/my/answer_list'),
                require('./routes/asker/stealListen/stealListen_index'),
                require('./routes/asker/stealListen/steal_detail'),
                require('./routes/asker/myask/myask'),
                require('./routes/answer/race_list'),
                require('./routes/answer/race'),
                require('./routes/answer/detail'),
                require('./routes/answer/index'),
                require('./routes/answer/list'),
                require('./routes/answer/comment'),
                require('./routes/answer/my/income'),
                require('./routes/answer/my/income_list'),
                require('./routes/answer/my/asker_list'),

            ]
        }
    ];

let router = new VueRouter({
    mode: 'history',
    routes: routers
});

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
