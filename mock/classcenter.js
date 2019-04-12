import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';

export default delay({
    'POST /api/course/list': (req, res) => {
        const { page } = req.body;

        res.send(Mock.mock({
            data: {
                total: 10,
                page,
                size: 10,
                'content|10': [{
                    id: '@guid',
                    name: '少儿版三国演义动画故事@integer',
                    icon: 'https://v.aguzaojiao.com/assets/share1.png',
                    coverImage: 'https://v.aguzaojiao.com/assets/assess_intro.png',
                    intro: '(1)有滋有味看三国，变身聪明小诸葛',
                    shortDesc:
                        '(1)让孩子有滋有味听三国演义， 激发孩子学习和探索传统文化的兴趣，提高语言水平和花纹底蕴',
                    badge: 'https://v.aguzaojiao.com/test/badge1.png',
                    theme: {
                        color: '#FBDA54',
                        bgImage: 'https://v.aguzaojiao.com/test/theme1.png',
                    },
                    tags: ['适合3-12岁', '24节课', '永久会看', '人数不足退款'],
                    oldPrice: 19900,
                    price: 9900,
                    groupPrice: 2990,
                    lessonCount: 10,
                    categoryIds: [1, 2, 3],
                    userCount: 61271,
                    seq: 1,
                }],
            },
        }));
    },
});
