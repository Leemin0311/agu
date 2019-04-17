import request from "@utils/request";

/**
 * 获取课程详情
 *
 * @return {Promise<Response>}
 */
export function getCourseDetail(id) {
    return request('/api/course/detail', {
        method: 'post',
        body: JSON.stringify({
            id
        })
    });
}
