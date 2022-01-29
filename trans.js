const fs = require('fs');
const axios = require('axios');
const md5 = require('md5');

const word_5s = fs.readFileSync('./word_5.txt').toString().split('\r\n');
const word_5_transed = fs.readFileSync('./word_5_transed.txt').toString();

const baidu_appid = '20210422000794518'
const baidu_secret = 'sTTHX_evao6chbZWoFU7';
const salt = Math.random().toString().substr(2, 10);

let cnt = 0;

async function main() {
  for (word of word_5s) {
    cnt++;
    if (word_5_transed.indexOf(word) !== -1) continue;
  
    // 有道
    // let result = (await axios.get(`https://tekii.cn/market/q/trans?i=${encodeURIComponent(word)}`)).data;
    // const tgt = result.info.translateResult[0][0].tgt;
    // 百度
    const baidu_sign = md5(`${baidu_appid}${word}${salt}${baidu_secret}`); // appid+q+salt+密钥 的MD5值
    let result = (await axios.get(`https://fanyi-api.baidu.com/api/trans/vip/translate?q=${word}&from=auto&to=auto&appid=${baidu_appid}&salt=${salt}&sign=${baidu_sign}`)).data;
    const tgt = result.trans_result[0].dst;
  
    if (word !== tgt) {
      console.log(cnt, `${word}\t${tgt}\n`)
      fs.appendFileSync('./word_5_transed.txt', `${word}\t${tgt}\n`);
    }
  }
}

main()
