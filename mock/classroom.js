import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';

export default delay({
    'POST /api/user/course/list': (req, res) => {
        res.send(
            Mock.mock({
                data: {
                    total: 10,
                    page: 1,
                    size: 10,
                    "content|10": [
                        {
                            id: "5caf6227c796e928960c60d5",
                            name: "(1)少儿版三国演义动画故事",
                            icon: "https://v.aguzaojiao.com/assets/share1.png",
                            coverImage:" https://v.aguzaojiao.com/assets/assess_intro.png",
                            intro: "(1)有滋有味看三国，变身聪明小诸葛",
                            shortDesc: "(1)让孩子有滋有味听三国演义， 激发孩子学习和探索传统文化的兴趣，提高语言水平和花纹底蕴",
                            badge: "https://v.aguzaojiao.com/test/badge1.png",
                            theme: {
                                bgColor: "#FBDA54",
                                fontColor: "#FFFFFF",
                                bgImage: "https://v.aguzaojiao.com/test/theme1.png"
                            },
                            tags: [
                                "适合3-12岁",
                                "24节课",
                                "永久会看",
                                "人数不足退款"
                            ],
                            oldPrice: 19900,
                            price: 9900,
                            groupPrice: 2990,
                            lessonCount: 10,
                            categoryIds: [
                                1,
                                2,
                                3
                            ],
                            userCount: 61279,
                            seq: 1,
                            progress: 5012,
                            duration: 10000,
                            purchased: true,
                            // order:
                            //     {
                            //         courseId :  'string' ,
                            //         createTime :  "2019-04-21T10:36:20.231Z" ,
                            //         expireTime :  "2019-04-21T10:36:20.231Z" ,
                            //         fee : 0,
                            //         group : {
                            //             courseId :  "string" ,
                            //             createTime :  "2019-04-21T10:36:20.231Z",
                            //             expireTime :  "2019-04-21T10:36:20.231Z" ,
                            //             id :  "string" ,
                            //             members : [
                            //                 {
                            //                     avatar :  "string" ,
                            //                     name :  "string" ,
                            //                     userId :  "string"
                            //                 }
                            //             ]
                            //         },
                            //     }
                        },
                    ]
                },
                logon: "5caf4383c796e922962f226f"
            }),
        );
    },
    'POST /api/course/learn' : (req, res) => {
        res.send({
            data: {
                baseUsers: 0,
                courseId: "string",
                cover: "https://v.aguzaojiao.com/assets/share1.png",
                duration: 0,
                id: "string",
                name: "string",
                progress: 0,
                seq: 0,
                userCount: 0,
                video: "https://drm.aguzaojiao.com/test-course/demo.mp4?r=5caf6247c796e928a70999b4?Expires=1556024116&OSSAccessKeyId=LTAI1U5ObTSYEBRj&Signature=oUVb4QgBS4T8E1GjSroUu3bMB0I%3D"
            }
        });
    },
    'POST /api/course/lessons' : (req, res) => {
        res.send({
            data: [
                {
                    baseUsers : 0,
                    courseId :  '' ,
                    cover :  'https://v.aguzaojiao.com/assets/share1.png' ,
                    duration : 0,
                    id :  '123' ,
                    name :  'dmwkmf' ,
                    progress : 0,
                    seq : 0,
                    userCount : 10000000,
                    video :  "https://v.aguzaojiao.com/assets/assess_intro.mp4"
                }
            ]
        });
    }
});
