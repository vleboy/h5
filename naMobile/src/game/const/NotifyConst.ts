enum NotifyConst {
	topState=1,
	topReturn,
	//-------------------roulette-----------------
	//------roulette ui=>mediator-------
	/**点击轮盘下注区*/
	touBetsRou,
	/**轮盘点击确定*/
	touSureRou,
	/**轮盘点击撤销*/
	touCancelRou,
	/**轮盘点击重下*/
	touAgainRou
	//------roulette mediator=>其他(不包括ui)-------
}