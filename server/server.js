const express = require('express');
const fs = require('fs');

const app = express();

let port = 8087;

//静态文件处理, HTTP对/static的请求都映射到相对目录的 /dist/static
app.use('/static', express.static('dist/static'));
// app.use('/umi.js', express.static('dist/umi.js'));
// app.use('/umi.css', express.static('dist/umi.css'));
app.use('/', express.static('dist'));

// app.use(favicon(path.join(__dirname, 'dist', 'favicon.png')));

//mock首页, 将index.html读取到内存, 根据环境变量添加API HOST
app.get('/*', (req, res) => {
    fs.readFile('dist/index.html', 'utf8', (err, data) => {
        res.header('content-type', 'text/html');
        res.write(data);
        res.end();
    });
});

try{
    app.listen(port, () => {
        console.info(`服务器已启动, 端口: ${port}`);
    });
} catch(e){
    console.info(e);
}
