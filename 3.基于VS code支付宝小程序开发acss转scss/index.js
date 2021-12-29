const fs = require('fs')
let fileName;
const NEEDCOMPILE = ".less";
const READFILE = '.css';
const OUTFILE = '.acss';

/**
 * 判断文件夹下是否存在*.less文件
 * @returns 
 */
const findLessFile = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./', (err, files) => {
            for (file of files) {
                if (file.indexOf(NEEDCOMPILE) != -1) {
                    fileName = file.split('.')[0];
                    resolve(fileName)
                }
            }
            if(!fileName) {
                console.log('\x1b[36m%s\x1b[0m', '请新建以文件夹名称的less文件；如fee文件夹,fee.less')
            }
        })
    })
}

/**
 * 监听函数
 */
const watch = (fileName) => {
    let filePath = `./${fileName}${NEEDCOMPILE}`
    fs.watchFile(filePath, (cur, prv) => {
        if (filePath) {
            if (cur.mtime != prv.mtime) {
                console.log(`${filePath}文件发生更新`)
                readFile(fileName)
            }
        }
    })
}

/**
 * 读取文件内容
 */
const readFile = (fileName) => {
    fs.readFile(`${fileName}${READFILE}`, 'utf-8', (err, data) => {
        if (err) {
            console.log("error");
        } else {
            writeFile(data, fileName)
        }
    });
}

/**
 * 写入文件
 * @param {*} content 
 */
const writeFile = (content, fileName) => {
    fs.writeFile(`./${fileName}${OUTFILE}`, content, 'utf-8', (err, data) => {
        if (err) {
            console.log("error");
        } else {
            console.log('样式写入成功！！！恶魔')
        }
    });
}


const start = async () => {
    fileName = await findLessFile();
    watch(fileName)
}

start()