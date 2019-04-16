import { getCouponList } from './service';

export default {
    namespace: 'person_coupon',
    state: {
        page: 0,
        coupons: [],
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCouponList({ payload = {append : false} }, { select, call, put }) {
            const { page } = yield select(state => state.person_coupon);


            let rst = {};
            if(payload.append) {
                rst = yield call(getCouponList, payload.status, page);
            } else  {
                rst = yield call(getCouponList, payload.status, payload.page);
            }
            console.info(rst);
        },
    },
};
