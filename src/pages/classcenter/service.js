import request from "@utils/request";

/**
 * 查询当前登录用户信息
 *
 * @return {Promise<Response>}
 */
export function getCourseList(cate, page) {
    return request('/api/course/list', {
        method: 'post',
        body: JSON.stringify({
            cate,
            page
        })
    });
}
