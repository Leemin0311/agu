/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { API_HOST } from '@/utils/config';
import { log } from './tools';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler: e => {
        log(e);
    }, // 默认错误处理
    prefix: API_HOST,
});

export default (url, option = {}) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...option.headers,
    };

    return request(url, {
        ...option,
        headers,
        credentials: 'include',
    });
};
