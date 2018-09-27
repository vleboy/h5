module game {
	export class LoginVO extends BaseVO{
		public constructor() {
			super();
		}
		public payload:{
			betLevel: number;
			betcfg: number[];
			featureData: {
				buff: string;
				featureBonusData: {};
				featureChanceCount: number;
				featureMultiplier: number;
				featureRoundGold: string;
				freeSpinRemainCount: number;
			};
			multiLevel: number;
			multicfg: number[];
			token: string;
			userBalance: string;
			nickname: string;
		}
	}
}