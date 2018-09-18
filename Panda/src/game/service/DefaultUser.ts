module game {
	export class DefaultUser {
		private static _instance: DefaultUser;
		private constructor() {
		}
		public static getInstance(){
			return this._instance ? this._instance : (this._instance=new DefaultUser());
		}

		/*/*开发环境模拟平台登录 */
		public login(){
			return new Promise(async (resolve, reject)=>{
				try{
					HttpUtil.sendRequest("POST",  
						'https://xbbw2jfb58.execute-api.ap-southeast-1.amazonaws.com/dev/game/login', 
						'{"userName":"'+GlobalConfig.defaultUserName+'","userPwd":"123456","userId":"32ecc451-4950-4a2e-8e75-520fa8113dd1"}')
					.then((resp:any)=>{
						HttpUtil.sendRequest("POST",  
							'https://xbbw2jfb58.execute-api.ap-southeast-1.amazonaws.com/dev/game/player/join', 
							'{"userName":"'+GlobalConfig.defaultUserNameJoin+'","gameId":"40000","sid":"42001","authCode":123456}', 
							{Authorization: resp.data.token})
						.then(resolve);
					});
				}
				catch(e){
					reject("login join err");
				}
			})
		}
	}
}