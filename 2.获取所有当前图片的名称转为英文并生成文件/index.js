let fs = require('fs');
let convertToPinyin = require('./convertToPinyin.js');

// 读取文件名
const files = fs.readdirSync('./')
let newFileList = [];

files.map(file => {
  let [fileName, fileType] = file.split('.');
  if (fileType === 'png') {
    newFileList.push({
      moduleName: fileName,
      fileNames: `${convertToPinyin(fileName)}.png`
    })
  }
})

// 写文件
fs.writeFile('./list.js', JSON.stringify(newFileList), (error) => {
  if (error) {
    console.log('写入失败')
  } else {
    console.log('写入成功了')
  }
})

let path = '.'
fs.readdir(path, (err, files) => {
  files.forEach((filename) => {
    if(filename.indexOf('png') === -1) return; 
    let oldPath = path + '/' + filename;
    let obj = newFileList.find(file => {
      return `${file.moduleName}.png` === filename
    })
    let { fileNames } = obj
    let newPath = path + '/' + fileNames;

    fs.rename(oldPath, newPath, (err) => {
      if (!err) {
        console.log(filename + '副本替换成功!')
      }
    })
  })
})