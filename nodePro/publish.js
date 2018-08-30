var proName;
var compress = require("./tinypng").compress;
var fs = require("fs");
var exec = (cmd, option)=>{
    return new Promise((resolve, reject)=>{
        require('child_process').exec(cmd, option, (err, stdout, stderr)=>{
            if(err) {
                console.log('exec error:');
                console.log(stderr);
                reject();
            } else {
                console.log(stdout);
                resolve();
            }
        })
    })
}
process.argv.forEach((val, index, array) =>{
    switch (index){
        case 2:
            proName = val;
            break;
    }
});
/**记录每步操作时间 */
var time = new Date().getTime();
var logTime = (str)=>{
    console.log(str+" "+(new Date().getTime()-time)/1000+"s");
    time = new Date().getTime();
}

var changeFile = ()=>{
    var data = fs.readFileSync("../"+proName+"/bin-release/web/"+proName+"/index.html", 'utf8');
    data.replace("var isDebug = true", "var isDebug = false");
    fs.writeFileSync("../"+proName+"/bin-release/web/"+proName+"/index.html", data);
}

(async ()=>{
    if(!proName){
        console.log("项目名不存在");
        return;
    }
    
    console.log("脚本开始执行");
    await exec("egret publish --version "+proName, {cwd:"../"+proName, encoding:"utf8"});
    logTime("egret发版完成，耗时");
    await compress("../"+proName+"/bin-release/web/"+proName+"/resource/res");
    logTime("图片压缩完成，耗时");
    changeFile();
    logTime("文件修改完成，耗时");

    console.log("发版结束，文件目录 "+"../"+proName+"/bin-release/web/"+proName+"");
})();

