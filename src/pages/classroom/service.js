import request from "@utils/request";

/**
 * 获取我的课堂列表
 *
 * @return {Promise<Response>}
 */
export function getCourseList(page) {
    return request('/api/user/course/list', {
        method: 'post',
        body: JSON.stringify({
            page
        })
    });
}
