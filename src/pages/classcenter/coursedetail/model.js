import { getCourseDetail, getCoupon } from './service';

export default {
    namespace: 'coursedetail',
    state: {

    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getDetail({payload : { id }}, { put, call }) {
            const rst = yield call(getCourseDetail, id);
            if(!rst.error) {
                const coupon = yield call(getCoupon, id);

                yield put({
                    type: 'setData',
                    payload: {
                        ...rst.data,
                        coupon: coupon.error ? null : coupon.data[0]
                    }
                });
            }
        },
    },
};
