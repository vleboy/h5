var fs = require("fs");
var path = require("path");
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
/**压缩目录的总数量*/
var totalCount = 0;
/**等待压缩的数组*/
var waitForCompressArr = [];
/**开始加载第几个*/
var curIndex = 0;
/**最多同时压缩数量*/
var maxPressCount = 20;
/**完成的数量*/
var completeCount = 0;
var startTime;
var startUrl;

/**传入要压缩的目录 */
exports.compress = function(srcUrl){
    var copyUrl = srcUrl+"0";
    return new Promise((resolve, reject)=>{
        deleteAll(copyUrl);
        fs.mkdirSync(copyUrl);
        createDir(srcUrl, path.resolve(copyUrl));
        findFiles(srcUrl, path.resolve(copyUrl));
        startTime = new Date().getTime();

        Promise.all(
            waitForCompressArr.map((v)=>{
                return new Promise((res, rej)=>{
                    compressSingleDir(v[0], v[1]).then(()=>{
                        console.log(v[0]+"已压缩");
                        res();
                    })
                })
            })
        )
        .then(()=>{
            deleteAll(srcUrl);
            fs.renameSync(copyUrl, srcUrl);
            resolve();
        })
        
    });
}

/**根据源目录的结构 在输出目录创建文件夹*/
function createDir(srcPath, dirPath)
{
    var children = fs.readdirSync(srcPath);
    if(children.length > 0)
    {
        for(var i=0; i<children.length; i++)
        {
            var childPath = path.resolve(srcPath+"/"+children[i]);
            var targetChildPath = path.resolve(dirPath+"/"+children[i]);
            if(isDir(childPath))
            {
                fs.mkdirSync(targetChildPath);
                createDir(childPath, targetChildPath);
            }
        }
    }
}
/**搜索图片文件进行压缩*/
function findFiles(dirPath, targetPath) {
    dirPath = path.resolve(dirPath);
    addCompressTask([dirPath, targetPath]);

    var children = fs.readdirSync(dirPath);
    if(children.length > 0)
    {
        for(var i=0; i<children.length; i++)
        {
            var childPath = path.resolve(dirPath+"/"+children[i]);
            var targetChildPath = path.resolve(targetPath+"/"+children[i]);
            if(isDir(childPath))
            {
                findFiles(childPath, targetChildPath);
            }
            else
            {
                //不是图片的文件 也不是.gitignore的文件 直接拷贝
                var tail = getTailfix(children[i]);
                if(tail != "png" && tail != "jpg" && children[i].indexOf(".gitignore")==-1)
                {
                    var to = targetChildPath;
                    fs.writeFileSync(to, fs.readFileSync(childPath));
                }
            }
        }
    }
}
/**添加一条压缩任务 */
function addCompressTask(urls)
{
    waitForCompressArr.push(urls);
}
/**压缩单个文件夹下的图片 不能压缩子目录*/
function compressSingleDir(url, targetUrl, n, resolve) {
    // console.log("开始压缩指定目录 "+url+" 到 "+targetUrl);
    return imagemin([url+'/*.{jpg,png}'], targetUrl, {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    })
}


// --------------------------------   通用方法 ----------------------------------
/**是文件夹吗*/
function isDir(filePath) {
    var stat;
    try
    {
        stat = fs.lstatSync(filePath);
        return stat.isDirectory();
    }
    catch (e)
    {
        return false;
    }
}
/**删除目录*/
function deleteAll(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteAll(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
/**后缀*/
function getTailfix(name) {
    return name.split(".").pop();
}
/**前缀*/
function getPrefix(name) {
    var arr = name.split(".");
    arr.pop();
    return arr.join(".");
}