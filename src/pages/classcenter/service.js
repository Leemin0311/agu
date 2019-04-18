import request from "@utils/request";

/**
 * 获取课程列表
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

/**
 * 获取课程分类信息
 *
 * @return {Promise<Response>}
 */
export function getCategories() {
    return request('/api/config/h5', {
        method: 'post',
    });
}

/**
 * 获取课程列表
 *
 * @return {Promise<Response>}
 */
export function getCouponList() {
    return request('/api/user/coupon/list', {
        method: 'post',
        body: JSON.stringify({
            stauts: 'Valid',
            page: 1
        })
    });
}
