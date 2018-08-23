module game {
	export class SpinVO extends BaseVO{
		public constructor() {
			super();
		}

		public payload: {
			bet: number;
			featureData: {
				buff: string;
				featureBonusData: {
					gold: number;
					grid: number[];
				}
				featureChanceCount: number;
				featureMultiplier: number;
				featureRoundGold: string;
				freeSpinRemainCount: number;
			};
			getFeatureChance: boolean;
			preBalance: number;
			scatterGold: number;
			scatterGrid: number[];
			totalBet: string;
			totalGold: number;
			userBalance: string;
			viewGrid: string[];
			winGrid: {
				gold: number;
				line: number[];
				lineIndex: number;
				multiplier: number;
				symbol: string;
				winCard: number[];
			}[];
			/**normal middle big mega super*/
			winLevel: string
		}
	}
}