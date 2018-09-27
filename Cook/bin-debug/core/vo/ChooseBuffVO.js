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
    var ChooseBuffVO = (function (_super) {
        __extends(ChooseBuffVO, _super);
        function ChooseBuffVO() {
            return _super.call(this) || this;
        }
        return ChooseBuffVO;
    }(game.BaseVO));
    game.ChooseBuffVO = ChooseBuffVO;
    __reflect(ChooseBuffVO.prototype, "game.ChooseBuffVO");
})(game || (game = {}));
