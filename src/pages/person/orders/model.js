import { getOrdersList } from './service';

export default {
    namespace: 'person_order',
    state: {
        page: 0,
        orders: []
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getOrderList({ payload = {append : false} }, { select, call, put, take }) {
            const { page, orders } = yield select(state => state.person_order);


            let rst = {};
            if(payload.append) {
                rst = yield call(getOrdersList, payload.status, page);
            } else  {
                rst = yield call(getOrdersList, payload.status, payload.page);
            }

            if(!rst.error) {
                const { content } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        orders: payload.append ? [...orders, ...content] : content,
                        page: payload.page + 1
                    }
                });
            }
        },
    },
};
