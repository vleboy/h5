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

(async ()=>{
    var t = new Date().getTime();
    console.log("开始egret发版");
    await exec("egret publish --version na", {cwd:"../"+proName, encoding:"utf8"});
    console.log("egret发版完成，耗时"+(new Date().getTime()-t)/1000+"s");
    t = new Date().getTime();
    console.log("开始压缩图片");
    await compress("../"+proName+"/bin-release/web/na/resource/res", "../"+proName+"/bin-release/web/na/resource/img");
    console.log("图片压缩完成，耗时"+(new Date().getTime()-t)/1000+"s");
    console.log("发版结束，文件目录 "+"../"+proName+"/bin-release/web/na/");
})();

