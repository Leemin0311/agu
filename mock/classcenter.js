import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';
import moment from 'moment';
import axios from 'axios';

export default delay({
    'POST /api/course/list': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        axios
            .post('https://47.92.193.242:8085/api/course/list', req.body, { headers: req.headers })
            .then(response => {
                res.send(response.data);
            });
    },
    'POST /api/course/detail': (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const random = Math.random();
        let order = null;
        if (random > 0.5) {
            order = {
                courseId: 'string',
                createTime: moment().toDate(),
                expireTime: moment()
                    .add(2, 'days')
                    .add(4, 'hours')
                    .toDate(),
                fee: 0,
                group: {
                    courseId: 'string',
                    createTime: moment().toDate(),
                    expireTime: moment()
                        .add(2, 'days')
                        .add(4, 'hours')
                        .toDate(),
                    id: 'string',
                    members: [
                        {
                            avatar:
                                'https://thirdwx.qlogo.cn/mmopen/vi_32/oDdHb56h1q1CJZmUQH3HEuFmrgMme5ibH4mVA2CVNqicJhibvk1sMapicoDzsgxBibYVvkg7WhOKrZ7AeoDr1LX25AA/132',
                            name: 'string',
                            userId: 'string',
                        },
                        {
                            avatar:
                                'https://thirdwx.qlogo.cn/mmopen/vi_32/oDdHb56h1q1CJZmUQH3HEuFmrgMme5ibH4mVA2CVNqicJhibvk1sMapicoDzsgxBibYVvkg7WhOKrZ7AeoDr1LX25AA/132',
                            name: 'askdfja',
                            userId: 'string',
                        },
                    ],
                },
                id: 'string',
                payTime: moment()
                    .add(2, 'days')
                    .add(4, 'hours')
                    .toDate(),
                refundTime: moment()
                    .add(2, 'days')
                    .add(4, 'hours')
                    .toDate(),
                snapshot: {
                    courseId: 'string',
                    icon: 'string',
                    name: 'string',
                },
                status: 'Created',
                type: 'Member',
                userId: 'string',
            };
        }

        res.send(
            Mock.mock({
                data: {
                    id: '5caf6227c796e928960c60d5',
                    name: '(1)少儿版三国演义动画故事',
                    icon: 'https://v.aguzaojiao.com/assets/share1.png',
                    coverImage: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                    intro: '(1)有滋有味看三国，变身聪明小诸葛',
                    shortDesc:
                        '(1)让孩子有滋有味听三国演义， 激发孩子学习和探索传统文化的兴趣，提高语言水平和花纹底蕴',
                    badge: 'https://v.aguzaojiao.com/test/badge1.png',
                    theme: {
                        bgColor: '#FBDA54',
                        fontColor: '#FFFFFF',
                        bgImage: 'https://v.aguzaojiao.com/test/theme1.png',
                    },
                    headMedia: [
                        {
                            type: 'Video',
                            url: 'https://v.aguzaojiao.com/assets/assess_intro.mp4',
                            thumbnail: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                        },
                    ],
                    detailMedia: [
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/detail1.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/detail2.png',
                        },
                    ],
                    outlineMedia: [
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/outline1.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/outline2.png',
                        },
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/outline3.png',
                        },
                    ],
                    noteMedia: [
                        {
                            type: 'Image',
                            url: 'https://v.aguzaojiao.com/test/note1.png',
                        },
                    ],
                    tags: ['适合3-12岁', '24节课', '永久会看', '人数不足退款'],
                    oldPrice: 19900,
                    price: 9900,
                    groupPrice: 2990,
                    lessonCount: 10,
                    categoryIds: [1, 2, 3],
                    purchasers: [
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/oDdHb56h1q1CJZmUQH3HEuFmrgMme5ibH4mVA2CVNqicJhibvk1sMapicoDzsgxBibYVvkg7WhOKrZ7AeoDr1LX25AA/132',
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL8BkamqsibpiafblSxaco2cFZ8RO25u8vjKJtgXrp4OQP9scbG9Pandh0dibl7MWM25Dzw31Aswz8pg/132',
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq2DHEtnqWIg9BzZgPmZjO0fYR9gHelTsY0bNGQDvYvbtgOqUMkRh0FxiaFicmtDq3iad5VWMSI9IRFg/132',
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/J81dpk9cq93ZnAMicyMaDXvlqU5NqDcrM2xCQHQM4FUGEavI7TfjLic6NktbxuM3MicWUFeVxCR0gCovic1CI2Fv8w/132',
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfhXgAf1ib0c7UHKaqDWicnTK5AQOKLTuzFQeozmuk03PuyibayH5icV6XK7UhyFcvR00NkHNVw7FA3Q/132',
                        'https://thirdwx.qlogo.cn/mmopen/vi_32/V88ayRzQjW3fuEfVrhdT4YriaaFicPjt5RhAGP6vnTxLshIrclZQo8rP3hDc7llIy9G8VGJsZwf0IehAyeNcnKSA/132',
                    ],
                    userCount: 61273,
                    seq: 1,
                    purchased: true,
                    progress: 50,
                    order,
                    shareH5: {
                        shareTitle: '18个朋友正在拼->收发，孩子的第一部《三国演义》动画， 一看...',
                        shareDesc: '24集精选股市，让孩子学习古人智慧，变身小诸葛',
                        shareImage: 'https://v.aguzaojiao.com/assets/share1.png',
                        shareUrl: 'http://www.aguzaojiao.com/courses/5caf6227c796e928960c60d5?f=s',
                        qrcode:
                            'http://www.aguzaojiao.com/qrcode?content=http%3A%2F%2Fwww.aguzaojiao.com%2Fcourses%2F5caf6227c796e928960c60d5%3Ff%3Ds',
                        bgImage: 'https://v.aguzaojiao.com/test/detail2.png',
                    },
                    'lessons|10': [
                        {
                            courseId: '@guid',
                            name: '(1)有滋有味看三国，变身聪明小诸葛',
                            userCount: '@integer(0,100000)',
                            cover: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                        },
                    ],
                },
            }),
        );
    },
    'POST /api/share/detail': (req, res) => {
        res.send({
            data: {
                user: {
                    id: '5caf6336c796e928b962d4d5',
                    wechatUser: {
                        nickName: 'KFX',
                        avatarUrl:
                            'http://thirdwx.qlogo.cn/mmopen/vi_32/PiaptficfMY2K46tSTgp0U2wVpVtAOIYiaQUTANKzl3V3Dt19CNxe7cNKMkdq8ibr4icGOhxZYOibCaDZuWxnrN0AgBQ/132',
                    },
                },
                group: {
                    id: '5cb576b6c796e914ed2dbbff',
                    courseId: '5caf6227c796e928960c60d5',
                    members: [
                        {
                            userId: '5cafed3ffe203273da3cc2f2',
                            name: '王不二',
                            avatar:
                                'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqQOmGZj6VHFQA2Ciay0unZcYPcibfjIIATmezTrA1OfXAibSlxCAicMN3URdZOpqf5rwclktbwNcaH9A/132',
                        },
                        {
                            userId: '5caf4383c796e922962f226f',
                            name: 'KFX',
                            avatar:
                                'http://thirdwx.qlogo.cn/mmopen/vi_32/PiaptficfMY2K46tSTgp0U2wVpVtAOIYiaQUTANKzl3V3Dt19CNxe7cNKMkdq8ibr4icGOhxZYOibCaDZuWxnrN0AgBQ/132',
                        },
                    ],
                    createTime: 1555396278675,
                    expireTime: 1557988278675,
                },
            },
        });
    },
});
