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
						'https://8vmsmt5cml.execute-api.ap-southeast-1.amazonaws.com/Fengshen/games/70009/authuser', 
						'{"userId":353107,"gameId":"70009"}')
					.then(resolve);
				}
				catch(e){
					reject("login join err");
				}
			})
		}
	}
}