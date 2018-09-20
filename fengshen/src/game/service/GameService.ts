module game {
		export class GameService {
		private static _instance: GameService;
		private constructor() {
		}
		public static getInstance(){
			return this._instance ? this._instance : (this._instance=new GameService());
		}
		public loginVo:LoginVO;
		/**游戏初始数据 */
		private token:string;
		/**登录游戏 */
		public login(){
			return new Promise(async (resolve, reject)=>{
				try{
					if(window["isDebug"]){
						DefaultUser.getInstance().login().then((resp:LoginVO)=>{
							console.log("login resp ",resp);
							this.loginVo = resp;
							this.token = resp.payload.token;

							if(resp.code == 0){
								resolve(resp);
							}
							else{
								reject("auth code err");
							}
						})
						.catch(()=>{
							reject("login err");
						})
					}
					else{
						this.requestInitData().then((resp:LoginVO)=>{
							console.log("login resp ",resp);
							
							this.loginVo = resp;
							this.token = resp.payload.token;

							if(resp.code == 0){
								resolve(resp);
							}
							else{
								reject("auth code err");
							}
						})
						.catch(()=>{
							reject("login err");
						})
					}
					
				}
				catch(e){
					console.log("22222222222222");
					reject("default login err");
				}
				
			});
			
		}
		/**请求游戏初始数据 */
		private requestInitData(){
			return new Promise((resolve, reject)=>{
				HttpUtil.sendRequest(
					"POST",   
					GlobalConfig.host+"/authuser",  
					'{"GameUserID":'+GlobalConfig.gameUserID+',"VerifyCode":'+GlobalConfig.verifyCode+'}'
				)
				.then((resp:LoginVO)=>{
					resolve(resp);
				})
				.catch(()=>{
					reject("auth error");
				});
			})
		}
		/**下注 */
		public sendSpin(betLevel:number, hotkey?: string){
			return new Promise((resolve, reject)=>{
				HttpUtil.sendRequest("POST",  
					GlobalConfig.host+'/spin'+(hotkey?("?hotkey="+hotkey):""), 
					'{"betLevel":'+betLevel+',"multiLevel":0}',
					{Authorization: 'Bearer ' + this.token})
				.then(resolve)
				.catch(reject);
			})
		}
		/**选择免费游戏 传入1-5,代表5:20, 4:15, 3:10, 2:8, 1:5*/
		public sendFreeChoose(n:number){
			return new Promise((resolve, reject)=>{
				HttpUtil.sendRequest("POST",  
					GlobalConfig.host+'/choosebuff',
					'{"buff":'+n+'}',
					{Authorization: 'Bearer ' + this.token})
				.then(resolve)
				.catch(reject);
			})
		}
	}
}