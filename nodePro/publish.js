var proName;
var compress = require("./tinypng").compress;
var exec = (cmd, option)=>{
    return new Promise((resolve, reject)=>{
        require('child_process').exec(cmd, option, (err, stdout, stderr)=>{
            if(err) {
                console.log('get weather api error:'+stderr);
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
    console.log(str+" "+(new Date().getTime()-time))/1000+"s";
    time = new Date().getTime();
}

var changeFile = new Promise((resolve, reject)=>{
    var data = fs.readFileSync("../"+proName+"/bin-release/web/na/index.html", 'utf8');
    data.replace("var isDebug = true", "var isDebug = false");
    fs.writeFileSync("../"+proName+"/bin-release/web/na/index.html", data);
    resolve();
})

(async ()=>{
    console.log("脚本开始执行");
    await exec("egret publish --version na", {cwd:"../"+proName, encoding:"utf8"});
    logTime("egret发版完成，耗时");
    await compress("../"+proName+"/bin-release/web/na/resource/res", "../"+proName+"/bin-release/web/na/resource/img");
    logTime("图片压缩完成，耗时");
    await changeFile();
    logTime("文件修改完成，耗时");

    console.log("发版结束，文件目录 "+"../"+proName+"/bin-release/web/na/");
})();

