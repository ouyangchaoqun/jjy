/**
 * Created by pc on 2017/5/27.
 */
document.addEventListener("touchstart", function () {
}, false);
var xqzs = {
    price:{
       MAX_ASK_PRICE:1000,
       MIN_ASK_PRICE:10,
       MAX_ANSWER_SET_PRICE:1000,
       MIN_ANSWER_SET_PRICE:10
    },
    constant: {
        PIC_SMALL: '?x-oss-process=image/resize,h_640,w_640/quality,q_100',
        PIC_MIDDLE: '?x-oss-process=image/resize,h_750,w_750/quality,q_100'
    },

    weui: {
        weuiMaskClose: function () {
            $(".weui-mask").removeClass("weui-animate-fade-in").addClass("weui-animate-fade-out");
        },
        active: function (obj) {
            console.log("active")
            obj.on("touchstart", function () {
                $(this).addClass("active")
            }).on("touchend", function () {
                $(this).removeClass("active")
            }).on("touchmove", function () {
                $(this).removeClass("active")
            })
        },
        removeWhenPageChange: function () {
            $(".weui-mask").click();
            $(".weui-mask").remove();
            $("#toast").remove();
            $(".js_dialog").remove();
            $(".actionSheet_wrap").remove();
            $("#action_sheet_edit").remove();

            //
        },
        toast: function (type, msg, fun) {
            var html = "";
            html += '<div id="toast"><div class="weui-mask_transparent"></div><div class="weui-toast">';
            if (type === "success") {
                html += '<i class="weui-icon-success-no-circle weui-icon_toast"></i>';
            }
            if (type === "fail") {
                html += '<i class="weui-icon-safe-warn weui-icon_toast" style="font-size: 40px;"></i>';
            }
            if (type === "tip") {
                html += '<i class="weui-icon_toast" style="height: 1.5rem"></i>';
            }

            html += '<p class="weui-toast__content">' + msg + '</p></div></div>';
            $("body").append(html);
            setTimeout(function () {
                $("#toast").animate({opacity: 0}, 200, function () {
                    $("#toast").remove();
                    if(typeof (fun)==='function') fun();
                });
            }, 800);
        },
        tip: function (msg, fun) {
            var html = "";
            $("#toast").remove();
            html += '<div id="toast"><div class="weui-mask_transparent"></div>';
            var len = msg.length;
            html += '<div class="weui-toast__content weui_tip"><div class="tip_txt">' + msg + '</div></div></div>';
            $("body").append(html);

               var h=$(".weui_tip").outerHeight();
                $(".weui_tip").css({"margin-top":'-'+ (h)/2 +"px"})


            setTimeout(function () {
                $("#toast").animate({opacity: 0}, 200, function () {
                    $("#toast").remove();

                    if (typeof(fun) == "function")
                        fun();
                });
            },1200);
        },
        tipClose: function () {
            $("#toast").remove();
        },
        loading: function () {
            var id = '_weui_loading_' + new Date().getTime();
            var html = '<div id="' + id + '"><div class="weui-mask"><div style="text-align: center;padding-top:100px;"><div class="weui-loading"></div></div></div></div>';
            $("body").append(html);
            return $('#' + id);
        },
        dialog: function (title, msg, cancelFun, submitFun) {
            if (arguments.length == 1 && typeof arguments[0] == 'object') {
                return this._dialog(arguments[0]);
            }
            if (title === "") title = "提示";
            var html = "";
            html += '<div class="js_dialog"  >';
            html += '   <div class="weui-mask weui-animate-fade-in"></div>';
            html += '   <div class="weui-dialog">';
            html += '   <div class="weui-dialog__hd"><strong class="weui-dialog__title">' + title + '</strong></div>';
            html += '   <div class="weui-dialog__bd">' + msg + '</div>';
            html += ' <div class="weui-dialog__ft">';
            html += '    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cancel">取消</a>';
            html += '   <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary submit" style="color:#FE7301">确定</a>';
            html += '   </div>';
            html += '   </div>';
            html += '   </div>';
            $("body").append(html);
            $(".js_dialog .cancel").click(function () {
                xqzs.weui.weuiMaskClose();
                setTimeout(function () {
                    $(".js_dialog").remove();
                }, 300);
                cancelFun();
            });
            $(".js_dialog .submit").click(function () {
                xqzs.weui.weuiMaskClose();
                submitFun();
                setTimeout(function () {
                    $(".js_dialog").remove();
                }, 300);
            })
        },
        dialogCustom: function (Html) {
            var html = "";
            html += '<div class="js_dialog"  >';
            html += '   <div class="weui-mask weui-animate-fade-in"></div>';
            html += Html;
            html += '</div>';
            $("body").append(html);
            $(".js_dialog .weui-mask").click(function () {
                xqzs.weui.dialogClose()
            });
            $('.js_dialog .hide_btn').click(function () {
                xqzs.weui.dialogClose()
            })

        },
        dialogClose: function () {
            xqzs.weui.weuiMaskClose();
            $(".js_dialog").addClass("weui-animate-fade-out");
            setTimeout(function () {
                $(".js_dialog").remove()
            }, 300);
        },
        _dialog: function (config) {
            var defaultsize = {
                title: '提示',
                msg: '',
                submitText: '确定',
                submitFun: function () {
                },
                cancelText: '取消',
                cancelFun: function () {
                }
            };
            config = $.extend(defaultsize, config);
            var html = "";
            html += '<div class="js_dialog"  >';
            html += '   <div class="weui-mask weui-animate-fade-in-in"></div>';
            html += '   <div class="weui-dialog">';
            html += '   <div class="weui-dialog__hd"><strong class="weui-dialog__title">' + config.title + '</strong></div>';
            html += '   <div class="weui-dialog__bd">' + config.msg + '</div>';
            html += ' <div class="weui-dialog__ft">';
            html += '    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default cancel">' + config.cancelText + '</a>';
            html += '   <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary submit">' + config.submitText + '</a>';
            html += '   </div>';
            html += '   </div>';
            html += '   </div>';
            $("body").append(html);
            $(".js_dialog .cancel").click(function () {
                $(".js_dialog").animate({opacity: 0}, 200, function () {
                    $(".js_dialog").remove();
                    config.cancelFun();
                });
            });
            $(".js_dialog .submit").click(function () {
                config.submitFun();
                $(".js_dialog").animate({opacity: 0}, 200, function () {
                    $(".js_dialog").remove();
                });
            })
        },
        actionSheet: function (tip, actionName, doFun, cancelFun) {
            var html = "";
            html += '<div class="actionSheet_wrap">';
            html += '   <div class="weui-mask cancel weui-animate-fade-in"   ></div>';

            if (xqzs.isIos()) {
                html += '    <div class="weui-actionsheet " id="weui-actionsheet" >';
                html += '    <div class="weui-actionsheet__menu">';
                html += '      <div class="weui-actionsheet__title weui-actionsheet__title-text">' + tip + '</div>';
                html += '      <div class="weui-actionsheet__cell doAction">' + actionName + '</div>';
                html += '    </div>';
                html += '     <div class="weui-actionsheet__action">';
                html += '       <div class="weui-actionsheet__cell  cancel">取消</div>';
                html += '     </div>';
                html += '   </div>';
            }

            if (xqzs.isAndroid()) {
                html += '   <div class="weui-skin_android"   >';
                html += '   <div class="weui-mask cancel active" ></div>';
                html += '   <div class="weui-actionsheet">';
                html += '      <div class="weui-actionsheet__menu">';
                html += '        <div class="weui-actionsheet__cell doAction">' + actionName + '</div>';
                html += '      </div>';
                html += '   </div>';
                html += '   </div>';
            }

            html += '   </div>';
            $("body").append(html);
            setTimeout(function () {
                $(".actionSheet_wrap .weui-actionsheet").addClass(" weui-actionsheet_toggle");
            }, 10)


            $(".actionSheet_wrap .cancel").click(function () {
                xqzs.weui.weuiMaskClose();
                $(".actionSheet_wrap .weui-actionsheet").removeClass(" weui-actionsheet_toggle");
                $(".actionSheet_wrap").delay(100).animate({opacity: 0}, 200, function () {
                    $(".actionSheet_wrap").remove();
                    cancelFun();
                });
            });
            $(".actionSheet_wrap .doAction").click(function () {
                xqzs.weui.weuiMaskClose();
                doFun();
                $(".actionSheet_wrap .weui-actionsheet").removeClass(" weui-actionsheet_toggle");
                $(".actionSheet_wrap").delay(100).animate({opacity: 0}, 200, function () {
                    $(".actionSheet_wrap").remove();
                });

            })


        },
        textareaAutoOldHeight: 20,
        textareaAutoBaseH: 20,
        textareaHeight: [],
        textareaHover:false,
        textareaAutoHeight: function () {
            var textareaScrollHeight = document.getElementById("textarea").scrollHeight;

            if (xqzs.weui.textareaAutoOldHeight < textareaScrollHeight) {
                xqzs.weui.textareaHeight.push({
                    length: $("#textarea").val().length - 1,
                    height: textareaScrollHeight - 28
                });
            }
             var isset = false;
            for (var i = 0; i < xqzs.weui.textareaHeight.length; i++) {
                if ($("#textarea").val().length == xqzs.weui.textareaHeight[i].length) {

                    //处理到达高度
                    isset = true;
                    $("#textarea").height(xqzs.weui.textareaHeight[i].height);
                    console.log("set");
                    //清除 数组
                    xqzs.weui.textareaHeight.splice(i, 1)


                }
            }


            if (isset == false) $("#textarea").height(document.getElementById("textarea").scrollHeight);
            xqzs.weui.textareaAutoOldHeight = textareaScrollHeight
        },
        //
        actionSheetEditTimeout:function () {
            setTimeout(function () {//设置一个计时器，时间设置与软键盘弹出所需时间相近
                if (xqzs.isIos()) {
                    //document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
                    var localdbkey = "max_edit_height_scrool_top_last3";
                    var nowSH = $('body').scrollTop();
                    var oldH = xqzs.localdb.get(localdbkey);

                    if (nowSH == 0) {
                        xqzs.weui.actionSheetEditTimeout();
                    } else {
                        if (nowSH && nowSH != 0) {
                            if (oldH && oldH != 0) {
                                if (oldH < nowSH) {
                                    xqzs.weui.actionSheetEditTimeout();
                                    xqzs.localdb.set(localdbkey, nowSH)
                                } else {
                                    var lastH = oldH - nowSH;
                                    lastH = lastH + 38;
                                    console.log("oldH:"+oldH);
                                    console.log("nowSH:"+nowSH);
                                    console.log("bottom-lastH:"+lastH);
                                    if(xqzs.weui.textareaHover){
                                        $(".comment_box").animate({bottom: lastH}, 150)
                                    }
                                }
                            } else {
                                xqzs.localdb.set(localdbkey, nowSH)
                            }
                        }
                    }
                }
            }, 800)
        },
        actionSheetEdit: function ( sendText, doFun, cancelFun, placeholder,maxLength,noHide) {
            if(!maxLength){
                maxLength=1000;
            }
            //判断是否已经存在输入框
            if ($("#action_sheet_edit") && $("#action_sheet_edit").hasClass("action-sheet-edit")) {
                return;
            }
            xqzs.weui.textareaAutoOldHeight = xqzs.weui.textareaAutoBaseH;
            xqzs.weui.textareaHeight = [];


            var html = '<div class="action-sheet-edit" id="action_sheet_edit">';
            html += '   <div class="weui-mask cancel weui-animate-fade-in"   ></div>';
            html += ' <div class="comment_box">';
            html += '  <span class="release">' + sendText + '</span>';
            html += '<div class="box"><textarea contenteditable="true" maxlength="'+maxLength+'"  oninput="xqzs.weui.textareaAutoHeight();" class="comment_text" id="textarea" placeholder="' + placeholder + '" ></textarea></div>';
            if(xqzs.isIos()){
                html +='<div style=" height: 44px;    background: #f5f5f5;width: 100%;position: absolute;bottom: -44px;text-align: center;font-size: 12px;color: #ddd; line-height: 30px">一切都好一点</div>';
            }

            html += '  </div>';
            html += '  </div>';

            $("body").append(html);


            var timeout ;
            // //解决第三方软键盘唤起时底部input输入框被遮挡问题
            // var bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
            //
            $(".comment_text").focus(function () {
                xqzs.weui.textareaHover=true;
                xqzs.weui.actionSheetEditTimeout();
            }).blur(function () {
                xqzs.weui.textareaHover=false;
                $(".comment_box").animate({bottom: 0}, 150)
            });
            //.blur(function () {//设定输入框失去焦点时的事件
            //     clearTimeout(interval);//清除计时器
            //      document.body.scrollTop = bfscrolltop;//将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
            // });


            $(".comment_text").keyup(function () {
                var val = $(this).val();
                if (val.length > 0) {
                    $(".action-sheet-edit .release").css({'borderColor': "#05b003", "background": "#09bb07"})
                    $(".comment_p").css('display', 'none')
                } else {
                    $(".action-sheet-edit .release").css({'borderColor': "#91cc91", "background": "#94db93"})
                    $(".comment_p").css('display', 'block');
                }
            });
            if(!noHide){
                $(".comment_text").focus();
            }

            setTimeout(function () {
                $(".comment_box").removeClass('subactive').addClass("addactive");
            }, 10);


            $(".action-sheet-edit .cancel").click(function () {
                xqzs.weui.weuiMaskClose();
                $(".comment_box").removeClass('addactive').addClass("subactive");
                $(".action-sheet-edit").delay(100).animate({opacity: 0}, 200, function () {
                    $(".action-sheet-edit").remove();
                    cancelFun();
                });
            });
            $(".comment_box .release").click(function () {
                var v = $(".comment_text").val();
                if (v !== "") {
                    doFun(v);
                }
                if(noHide){

                }else{
                    xqzs.weui.weuiMaskClose();

                    $(".comment_box").removeClass('addactive').addClass("subactive");
                    $(".action-sheet-edit").delay(100).animate({opacity: 0}, 200, function () {
                        $(".action-sheet-edit").remove();
                    });
                }


            })


        },
    },

    dateTime: {
        DATE_TIME: "date_time",
        TIME: "time",
        DATE_PATH: "date_path",
        DATE: "date",
        _format: function (type, time) {
            time = time * 1000;
            var now = new Date(time);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            if (hour < 10) hour = "0" + hour;
            if (minute < 10) minute = "0" + minute;
            if (second < 10) second = "0" + second;
            if (type === this.DATE_TIME) {
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            } else if (type === this.TIME) {
                return hour + ":" + minute;
            } else if (type === this.DATE_PATH) {
                return year + "/" + month + "/" + date
            } else if (type === this.DATE) {
                return year + "-" + month + "-" + date
            }
        },
        formatTime: function (time) {
            return this._format(this.TIME, time);
        },
        formatDate: function (time) {
            return this._format(this.DATE, time);
        },
        formatDateTime: function (time) {
            return this._format(this.DATE_TIME, time);
        },
        getTimeStamp: function (dateTime) {
            var _timestamp = new Date().getTime();
            if (dateTime) {
                _timestamp = Date.parse(dateTime);
            }
            _timestamp = parseInt(_timestamp / 1000);
            return _timestamp;
        },
        getTimeFormatText: function (publishTime) {
            var d_minutes, d_hours, d_days;
            var timeNow = parseInt(new Date().getTime() / 1000);
            var d;
            d = timeNow - publishTime;
            d_days = parseInt(d / 86400);
            d_hours = parseInt(d / 3600);
            d_minutes = parseInt(d / 60);
            if (d_days > 0 && d_days < 4) {
                return d_days + "天前";
            } else if (d_days <= 0 && d_hours > 0) {
                return d_hours + "小时前";
            } else if (d_hours <= 0 && d_minutes > 0) {
                return d_minutes + "分钟前";
            } else {
                var s = new Date(publishTime * 1000);
                // s.getFullYear()+"年";
                return (s.getMonth() + 1) + "月" + s.getDate() + "日";
            }
        },

        getTimeFormatLastText: function (publishTime) {
            var d_minutes, d_hours;
            var timeNow = parseInt(new Date().getTime() / 1000);
            var d;
            d = publishTime - timeNow;
            d_hours = parseInt(d / 3600);
            d_minutes = parseInt(d / 60);
            if (d_hours > 0) {
                return "剩" + d_hours + "小时";
            } else if (d_hours <= 0 && d_minutes > 0) {
                return "剩" + d_minutes + "分钟";
            } else {
                return "剩" + d + "秒钟";
            }
        },
        getSolarData: function (beginYear, endYear) {
            var data = [];
            for (var i = beginYear; i <= endYear; i++) {
                var months = [];
                for (var mi = 1; mi <= 12; mi++) {
                    //正常月
                    var days = [];
                    var daycount = calendar.solarDays(i, mi);
                    for (var di = 1; di <= daycount; di++) {
                        days.push({value: di, label: di + "日"})
                    }
                    months.push({value: mi, label: mi + "月", children: days});

                }
                data.push({value: i, label: i + "年", children: months})
            }
            return data;
        },
        getLunarData: function (beginYear, endYear) {
            var data = [];
            for (var i = beginYear; i <= endYear; i++) {
                var leapMonth = calendar.leapMonth(i); //第几个月是闰月 没有返回0
                var months = [];
                var leapDays = 0;
                if (leapMonth != 0) {
                    leapDays = calendar.leapDays(i)  //闰月天数
                }
                for (var mi = 1; mi <= 12; mi++) {
                    //正常月
                    var days = [];
                    var daycount = calendar.monthDays(i, mi);
                    for (var di = 1; di <= daycount; di++) {
                        days.push({value: di, label: calendar.toChinaDay(di)})
                    }
                    months.push({value: mi, label: calendar.toChinaMonth(mi), children: days});
                    //增加一个闰月
                    if (leapMonth == mi) {
                        days = [];
                        for (var di = 1; di <= leapDays; di++) {
                            days.push({value: di, label: calendar.toChinaDay(di)})
                        }
                        months.push({value: mi + "_1", label: "闰" + calendar.toChinaMonth(mi), children: days})
                    }
                }
                data.push({value: i, label: i + "年", children: months})
            }
            return data;
        }
    },


    /**
     * 是否可以将base64转成blob对象
     * @param dataurl
     * @returns {*}
     */
    dataURLtoBlob: function (dataurl) {
        try {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: mime
            });
        } catch (e) {
            return false;
        }
    },
    localdb: {
        storage: window.localStorage,
        set: function (key, value) {
            this.storage.setItem(key, value);
        },
        get: function (key) {
            return this.storage.getItem(key);
        },
        remove: function (key) {
            this.storage.removeItem(key);
        },
        clear: function () {
            this.storage.clear();
        }
    },
    shortname: function (value, len) {
        if (!value) return '';
        if (value.length > len) {
            return value.substring(0, len) + '...';
        } else {
            return value;
        }

    },
    resizepicture: function (img, size) {
        var defaultsize = {w: 10, h: 10};
        $.extend(defaultsize, size);
        var imgcss = {};
        var _w = img.data('w') || 1, _h = img.data('h') || 1;
        if (_w * size.h > _h * size.w) {
            var $w = _w * size.h / _h;
            var marginleft = 0;
            if ($w > size.w) {
                marginleft = (size.w - $w) / 2;
            }
            imgcss = {'height': size.h + 'px', 'margin-left': marginleft + 'px', 'width': 'auto'};
        } else {
            var $h = _h * size.w / _w;
            var margintop = 0;
            if ($h > size.h) {
                margintop = (size.h - $h) / 2;
            }
            imgcss = {'width': size.w + 'px', 'margin-top': margintop + 'px', 'height': 'auto'};
        }
        img.css(imgcss);
    },

    voice: {
        audio: document.getElementById("audicomeon"),
        listenEnded:function () {
            xqzs.voice.audio.addEventListener('ended', function () {
                xqzs.voice.onEnded()
            }, false);
        },
        onEnded:function () {

        },
        play: function (url) {
            console.log("xqzs.voice.2121 play"+xqzs.voice.audio);
            console.log(navigator);
            if(xqzs.voice.audio!=null){
                if (url && url != '') {
                    // if (!xqzs.voice.audio.paused) xqzs.voice.audio.pause();
                    xqzs.voice.audio.autobuffer = true;
                    xqzs.voice.audio.src = url;//路径
                    console.log("url"+url);

                    // xqzs.voice.audio.preload="auto";
                    // xqzs.voice.audio.play();
                    xqzs.voice.audio.defaultMuted=false;
                    xqzs.voice.audio.muted=false;

                    xqzs.voice.audio.load();
                    xqzs.voice.audio.play();
                    console.log("readyState1"+ xqzs.voice.audio.readyState);

                    document.addEventListener("WeixinJSBridgeReady", function () {
                        console.log("pWeixinJSBridgeReadylayplayplayplayplayplayplay");
                        xqzs.voice.audio.play();
                    }, false);


                    xqzs.voice.audio.play();
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        xqzs.voice.audio.play()
                    }, false);
                    document.addEventListener('YixinJSBridgeReady', function() {
                        xqzs.voice.audio.play()
                    }, false);
                    document.addEventListener("touchstart",function () {
                        xqzs.voice.audio.play()
                    }, false);


                    console.log( xqzs.voice);

                    console.log("xqzs.voice.audio.pa222used" + xqzs.voice.audio.paused)
                } else {
                    if (xqzs.voice.audio && xqzs.voice.audio.paused)
                        xqzs.voice.audio.play()
                }
                xqzs.voice.listenEnded()
            }
        },

        pause: function () {
            if (xqzs.voice.audio && xqzs.voice.audio != null) {
                xqzs.voice.audio.pause()
            }
        }

    },
    wx: {
        pay:{
            //支付
            onBridgeReady: function (config,successFun,errorFun) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', config,
                    function (res) {
                        // 使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            if(typeof(successFun)==='function'){
                                successFun()
                            }
                        }else{
                            if(typeof(errorFun)==='function'){
                                errorFun()
                            }
                        }
                    }
                );
            },

            pay: function (config,beforePayFun,successFun,errorFun,reurl,gourl) {
                if(typeof(beforePayFun)==='function'){
                    beforePayFun()
                }
                console.log(config)

                if (typeof window.WeixinJSBridge == "undefined") {
                    $(document).on('WeixinJSBridgeReady', function () {
                        xqzs.wx.pay.onBridgeReady(config,successFun,errorFun)
                    });
                } else {
                    xqzs.wx.pay.onBridgeReady(config,successFun,errorFun)
                }
                // if(xqzs.isIos()){
                //     if(!reurl)reurl=window.location.href;
                //     if(!gourl)gourl=window.location.href;
                //     window.location.href = "http://wx.xqzs.cn/wxpay.php?appId=" + config.appId + "&timeStamp=" + config.timeStamp + "&nonceStr=" + config.nonceStr + "&package=" + config.package + "&signType=" + config.signType + "&paySign=" + config.paySign + "&reurl=" + encodeURIComponent(reurl)+ "&gourl=" + encodeURIComponent(gourl);
                // }else{
                //
                // }





            }
        },
        voice: {
            //开始录音
            startRecord: function () {
                var recordTimer = setTimeout(function () {
                        wx.startRecord({
                                success: function () {
                                    console.log("recordsuccess")
                                },
                                cancel: function () {
                                    alert('用户拒绝授权录音');
                                }
                            }
                        );
                    }
                    , 300)
            },
            // 停止录音
            stopRecord: function (fun) {
                var recordTimer = setTimeout(function () {
                wx.stopRecord({
                    success: function (res) {
                        var localId = res.localId;
                        if (typeof fun == 'function')
                            fun(localId)
                    }
                })},100)
            },
            // 监听自动停止录音
            onRecordEnd: function (fun) {
                wx.onVoiceRecordEnd({
                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function (res) {
                        var localId = res.localId;
                        if (typeof fun == 'function')
                            fun(localId)
                    }
                });
            },
            // 开始播放
            startPlay: function (localId) {
                wx.playVoice({
                    localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            },
            // 暂停播放
            pausePlay: function (localId) {
                wx.pauseVoice({
                    localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
                });
            },
            // 停止播放
            stopPlay: function (localId) {
                wx.stopVoice({
                    localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
                });
            },
            // 监听自动停止播放
            onPlayEnd: function (fun) {
                wx.onVoicePlayEnd({
                    success: function (res) {
                        var localId = res.localId; // 返回音频的本地ID
                        if (typeof fun == 'function')
                            fun(localId)
                    }
                });
            },
            // 上传录音
            upload: function (localId, fun) {
                wx.uploadVoice({
                    localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回音频的服务器端ID
                        if (typeof fun == 'function')
                            fun(serverId)
                    }
                });
            }

        },
        takePhotos: function (sourceType, maxCount, $uploadpicinfo, $alioss, beforeUploadFun, finishUploadFun, errorFun) { //拍照

            if (typeof(sourceType) === "string") {
                sourceType = [sourceType];
            }
            wx.chooseImage({  //拍照获取图片
                count: maxCount, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    beforeUploadFun(localIds.length);
                    for (var i = 0; i < localIds.length; i++) {
                        (function (ix, mylocalIds) {
                            var currLocalId = mylocalIds[ix];
                            wx.getLocalImgData({  // 拿到本地图片
                                localId: currLocalId, // 图片的localID
                                success: function (res) {
                                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                    if (localData.indexOf(";base64,") > 0) {
                                        localData.replace('jgp', 'jpeg');
                                    } else {
                                        localData = "data:image/jpeg;base64," + localData;
                                    }
                                    xqzs.oss.uploadPicture($uploadpicinfo, $alioss, {base64: localData}, finishUploadFun, errorFun, ix);
                                }
                            });
                        }(i, localIds))
                    }
                }
            });
        },
        /**
         * 图片查看
         * @param currentimg string
         * @param imglist array
         */
        previewImage: function (currentimg, imglist) {
            wx.previewImage({
                current: currentimg, // 当前显示图片的http链接
                urls: imglist // 需要预览的图片http链接列表
            });
        },

        setConfig: function (vm, callback) {

            var url = window.location.href.split('#')[0];
            var guest = "";
            if (web.guest) {
                guest = "true"
            }
            url = encodeURIComponent(url)
            vm.$http.get(web.API_PATH + 'wei/xin/config', {params: {url: url, guest: guest}}).then(function (response) {
                response.body.debug = false;
                response.body.jsApiList=['pauseVoice','startRecord','stopRecord','playVoice','uploadVoice','chooseImage',"onVoiceRecordEnd"];

                console.log(response.body)
                wx.config(response.body);
                wx.ready(function () {

                    if (callback && typeof (callback) == "function") {
                        callback()
                    }
                    // wx.checkJsApi({
                    //     jsApiList: response.body.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //     success: function (res) {
                    //
                    //         console.log(res)
                    //     }
                    // });

                    console.log('wx.ready');
                });
                wx.error(function (res) {
                    //可以更新签名
                });
            });
        }

    },
    oss: {


        Size: {
            fill: function (width, height) {
                return '?x-oss-process=image/resize,m_fill,h_' + width + ',w_' + height + '/quality,q_100';
            },
            resize: function (width, height) {
                return '?x-oss-process=image/resize,h_' + width + ',w_' + height + '/quality,q_100';
            }
        },
        resizeImg:function (v,width,height) {
            if(!width){
                width=100;
            }
            if(!height){
                height=100;
            }
            if(v!=undefined&&v!=null&&v!=''){
                return v+ xqzs.oss.Size.resize(width,height)
            }else{
                return '';
            }
        },
        /**
         *
         * @param $uploadpicinfo
         * @param $alioss
         * @param rst lrz压缩过的base64编码
         * @param callback
         * @param error
         */
        uploadPicture: function ($uploadpicinfo, $alioss, rst, callback, error, ix) {
            if (typeof ix == 'undefined') {
                ix = 0;
            }
            var that = this;
            var blob = xqzs.dataURLtoBlob(rst.base64);

            if (blob == false) {
                that._uploadBase64($uploadpicinfo, rst, callback, error, ix);
            } else {
                that._uploadOss($alioss, blob, callback, function () {
                    //直传失败
                    that._uploadBase64($uploadpicinfo, rst, callback, error, ix);
                }, ix);
            }
        },
        /**
         * 上传base64编码
         */
        _uploadBase64: function ($uploadpicinfo, rst, callback, error) {

            error();
            return;
            var postdata = {img: rst.base64, token: $uploadpicinfo.token};
            $.ajax({
                url: $uploadpicinfo.uploadbase64url,
                type: 'POST',
                data: postdata,
                dataType: 'json',
                error: function (data, status, e) {
                    if (typeof error == 'function') {
                        error(e);
                    }
                },
                success: function (json) {
                    callback(json);
                }
            })
        },
        /**
         * 直传OSS
         */
        _uploadOss: function ($alioss, blobobj, callback, error, ix) {
            //附加参数
            var postdata = new FormData();
            $alioss.formdataappend(postdata, function () {
                postdata.append('file', blobobj);
                var oss_host = $alioss.host;
                if (oss_host.indexOf('http://') < 0 && oss_host.indexOf('https://') < 0) {
                    oss_host = 'http://' + $alioss.host;
                }
                $.ajax({
                    url: oss_host,
                    type: 'POST',
                    cache: false,
                    data: postdata,
                    processData: false,
                    contentType: false,
                    dataType: 'JSON',
                    success: function (json) {
                        callback(json, ix);
                    },
                    error: function (data, status, e) {
                        if (typeof error == 'function') {
                            error(e, ix);
                        }
                    }
                });
            });
        }


    },
    version: {
        key: function (tp) {
            return '__v_show' + '_' + tp;
        },
        isshow: function (type) {
            var _ = xqzs.localdb.get(this.key(type)) || '';
            return _ == '';
        },
        showed: function (type) {
            xqzs.localdb.set(this.key(type), 'yes');
        }
    },
    isAndroid: function () {
        return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
    },
    isIos: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
    toDecimal: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    },
    toDecimal2: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return "0.00";
        }
        var f = Math.floor(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        if(!s)return '0.00';
        return s;
    },
    string: {
        checkPrice: function (val) {
            var re = /^[0-9.]+$/;
            return re.test(val);
        },
        //封装验证手机号码
        checkUserPhoneReg: function () {
            var regExpP = /^1[34578]\d{9}$/; //手机号

            if (regExpP.test($('.input_phone').val())) { //test检测$('#user_phone').val()是否符合regExp格式
                //$('#err-lgU').html('√ 检测通过').css('color', 'green');
                return true;
            }
            return false;
        },
        guid: function (glue) {
            glue = glue || ''
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    guid += glue;
            }
            return guid;
        },
        toUtf8: function (str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
        formatPrice: function (v) {
            if(v!=null&&v!=''){
                return xqzs.toDecimal2(v)
            }else{
                return "0.00";
            }

        },
        transferContentBr: function (content) {
            var string = content;
            try {
                string = string.replace(/\r\n/g, "<br>")
                string = string.replace(/\n/g, "<br>");
            } catch (e) {
                alert(e.message);
            }
            return string;
        },
        isCardID: function (sId) {
            var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
            var iSum = 0;
            var info = "";
            if (!/^\d{17}(\d|x)$/i.test(sId)) return false;// "你输入的身份证长度或格式错误";
            sId = sId.replace(/x$/i, "a");
            if (aCity[parseInt(sId.substr(0, 2))] == null) return  false;// "你的身份证地区非法";
            sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
            var d = new Date(sBirthday.replace(/-/g, "/"));
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;// "身份证上的出生日期非法";
            for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
            if (iSum % 11 != 1) return false;// "你输入的身份证号非法";
            //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
            return true;
        }
    },


    image: {
        convertCanvasToImage: function (canvas) {
            //新Image对象，可以理解为DOM
            var image = new Image();
            // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
            // 指定格式 PNG
            image.src = canvas.toDataURL("image/png");
            return image;
        },


        rotateImg: function (img, direction, canvas) {
            //alert(img);
            //最小与最大旋转方向，图片旋转4次后回到原方向
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错

            var height = img.height;
            var width = img.width;

            //var step = img.getAttribute('step');
            var step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //img.setAttribute('step', step);
            /*var canvas = document.getElementById('pic_' + pid);
            if (canvas == null) {
                img.style.display = 'none';
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'pic_' + pid);
                img.parentNode.appendChild(canvas);
            }  */
            //旋转角度以弧度值为参数
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            console.log("step:"+step );
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0,-height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        },

        rotateBase64Image: function ($uploadpicinfo, $alioss,base64data, callback, orientation) {

            console.log("brrbbb2222bbbb");
            console.log(orientation);
            if (orientation != null && orientation != undefined) {

                //先上传到服务器获取到url 后再旋转
                xqzs.oss.uploadPicture($uploadpicinfo, $alioss, {base64: base64data}, function (json,ix) {
                    var canvas = document.createElement("canvas");
                    var image = new Image();
                      console.log(json.data.path)

                    $.ajax({
                        url:json.data.path+"?x-oss-process=image/info",
                        type: 'GET',
                        dataType: 'json',
                        success: function (json2) {
                            if(json2.Orientation.value==orientation){
                                image.crossOrigin  = 'Anonymous';
                                image.onload = function () {
                                    switch (orientation) {
                                        case 6://需要顺时针（向左）90度旋转
                                            xqzs.image.rotateImg(this,'left',canvas);
                                            break;
                                        case 8://需要逆时针（向右）90度旋转
                                            xqzs.image.rotateImg(this,'right',canvas);
                                            break;
                                        case 3://需要180度旋转
                                            xqzs.image.rotateImg(this,'right',canvas);//转两次
                                            xqzs.image.rotateImg(this,'right',canvas);
                                            break;
                                    }
                                    if(typeof (callback)==='function'){
                                        console.log("canvas"+canvas.toDataURL());
                                        callback(canvas.toDataURL() )
                                    }

                                };
                                image.src = json.data.path;
                            }
                        }
                    })

                },function () {

                },0);



            } else {
                if (typeof (callback) === 'function') {
                    callback(base64data)
                }


            }


        },
        hideClip: function () {
            $(".clip_box").remove();
        },
        showClip: function ($uploadpicinfo, $alioss, beforeUploadFun, callFunction) {

            var orientation = null;
            var html = '<article class="htmleaf-container clip_box">\n' +
                '    <div id="clipArea"></div>\n' +
                '    <div class="foot-use">\n' +
                '        <div class="clipUpload blue">\n' +
                '            <label  class="clipbuttonopen" for="clipFile" >选择</label>' +
                '            <input id="clipFile" name="clipFile" type="file"   accept="image/*" multiple  />\n' +
                '        </div>\n' +
                '        <button id="clipBtn">完成</button>\n' +
                '    </div>\n' +
                '    <div id="clip_view"></div>\n' +
                '</article>';

            $("body").append(html);

            var isLoad=false;
            $("#clipArea").photoClip({
                width: 200,
                height: 200,
                file: "#clipFile",
                view: "#clip_view",
                ok: "#clipBtn",
                loadStart: function () {
                    isLoad=false;
                    console.log("照片读取中");
                },
                loadComplete: function () {
                    if(!isLoad){
                        isLoad=true;
                        EXIF.getData(this, function () {

                            orientation = EXIF.getTag(this, 'Orientation');
                            var _img=this;

                            // if(orientation==6){
                            //     _img.style.transform="rotate(90deg)";
                            // }


                            console.log("getData");
                            xqzs.image.rotateBase64Image($uploadpicinfo, $alioss,_img.src, function (url) {

                                _img.src=url
                            }, orientation)

                        });
                        console.log("照片读取完成");
                    }

                },
                clipFinish: function (dataURL) {

                    if (typeof (callFunction) === 'function') {
                        beforeUploadFun();
                        xqzs.image.hideClip()
                        // $("body").append('<img id="clip_img_tmp" src="'+dataURL+'" style="width: 200px; height: 200px; position: absolute; top:100px; right:80px;z-index: 100000000">');
                        xqzs.oss.uploadPicture($uploadpicinfo, $alioss, {base64: dataURL}, callFunction, function () {

                        }, 0);





                    }
                }
            });

        }

    }
};

