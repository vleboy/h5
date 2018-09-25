var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var BaseUI = (function (_super) {
        __extends(BaseUI, _super);
        function BaseUI() {
            var _this = _super.call(this) || this;
            _this.eventDic = new game.Dictionary();
            _this.once(egret.Event.COMPLETE, function () {
                // console.log("egret.Event.COMPLETE" + egret.getQualifiedClassName(this));
                _this.init();
                _this.onStageResize();
            }, _this);
            return _this;
        }
        BaseUI.prototype.onStageResize = function () {
        };
        /**
         * 事件注册，所有事件的注册都需要走这里
         */
        BaseUI.prototype.registerEvent = function (target, type, callBack, thisObject) {
            var eventParams = {};
            eventParams.target = target;
            eventParams.type = type;
            eventParams.callBack = callBack;
            eventParams.thisObject = thisObject;
            if (target) {
                target.addEventListener(type, callBack, thisObject);
                this.eventDic.setValue(target.hashCode + type, eventParams);
            }
        };
        /**
         * 统一移除所有事件
         */
        BaseUI.prototype.removeAllEvent = function () {
            var eventList = this.eventDic.getAllValue();
            while (eventList.length > 0) {
                var tempEvent = eventList.shift();
                if (tempEvent.target != null) {
                    tempEvent.target.removeEventListener(tempEvent.type, tempEvent.callBack, tempEvent.thisObject);
                }
            }
            this.eventDic.clear();
        };
        /**发送通知*/
        BaseUI.prototype.sendNotify = function (key, body) { game.NotifyManager.getInstance().sendNotify(key, body); };
        /**
         * 资源释放
         * @$isDispos 是否彻底释放资源
         */
        BaseUI.prototype.dispose = function () {
            this.removeAllEvent();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return BaseUI;
    }(eui.Component));
    game.BaseUI = BaseUI;
    __reflect(BaseUI.prototype, "game.BaseUI");
})(game || (game = {}));
//# sourceMappingURL=BaseUI.js.map