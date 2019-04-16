import { getCouponList } from './service';

export default {
    namespace: 'person_coupon',
    state: {
        coupons_Valid: [],
        coupons_Used: [],
        coupons_Expired: [],
        page_Valid: 0,
        page_Used: 0,
        page_Expired: 0,
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCouponList({ payload = {append : false} }, { select, call, put }) {
            const state = yield select(state => state.person_coupon);
            const coupons = [...state[`coupons_${payload.status}`]];

            const rst = yield call(getCouponList, payload.status, payload.page);

            if(!rst.error) {
                const {content} = rst.data;
                yield put({
                    type: 'setData',
                    payload: {
                        [`coupons_${payload.status}`]: payload.append ? [...coupons, ...content] : content,
                        [`page_${payload.status}`]:  payload.page + 1
                    }
                });
            }
        },
    },
};
