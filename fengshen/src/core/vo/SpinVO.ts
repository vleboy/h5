module game {
	export class SpinVO extends BaseVO{
		public constructor() {
			super();
		}

		public payload: {
			/**本轮单注 */
			bet: number;
			/**免费游戏数据 */
			featureData: {
				/**选择的免费游戏模式 -1：无，1,2,3,4,5：对应的五种模式 */
				buff: string;
				/**Bonus奖励数据 */
				featureBonusData: {
					gold: number;
					grid: number[];
				}
				/**当前剩余的特色游戏选择机会次数 */
				featureChanceCount: number;
				/**当前由于wild替换所随机到的翻倍因子 */
				featureMultiplier: number;
				/**本轮免费转动的中奖金额 */
				featureRoundGold: string;
				/**当前免费转动剩余次数 */
				freeSpinRemainCount: number;
			};
			/**是否获得免费机会 */
			getFeatureChance: boolean;
			preBalance: number;
			/**scatter中奖金额 */
			scatterGold: number;
			/**scatter的中奖分布*/
			scatterGrid: number[];
			/**本轮总下注 */
			totalBet: string;
			/**本轮总共中奖 */
			totalGold: number;
			userBalance: string;
			viewGrid: string[];
			wildFlow: number[];
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