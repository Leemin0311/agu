import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';

export default delay({
    'POST /api/user/order/list': (req, res) => {
        const { page } = req.body;

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
                            createTime: "2019-04-15T10:14:53.627Z",
                            expireTime: "2019-04-15T10:14:53.627Z",
                            fee: '@integer(0,1000)',
                            group: {
                                courseId: '@guid',
                                createTime: "2019-04-15T10:14:53.627Z",
                                expireTime: "2019-04-17T10:14:53.627Z",
                                id: '@guid',
                                'members|10': [
                                    {
                                        avatar:	'',
                                        name:'@cname',
                                        userId: '@guid'
                                    }
                                ]
                            },
                            'status|1': ['Created', 'Finished', 'Grouping', 'GroupFailed', 'Refunded'],
                            payTime: "2019-04-15T10:14:53.627Z",
                            refundTime: "2019-04-15T10:14:53.627Z",
                            snapshot: {
                                courseId: '@guid',
                                icon: 'https://v.aguzaojiao.com/assets/share1.png',
                                name: '@cname@cname@cname@cname@cname@cname@cname@cname@cname@cname'
                            },
                            type: 'Member',
                            userId: '@guid'
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
                            "birthday": "2019-04-16T05:07:53.143Z",
                            "male": true,
                            "name": "@cname",
                            "photo": "string"
                        }
                    ],
                },
            }),
        );
    },
    'POST /api/user/coupon/list': (req, res) => {
        const { status } = req.body;
        res.send(
            Mock.mock({
                data: {
                    'conten|10': [
                        {
                            courseId: "@guid",
                            createTime: '2019-04-16T05:50:57.585Z',
                            expireTime: '2019-04-16T05:50:57.585Z',
                            fee: 0,
                            group: {
                                courseId: "@guid",
                                createTime: '2019-04-16T05:50:57.585Z',
                                expireTime: '2019-04-16T05:50:57.585Z',
                                id: "string",
                                members: [
                                    {
                                        avatar: "string",
                                        name: "@cname",
                                        userId: "@guid"
                                    }
                                ]
                            },
                            id: "@guid",
                            payTime: '2019-04-16T05:50:57.585Z',
                            refundTime: '2019-04-16T05:50:57.585Z',
                            snapshot: {
                                courseId: "string",
                                icon: "string",
                                name: "string"
                            },
                            status: status,
                            type: "Member",
                            userId: "string"
                        }
                    ],
                    page: 0,
                    size: 0,
                    total: 0
                },
            }),
        );
    },
});
