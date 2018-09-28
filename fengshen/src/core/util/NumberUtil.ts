module game {
	export class NumberUtil {
		public constructor() {
		}
		public static toFixed2(n:number):string {
			if(n != +n.toFixed(2)) return n.toFixed(2);
			else return n+"";
		}
	}
}