window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/skins/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/skins/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/skins/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/skins/eui_skins/HSliderSkin.exml","eui.Panel":"resource/skins/eui_skins/PanelSkin.exml","eui.TextInput":"resource/skins/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/skins/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/skins/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/skins/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/skins/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/skins/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/skins/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/skins/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/skins/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/bigWinSkin.exml'] = window.bigWinSkin = (function (_super) {
	__extends(bigWinSkin, _super);
	function bigWinSkin() {
		_super.call(this);
		this.skinParts = ["yuanbaoGroup","light","bgGroup","payout","winImg","payoutGroup"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.yuanbaoGroup_i(),this.bgGroup_i(),this.payoutGroup_i()];
	}
	var _proto = bigWinSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.yuanbaoGroup_i = function () {
		var t = new eui.Group();
		this.yuanbaoGroup = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bgGroup_i = function () {
		var t = new eui.Group();
		this.bgGroup = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		t.elementsContent = [this.light_i()];
		return t;
	};
	_proto.light_i = function () {
		var t = new game.AMovieClip();
		this.light = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1004;
		t.horizontalCenter = 0;
		t.source = "bigwinLight1_png";
		t.speed = 2.5;
		t.verticalCenter = 0;
		t.width = 2172;
		return t;
	};
	_proto.payoutGroup_i = function () {
		var t = new eui.Group();
		this.payoutGroup = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this.payout_i(),this.winImg_i()];
		return t;
	};
	_proto.payout_i = function () {
		var t = new eui.BitmapLabel();
		this.payout = t;
		t.font = "fnt173_fnt";
		t.height = 173;
		t.horizontalCenter = 0;
		t.letterSpacing = -20;
		t.text = "1235";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	_proto.winImg_i = function () {
		var t = new eui.Image();
		this.winImg = t;
		t.anchorOffsetX = 364;
		t.anchorOffsetY = 54;
		t.height = 108;
		t.horizontalCenter = 40;
		t.source = "BigWin_png";
		t.verticalCenter = -225;
		t.width = 728;
		return t;
	};
	return bigWinSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/bottomSkin.exml'] = window.bottomSkin = (function (_super) {
	__extends(bottomSkin, _super);
	var bottomSkin$Skin1 = 	(function (_super) {
		__extends(bottomSkin$Skin1, _super);
		function bottomSkin$Skin1() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "BetMinus_png";
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin1;
	})(eui.Skin);

	var bottomSkin$Skin2 = 	(function (_super) {
		__extends(bottomSkin$Skin2, _super);
		function bottomSkin$Skin2() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "BetAdd_png";
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin2;
	})(eui.Skin);

	var bottomSkin$Skin3 = 	(function (_super) {
		__extends(bottomSkin$Skin3, _super);
		function bottomSkin$Skin3() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "BetMax_png";
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin3;
	})(eui.Skin);

	var bottomSkin$Skin4 = 	(function (_super) {
		__extends(bottomSkin$Skin4, _super);
		function bottomSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Count_Item2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = bottomSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(22,18,35,16);
			t.source = "Count_Item_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin4;
	})(eui.Skin);

	var bottomSkin$Skin5 = 	(function (_super) {
		__extends(bottomSkin$Skin5, _super);
		function bottomSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Count_Item2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = bottomSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(22,18,35,16);
			t.source = "Count_Item_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin5;
	})(eui.Skin);

	var bottomSkin$Skin6 = 	(function (_super) {
		__extends(bottomSkin$Skin6, _super);
		function bottomSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Count_Item2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = bottomSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(22,18,35,16);
			t.source = "Count_Item_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin6;
	})(eui.Skin);

	var bottomSkin$Skin7 = 	(function (_super) {
		__extends(bottomSkin$Skin7, _super);
		function bottomSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Count_Item2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = bottomSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(22,18,35,16);
			t.source = "Count_Item_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin7;
	})(eui.Skin);

	var bottomSkin$Skin8 = 	(function (_super) {
		__extends(bottomSkin$Skin8, _super);
		function bottomSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Count_Item2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = bottomSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(22,18,35,16);
			t.source = "Count_Item_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin8;
	})(eui.Skin);

	var bottomSkin$Skin9 = 	(function (_super) {
		__extends(bottomSkin$Skin9, _super);
		function bottomSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Help_p_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Help_png")
					])
			];
		}
		var _proto = bottomSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Help_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin9;
	})(eui.Skin);

	var bottomSkin$Skin10 = 	(function (_super) {
		__extends(bottomSkin$Skin10, _super);
		function bottomSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin10;
	})(eui.Skin);

	var bottomSkin$Skin11 = 	(function (_super) {
		__extends(bottomSkin$Skin11, _super);
		function bottomSkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin11;
	})(eui.Skin);

	var bottomSkin$Skin12 = 	(function (_super) {
		__extends(bottomSkin$Skin12, _super);
		function bottomSkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetButton_1_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","disable_png")
					])
			];
		}
		var _proto = bottomSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetButton_0_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin12;
	})(eui.Skin);

	var bottomSkin$Skin13 = 	(function (_super) {
		__extends(bottomSkin$Skin13, _super);
		function bottomSkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Spin_Press_png"),
						new eui.SetProperty("_Image2","source","Spin_Light_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Spin_Disabled_png")
					])
			];
		}
		var _proto = bottomSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Spin_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.horizontalCenter = -8;
			t.source = "Spin_Light_png";
			t.verticalCenter = -10;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin13;
	})(eui.Skin);

	var bottomSkin$Skin14 = 	(function (_super) {
		__extends(bottomSkin$Skin14, _super);
		function bottomSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Spin_Press_png"),
						new eui.SetProperty("_Image2","source","Spin_Light_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Spin_Disabled_png")
					])
			];
		}
		var _proto = bottomSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Spin_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.horizontalCenter = -8;
			t.source = "Spin_Light_png";
			t.verticalCenter = -10;
			return t;
		};
		_proto._Image3_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 5;
			t.source = "Jump_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return bottomSkin$Skin14;
	})(eui.Skin);

	function bottomSkin() {
		_super.call(this);
		this.skinParts = ["BtnLess","BtnMore","BtnMax","betTxt","groupBet","btn_max","btn_100","btn_50","btn_20","btn_10","groupAutoNum","winBg","winLight","helpBtn","betBtn","theBet","winTxt","allBet","autoBtn","cancelAutoBtn","spinBtn","stopSpinBtn","spinArrow","autoImg","autoNum","groupAuto","groupSpin","btmLight","groupBtm"];
		
		this.height = 220;
		this.width = 1920;
		this.elementsContent = [this.groupBet_i(),this.groupAutoNum_i(),this.groupBtm_i()];
	}
	var _proto = bottomSkin.prototype;

	_proto.groupBet_i = function () {
		var t = new eui.Group();
		this.groupBet = t;
		t.bottom = -100;
		t.height = 218;
		t.left = 80;
		t.visible = false;
		t.width = 880;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.BtnLess_i(),this.BtnMore_i(),this.BtnMax_i(),this.betTxt_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(22,26,23,16);
		t.source = "BG_Pop_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.left = 200;
		t.source = "BetInfoBG_png";
		t.verticalCenter = 0;
		t.width = 258;
		return t;
	};
	_proto.BtnLess_i = function () {
		var t = new game.SmallButton();
		this.BtnLess = t;
		t.height = 66;
		t.horizontalCenter = -339;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 106;
		t.skinName = bottomSkin$Skin1;
		return t;
	};
	_proto.BtnMore_i = function () {
		var t = new game.SmallButton();
		this.BtnMore = t;
		t.height = 66;
		t.horizontalCenter = 118;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 106;
		t.skinName = bottomSkin$Skin2;
		return t;
	};
	_proto.BtnMax_i = function () {
		var t = new game.SmallButton();
		this.BtnMax = t;
		t.height = 112;
		t.horizontalCenter = 308;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 180;
		t.skinName = bottomSkin$Skin3;
		return t;
	};
	_proto.betTxt_i = function () {
		var t = new eui.Label();
		this.betTxt = t;
		t.height = 60;
		t.left = 205;
		t.size = 35;
		t.text = "0.00";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 248;
		return t;
	};
	_proto.groupAutoNum_i = function () {
		var t = new eui.Group();
		this.groupAutoNum = t;
		t.bottom = -400;
		t.height = 520;
		t.right = 200;
		t.visible = false;
		t.width = 302;
		t.elementsContent = [this._Image3_i(),this.btn_max_i(),this.btn_100_i(),this.btn_50_i(),this.btn_20_i(),this.btn_10_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(22,26,23,16);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "BG_Pop_png";
		t.top = 0;
		t.x = -1338;
		t.y = 283;
		return t;
	};
	_proto.btn_max_i = function () {
		var t = new game.SmallButton();
		this.btn_max = t;
		t.height = 74;
		t.horizontalCenter = 0;
		t.label = "MAX";
		t.name = "btn_max";
		t.verticalCenter = -196;
		t.width = 234;
		t.skinName = bottomSkin$Skin4;
		return t;
	};
	_proto.btn_100_i = function () {
		var t = new game.SmallButton();
		this.btn_100 = t;
		t.height = 74;
		t.horizontalCenter = 0;
		t.label = "100";
		t.name = "btn_100";
		t.verticalCenter = -98;
		t.width = 234;
		t.skinName = bottomSkin$Skin5;
		return t;
	};
	_proto.btn_50_i = function () {
		var t = new game.SmallButton();
		this.btn_50 = t;
		t.height = 74;
		t.horizontalCenter = 0;
		t.label = "50";
		t.name = "btn_50";
		t.verticalCenter = 0;
		t.width = 234;
		t.skinName = bottomSkin$Skin6;
		return t;
	};
	_proto.btn_20_i = function () {
		var t = new game.SmallButton();
		this.btn_20 = t;
		t.height = 74;
		t.horizontalCenter = 0;
		t.label = "20";
		t.name = "btn_20";
		t.verticalCenter = 98;
		t.width = 234;
		t.skinName = bottomSkin$Skin7;
		return t;
	};
	_proto.btn_10_i = function () {
		var t = new game.SmallButton();
		this.btn_10 = t;
		t.height = 74;
		t.horizontalCenter = 0;
		t.label = "10";
		t.name = "btn_10";
		t.verticalCenter = 196;
		t.width = 234;
		t.skinName = bottomSkin$Skin8;
		return t;
	};
	_proto.groupBtm_i = function () {
		var t = new eui.Group();
		this.groupBtm = t;
		t.bottom = 0;
		t.height = 220;
		t.left = 0;
		t.name = "groupBtm";
		t.touchThrough = true;
		t.width = 1920;
		t.elementsContent = [this._Image4_i(),this.winBg_i(),this.winLight_i(),this._Image5_i(),this.helpBtn_i(),this.betBtn_i(),this._Image6_i(),this.theBet_i(),this._Label1_i(),this.winTxt_i(),this._Image7_i(),this.allBet_i(),this.autoBtn_i(),this.cancelAutoBtn_i(),this.groupSpin_i(),this.btmLight_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 120;
		t.scaleX = 1;
		t.scaleY = -1;
		t.source = "BG_Left_png";
		t.width = 792;
		t.x = 0;
		t.y = 220;
		return t;
	};
	_proto.winBg_i = function () {
		var t = new eui.Image();
		this.winBg = t;
		t.bottom = 0;
		t.height = 140;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "BG_Middle_png";
		t.width = 408;
		t.x = 756;
		t.y = 80;
		return t;
	};
	_proto.winLight_i = function () {
		var t = new eui.Image();
		this.winLight = t;
		t.bottom = 0;
		t.height = 140;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "light_Middle_png";
		t.visible = false;
		t.width = 408;
		t.x = 766;
		t.y = 90;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 120;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "BG_Right_png";
		t.width = 794;
		t.x = 1126;
		t.y = 100;
		return t;
	};
	_proto.helpBtn_i = function () {
		var t = new game.SmallButton();
		this.helpBtn = t;
		t.height = 102;
		t.horizontalCenter = -875;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 50;
		t.width = 100;
		t.skinName = bottomSkin$Skin9;
		return t;
	};
	_proto.betBtn_i = function () {
		var t = new game.SmallButton();
		this.betBtn = t;
		t.height = 85;
		t.horizontalCenter = -676;
		t.label = "下注";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 52.5;
		t.width = 168;
		t.skinName = bottomSkin$Skin10;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 118;
		t.left = 432;
		t.scale9Grid = new egret.Rectangle(66,31,60,58);
		t.scaleX = -1;
		t.source = "BG_Info_png";
		t.width = 345;
		return t;
	};
	_proto.theBet_i = function () {
		var t = new eui.Label();
		this.theBet = t;
		t.bottom = 40;
		t.height = 36;
		t.left = 448;
		t.size = 35;
		t.text = "单注：0.00";
		t.textAlign = "center";
		t.textColor = 0xf3f4f4;
		t.verticalAlign = "middle";
		t.width = 270;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 38;
		t.horizontalCenter = 0;
		t.size = 38;
		t.text = "赢得";
		t.y = 104;
		return t;
	};
	_proto.winTxt_i = function () {
		var t = new eui.Label();
		this.winTxt = t;
		t.bottom = 23;
		t.height = 38;
		t.horizontalCenter = 0;
		t.size = 42;
		t.text = "0.00";
		t.textAlign = "center";
		t.textColor = 0xfdc020;
		t.verticalAlign = "middle";
		t.width = 340;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 118;
		t.right = 432;
		t.scale9Grid = new egret.Rectangle(75,42,59,34);
		t.source = "BG_Info_png";
		t.width = 345;
		return t;
	};
	_proto.allBet_i = function () {
		var t = new eui.Label();
		this.allBet = t;
		t.bottom = 40;
		t.height = 36;
		t.right = 448;
		t.size = 35;
		t.text = "总押注：0.00";
		t.textAlign = "center";
		t.textColor = 0xF3F4F4;
		t.verticalAlign = "middle";
		t.width = 270;
		return t;
	};
	_proto.autoBtn_i = function () {
		var t = new game.SmallButton();
		this.autoBtn = t;
		t.height = 85;
		t.horizontalCenter = 621;
		t.label = "自动转动";
		t.verticalCenter = 52.5;
		t.width = 168;
		t.skinName = bottomSkin$Skin11;
		return t;
	};
	_proto.cancelAutoBtn_i = function () {
		var t = new game.SmallButton();
		this.cancelAutoBtn = t;
		t.height = 85;
		t.horizontalCenter = 621;
		t.label = "取消自动";
		t.verticalCenter = 52.5;
		t.visible = false;
		t.width = 168;
		t.skinName = bottomSkin$Skin12;
		return t;
	};
	_proto.groupSpin_i = function () {
		var t = new eui.Group();
		this.groupSpin = t;
		t.bottom = 0;
		t.height = 228;
		t.right = 0;
		t.width = 230;
		t.elementsContent = [this._Image8_i(),this.spinBtn_i(),this.stopSpinBtn_i(),this.spinArrow_i(),this.groupAuto_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 115;
		t.anchorOffsetY = 114;
		t.bottom = 0;
		t.height = 228;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "BG_Spin_png";
		t.width = 230;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.spinBtn_i = function () {
		var t = new eui.Button();
		this.spinBtn = t;
		t.anchorOffsetX = 87;
		t.anchorOffsetY = 87;
		t.enabled = true;
		t.height = 174;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 4;
		t.width = 174;
		t.skinName = bottomSkin$Skin13;
		return t;
	};
	_proto.stopSpinBtn_i = function () {
		var t = new eui.Button();
		this.stopSpinBtn = t;
		t.anchorOffsetX = 87;
		t.anchorOffsetY = 87;
		t.enabled = true;
		t.height = 174;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 4;
		t.visible = false;
		t.width = 174;
		t.skinName = bottomSkin$Skin14;
		return t;
	};
	_proto.spinArrow_i = function () {
		var t = new eui.Image();
		this.spinArrow = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 68;
		t.height = 136;
		t.horizontalCenter = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Spin_Arrow_png";
		t.touchEnabled = false;
		t.verticalCenter = 6;
		t.width = 144;
		return t;
	};
	_proto.groupAuto_i = function () {
		var t = new eui.Group();
		this.groupAuto = t;
		t.height = 228;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 230;
		t.elementsContent = [this.autoImg_i(),this.autoNum_i()];
		return t;
	};
	_proto.autoImg_i = function () {
		var t = new eui.Image();
		this.autoImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Auto_1_png";
		t.top = 60;
		t.x = 57;
		t.y = 60;
		return t;
	};
	_proto.autoNum_i = function () {
		var t = new eui.Label();
		this.autoNum = t;
		t.bold = true;
		t.height = 55;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 55;
		t.text = "9";
		t.textAlign = "center";
		t.top = 120;
		t.verticalAlign = "middle";
		t.x = 100;
		t.y = 120;
		return t;
	};
	_proto.btmLight_i = function () {
		var t = new eui.Image();
		this.btmLight = t;
		t.bottom = 0;
		t.height = 145;
		t.horizontalCenter = 0;
		t.source = "guang_png";
		t.visible = false;
		t.width = 1920;
		return t;
	};
	return bottomSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/connectTipSkin.exml'] = window.connectTipSkin = (function (_super) {
	__extends(connectTipSkin, _super);
	function connectTipSkin() {
		_super.call(this);
		this.skinParts = ["circle"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Rect2_i(),this.circle_i()];
	}
	var _proto = connectTipSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 200;
		return t;
	};
	_proto.circle_i = function () {
		var t = new eui.Image();
		this.circle = t;
		t.anchorOffsetX = 82;
		t.anchorOffsetY = 87;
		t.height = 174;
		t.horizontalCenter = 0;
		t.source = "circlcce_png";
		t.verticalCenter = 0;
		t.width = 164;
		return t;
	};
	return connectTipSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/errSkin.exml'] = window.errSkin = (function (_super) {
	__extends(errSkin, _super);
	var errSkin$Skin15 = 	(function (_super) {
		__extends(errSkin$Skin15, _super);
		function errSkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sliderBg_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = errSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "fillBg_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return errSkin$Skin15;
	})(eui.Skin);

	function errSkin() {
		_super.call(this);
		this.skinParts = ["errTxt","sureBtn"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = errSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 442;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 872;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.errTxt_i(),this.sureBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 442;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(17,9,108,61);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ToastBG_png";
		t.verticalCenter = 0;
		t.width = 872;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 252;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(15,8,92,50);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ToastBG2_png";
		t.verticalCenter = 0;
		t.width = 834;
		return t;
	};
	_proto.errTxt_i = function () {
		var t = new eui.Label();
		this.errTxt = t;
		t.height = 26;
		t.horizontalCenter = 0;
		t.size = 26;
		t.text = "网络连接错误，是否重连？";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 834;
		return t;
	};
	_proto.sureBtn_i = function () {
		var t = new eui.Button();
		this.sureBtn = t;
		t.bottom = 12;
		t.height = 70;
		t.horizontalCenter = 0;
		t.label = "重新连接";
		t.width = 202;
		t.skinName = errSkin$Skin15;
		return t;
	};
	return errSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/freeChooseSkin.exml'] = window.freeChooseSkin = (function (_super) {
	__extends(freeChooseSkin, _super);
	function freeChooseSkin() {
		_super.call(this);
		this.skinParts = ["rect","choose20","choose15","choose10","choose8","choose5","chooseGroup","tipTxt","yuanbaoGroup"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.chooseGroup_i(),this.tipTxt_i(),this.yuanbaoGroup_i()];
	}
	var _proto = freeChooseSkin.prototype;

	_proto.chooseGroup_i = function () {
		var t = new eui.Group();
		this.chooseGroup = t;
		t.height = 1;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.rect_i(),this.choose20_i(),this.choose15_i(),this.choose10_i(),this.choose8_i(),this.choose5_i()];
		return t;
	};
	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.fillAlpha = 0.7;
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.choose20_i = function () {
		var t = new eui.Group();
		this.choose20 = t;
		t.height = 462;
		t.horizontalCenter = -520;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 517;
		t.y = 64;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.name = "choose20";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cardbg5_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "head_png";
		t.y = 88;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "freegame_png";
		t.x = 252;
		t.y = 15;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "num20_png";
		t.x = 138;
		t.y = 10;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "cardBottom20_png";
		t.y = 343;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wildMulti_png";
		t.y = 360;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "multi5_png";
		t.top = 397;
		return t;
	};
	_proto.choose15_i = function () {
		var t = new eui.Group();
		this.choose15 = t;
		t.height = 462;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 517;
		t.y = 64;
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this._Image12_i(),this._Image13_i(),this._Image14_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 462;
		t.name = "choose20";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cardbg4_png";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "head_png";
		t.y = 88;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "freegame_png";
		t.x = 252;
		t.y = 15;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "num15_png";
		t.x = 138;
		t.y = 10;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "cardBottom15_png";
		t.y = 343;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wildMulti_png";
		t.y = 360;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "multi8_png";
		t.top = 397;
		return t;
	};
	_proto.choose10_i = function () {
		var t = new eui.Group();
		this.choose10 = t;
		t.height = 462;
		t.horizontalCenter = 520;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 517;
		t.y = 64;
		t.elementsContent = [this._Image15_i(),this._Image16_i(),this._Image17_i(),this._Image18_i(),this._Image19_i(),this._Image20_i(),this._Image21_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.height = 462;
		t.name = "choose20";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cardbg3_png";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "head_png";
		t.y = 88;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.source = "freegame_png";
		t.x = 252;
		t.y = 15;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.source = "num10_png";
		t.x = 138;
		t.y = 10;
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "cardBottom10_png";
		t.y = 343;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wildMulti_png";
		t.y = 360;
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "multi10_png";
		t.top = 397;
		return t;
	};
	_proto.choose8_i = function () {
		var t = new eui.Group();
		this.choose8 = t;
		t.height = 462;
		t.horizontalCenter = -330;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 517;
		t.y = 512;
		t.elementsContent = [this._Image22_i(),this._Image23_i(),this._Image24_i(),this._Image25_i(),this._Image26_i(),this._Image27_i(),this._Image28_i()];
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.name = "choose20";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cardbg2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "head_png";
		t.y = 88;
		return t;
	};
	_proto._Image24_i = function () {
		var t = new eui.Image();
		t.source = "freegame_png";
		t.x = 252;
		t.y = 15;
		return t;
	};
	_proto._Image25_i = function () {
		var t = new eui.Image();
		t.source = "num8_png";
		t.x = 186;
		t.y = 10;
		return t;
	};
	_proto._Image26_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "cardBottom8_png";
		t.y = 343;
		return t;
	};
	_proto._Image27_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wildMulti_png";
		t.y = 360;
		return t;
	};
	_proto._Image28_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "multi15_png";
		t.top = 397;
		return t;
	};
	_proto.choose5_i = function () {
		var t = new eui.Group();
		this.choose5 = t;
		t.height = 462;
		t.horizontalCenter = 330;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 517;
		t.y = 512;
		t.elementsContent = [this._Image29_i(),this._Image30_i(),this._Image31_i(),this._Image32_i(),this._Image33_i(),this._Image34_i(),this._Image35_i()];
		return t;
	};
	_proto._Image29_i = function () {
		var t = new eui.Image();
		t.height = 462;
		t.name = "choose20";
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cardbg1_png";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image30_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "head_png";
		t.y = 88;
		return t;
	};
	_proto._Image31_i = function () {
		var t = new eui.Image();
		t.source = "freegame_png";
		t.x = 252;
		t.y = 15;
		return t;
	};
	_proto._Image32_i = function () {
		var t = new eui.Image();
		t.source = "num5_png";
		t.x = 192;
		t.y = 10;
		return t;
	};
	_proto._Image33_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "cardBottom5_png";
		t.y = 343;
		return t;
	};
	_proto._Image34_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wildMulti_png";
		t.y = 360;
		return t;
	};
	_proto._Image35_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "multi30_png";
		t.top = 397;
		return t;
	};
	_proto.tipTxt_i = function () {
		var t = new eui.Image();
		this.tipTxt = t;
		t.horizontalCenter = 0;
		t.source = "freeChoose_png";
		t.y = 1010;
		return t;
	};
	_proto.yuanbaoGroup_i = function () {
		var t = new eui.Group();
		this.yuanbaoGroup = t;
		t.height = 1080;
		t.visible = false;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image36_i(),this._Image37_i(),this._Image38_i(),this._Image39_i(),this._Image40_i(),this._Image41_i(),this._Image42_i(),this._Image43_i()];
		return t;
	};
	_proto._Image36_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1322.0000000000002;
		t.y = -118.00000000000001;
		return t;
	};
	_proto._Image37_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1618.0000000000002;
		t.y = -136;
		return t;
	};
	_proto._Image38_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 918;
		t.y = -178;
		return t;
	};
	_proto._Image39_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 616.5000000000001;
		t.y = -178;
		return t;
	};
	_proto._Image40_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 338;
		t.y = -178;
		return t;
	};
	_proto._Image41_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 34;
		t.y = -228.00000000000003;
		return t;
	};
	_proto._Image42_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1182;
		t.y = -316;
		return t;
	};
	_proto._Image43_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = -106.00000000000001;
		t.y = -136;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image44_i(),this._Image45_i(),this._Image46_i(),this._Image47_i(),this._Image48_i()];
		return t;
	};
	_proto._Image44_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = -106.00000000000001;
		t.y = 78;
		return t;
	};
	_proto._Image45_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 244.00000000000003;
		t.y = 78;
		return t;
	};
	_proto._Image46_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 483.00000000000006;
		t.y = -14;
		return t;
	};
	_proto._Image47_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1106;
		t.y = -14;
		return t;
	};
	_proto._Image48_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 850;
		t.y = 28;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image49_i(),this._Image50_i(),this._Image51_i(),this._Image52_i(),this._Image53_i(),this._Image54_i(),this._Image55_i(),this._Image56_i()];
		return t;
	};
	_proto._Image49_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1566;
		t.y = 334;
		return t;
	};
	_proto._Image50_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1566;
		t.y = 120;
		return t;
	};
	_proto._Image51_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1310;
		t.y = 196.00000000000003;
		return t;
	};
	_proto._Image52_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1002.0000000000001;
		t.y = 196.00000000000003;
		return t;
	};
	_proto._Image53_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 798.0000000000001;
		t.y = 284;
		return t;
	};
	_proto._Image54_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 448;
		t.y = 196.00000000000003;
		return t;
	};
	_proto._Image55_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 104.5;
		t.y = 242;
		return t;
	};
	_proto._Image56_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = -151.5;
		t.y = 242;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image57_i(),this._Image58_i(),this._Image59_i(),this._Image60_i(),this._Image61_i(),this._Image62_i()];
		return t;
	};
	_proto._Image57_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 98.00000000000001;
		t.y = 452;
		return t;
	};
	_proto._Image58_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 406.00000000000006;
		t.y = 412;
		return t;
	};
	_proto._Image59_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 756;
		t.y = 452;
		return t;
	};
	_proto._Image60_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = -151.5;
		t.y = 515.5;
		return t;
	};
	_proto._Image61_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1066;
		t.y = 498;
		return t;
	};
	_proto._Image62_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1362;
		t.y = 412;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image63_i(),this._Image64_i(),this._Image65_i(),this._Image66_i(),this._Image67_i(),this._Image68_i(),this._Image69_i()];
		return t;
	};
	_proto._Image63_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 448.5;
		t.y = 668;
		return t;
	};
	_proto._Image64_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 704.0000000000001;
		t.y = 668;
		return t;
	};
	_proto._Image65_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1054;
		t.y = 754.0000000000001;
		return t;
	};
	_proto._Image66_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 227;
		t.y = 668;
		return t;
	};
	_proto._Image67_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = -63.50000000000001;
		t.y = 708;
		return t;
	};
	_proto._Image68_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1374;
		t.y = 708;
		return t;
	};
	_proto._Image69_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanbao_png";
		t.x = 1566;
		t.y = 590;
		return t;
	};
	return freeChooseSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/freeTotalWinSkin.exml'] = window.freeTotalWinSkin = (function (_super) {
	__extends(freeTotalWinSkin, _super);
	function freeTotalWinSkin() {
		_super.call(this);
		this.skinParts = ["winTxt"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.winTxt_i()];
	}
	var _proto = freeTotalWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "freeWinBG_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "OverBG2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "asdasd_png";
		t.verticalCenter = 0;
		t.x = 1;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "GetTips_png";
		t.x = 558;
		t.y = 274;
		return t;
	};
	_proto.winTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.winTxt = t;
		t.anchorOffsetX = 800;
		t.anchorOffsetY = 90;
		t.font = "fnt173_fnt";
		t.height = 180;
		t.horizontalCenter = 155;
		t.letterSpacing = -5;
		t.text = "0.00";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 1600;
		return t;
	};
	return freeTotalWinSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/gameSceneSkin.exml'] = window.gameSceneSkin = (function (_super) {
	__extends(gameSceneSkin, _super);
	var gameSceneSkin$Skin16 = 	(function (_super) {
		__extends(gameSceneSkin$Skin16, _super);
		function gameSceneSkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetSliderBG_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","BetSliderBG_png")
					])
			];
		}
		var _proto = gameSceneSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetSliderBG_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return gameSceneSkin$Skin16;
	})(eui.Skin);

	var gameSceneSkin$Skin17 = 	(function (_super) {
		__extends(gameSceneSkin$Skin17, _super);
		function gameSceneSkin$Skin17() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","BetSliderBG_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","BetSliderBG_png")
					])
			];
		}
		var _proto = gameSceneSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BetSliderBG_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return gameSceneSkin$Skin17;
	})(eui.Skin);

	function gameSceneSkin() {
		_super.call(this);
		this.skinParts = ["bg","bgFree","kuang","kuangFree","title","borderGroup","tileMask","border2","border3","border4","freeCoinsGroup","freeEffectGroup","tile0","tile1","tile2","tile3","tile4","tile5","tile6","tile7","tile8","tile9","tile10","tile11","tile12","tile13","tile14","valueTiles","vagueTile0","vagueTile1","vagueTile2","vagueTile3","vagueTile4","vagueTile5","vagueTile6","vagueTile7","vagueTile8","vagueTile9","vagueTile10","vagueTile11","vagueTile12","vagueTile13","vagueTile14","vagueTile15","vagueTile16","vagueTile17","vagueTile18","vagueTile19","vagueTiles","particleBg","winGridGroup","bonusEffectGroup","particleGroup","tileGroup","lineWinTxt","freeCountBg","freeChooseCountBg","freeChooseCountTxt","freeMulti","freeMultiGroup","contentGroup","bottomBar","topBar","testBtn1","testBtn","bigwinTxt","bigWinGroup","freeChangeMc","freeChangeImg","freeChanceGroup","freeChooseCountBoom","bigWin","setting","freeChoose","freeTotalWin","rull","tips","connectTip"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.bg_i(),this.bgFree_i(),this.contentGroup_i(),this.bottomBar_i(),this.topBar_i(),this.testBtn1_i(),this.testBtn_i(),this.bigWinGroup_i(),this.freeChanceGroup_i(),this.freeChooseCountBoom_i(),this.bigWin_i(),this.setting_i(),this.freeChoose_i(),this.freeTotalWin_i(),this.rull_i(),this.tips_i(),this.connectTip_i()];
	}
	var _proto = gameSceneSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.percentHeight = 100;
		t.source = "normalbg_jpg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bgFree_i = function () {
		var t = new eui.Image();
		this.bgFree = t;
		t.percentHeight = 100;
		t.source = "addsadfg_jpg";
		t.visible = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.contentGroup_i = function () {
		var t = new eui.Group();
		this.contentGroup = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 1396;
		t.elementsContent = [this.borderGroup_i(),this.tileMask_i(),this.tileGroup_i(),this.lineWinTxt_i(),this.freeCountBg_i(),this.freeChooseCountBg_i(),this.freeChooseCountTxt_i(),this.freeMultiGroup_i()];
		return t;
	};
	_proto.borderGroup_i = function () {
		var t = new eui.Group();
		this.borderGroup = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.kuang_i(),this.kuangFree_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.title_i()];
		return t;
	};
	_proto.kuang_i = function () {
		var t = new eui.Image();
		this.kuang = t;
		t.height = 761;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "NormalFrame_png";
		t.width = 1388;
		t.x = 4;
		t.y = 186;
		return t;
	};
	_proto.kuangFree_i = function () {
		var t = new eui.Image();
		this.kuangFree = t;
		t.height = 817;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "FreeGameFrame_png";
		t.visible = false;
		t.width = 1400;
		t.y = 137;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 659;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "LineBG_png";
		t.width = 265;
		t.x = 39;
		t.y = 269;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 659;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "LineBG_png";
		t.width = 265;
		t.x = 304;
		t.y = 269;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 659;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "LineBG_png";
		t.width = 265;
		t.x = 569;
		t.y = 269;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 659;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "LineBG_png";
		t.width = 265;
		t.x = 834;
		t.y = 269;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 659;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "LineBG_png";
		t.width = 265;
		t.x = 1099;
		t.y = 269;
		return t;
	};
	_proto.title_i = function () {
		var t = new game.AMovieClip();
		this.title = t;
		t.height = 157;
		t.horizontalCenter = 0;
		t.source = "title1_png";
		t.sources = "title|1-20|_png";
		t.speed = 8;
		t.width = 670;
		t.y = 117;
		return t;
	};
	_proto.tileMask_i = function () {
		var t = new eui.Rect();
		this.tileMask = t;
		t.height = 658;
		t.horizontalCenter = 0;
		t.width = 1334;
		t.y = 269;
		return t;
	};
	_proto.tileGroup_i = function () {
		var t = new eui.Group();
		this.tileGroup = t;
		t.height = 658;
		t.horizontalCenter = 0;
		t.width = 1334;
		t.y = 269;
		t.elementsContent = [this.freeEffectGroup_i(),this.valueTiles_i(),this.vagueTiles_i(),this.winGridGroup_i(),this.bonusEffectGroup_i(),this.particleGroup_i()];
		return t;
	};
	_proto.freeEffectGroup_i = function () {
		var t = new eui.Group();
		this.freeEffectGroup = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.border2_i(),this.border3_i(),this.border4_i(),this.freeCoinsGroup_i()];
		return t;
	};
	_proto.border2_i = function () {
		var t = new game.AMovieClip();
		this.border2 = t;
		t.height = 468;
		t.horizontalCenter = 0;
		t.scaleX = 1.75;
		t.scaleY = 1.75;
		t.source = "border1_png";
		t.sources = "border|1-45|_png";
		t.speed = 3;
		t.verticalCenter = -10;
		t.visible = false;
		t.width = 332;
		return t;
	};
	_proto.border3_i = function () {
		var t = new game.AMovieClip();
		this.border3 = t;
		t.height = 468;
		t.horizontalCenter = 265;
		t.scaleX = 1.75;
		t.scaleY = 1.75;
		t.source = "border1_png";
		t.sources = "border|1-45|_png";
		t.speed = 3;
		t.verticalCenter = -10;
		t.visible = false;
		t.width = 332;
		return t;
	};
	_proto.border4_i = function () {
		var t = new game.AMovieClip();
		this.border4 = t;
		t.height = 468;
		t.horizontalCenter = 530;
		t.scaleX = 1.75;
		t.scaleY = 1.75;
		t.source = "border1_png";
		t.sources = "border|1-45|_png";
		t.speed = 3;
		t.verticalCenter = -10;
		t.visible = false;
		t.width = 332;
		return t;
	};
	_proto.freeCoinsGroup_i = function () {
		var t = new eui.Group();
		this.freeCoinsGroup = t;
		t.height = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.valueTiles_i = function () {
		var t = new eui.Group();
		this.valueTiles = t;
		t.height = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.tile0_i(),this.tile1_i(),this.tile2_i(),this.tile3_i(),this.tile4_i(),this.tile5_i(),this.tile6_i(),this.tile7_i(),this.tile8_i(),this.tile9_i(),this.tile10_i(),this.tile11_i(),this.tile12_i(),this.tile13_i(),this.tile14_i()];
		return t;
	};
	_proto.tile0_i = function () {
		var t = new eui.Image();
		this.tile0 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_1_png";
		t.width = 200;
		t.x = 35;
		t.y = 21;
		return t;
	};
	_proto.tile1_i = function () {
		var t = new eui.Image();
		this.tile1 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 35;
		t.y = 229;
		return t;
	};
	_proto.tile2_i = function () {
		var t = new eui.Image();
		this.tile2 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 35;
		t.y = 437;
		return t;
	};
	_proto.tile3_i = function () {
		var t = new eui.Image();
		this.tile3 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 300;
		t.y = 21;
		return t;
	};
	_proto.tile4_i = function () {
		var t = new eui.Image();
		this.tile4 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 300;
		t.y = 229;
		return t;
	};
	_proto.tile5_i = function () {
		var t = new eui.Image();
		this.tile5 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 300;
		t.y = 437;
		return t;
	};
	_proto.tile6_i = function () {
		var t = new eui.Image();
		this.tile6 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 565;
		t.y = 21;
		return t;
	};
	_proto.tile7_i = function () {
		var t = new eui.Image();
		this.tile7 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 565;
		t.y = 229;
		return t;
	};
	_proto.tile8_i = function () {
		var t = new eui.Image();
		this.tile8 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 565;
		t.y = 437;
		return t;
	};
	_proto.tile9_i = function () {
		var t = new eui.Image();
		this.tile9 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 830;
		t.y = 21;
		return t;
	};
	_proto.tile10_i = function () {
		var t = new eui.Image();
		this.tile10 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 830;
		t.y = 229;
		return t;
	};
	_proto.tile11_i = function () {
		var t = new eui.Image();
		this.tile11 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 830;
		t.y = 437;
		return t;
	};
	_proto.tile12_i = function () {
		var t = new eui.Image();
		this.tile12 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 21;
		return t;
	};
	_proto.tile13_i = function () {
		var t = new eui.Image();
		this.tile13 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 229;
		return t;
	};
	_proto.tile14_i = function () {
		var t = new eui.Image();
		this.tile14 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "symbolName_0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 437;
		return t;
	};
	_proto.vagueTiles_i = function () {
		var t = new eui.Group();
		this.vagueTiles = t;
		t.height = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.vagueTile0_i(),this.vagueTile1_i(),this.vagueTile2_i(),this.vagueTile3_i(),this.vagueTile4_i(),this.vagueTile5_i(),this.vagueTile6_i(),this.vagueTile7_i(),this.vagueTile8_i(),this.vagueTile9_i(),this.vagueTile10_i(),this.vagueTile11_i(),this.vagueTile12_i(),this.vagueTile13_i(),this.vagueTile14_i(),this.vagueTile15_i(),this.vagueTile16_i(),this.vagueTile17_i(),this.vagueTile18_i(),this.vagueTile19_i()];
		return t;
	};
	_proto.vagueTile0_i = function () {
		var t = new eui.Image();
		this.vagueTile0 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 35;
		t.y = 21;
		return t;
	};
	_proto.vagueTile1_i = function () {
		var t = new eui.Image();
		this.vagueTile1 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 35;
		t.y = 229;
		return t;
	};
	_proto.vagueTile2_i = function () {
		var t = new eui.Image();
		this.vagueTile2 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 35;
		t.y = 437;
		return t;
	};
	_proto.vagueTile3_i = function () {
		var t = new eui.Image();
		this.vagueTile3 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 35;
		t.y = 645;
		return t;
	};
	_proto.vagueTile4_i = function () {
		var t = new eui.Image();
		this.vagueTile4 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 300;
		t.y = 21;
		return t;
	};
	_proto.vagueTile5_i = function () {
		var t = new eui.Image();
		this.vagueTile5 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 300;
		t.y = 229;
		return t;
	};
	_proto.vagueTile6_i = function () {
		var t = new eui.Image();
		this.vagueTile6 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 300;
		t.y = 437;
		return t;
	};
	_proto.vagueTile7_i = function () {
		var t = new eui.Image();
		this.vagueTile7 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 300;
		t.y = 645;
		return t;
	};
	_proto.vagueTile8_i = function () {
		var t = new eui.Image();
		this.vagueTile8 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 565;
		t.y = 21;
		return t;
	};
	_proto.vagueTile9_i = function () {
		var t = new eui.Image();
		this.vagueTile9 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 565;
		t.y = 229;
		return t;
	};
	_proto.vagueTile10_i = function () {
		var t = new eui.Image();
		this.vagueTile10 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 565;
		t.y = 437;
		return t;
	};
	_proto.vagueTile11_i = function () {
		var t = new eui.Image();
		this.vagueTile11 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 565;
		t.y = 645;
		return t;
	};
	_proto.vagueTile12_i = function () {
		var t = new eui.Image();
		this.vagueTile12 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 830;
		t.y = 21;
		return t;
	};
	_proto.vagueTile13_i = function () {
		var t = new eui.Image();
		this.vagueTile13 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 830;
		t.y = 229;
		return t;
	};
	_proto.vagueTile14_i = function () {
		var t = new eui.Image();
		this.vagueTile14 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 830;
		t.y = 437;
		return t;
	};
	_proto.vagueTile15_i = function () {
		var t = new eui.Image();
		this.vagueTile15 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 830;
		t.y = 645;
		return t;
	};
	_proto.vagueTile16_i = function () {
		var t = new eui.Image();
		this.vagueTile16 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 21;
		return t;
	};
	_proto.vagueTile17_i = function () {
		var t = new eui.Image();
		this.vagueTile17 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 229;
		return t;
	};
	_proto.vagueTile18_i = function () {
		var t = new eui.Image();
		this.vagueTile18 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 437;
		return t;
	};
	_proto.vagueTile19_i = function () {
		var t = new eui.Image();
		this.vagueTile19 = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "vague0_png";
		t.width = 200;
		t.x = 1095;
		t.y = 645;
		return t;
	};
	_proto.winGridGroup_i = function () {
		var t = new eui.Group();
		this.winGridGroup = t;
		t.height = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.particleBg_i()];
		return t;
	};
	_proto.particleBg_i = function () {
		var t = new eui.Rect();
		this.particleBg = t;
		t.fillAlpha = 0.5;
		t.height = 658;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 1334;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bonusEffectGroup_i = function () {
		var t = new eui.Group();
		this.bonusEffectGroup = t;
		t.height = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.particleGroup_i = function () {
		var t = new eui.Group();
		this.particleGroup = t;
		t.height = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lineWinTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.lineWinTxt = t;
		t.font = "fnt63_fnt";
		t.height = 63;
		t.horizontalCenter = 0;
		t.letterSpacing = -35;
		t.text = "1232";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalCenter = 45;
		t.width = 600;
		return t;
	};
	_proto.freeCountBg_i = function () {
		var t = new eui.Image();
		this.freeCountBg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Mutiply_png";
		t.x = -99;
		t.y = 133;
		return t;
	};
	_proto.freeChooseCountBg_i = function () {
		var t = new eui.Image();
		this.freeChooseCountBg = t;
		t.source = "FeatureChance_png";
		t.x = 1394;
		t.y = 112;
		return t;
	};
	_proto.freeChooseCountTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.freeChooseCountTxt = t;
		t.font = "fnt40_fnt";
		t.height = 40;
		t.right = -267;
		t.text = "x2";
		t.textAlign = "center";
		t.top = 166;
		t.width = 176;
		return t;
	};
	_proto.freeMultiGroup_i = function () {
		var t = new eui.Group();
		this.freeMultiGroup = t;
		t.height = 140;
		t.left = -94;
		t.top = 140;
		t.visible = false;
		t.width = 200;
		t.elementsContent = [this.freeMulti_i()];
		return t;
	};
	_proto.freeMulti_i = function () {
		var t = new eui.BitmapLabel();
		this.freeMulti = t;
		t.font = "fnt70_fnt";
		t.height = 70;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "X10";
		t.verticalCenter = 0;
		return t;
	};
	_proto.bottomBar_i = function () {
		var t = new game.BottomBar();
		this.bottomBar = t;
		t.height = 220;
		t.horizontalCenter = 0;
		t.width = 1920;
		t.y = 860;
		return t;
	};
	_proto.topBar_i = function () {
		var t = new game.TopBar();
		this.topBar = t;
		t.horizontalCenter = 0;
		t.top = 0;
		return t;
	};
	_proto.testBtn1_i = function () {
		var t = new eui.Button();
		this.testBtn1 = t;
		t.height = 60;
		t.label = "下次bonus";
		t.width = 200;
		t.x = 798;
		t.y = 52;
		t.skinName = gameSceneSkin$Skin16;
		return t;
	};
	_proto.testBtn_i = function () {
		var t = new eui.Button();
		this.testBtn = t;
		t.height = 60;
		t.label = "下次免费";
		t.width = 200;
		t.x = 394;
		t.y = 47;
		t.skinName = gameSceneSkin$Skin17;
		return t;
	};
	_proto.bigWinGroup_i = function () {
		var t = new eui.Group();
		this.bigWinGroup = t;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bigwinTxt_i()];
		return t;
	};
	_proto.bigwinTxt_i = function () {
		var t = new eui.Label();
		this.bigwinTxt = t;
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "大赢家";
		t.textColor = 0x20c929;
		t.verticalCenter = 0;
		return t;
	};
	_proto.freeChanceGroup_i = function () {
		var t = new eui.Group();
		this.freeChanceGroup = t;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.freeChangeMc_i(),this.freeChangeImg_i()];
		return t;
	};
	_proto.freeChangeMc_i = function () {
		var t = new game.AMovieClip();
		this.freeChangeMc = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.loop = 1;
		t.scaleX = 5;
		t.scaleY = 5;
		t.source = "freeChange28_png";
		t.sources = "freeChange|1-33|_png";
		t.speed = 4;
		t.verticalCenter = -90;
		t.width = 292;
		return t;
	};
	_proto.freeChangeImg_i = function () {
		var t = new eui.Image();
		this.freeChangeImg = t;
		t.height = 179;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "FreeChance_png";
		t.verticalCenter = -90;
		t.width = 1246;
		t.x = 337;
		t.y = 451.00000000000006;
		return t;
	};
	_proto.freeChooseCountBoom_i = function () {
		var t = new game.AMovieClip();
		this.freeChooseCountBoom = t;
		t.anchorOffsetX = 64;
		t.anchorOffsetY = 64;
		t.height = 128;
		t.source = "zz_1_png";
		t.visible = false;
		t.width = 128;
		t.x = 1727;
		t.y = 187;
		return t;
	};
	_proto.bigWin_i = function () {
		var t = new game.BigWin();
		this.bigWin = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		return t;
	};
	_proto.setting_i = function () {
		var t = new game.Setting();
		this.setting = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.freeChoose_i = function () {
		var t = new game.FreeChoose();
		this.freeChoose = t;
		t.height = 1080;
		t.visible = false;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.freeTotalWin_i = function () {
		var t = new game.FreeTotalWin();
		this.freeTotalWin = t;
		t.height = 1080;
		t.visible = false;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rull_i = function () {
		var t = new game.Rull();
		this.rull = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.tips_i = function () {
		var t = new game.Tips();
		this.tips = t;
		t.height = 20;
		t.horizontalCenter = 0;
		t.top = 0;
		t.visible = false;
		t.width = 20;
		return t;
	};
	_proto.connectTip_i = function () {
		var t = new game.ConnectTip();
		this.connectTip = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	return gameSceneSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/rullSkin.exml'] = window.rullSkin = (function (_super) {
	__extends(rullSkin, _super);
	var rullSkin$Skin18 = 	(function (_super) {
		__extends(rullSkin$Skin18, _super);
		function rullSkin$Skin18() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin18;
	})(eui.Skin);

	var rullSkin$Skin19 = 	(function (_super) {
		__extends(rullSkin$Skin19, _super);
		function rullSkin$Skin19() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin19;
	})(eui.Skin);

	var rullSkin$Skin20 = 	(function (_super) {
		__extends(rullSkin$Skin20, _super);
		function rullSkin$Skin20() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin20;
	})(eui.Skin);

	var rullSkin$Skin21 = 	(function (_super) {
		__extends(rullSkin$Skin21, _super);
		function rullSkin$Skin21() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin21;
	})(eui.Skin);

	var rullSkin$Skin22 = 	(function (_super) {
		__extends(rullSkin$Skin22, _super);
		function rullSkin$Skin22() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin22;
	})(eui.Skin);

	var rullSkin$Skin23 = 	(function (_super) {
		__extends(rullSkin$Skin23, _super);
		function rullSkin$Skin23() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image2","source","btn2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.percentHeight = 100;
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin23;
	})(eui.Skin);

	var rullSkin$Skin24 = 	(function (_super) {
		__extends(rullSkin$Skin24, _super);
		function rullSkin$Skin24() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rullSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Tips_Back_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rullSkin$Skin24;
	})(eui.Skin);

	function rullSkin() {
		_super.call(this);
		this.skinParts = ["rullMask","groupRull0","pageTxt_0_0","pageTxt_0_1","pageTxt_0_2","pageTxt_1_0","pageTxt_1_1","pageTxt_1_2","pageTxt_2_0","pageTxt_2_1","pageTxt_2_2","pageTxt_3_0","pageTxt_3_1","pageTxt_3_2","pageTxt_4_0","pageTxt_4_1","pageTxt_4_2","groupRull1","pageTxt_5_0","pageTxt_5_1","pageTxt_5_2","pageTxt_6_0","pageTxt_6_1","pageTxt_6_2","pageTxt_7_0","pageTxt_7_1","pageTxt_7_2","pageTxt_8_0","pageTxt_8_1","pageTxt_8_2","pageTxt_9_0","pageTxt_9_1","pageTxt_9_2","pageTxt_10_0","pageTxt_10_1","pageTxt_10_2","groupRull2","groupRull3","groupRull4","groupRull5","groupRull","groupMove","btnRull0","btnRull1","btnRull2","btnRull3","btnRull4","btnRull5","btnRull","btnClose","groupOut"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.groupOut_i()];
	}
	var _proto = rullSkin.prototype;

	_proto.groupOut_i = function () {
		var t = new eui.Group();
		this.groupOut = t;
		t.percentHeight = 100;
		t.left = 0;
		t.top = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.rullMask_i(),this.groupRull_i(),this.groupMove_i(),this.btnRull_i(),this.btnClose_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1080;
		t.left = 0;
		t.source = "OverBG_jpg";
		t.top = 0;
		t.width = 1920;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.right = 60;
		t.source = "asdad_png";
		t.top = 65;
		return t;
	};
	_proto.rullMask_i = function () {
		var t = new eui.Rect();
		this.rullMask = t;
		t.height = 672;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1726;
		return t;
	};
	_proto.groupRull_i = function () {
		var t = new eui.Group();
		this.groupRull = t;
		t.left = 97;
		t.verticalCenter = 0;
		t.width = 10356;
		t.elementsContent = [this.groupRull0_i(),this.groupRull1_i(),this.groupRull2_i(),this.groupRull3_i(),this.groupRull4_i(),this.groupRull5_i()];
		return t;
	};
	_proto.groupRull0_i = function () {
		var t = new eui.Group();
		this.groupRull0 = t;
		t.height = 672;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Image4_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 670;
		t.horizontalCenter = 0;
		t.source = "page1_png";
		t.verticalCenter = 0;
		t.width = 1698;
		return t;
	};
	_proto.groupRull1_i = function () {
		var t = new eui.Group();
		this.groupRull1 = t;
		t.height = 672;
		t.left = 1726;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 0;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this.pageTxt_0_0_i(),this.pageTxt_0_1_i(),this.pageTxt_0_2_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_2_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_0_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_0_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "58.00";
		t.textColor = 0xf1eabd;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_0_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_0_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "41.00";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_0_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_0_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.50";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 600;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image7_i(),this._Image8_i(),this.pageTxt_1_0_i(),this.pageTxt_1_1_i(),this.pageTxt_1_2_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_3_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_1_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_1_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "58.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_1_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_1_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "41.00";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_1_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_1_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.35";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 1200;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image9_i(),this._Image10_i(),this.pageTxt_2_0_i(),this.pageTxt_2_1_i(),this.pageTxt_2_2_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_4_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_2_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_2_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "58.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_2_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_2_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "41.00";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_2_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_2_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.30";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 345;
		t.top = 410;
		t.width = 505;
		t.elementsContent = [this._Image11_i(),this._Image12_i(),this.pageTxt_3_0_i(),this.pageTxt_3_1_i(),this.pageTxt_3_2_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_5_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_3_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_3_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "53.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_3_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_3_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.50";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_3_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_3_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.20";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 930;
		t.top = 410;
		t.width = 505;
		t.elementsContent = [this._Image13_i(),this._Image14_i(),this.pageTxt_4_0_i(),this.pageTxt_4_1_i(),this.pageTxt_4_2_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_6_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_4_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_4_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "53.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_4_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_4_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.35";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_4_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_4_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.15";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto.groupRull2_i = function () {
		var t = new eui.Group();
		this.groupRull2 = t;
		t.height = 672;
		t.left = 3452;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Group6_i(),this._Group7_i(),this._Group8_i(),this._Group9_i(),this._Group10_i(),this._Group11_i()];
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 0;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image15_i(),this._Image16_i(),this.pageTxt_5_0_i(),this.pageTxt_5_1_i(),this.pageTxt_5_2_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_7_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_5_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_5_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "52.00";
		t.textColor = 0xf1eabd;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_5_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_5_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.30";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_5_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_5_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.10";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 600;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image17_i(),this._Image18_i(),this.pageTxt_6_0_i(),this.pageTxt_6_1_i(),this.pageTxt_6_2_i()];
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_8_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_6_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_6_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "52.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_6_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_6_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.20";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_6_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_6_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.10";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 1200;
		t.top = 45;
		t.width = 505;
		t.elementsContent = [this._Image19_i(),this._Image20_i(),this.pageTxt_7_0_i(),this.pageTxt_7_1_i(),this.pageTxt_7_2_i()];
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_9_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_7_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_7_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "51.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_7_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_7_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.15";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_7_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_7_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.10";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 0;
		t.top = 410;
		t.width = 505;
		t.elementsContent = [this._Image21_i(),this._Image22_i(),this.pageTxt_8_0_i(),this.pageTxt_8_1_i(),this.pageTxt_8_2_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_10_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_8_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_8_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "51.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_8_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_8_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.15";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_8_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_8_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.05";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 600;
		t.top = 410;
		t.width = 505;
		t.elementsContent = [this._Image23_i(),this._Image24_i(),this.pageTxt_9_0_i(),this.pageTxt_9_1_i(),this.pageTxt_9_2_i()];
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image24_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_11_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_9_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_9_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "51.00";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_9_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_9_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.10";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_9_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_9_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.05";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.height = 224;
		t.left = 1200;
		t.top = 410;
		t.width = 505;
		t.elementsContent = [this._Image25_i(),this._Image26_i(),this.pageTxt_10_0_i(),this.pageTxt_10_1_i(),this.pageTxt_10_2_i()];
		return t;
	};
	_proto._Image25_i = function () {
		var t = new eui.Image();
		t.height = 224;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(35,39,191,71);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.width = 505;
		t.x = 0;
		return t;
	};
	_proto._Image26_i = function () {
		var t = new eui.Image();
		t.height = 215;
		t.left = 30;
		t.source = "symbolName_12_png";
		t.verticalCenter = 0;
		t.width = 215;
		return t;
	};
	_proto.pageTxt_10_0_i = function () {
		var t = new eui.Label();
		this.pageTxt_10_0 = t;
		t.left = 280;
		t.size = 34;
		t.text = "50.50";
		t.textColor = 0xF1EABD;
		t.top = 52;
		return t;
	};
	_proto.pageTxt_10_1_i = function () {
		var t = new eui.Label();
		this.pageTxt_10_1 = t;
		t.left = 280;
		t.size = 34;
		t.text = "40.10";
		t.textColor = 0xF1EABD;
		t.top = 102;
		return t;
	};
	_proto.pageTxt_10_2_i = function () {
		var t = new eui.Label();
		this.pageTxt_10_2 = t;
		t.left = 280;
		t.size = 34;
		t.text = "30.05";
		t.textColor = 0xF1EABD;
		t.top = 152;
		return t;
	};
	_proto.groupRull3_i = function () {
		var t = new eui.Group();
		this.groupRull3 = t;
		t.height = 672;
		t.left = 5178;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Image27_i()];
		return t;
	};
	_proto._Image27_i = function () {
		var t = new eui.Image();
		t.height = 568;
		t.horizontalCenter = 0;
		t.source = "page4_png";
		t.verticalCenter = 0;
		t.width = 1480;
		return t;
	};
	_proto.groupRull4_i = function () {
		var t = new eui.Group();
		this.groupRull4 = t;
		t.height = 672;
		t.left = 6904;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Image28_i()];
		return t;
	};
	_proto._Image28_i = function () {
		var t = new eui.Image();
		t.height = 445;
		t.left = 40;
		t.source = "page5_png";
		t.top = 100;
		t.width = 1423;
		return t;
	};
	_proto.groupRull5_i = function () {
		var t = new eui.Group();
		this.groupRull5 = t;
		t.height = 672;
		t.left = 8630;
		t.verticalCenter = 0;
		t.width = 1726;
		t.elementsContent = [this._Image29_i()];
		return t;
	};
	_proto._Image29_i = function () {
		var t = new eui.Image();
		t.height = 650;
		t.horizontalCenter = 0;
		t.source = "page6_png";
		t.verticalCenter = 0;
		t.width = 1380;
		return t;
	};
	_proto.groupMove_i = function () {
		var t = new eui.Group();
		this.groupMove = t;
		t.height = 672;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1726;
		return t;
	};
	_proto.btnRull_i = function () {
		var t = new eui.Group();
		this.btnRull = t;
		t.bottom = 40;
		t.height = 50;
		t.horizontalCenter = 0;
		t.width = 376;
		t.elementsContent = [this.btnRull0_i(),this.btnRull1_i(),this.btnRull2_i(),this.btnRull3_i(),this.btnRull4_i(),this.btnRull5_i()];
		return t;
	};
	_proto.btnRull0_i = function () {
		var t = new eui.Button();
		this.btnRull0 = t;
		t.height = 46;
		t.label = "";
		t.left = 0;
		t.name = "touch_0";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin18;
		return t;
	};
	_proto.btnRull1_i = function () {
		var t = new eui.Button();
		this.btnRull1 = t;
		t.height = 46;
		t.label = "";
		t.left = 66;
		t.name = "touch_1";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin19;
		return t;
	};
	_proto.btnRull2_i = function () {
		var t = new eui.Button();
		this.btnRull2 = t;
		t.height = 46;
		t.label = "";
		t.left = 132;
		t.name = "touch_2";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin20;
		return t;
	};
	_proto.btnRull3_i = function () {
		var t = new eui.Button();
		this.btnRull3 = t;
		t.height = 46;
		t.label = "";
		t.left = 198;
		t.name = "touch_3";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin21;
		return t;
	};
	_proto.btnRull4_i = function () {
		var t = new eui.Button();
		this.btnRull4 = t;
		t.height = 46;
		t.label = "";
		t.left = 264;
		t.name = "touch_4";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin22;
		return t;
	};
	_proto.btnRull5_i = function () {
		var t = new eui.Button();
		this.btnRull5 = t;
		t.height = 46;
		t.label = "";
		t.left = 330;
		t.name = "touch_5";
		t.verticalCenter = 0;
		t.width = 46;
		t.skinName = rullSkin$Skin23;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new game.SmallButton();
		this.btnClose = t;
		t.height = 112;
		t.horizontalCenter = -825;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = -472;
		t.width = 130;
		t.skinName = rullSkin$Skin24;
		return t;
	};
	return rullSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/settingSkin.exml'] = window.settingSkin = (function (_super) {
	__extends(settingSkin, _super);
	var settingSkin$Skin25 = 	(function (_super) {
		__extends(settingSkin$Skin25, _super);
		function settingSkin$Skin25() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = settingSkin$Skin25.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return settingSkin$Skin25;
	})(eui.Skin);

	var settingSkin$Skin26 = 	(function (_super) {
		__extends(settingSkin$Skin26, _super);
		function settingSkin$Skin26() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","off_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = settingSkin$Skin26.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return settingSkin$Skin26;
	})(eui.Skin);

	var settingSkin$Skin27 = 	(function (_super) {
		__extends(settingSkin$Skin27, _super);
		function settingSkin$Skin27() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","off_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = settingSkin$Skin27.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return settingSkin$Skin27;
	})(eui.Skin);

	var settingSkin$Skin28 = 	(function (_super) {
		__extends(settingSkin$Skin28, _super);
		function settingSkin$Skin28() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","off_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = settingSkin$Skin28.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return settingSkin$Skin28;
	})(eui.Skin);

	function settingSkin() {
		_super.call(this);
		this.skinParts = ["bgSetting","btnClose","btnMusic","btnEffect","btnFast","groupSetting"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.bgSetting_i(),this.groupSetting_i()];
	}
	var _proto = settingSkin.prototype;

	_proto.bgSetting_i = function () {
		var t = new eui.Rect();
		this.bgSetting = t;
		t.alpha = 0.65;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.groupSetting_i = function () {
		var t = new eui.Group();
		this.groupSetting = t;
		t.anchorOffsetX = 622;
		t.anchorOffsetY = 382;
		t.height = 764;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1244;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this.btnClose_i(),this.btnMusic_i(),this.btnEffect_i(),this.btnFast_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 69;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(12,25,45,26);
		t.source = "biaoti_png";
		t.top = 0;
		t.width = 225;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 44;
		t.left = 0;
		t.size = 32;
		t.text = "设置";
		t.textAlign = "center";
		t.textColor = 0xaba3a2;
		t.top = 12;
		t.verticalAlign = "middle";
		t.width = 195;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 696;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(39,25,58,28);
		t.source = "windowdi_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 20;
		t.height = 606;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,22,27,25);
		t.source = "backgroud1_png";
		t.width = 1210;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.left = 372;
		t.source = "shengyin_png";
		t.top = 229;
		t.width = 56;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 61;
		t.left = 372;
		t.source = "yinxiao_png";
		t.top = 396;
		t.width = 52;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 64;
		t.left = 372;
		t.source = "FastModel_png";
		t.top = 556;
		t.width = 68;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.height = 55;
		t.horizontalCenter = 0;
		t.size = 38;
		t.text = "音乐";
		t.textAlign = "center";
		t.top = 229;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.height = 55;
		t.horizontalCenter = 0;
		t.size = 38;
		t.text = "音效";
		t.textAlign = "center";
		t.top = 396;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.height = 55;
		t.horizontalCenter = 0;
		t.size = 38;
		t.text = "快速模式";
		t.textAlign = "center";
		t.top = 556;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new game.SmallButton();
		this.btnClose = t;
		t.height = 70;
		t.horizontalCenter = 587;
		t.label = "";
		t.verticalCenter = -279;
		t.width = 70;
		t.skinName = settingSkin$Skin25;
		return t;
	};
	_proto.btnMusic_i = function () {
		var t = new eui.ToggleSwitch();
		this.btnMusic = t;
		t.height = 55;
		t.label = "";
		t.left = 774;
		t.top = 229;
		t.width = 118;
		t.skinName = settingSkin$Skin26;
		return t;
	};
	_proto.btnEffect_i = function () {
		var t = new eui.ToggleSwitch();
		this.btnEffect = t;
		t.height = 55;
		t.label = "";
		t.left = 774;
		t.top = 396;
		t.width = 118;
		t.skinName = settingSkin$Skin27;
		return t;
	};
	_proto.btnFast_i = function () {
		var t = new eui.ToggleSwitch();
		this.btnFast = t;
		t.height = 55;
		t.label = "";
		t.left = 774;
		t.top = 556;
		t.width = 118;
		t.skinName = settingSkin$Skin28;
		return t;
	};
	return settingSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/tipSkin.exml'] = window.tipSkin = (function (_super) {
	__extends(tipSkin, _super);
	function tipSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = tipSkin.prototype;

	return tipSkin;
})(eui.Skin);generateEUI.paths['resource/skins/game_skins/topBarSkin.exml'] = window.topBarSkin = (function (_super) {
	__extends(topBarSkin, _super);
	var topBarSkin$Skin29 = 	(function (_super) {
		__extends(topBarSkin$Skin29, _super);
		function topBarSkin$Skin29() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = topBarSkin$Skin29.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "ssz_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return topBarSkin$Skin29;
	})(eui.Skin);

	function topBarSkin() {
		_super.call(this);
		this.skinParts = ["userName","userMoney","groupLeft","setBtn","groupRight"];
		
		this.height = 95;
		this.width = 1920;
		this.elementsContent = [this.groupLeft_i(),this.groupRight_i()];
	}
	var _proto = topBarSkin.prototype;

	_proto.groupLeft_i = function () {
		var t = new eui.Group();
		this.groupLeft = t;
		t.height = 95;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 338;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.userName_i(),this.userMoney_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 95;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(74,28,67,33);
		t.scaleX = -1;
		t.scaleY = 1;
		t.source = "di_png";
		t.verticalCenter = 0;
		t.width = 338;
		t.x = 338;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hx_png";
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 46;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 3;
		t.left = 15;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "j_png";
		t.x = 15;
		t.y = 49;
		return t;
	};
	_proto.userName_i = function () {
		var t = new eui.Label();
		this.userName = t;
		t.right = 55;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "游客12454";
		t.textAlign = "right";
		t.textColor = 0xebebeb;
		t.top = 7;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.userMoney_i = function () {
		var t = new eui.Label();
		this.userMoney = t;
		t.anchorOffsetX = 115;
		t.anchorOffsetY = 13;
		t.bottom = 12;
		t.height = 26;
		t.right = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.text = "888.888.88";
		t.textAlign = "right";
		t.textColor = 0xffd75e;
		t.verticalAlign = "middle";
		t.width = 230;
		return t;
	};
	_proto.groupRight_i = function () {
		var t = new eui.Group();
		this.groupRight = t;
		t.height = 95;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 150;
		t.elementsContent = [this._Image4_i(),this.setBtn_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 95;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(68,23,73,35);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "di_png";
		t.top = 0;
		t.width = 150;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.setBtn_i = function () {
		var t = new game.SmallButton();
		this.setBtn = t;
		t.height = 59;
		t.horizontalCenter = 15.5;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 63;
		t.skinName = topBarSkin$Skin29;
		return t;
	};
	return topBarSkin;
})(eui.Skin);