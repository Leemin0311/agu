import { getCourseDetail } from './service';

export default {
    namespace: 'classroom_list',
    state: {

    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getDetail({payload : { id }}, { put, call, select }) {
            const rst = yield call(getCourseDetail, id);

            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        ...rst.data,
                    }
                });
            }
        },
    },
};
