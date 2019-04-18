import request from "@utils/request";

/**
 * 获取Vip详情
 *
 * @return {Promise<Response>}
 */
export function getVipInfo() {
    return request('/api/config/h5', {
        method: 'post',
    });
}

/**
 * 获取优惠券
 *
 * @return {Promise<Response>}
 */
export function getCoupon() {
    return request('/api/user/coupon/match', {
        method: 'post',
        body: JSON.stringify({
            type: 'Course'
        })
    });
}
