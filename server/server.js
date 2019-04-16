const express = require('express');
const fs = require('fs');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

const PORT = process.env.PORT;
const API_HOST = process.env.API_HOST;
const STORAGE = process.env.STORAGE;
const GA_ID = process.env.GA_ID;

let port = 8080;
let apiHost = 'http://127.0.0.1:8000';

if (PORT) {
    port = parseInt(PORT, 10);
    console.info('从环境变量获取到启动端口:', port);
}

if (API_HOST) {
    apiHost = API_HOST;
    console.info('从环境变量获取到API HOST:', apiHost);
} else {
    console.info('没有获取到API HOST, 采用默认:', apiHost);
}

//静态文件处理, HTTP对/static的请求都映射到相对目录的 /dist/static
app.use('/static', express.static('dist/static'));
// app.use('/umi.js', express.static('dist/umi.js'));
// app.use('/umi.css', express.static('dist/umi.css'));
app.use('/', express.static('dist'));

// app.use(favicon(path.join(__dirname, 'dist', 'favicon.png')));

//mock首页, 将index.html读取到内存, 根据环境变量添加API HOST
app.get('/*', (req, res) => {
    fs.readFile('dist/index.html', 'utf8', (err, data) => {
        let dataToClient = null;
        let prefix =
            "<body><script>var API_HOST='" + apiHost + "'; var STORAGE='" + STORAGE + "';</script>";
        dataToClient = data.replace('<body>', prefix);
        let head = "<head><script>var GA='" + GA_ID + "';</script>";
        dataToClient = dataToClient.replace('<head>', head);
        res.header('content-type', 'text/html');
        res.write(dataToClient);
        res.end();
    });
});

app.listen(port, () => {
    console.info('服务器已启动');
});
