import fs from 'node:fs'
import axios from 'axios'

const PORT = 5000
// const PORT = 8080

const service = axios.create({
  baseURL: `http://localhost:${PORT}`,
})


const init = () => {
  service.post('/combine-pdf', {
    pdfList: [
      {
        url: 'https://nextjs.org/',
        isLandscape: true,
        attachment: {
          header: 'Header 自定义页眉',
          footer: 'Footer 自定义页脚',
        },
      },
      {
        url: 'https://baidu.com/',
        // hasMargin: false,
        isLandscape: true,
        cookies: [
          {
            name: 'token',
            value: 'fc83532c-f833-11eb-8526-0242ac130002',
            domain: 'baidu.com',
          },
        ],
      },
    ],
  }, {
    responseType: 'arraybuffer',
  }).then((res) => {
    fs.writeFileSync('combime-test1.pdf', res.data)
  }).catch((err) => {
    console.log(err)
  })
}

init()
