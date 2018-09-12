module game {
	export class ChooseBuffVO extends BaseVO{
		public constructor() {
			super();
		}

		public payload: {
			featureData: {
				buff: string;
				freeSpinRemainCount: number;
			}
		}
	}
}