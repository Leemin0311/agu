import { getClasses } from './service';

export default {
    namespace: 'person_Classes',
    state: {
        classImage: ''
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCategories(action, { put, call }) {
            const rst = yield call(getClasses);
            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        classImage: rst.data.classImage
                    }
                });
            }
        },
    },
};
