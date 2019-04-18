import { getVipInfo, getCoupon } from './service';

export default {
    namespace: 'vip',
    state: {
        type: 1,
        price: 0,
        oldPrice: 0,
        media: [],
        couponList: []
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *initialize(action, { put, call }) {

            const rst = yield call(getVipInfo);
            if(!rst.error) {
                const { vipships } = rst.data;
                const coupon = yield call(getCoupon);

                yield put({
                    type: 'setData',
                    payload: {
                        ...vipships[0],
                        couponList: coupon.data || []
                    }
                });
            }
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                if(pathname.startsWith('/vip')) {
                    dispatch({
                        type: 'initialize'
                    });
                }
            });
        },
    },
};
