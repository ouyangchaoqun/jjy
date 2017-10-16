/**
 * Created by pc on 2017/5/27.
 */
var COOKIE_BASE_NAME="comeon_v2_";
var cookie = {
    set: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = COOKIE_BASE_NAME+ name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get: function (name) {
        var v = window.document.cookie.match('(^|;) ?' +COOKIE_BASE_NAME+ name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(COOKIE_BASE_NAME+name, '', -1);
    }
};