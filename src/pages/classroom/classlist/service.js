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

export function getLearn(id) {
    return request('/api/course/learn', {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    });
}

export function getLessons(id) {
    return request('/api/course/lessons', {
        method: 'POST',
        body: JSON.stringify({
            courseId: id,
            withProgress: true
        })
    });
}
