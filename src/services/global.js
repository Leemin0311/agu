import request from "../utils/request";

/**
 * 查询当前登录用户信息
 *
 * @return {Promise<Response>}
 */
export function auth() {
    return request('/api/config/h5', {
        method: 'post',
        headers: {
            Referer: 'xxdxxxx'
        }
    });
}

export function jsConfig() {
    return request('/api/config/js', {
        method: 'post',
        headers: {
            Referer: 'xxdxxxx'
        }
    });
}

export function getUser() {
    return request('/api/user/detail', {
        method: 'post'
    });
}
