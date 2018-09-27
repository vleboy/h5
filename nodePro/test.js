
var fs = require("fs");
var proName = "caishen";
var data = JSON.parse(fs.readFileSync("../"+proName+"/resource/default.res.json", 'utf8')).resources;
console.log("读取到资源");


var skins = "";
readSkins("../"+proName+"/resource/skins");
function readSkins(p){
    var pa = fs.readdirSync(p);
    pa.forEach((v, i)=>{
        if(fs.statSync(p+"/"+v).isDirectory()){
            readSkins(p+"/"+v);
        }
        else if(v.indexOf(".exml")>-1){
            skins +=(" \n "+ fs.readFileSync(p+"/"+v, 'utf-8'));
        }
    })
}
console.log("读取到皮肤 ");

console.log("开始筛选");
data.forEach((v, i)=>{
    if(v.type=="image" && skins.indexOf(v.name)==-1){
        console.log("皮肤中没有使用这个资源 "+v.url);
    }
})