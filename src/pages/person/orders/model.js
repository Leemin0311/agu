import { getOrdersList } from './service';

export default {
    namespace: 'person_order',
    state: {
        categories: [],
        tips: [],
        selectedCate: null,
        currentPage: 1,
        courses: []
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getOrderList({ payload = {append : false} }, { select, call, put, take }) {
            // const { selectedCate, currentPage, courses } = yield select(state => state.classcenter);

            const rst = yield call(getOrdersList, payload.status, payload.page);

            if(!rst.error) {
                const { content } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        orders: content,
                        currentPage: 1
                    }
                });
            }
        },
    },
};
