import { getClasses } from './service';

export default {
    namespace: 'person_Classes',
    state: {
        image: ''
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCategories(action, { put, call }) {
            const rst = yield call(getClasses);
            console.info(rst);
        },
    },
};
