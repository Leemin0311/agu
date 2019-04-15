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
});
