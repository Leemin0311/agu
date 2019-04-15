import request from "../utils/request";

/**
 * 获取鉴权信息
 *
 * @return {Promise<Response>}
 */
export function auth() {
    return request('/api/config/h5', {
        method: 'post',
    });
}

/**
 * 获取jssdk配置信息
 *
 * @return {Promise<Response>}
 */
export function jsConfig() {
    return request('/api/config/js', {
        method: 'post',
    });
}

/**
 * 获取当前登录用户信息
 *
 * @return {Promise<Response>}
 */
export function getUser() {
    return request('/api/user/detail', {
        method: 'post'
    });
}
