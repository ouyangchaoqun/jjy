var xqzs = xqzs ||{};
xqzs.face = {
    __all__: [
        {id: 1, t: "微笑"}, {id: 2, t: "撇嘴"}, {id: 3, t: "色"}, {id: 4, t: "发呆"}, {id: 5, t: "得意"}, {
            id: 6,
            t: "流泪"
        }, {id: 7, t: "害羞"}, {id: 8, t: "闭嘴"}
        , {id: 9, t: "睡"}, {id: 10, t: "大哭"}, {id: 11, t: "尴尬"}, {id: 12, t: "发怒"}, {id: 13, t: "调皮"}, {
            id: 14,
            t: "呲牙"
        }, {id: 15, t: "惊讶"}, {
            id: 16, t: "难过"
        }, {id: 17, t: "囧"}, {id: 18, t: "抓狂"}, {id: 19, t: "吐"}, {id: 20, t: "偷笑"}
        , {id: 21, t: "愉快"}, {id: 22, t: "白眼"}, {id: 23, t: "傲慢"}, {id: 24, t: "困"}, {id: 25, t: "惊恐"}, {
            id: 26,
            t: "流汗"
        }, {id: 27, t: "憨笑"}, {id: 28, t: "悠闲"}, {id: 29, t: "奋斗"}, {id: 30, t: "咒骂"}
        , {id: 31, t: "疑问"}, {id: 32, t: "嘘"}, {id: 33, t: "晕"}, {id: 34, t: "衰"}, {id: 35, t: "骷髅"}, {
            id: 36,
            t: "敲打"
        }, {id: 37, t: "再见"}, {id: 38, t: "擦汗"}, {id: 39, t: "抠鼻"}, {id: 40, t: "鼓掌"}
        , {id: 41, t: "坏笑"}, {id: 42, t: "左哼哼"}, {id: 43, t: "右哼哼"}, {id: 44, t: "哈欠"}, {id: 45, t: "鄙视"}, {
            id: 46,
            t: "委屈"
        }, {id: 47, t: "快哭了"}, {id: 48, t: "阴险"}, {id: 49, t: "亲亲"}
        , {id: 50, t: "可怜"}, {id: 51, t: "菜刀"}, {id: 52, t: "西瓜"}, {id: 53, t: "啤酒"}, {id: 54, t: "咖啡"}, {
            id: 55,
            t: "猪头"
        }, {id: 56, t: "玫瑰"}, {id: 57, t: "凋谢"}, {id: 58, t: "嘴唇"}, {id: 59, t: "爱心"}
        , {id: 60, t: "心碎"}, {id: 61, t: "蛋糕"}, {id: 62, t: "炸弹"}, {id: 63, t: "便便"}, {id: 64, t: "月亮"}, {
            id: 65,
            t: "太阳"
        }, {id: 66, t: "拥抱"}, {id: 67, t: "强"}, {id: 68, t: "弱"},{id: 69, t: "握手"}, {id: 70, t: "胜利"},{id: 71, t: "抱拳"}, {id: 72, t: "勾引"}
        , {id: 73, t: "拳头"},  {id: 74, t: "OK"},{id: 75, t: "跳跳"},{id: 76, t: "发抖"}, {id: 77, t: "怄火"}, {id: 78, t: "转圈"},{id: 79, t: "大笑"},{id: 80, t: "医生"},{id: 81, t: "大哭"},  {
            id: 82,
            t: "吐舌"
        },  {id: 83, t: "大眼"}, {id: 84, t: "惊恐"}, {id: 85, t: "闭眼"}, {id: 86, t: "藐视"}, {id: 87, t: "嘿哈"}, {id: 88, t: "捂脸"}, {id: 89, t: "奸笑"}, {id: 90, t: "机智"}, {id: 91, t: "肌肉"}
        , {id: 92, t: "皱眉"}, {id: 93, t: "耶"},  {id: 94, t: "礼花"}, {id: 95, t: "鬼"},{id: 96, t: "礼物"}, {id: 97, t: "膜拜"}, {id: 98, t: "红包"}, {id: 99, t: "鸡"}
    ],
    //_reg: new RegExp(/(\[([\u4e00-\u9fa5]{1,3}]))/i, 'g'),
    _allexpount: 0,
    _appendStyle: function (content) {
        var $style = document.createElement("style");
        $style.type = "text/css";
        if ($style.styleSheet) {
            $style.styleSheet.cssText = content;//ie下要通过 styleSheet.cssText写入.
        } else {
            $style.innerHTML = content;
        }
        document.getElementsByTagName("head")[0].appendChild($style);
    },
    _getAllExp: function (content) {
        return content.match(/(\[([\u4e00-\u9fa5]{1,3}]))/ig);
    },
    _replaceByKey: function (content, key) {
        content = content.replace(new RegExp('\\[' + key.t + '\\]', 'gm'), '<a class="exp expsmall exp' + key.id + '"></a>');
        return content;
    },
    _replace: function (content, keys) {
        var that = this;
        for (var i = 0, l = keys.length; i < l; i++) {
            for (var j = 0; j < that._allexpount; j++) {
                if ('[' + that.__all__[j].t + ']' == keys[i]) {
                    content = that._replaceByKey(content, that.__all__[j]);
                    break;
                }
            }
        }
        return content;
    },
    _toParse: function (content) {
        var keys = this._getAllExp(content);
        if (keys && keys.length > 0) {
            return this._replace(content, keys);
        }
        return content;
    },
    init: function () {
        this._allexpount = this.__all__.length;
        var _fh_ = 1.68;
        var _smallfh_ = 1.1;
        var style = 'a.exp{display:inline-block;vertical-align:middle;vertical-align:text-bottom;height:' + _fh_ + 'rem;width:' + _fh_ + 'rem;margin: 0 auto;background-image:url("' + web.IMG_PATH + 'exp.png?v=4");background-size:' + _fh_ + 'rem;}';
        style += 'a.expsmall{height:' + _smallfh_ + 'rem;width:' + _smallfh_ + 'rem;background-size:' + _smallfh_ + 'rem;}';
        $_i = 0;
        var sarr = [];
        while ($_i < this._allexpount) {
            sarr.push('.exp' + ($_i + 1) + '{background-position:0 -' + (($_i) * _fh_) + 'rem;}');
            sarr.push('.expsmall.exp' + ($_i + 1) + '{background-position:0 -' + (($_i) * _smallfh_) + 'rem;}');
            $_i++;
        }
        this._appendStyle(style + sarr.join(''));
    },
    getAll: function () {
        return this.__all__;
    },
    getFaceData: function (start, len) {
        if (this._allexpount > start) {
            var end = Math.min(start + len, this._allexpount);
            var result = [];
            for (var i = start; i < end; i++) {
                result.push(this.__all__[i]);
            }
            return result;
        }
        return [];
    },
    htmlEncode: function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        //s = s.replace(/ /g, "&nbsp;");
        //s = s.replace(/\'/g, "&#39;");
        //s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },
    parse: function (content) {
        if (content && content != null && content != '') {
            content = this.htmlEncode(content);
            content = this.parseEmoji(content);
            return this._toParse(content);
        }
        return '';
    },
    parseEmoji:function (content) {
        try{
            content = content.replace('"','');
            var __ = '{"v":"'+content+'"}';
            var obj = JSON.parse(__);
            content = obj.v;
        }catch(e){
            console.info(content);
            console.info(e);
        }
        return content;
    }
};
xqzs.face.init();