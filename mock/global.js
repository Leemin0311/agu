import { delay } from 'roadhog-api-doc';
import axios from 'axios';
import fs from 'fs';
import moment from 'moment';

export default delay({
    'POST /api/config/h5': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        axios
            .post(
                'http://47.92.193.242:8085/api/config/h5',
                {},
                {
                    headers: req.headers,
                },
            )
            .then(response => {
                res.send(response.data);
            })
            .catch(e => {
                console.info(e);
                res.end();
            });
    },
    'POST /api/config/js': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        axios
            .post(
                'http://47.92.193.242:8085/api/config/js',
                {},
                {
                    headers: {
                        ...req.headers,
                    },
                },
            )
            .then(response => {
                res.send(response.data);
            })
            .catch(e => {
                console.info(e);
                res.end();
            });
    },
    'POST /api/user/detail': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send({
            data: {
                id: '5caf4383c796e922962f226f',
                babies: [
                    {
                        birthday: '2019-04-15T07:33:06.780Z',
                        male: true,
                        name: '熊孩子',
                        photo: 'https://v.aguzaojiao.com/test/coupon1.png',
                    },
                ],
                wechatUser: {
                    unionId: 'ocxGV0vgaDhcPjRw7yVW5No4oNXA',
                    nickName: 'KFX',
                    gender: 1,
                    city: '深圳',
                    province: '广东',
                    country: '中国',
                    avatarUrl:
                        'http://thirdwx.qlogo.cn/mmopen/vi_32/PiaptficfMY2K46tSTgp0U2wVpVtAOIYiaQUTANKzl3V3Dt19CNxe7cNKMkdq8ibr4icGOhxZYOibCaDZuWxnrN0AgBQ/132',
                    openIds: {
                        wxecb0b8c305428151: 'oa9xN1EXBs3Ez-0rmGAfpjfW8st0',
                    },
                },
                createTime: 1554998070352,
                coupons: true,
            },
        });
    },
    'POST /api/user/coupon/match': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send({
            data: [
                {
                    id: '5caf627dc796e928b0548d78',
                    userId: '5caf4383c796e922962f226f',
                    coupon: {
                        id: '5caf6264c796e928ab07d039',
                        name: '全场通用， 立减0.01元',
                        image: 'https://v.aguzaojiao.com/test/coupon1.png',
                        type: 'Any',
                        intro: '新用户购买， 立减0.01',
                        value: 1,
                    },
                    status: 'Valid',
                    createTime: 1554997885189,
                    expireTime: 1557676285187,
                },
            ],
        });
    },
    'POST /log': (req, res) => {
        console.info(req.body);

        res.send({
            success: true,
        });

        try {
            fs.appendFile('/opt/agu-fe/agu/log/log.txt', moment() + ' ' + JSON.stringify(req.body) + '\n\n', 'utf8', function(err){
                if(err) console.info(err);
            });
        } catch(e) {
            if(e) console.info(e);
        }
    },
    'POST /api/wxpay/prepare': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        axios
            .post('http://47.92.193.242:8085/api/wxpay/prepare', req.body, { headers: req.headers })
            .then(response => {
                res.send(response.data);
            })
            .catch(e => {
                console.info(e);
                res.end();
            });
    },
    'GET /api/rdt/qrcode': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        axios
            .get(`http://47.92.193.242:8085/api/rdt/qrcode?text=${req.query.text}`, {
                headers: req.headers,
            })
            .then(response => {
                res.set(response.headers);
                res.write(response.data);
                res.end();
            })
            .catch(e => {
                console.info(e);
                res.end();
            });
    },
    'GET /api/user/auth/wechat': (req, res) => {
        axios({
            method: 'get',
            url: `http://47.92.193.242:8085/api/user/auth/wechat?code=${req.query.code}&state=${
                req.query.state
            }`,
            maxRedirects: 0

        })
            .then(response => {
                console.info('-----------');
                console.info(response.status);
                console.info(response.request);
                console.info(response.headers);
                console.info('-----------');

                res.set(response.headers);
                res.send(response.data);
            })
            .catch(err =>  {
                res.set(err.response.headers);
                res.status(302).end();
            });

    },
});
