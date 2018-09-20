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
    var Tips = (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            return _super.call(this) || this;
        }
        return Tips;
    }(eui.Component));
    game.Tips = Tips;
    __reflect(Tips.prototype, "game.Tips");
})(game || (game = {}));
//# sourceMappingURL=Tips.js.map