import request from "@utils/request";

/**
 * 获取订单列表
 *
 * @return {Promise<Response>}
 */
export function upDateBabyInfo({birthday, male, name, photo}) {
    return request('/api/user/update', {
        method: 'post',
        body: JSON.stringify({
            baby: {
                birthday,
                male,
                name,
                photo
            }
        })
    });
}
