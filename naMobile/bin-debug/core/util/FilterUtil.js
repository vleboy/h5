var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var FilterUtil = (function () {
        function FilterUtil() {
        }
        /**水波纹 */
        FilterUtil.setWaterRippleFilter = function (display, callback, callbackobj) {
            var _this = this;
            var filter = new egret.CustomFilter(this.vertexSrc, this.fragmentSrc_waterRipple, {
                center: { x: 0.5, y: 0.5 },
                params: { x: 10, y: 0.8, z: 0.1 },
                time: 0
            });
            display.filters = [filter];
            var frameCall = function () {
                filter.uniforms.time += 0.03;
                if (filter.uniforms.time > 1) {
                    filter.uniforms.time = 0.0;
                    display.filters = [];
                    display.removeEventListener(egret.Event.ENTER_FRAME, frameCall, _this);
                    if (callback && callbackobj)
                        callback.call(callbackobj);
                }
            };
            display.addEventListener(egret.Event.ENTER_FRAME, frameCall, this);
        };
        FilterUtil.vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        FilterUtil.fragmentSrc_lightFlow = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "uniform float customUniform;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 5.) * 0.2;\n" +
            // "fg.rgb +=  0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
        FilterUtil.fragmentSrc_waterRipple = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",
            "uniform vec2 center;",
            "uniform vec3 params;",
            "uniform float time;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float dist = distance(uv, center);",
            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");
        return FilterUtil;
    }());
    game.FilterUtil = FilterUtil;
    __reflect(FilterUtil.prototype, "game.FilterUtil");
})(game || (game = {}));
//# sourceMappingURL=FilterUtil.js.map