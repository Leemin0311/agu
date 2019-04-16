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
        *getOrderList({ payload = {append : false} }, { select, call, put }) {
            const { orders } = yield select(state => state.person_order);

            const rst = yield call(getOrdersList, payload.status, payload.page);


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
