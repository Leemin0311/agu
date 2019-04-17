import request from "@utils/request";

/**
 * 获取班级群二维码
 *
 * @return {Promise<Response>}
 */
export function getClasses() {
    return request('/api/config/h5', {
        method: 'post',
    });
}
