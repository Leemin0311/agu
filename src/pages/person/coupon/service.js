import request from "@utils/request";

/**
 * 获取订单列表
 *
 * @return {Promise<Response>}
 */
export function getCouponList({status, page}) {
    return request('/api/user/coupon/list', {
        method: 'post',
        body: JSON.stringify({
            status,
            page
        })
    });
}
