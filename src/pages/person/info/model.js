import { upDateBabuInfo } from './service';

export default {
    namespace: 'person_info',
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

            const rst = yield call(upDateBabuInfo, payload);

            if(!rst.error) {
                yield put({
                    type: 'global/getUser',
                    payload: {
                        needUpdate: true
                    }
                });
            }
        },
    },
};
