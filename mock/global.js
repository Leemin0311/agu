import { delay } from 'roadhog-api-doc';
import axios from 'axios';

export default delay({
    'POST /api/config/h5': (req, res) => {
        axios
            .post(
                'http://www.aguzaojiao.com/api/config/h5',
                {},
                {
                    headers: req.headers,
                },
            )
            .then(response => {
                res.send(response.data);
            });
    },
    'POST /api/config/js': (req, res) => {
        axios
            .post(
                'http://www.aguzaojiao.com/api/config/js',
                {},
                {
                    headers: {
                        ...req.headers,
                    },
                },
            )
            .then(response => {
                res.send(response.data);
            });
    },
    'POST /api/user/detail': {
        data: {
            id: '5caf4383c796e922962f226f',
            babies: [
                {
                    birthday: "2019-04-15T07:33:06.780Z",
                    male: true,
                    name: "熊孩子",
                    photo: "string"
                }
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
    },
    'POST /api/user/coupon/match': {
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
    },
});
