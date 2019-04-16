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

/**
 * 获取拼团详情
 *
 * @return {Promise<Response>}
 */
export function getGroupDetail(groupId, userId) {
    return request('/api/share/detail', {
        method: 'post',
        body: JSON.stringify({
            groupId,
            userId
        })
    });
}

/**
 * 获取优惠券
 *
 * @return {Promise<Response>}
 */
export function getCoupon(id) {
    return request('/api/user/coupon/match', {
        method: 'post',
        body: JSON.stringify({
            courseId: id,
            type: 'Course'
        })
    });
}
