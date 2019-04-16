import request from "@utils/request";

/**
 * 获取订单列表
 *
 * @return {Promise<Response>}
 */
export function getOrdersList(status, page) {
    return request('/api/user/order/list', {
        method: 'post',
        body: JSON.stringify({
            status,
            page
        })
    });
}
