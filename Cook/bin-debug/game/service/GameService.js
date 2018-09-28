var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    var GameService = (function () {
        function GameService() {
        }
        GameService.getInstance = function () {
            return this._instance ? this._instance : (this._instance = new GameService());
        };
        /**登录游戏 */
        GameService.prototype.login = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            _a = window["isDebug"];
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, game.DefaultUser.getInstance().login()];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            _a;
                            this.requestInitData().then(function (resp) {
                                console.log("login resp ", resp);
                                _this.loginVo = resp;
                                _this.token = resp.payload.token;
                                if (resp.code == 0) {
                                    resolve(resp);
                                }
                                else {
                                    reject("auth code err");
                                }
                            })
                                .catch(function () {
                                reject("login err");
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            console.log("22222222222222");
                            reject("default login err");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        };
        /**请求游戏初始数据 */
        GameService.prototype.requestInitData = function () {
            return new Promise(function (resolve, reject) {
                game.HttpUtil.sendRequest("POST", game.GlobalConfig.host + "/authuser", '{"GameUserID":' + game.GlobalConfig.gameUserID + ',"VerifyCode":' + game.GlobalConfig.verifyCode + '}')
                    .then(function (resp) {
                    resolve(resp);
                })
                    .catch(function () {
                    reject("auth error");
                });
            });
        };
        /**下注 */
        GameService.prototype.sendSpin = function (betLevel, hotkey) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                game.HttpUtil.sendRequest("POST", game.GlobalConfig.host + '/spin' + (hotkey ? ("?hotkey=" + hotkey) : ""), '{"betLevel":' + betLevel + ',"multiLevel":0}', { Authorization: 'Bearer ' + _this.token })
                    .then(resolve)
                    .catch(reject);
            });
        };
        /**选择免费游戏 传入1-5,代表5:20, 4:15, 3:10, 2:8, 1:5*/
        GameService.prototype.sendFreeChoose = function (n) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                game.HttpUtil.sendRequest("POST", game.GlobalConfig.host + '/choosebuff', '{"buff":' + n + '}', { Authorization: 'Bearer ' + _this.token })
                    .then(resolve)
                    .catch(reject);
            });
        };
        return GameService;
    }());
    game.GameService = GameService;
    __reflect(GameService.prototype, "game.GameService");
})(game || (game = {}));
