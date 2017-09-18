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
                require('./routes/index')
            ]
        }
    ];

let router = new VueRouter({
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