import { getCourseList } from './service';

export default {
    namespace: 'classcenter',
    state: {
        categoried: [],
        tips: [],
        selectedCate: null,
        currentPage: 1
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCourseList({ payload }, { select, call, put, take }) {
            yield take('global/auth/@@end');
            const { selectedCate, currentPage } = yield select(state => state.classcenter);

            const rst = yield call(getCourseList, selectedCate, currentPage);

            if(!rst.error) {
                const { total, page ,size, content } = rst.data;

                console.info(total, page, size, content);
            }
        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                if(pathname==='/classcenter') {
                    dispatch({
                        type: 'getCourseList'
                    });
                }
            });
        },
    },
};
