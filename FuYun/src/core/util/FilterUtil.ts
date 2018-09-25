module game {
	export class FilterUtil {
		public constructor() {
		}

		private static vertexSrc = "attribute vec2 aVertexPosition;\n" +
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

		private static fragmentSrc_lightFlow = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "uniform float customUniform;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 5. + uvs.y * 2.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
		private static fragmentSrc_waterRipple = [
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

		/**水波纹 */
		public static setWaterRippleFilter(display:egret.DisplayObject, callback?:Function, callbackobj?:any){
			let filter = new egret.CustomFilter(this.vertexSrc, this.fragmentSrc_waterRipple,{
				center: { x: 0.5, y: 0.5 },
				params: { x: 10, y: 0.8, z: 0.1 },
				time: 0
			});
			display.filters = [filter];
			let frameCall = ()=>{
				filter.uniforms.time += 0.03;
				if (filter.uniforms.time > 1) {
					filter.uniforms.time = 0.0;
					display.filters = [];
					display.removeEventListener(egret.Event.ENTER_FRAME, frameCall, this);
					if(callback && callbackobj) callback.call(callbackobj);
				}
			}
			display.addEventListener(egret.Event.ENTER_FRAME, frameCall, this);
		}

            /**流光 */
            public static setLightFlowFilter(display:egret.DisplayObject, open:boolean=true){
                  if(open){
                        let filter = new egret.CustomFilter(this.vertexSrc, this.fragmentSrc_lightFlow,{
                              customUniform: 0
                        });
                        display.filters = [filter];
                        let frameCall = ()=>{
                              filter.uniforms.customUniform += 0.15;
                              if (filter.uniforms.customUniform > Math.PI * 2) {
                                    filter.uniforms.customUniform = 0.0;
                              }
                        }
                        display.addEventListener(egret.Event.ENTER_FRAME, frameCall, this);
                  }
                  else{
                        display.filters = [];
                  }
            }
	}
}