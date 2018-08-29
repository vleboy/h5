module game {
	export class HttpUtil {
		public constructor() {
		}

		public static sendRequest(method:string="GET", url:string, data?:any, headerData?:any){
			return new Promise((resolve, reject)=>{
				let xhr = new XMLHttpRequest();
				xhr.open(method, url);
				if(headerData){
					for(let key in headerData){
						xhr.setRequestHeader(key, headerData[key]);
					}
				}
				
				xhr.onreadystatechange = () => {
					if (xhr.readyState == 4) {
						switch (xhr.status) {
							case 200:
							case 201:
							case 204:
								try{
									let json = JSON.parse(xhr.responseText);
									if(json && json.code==0){
										resolve(json);
									}
									else{
										reject();
									}
								}
								catch(e){
									reject();
								}
								break;
							default:
								reject();
								break;
						}
					}

				};
				xhr.onerror = (err) => {
					StageUtil.stage.addChild(new game.ErrTip("网络错误", ()=>{location.reload();}, this));
					reject();
				};
				if (data) xhr.send(data);
				else xhr.send();
			})
		}
	}
}