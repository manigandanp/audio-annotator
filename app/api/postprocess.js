const fs = require('fs')
const path = require('path')


const getAllNestedFiles = (parentPath, result = []) => {
  fs.readdirSync(parentPath, { withFileTypes: true })
    .forEach((d, i) => {
      let currentPath = path.join(parentPath, d.name)
      if (d.isDirectory()) getAllNestedFiles(currentPath, result)
      else result.push(currentPath)
    });
  return result;
}


const readAllJsonFiles = (jsonFilesList) =>
  jsonFilesList.map((file, i) => {
    const content = fs.readFileSync(file)
    return JSON.parse(content)
  }).flat(2)




const annotationsToPipeTxt = (bookName) => {
  let filesPath = path.join(__dirname, '../../', bookName)
  let jsonFiles = getAllNestedFiles(filesPath).filter((f, i) => f.match(/.json$/))
  let annotationJson = readAllJsonFiles(jsonFiles)
  return annotationJson
    .map((o, i) => `wavs/${o.fileName.trim()}|${o.textDesc.trim()}`)
    .filter((l, i) => l.match(/[,\.:;!\?]$/))
    .join("\n")
}

// const createDataset = (bookName) => {
//   let parentPath = path.join(__dirname, '../../')
//   let annotations = annotationsToPipeTxt(bookName, parentPath)
//   let wavsPath = path.join(parentPath, 'wavs')
//   fs.mkdir(wavsPath, {recursive: true})
//   // TODO: MOVE FILES TO SINGLE FOLDER
//   fs.copyFileSync()
// }

module.exports = {
  getAllNestedFiles,
  readAllJsonFiles
}
// let parentPath = path.join(__dirname, '../../', 'ponniyinselvan')
// let jsonFiles = getAllNestedFiles(parentPath).filter((f, i) => f.match(/.json$/))


console.log(annotationsToPipeTxt('ponniyinselvan')); 