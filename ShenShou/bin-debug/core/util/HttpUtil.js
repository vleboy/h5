var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var HttpUtil = (function () {
        function HttpUtil() {
        }
        HttpUtil.sendRequest = function (method, url, data, headerData) {
            var _this = this;
            if (method === void 0) { method = "GET"; }
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url);
                if (headerData) {
                    for (var key in headerData) {
                        xhr.setRequestHeader(key, headerData[key]);
                    }
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        switch (xhr.status) {
                            case 200:
                            case 201:
                            case 204:
                                try {
                                    var json = JSON.parse(xhr.responseText);
                                    if (json && json.code == 0) {
                                        resolve(json);
                                    }
                                    else {
                                        reject();
                                    }
                                }
                                catch (e) {
                                    reject();
                                }
                                break;
                            default:
                                reject();
                                break;
                        }
                    }
                };
                xhr.onerror = function (err) {
                    game.StageUtil.stage.addChild(new game.ErrTip("网络错误", function () { location.reload(); }, _this));
                    reject();
                };
                if (data)
                    xhr.send(data);
                else
                    xhr.send();
            });
        };
        return HttpUtil;
    }());
    game.HttpUtil = HttpUtil;
    __reflect(HttpUtil.prototype, "game.HttpUtil");
})(game || (game = {}));
//# sourceMappingURL=HttpUtil.js.map