function myResizePicture(listObj, imgListStr, containerStr) {
    if (!listObj) {
        listObj = $('.myMood_list')
    }
    if (!imgListStr) {
        imgListStr = "moodPhotoLists";
    }
    if (!containerStr) {
        containerStr = "div";
    }

    var maxsize = 750;
    $.each(listObj, function (index, obj) {

        var imgList = $(obj).find('.' + imgListStr)

        var n = imgList.children().length;
        if (n == 1) {
            imgList.addClass('one');
        } else if (n == 2) {
            imgList.addClass('two');
        }

        if (n > 0) {
            //
            var container = imgList.find('' + containerStr + ':eq(0)');
            var images = imgList.find('img');
            var containersize = {
                w: container.width(),
                h: container.height()
            }


            images.each(function () {
                if ($(this).data('type') && $(this).data('type') == 'notresize') {
                    return false;
                }
                //var spliter = 'x';
                //$p = $(this).parent('a').data('size').split(spliter);
                //var iw = parseInt($p[0],10), ih = parseInt($p[1],10);
                var iw = parseInt($(this).data('w'), 10), ih = parseInt($(this).data('h'), 10);


                if (iw > maxsize && ih > maxsize) {
                    if (iw > ih) {
                        iw = parseInt(iw * maxsize / ih, 10);
                        ih = maxsize;
                    }
                    else {
                        ih = parseInt(ih * maxsize / iw, 10);
                        iw = maxsize;
                    }
                    //$(this).parent('a').data('size',iw+spliter+ih);
                }
                var imgstyle = {};
                if (iw * containersize.h > ih * containersize.w) {
                    var $w = iw * containersize.h / ih;
                    var marginleft = 0;
                    if ($w > containersize.w) {
                        marginleft = (containersize.w - $w) / 2;
                    }
                    // imgstyle =
                    //     'height:'+ containersize.h + 'px;margin-left:'+ marginleft + 'px;width:auto'
                    // ;
                    imgstyle = {"height": containersize.h + 'px', "margin-left": marginleft + 'px', 'width': 'auto'};
                } else {
                    var $h = ih * containersize.w / iw;
                    var margintop = 0;
                    if ($h > containersize.h) {
                        margintop = (containersize.h - $h) / 2;
                    }
                    //imgstyle = 'width: '+ containersize.w + 'px;margin-top:'+ margintop + 'px;height:auto';
                    imgstyle = {"width": containersize.w + 'px', "margin-top": margintop + 'px', 'height': 'auto'};
                }

                $(this).css(imgstyle)

            })
        }
    })
}


