//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        game.StageUtil.stage = this.stage;
        this.stage.mask = new egret.Rectangle(0,0,1920,1080);
        if(window["urlParams"].game_host) game.GlobalConfig.host = decodeURIComponent(window["urlParams"].game_host);
        if(window["urlParams"].game_user_id) game.GlobalConfig.gameUserID = window["urlParams"].game_user_id;
        if(window["urlParams"].verify_code) game.GlobalConfig.verifyCode = window["urlParams"].verify_code;


        this.loadResource();
        
        // this.stage.addEventListener(egret.Event.RESIZE, this.resize, this);
        // this.resize();
    }

    private resize(){
        //以高为准
        if(this.stage.stageWidth/this.stage.stageHeight > 16/9){
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        //以宽为准
        else{
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await loadingView.createView();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();

            Promise.all([
                game.GameService.getInstance().login(),
                RES.loadGroup("preload", 0, loadingView)
            ]).then(()=>{
                this.stage.removeChild(loadingView);
                this.createGameScene();
            }).catch((e)=>{
                console.log("用户初始化失败",e);
                this.stage.addChild(new game.ErrTip("没连上，刷新一下", ()=>{location.reload();}, this));
            })
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    private loginSuccess:boolean;
    private gameScene: game.GameScene;
    /**
     * 创建场景界面
     */
    protected createGameScene(): void {
        this.gameScene = new game.GameScene();
        this.gameScene.percentWidth = 100;
        this.gameScene.percentHeight = 100;
        this.addChild(this.gameScene);
    }
}
