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
});