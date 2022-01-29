const fs = require('fs');
const newCys = require('./idiom.json') // https://github.com/pwxcoo/chinese-xinhua/blob/master/data/idiom.json
const cys = JSON.parse(fs.readFileSync('./cys.js').toString().replace('const cys = ', '').replace(/'/g, '"'));
console.log(cys.length)
for (newCyInfo of newCys) {
  var word = newCyInfo.word.replace(/\s/, '');
  if (word.length === 4 && cys.indexOf(word) === -1) {
    cys.push(word)
  }
}
console.log(cys.length)
fs.writeFileSync('cys2.js', `const cys = ${JSON.stringify(cys)}`);