;(function () {
    var aliyunoss = function (config) {
        this.accessid = '';
        this.accesskey = '';
        this.host = '';
        this.policyBase64 = '';
        this.signature = '';
        this.callbackbody = '';
        this.filename = '';
        this.key = '';
        this.expire = 0;
        this.g_object_name = '';
        this.g_object_name_type = '';
        this.now = 0;
        this.issynctime = false;
        this.serverurl = config.url;
        this.token = config.token || this.randomid();
    }
    aliyunoss.prototype = {
        send_request: function (callback, config) {
            var that = this;
            $.ajax({
                url: that.serverurl,
                type: config.type || 'POST',
                data: {token: that.token},
                dataType: config.dataType || '',
                success: function (data) {
                    callback(data);
                }
            });
        },
        get_signature: function (callback) {
            //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
            if (this.expire < this.now + 3) {
                var that = this;
                that.cleartimer();
                that.send_request(function (data) {
                    //var body = this.send_request();
                    if (data && data.status == 1) {
                        var obj = data.data;
                        that.host = obj['host'];
                        that.policyBase64 = obj['policy'];
                        that.accessid = obj['accessid'];
                        that.signature = obj['signature'];
                        that.now = parseInt(obj['now']);
                        that.expire = parseInt(obj['expire']);
                        that.callbackbody = obj['callback'];
                        that.key = obj['dir'];
                        that.synctime();
                    }
                    callback();
                }, {
                    type: 'post',
                    dataType: 'JSON'
                });
            } else {
                callback();
            }
        },
        cleartimer: function () {
            var that = this;
            if (typeof that.intervaler != 'undefined') {
                clearInterval(that.intervaler);
            }
        },
        synctime: function () {
            var that = this;
            that.intervaler = setInterval(function () {
                that.now += 1;
            }, 1000);
        },
        randomid: function () {
            var len = 32;
            var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var maxPos = chars.length;
            var randomid = '';
            for (i = 0; i < len; i++) {
                randomid += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return randomid;
        },
        //附加参数
        formdataappend: function (postdata, callback) {
            var that = this;
            that.get_signature(function () {
                postdata.append('key', that.key + that.randomid() + '.jpg');
                postdata.append('policy', that.policyBase64);
                postdata.append('OSSAccessKeyId', that.accessid);
                postdata.append('callback', that.callbackbody);
                postdata.append('signature', that.signature);
                postdata.append('token', that.token);

                callback();
            });
        }
    }
    window['aliyunoss'] = aliyunoss;
}());


document.addEventListener("visibilitychange", function () {
    var localId = xqzs.localdb.get("voice_localId");
    if (document.visibilityState == 'hidden') {
        if (xqzs.voice.audio && !xqzs.voice.audio.paused && !xqzs.voice.audio.ended) {
            xqzs.voice.visibilityHidden = true;
            xqzs.voice.pause()
        }


        if (localId && localId != ""&&xqzs.wx.voice.playing===true) {
            xqzs.wx.voice.visibilityHidden = true;
            wx.pauseVoice({
                localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        }


    } else {
        if (xqzs.voice.visibilityHidden === true) {
            xqzs.voice.visibilityHidden = false;
            xqzs.voice.play();
        }

        if (localId && localId != ""&&xqzs.wx.voice.visibilityHidden===true) {
            xqzs.wx.voice.visibilityHidden = false;
            xqzs.wx.voice.startPlay(localId)
        }


    }
});


(function(){
    var myVedio = function(obj){
        this.obj = obj||undefined;
        this.speed = 0.6;
        this.timer = null;
        this.currentnum = 0;
        this.maxnum = 360;
        this.callbackStart=undefined;
        this.callbackEnd=undefined;
        this.callbackPlay=undefined;
        this.callbackPause=undefined;

    }
    myVedio.prototype = {
        init:function(callbackStart,callbackEnd,callbackPlay,callbackPause){
            var that = this;
            that.callbackStart=callbackStart;
            that.callbackEnd=callbackEnd;
            that.callbackPlay=callbackPlay;
            that.callbackPause=callbackPause;
            that.obj.bind('click',function(){
                that.start(that.callbackStart);
            })
        },
        config:function(config){
            // zidingyi canshu
            //
            this.obj = config.obj;
            this.bth = $('.record_voice_box .tip');
            this.maski= $('.record_voice_box .mask i');
            return this;
        },
        initStart:function(){
            // chongzhi
            this.currentnum = 0;
            this.maxnum = 360;
            clearInterval (this.timer)
            $('.right').css('transform', "rotate(0)");
            $('.move').css('transform', "rotate(0)");
            $('.left').css('transform', "rotate(0)");
            $(".pie_left_play ,.pie_right_play").hide();
            $(".pie_left ,.pie_right").css({opacity:1});
        },
        clearTimer:function(){
            if(this.timer){
                clearInterval (this.timer)
            }
        },
        start:function(callbackStart){
            var that = this;
            if(callbackStart&&typeof(callbackStart)=='function'){
                callbackStart()
            }
            that.initStart();
            that.maski.attr("class","end")
            that.bth.html('录音中，点击停止录音')
            that.obj.unbind('click').bind('click',function(){that.end(that.callbackEnd)})
            var num=0 ;
            that.timer = setInterval( function(){
                num += that.speed;
                that.maxNum = num;
                $('.record_voice_box .move').css('transform', "rotate(" + num + "deg)")
                if(num<=180){
                    $('.record_voice_box .left').css('transform', "rotate(" + 0 + "deg)");
                    $('.record_voice_box .right').css('transform', "rotate(" + num + "deg)");
                }else{
                    $('.record_voice_box .left').css('transform', "rotate(" + (num-180) + "deg)");
                }
                if(num>=360){
                    clearInterval (that.timer);
                    that.end()
                }
            },100)
        },
        end:function(callbackEnd){
            var that = this;
            if(callbackEnd&&typeof(callbackEnd)=='function'){
                callbackEnd()
            }



            //播放停止位置that.

            $(".pie_left_play ,.pie_right_play").show();
            $(".pie_left ,.pie_right").css({opacity:0.7});

            console.log(that.maxNum);
            if(that.maxNum<=180){
                $('.record_voice_box .left_play').css('transform', "rotate(" + 0 + "deg)");
                $('.record_voice_box .right_play').css('transform', "rotate(" + that.maxNum + "deg)");
            }else{
                $('.record_voice_box .right_play').css('transform', "rotate(180deg)");
                $('.record_voice_box .left_play').css('transform', "rotate(" + (that.maxNum-180) + "deg)");
            }


            that.bth.html('试听');
            that.maski.attr("class","playing")
            that.obj.unbind('click').bind('click',function(){that.play(that.callbackPlay)})
            that.clearTimer();
        },
        play:function(callbackPlay){
            var that = this;
            if(callbackPlay&&typeof(callbackPlay)=='function'){
                callbackPlay()
            }
            that.clearTimer();

            var num = that.currentnum ;
            //  console.log(num+'  kaishi');
            var isEnd = false;
            that.timer = setInterval( function(){
                num = (num || 0)+that.speed;
//                    console.log(num+'  kaishi');
                if(num>=that.maxNum){
                    that.clearTimer();
                    that.maski.attr("class","playing");
                    that.bth.html('重新播放');
                    isEnd = true;
                    that.obj.unbind('click').bind('click',function(){that.currentnum=0;that.play(that.callbackPlay)})
                    return;
                }
                that.currentnum = num;
                $('.record_voice_box .move').css('transform', "rotate(" + num + "deg)")
                if(num<=180){
                    $('.record_voice_box .left').css('transform', "rotate(" + 0 + "deg)");
                    $('.record_voice_box .right').css('transform', "rotate(" + num + "deg)");
                }else{
                    $('.record_voice_box  .left').css('transform', "rotate(" + (num-180) + "deg)");
                }
            },100)
            if(!isEnd){
                that.maski.attr("class","pause")
                that.obj.unbind('click').bind('click',function(){that.pause(that.callbackPause)})
            }
            that.bth.html('播放中..')
        },
        pause:function(callbackPause){
            if(callbackPause&&typeof(callbackPause)=='function'){
                callbackPause()
            }
            var that = this;
            that.clearTimer();
            that.maski.attr("class","playing")
            that.obj.unbind('click').bind('click',function(){
                that.play(that.callbackPlay);
            })
            that.bth.html('继续试听')
        },
    }
    window['myVideo'] = new myVedio();
}())