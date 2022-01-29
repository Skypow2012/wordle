const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');

const chengyu_out_name = 'chengyu_4.txt';
if (!fs.existsSync(chengyu_out_name)) fs.writeFileSync(chengyu_out_name, '');
const chengyu_4 = fs.readFileSync(chengyu_out_name).toString();

const hearders = {}
const cys = []

async function main() {
  for (let i = 1; i <= 44; i++) {
    let url = `http://www.dffyw.com/cy/index.asp?page=${i}`
    // url = `http://www.dffyw.com/cy/index.asp?page=1&WebShieldSessionVerify=eNvw8DgJ5GMn1lBgQ9G2`
    const response = (await axios({
      url,
      hearders,
      responseType: 'arraybuffer'
    }));
    str = iconv.decode(Buffer.from(response.data), 'gb2312');
    html = iconv.encode(str, 'utf8').toString();
    console.log(html);
    $ = cheerio.load(html);
    $('center tbody a').each((idx, ele)=>{
      let id = ele.attribs.href || '';
      try {
        id = id.match(/\d+/g)[0];
      } catch(err) {
        id = ''
      }
      const chengyu = $(ele).text().replace(/\s/g, '');
      console.log(chengyu, chengyu.length, id, chengyu_4.indexOf(chengyu) === -1);
      if (chengyu && chengyu.length === 4 && id && chengyu_4.indexOf(chengyu) === -1) {
        fs.appendFileSync(chengyu_out_name, `${chengyu}\t${id}\n`);
        // cys.push(chengyu)
      }
    })
  }
  // console.log(cys.length, cys);
}

main()