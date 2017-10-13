/**
 * Created by pc on 2017/6/5.
 */
const answerList = resolve => require(['../../component/answer/list.vue'], resolve)
module.exports = {
    path: vueRoutesBaseUrl+'/answer/list',
    component: answerList

}