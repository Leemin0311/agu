import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';

export default delay({
    'POST /api/user/order/list': (req, res) => {
        const { page, status } = req.body;

        let s;
        if (!status) {
            s = ['Created', 'Finished', 'Grouping', 'GroupFailed'];
        } else {
            s = [status];
        }

        res.send(
            Mock.mock({
                data: {
                    total: 10,
                    page,
                    size: 10,
                    'content|10': [
                        {
                            id: '@guid',
                            courseId: '@guid',
                            createTime: '2019-04-20T10:14:53.627Z',
                            expireTime: '2019-04-30T10:14:53.627Z',
                            fee: '@integer(0,1000)',
                            group: {
                                courseId: '@guid',
                                createTime: '2019-04-15T10:14:53.627Z',
                                expireTime: '2019-04-17T10:14:53.627Z',
                                id: '@guid',
                                'members|10': [
                                    {
                                        avatar: '',
                                        name: '@cname',
                                        userId: '@guid',
                                    },
                                ],
                            },
                            'status|1': s,
                            payTime: '2019-04-15T10:14:53.627Z',
                            refundTime: '2019-04-15T10:14:53.627Z',
                            snapshot: {
                                courseId: '@guid',
                                icon: 'https://v.aguzaojiao.com/assets/share1.png',
                                name:
                                    '@cname@cname@cname@cname@cname@cname@cname@cname@cname@cname',
                                bgPoster: 'https://v.aguzaojiao.com/assets/share1.png',
                                url: 'https://baidu.com'

                            },
                            type: 'Member',
                            userId: '@guid',
                        },
                    ],
                },
            }),
        );
    },
    'POST /api/user/update': (req, res) => {
        res.send(
            Mock.mock({
                data: {
                    babies: [
                        {
                            birthday: '2019-04-16T05:07:53.143Z',
                            male: true,
                            name: '@cname',
                            photo: 'string',
                        },
                    ],
                },
            }),
        );
    },
    'POST /api/user/coupon/list': (req, res) => {
        const { status } = req.body;
        res.send({
            data: {
                total: 2,
                page: 1,
                size: 10,
                content: [
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
                    {
                        id: '5caf627dc796e928b0548d76',
                        userId: '5caf4383c796e922962f226f',
                        coupon: {
                            id: '5caf6264c796e928ab07d037',
                            name: '新课专享， 立减0.01元',
                            image: 'https://v.aguzaojiao.com/test/coupon1.png',
                            type: 'Course',
                            intro: '新用户购买， 立减0.01',
                            value: 2,
                            bgImage: 'https://v.aguzaojiao.com/test/bg_coupon.png',
                        },
                        status,
                        courses: [
                            {
                                id: '5caf6227c796e928960c60d5',
                                name: '(1)少儿版三国演义动画故事',
                                icon: 'https://v.aguzaojiao.com/assets/share1.png',
                                coverImage: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                                intro: '(1)有滋有味看三国，变身聪明小诸葛',
                            },
                        ],
                        createTime: 1554997885163,
                        expireTime: 1557676285161,
                    },
                ],
            },
            logon: '5caf4383c796e922962f226f',
        });
    },
});
