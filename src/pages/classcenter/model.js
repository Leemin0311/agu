import { getCourseList, getCategories } from './service';

export default {
    namespace: 'classcenter',
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
        *getCourseList({ payload = {append : false} }, { select, call, put, take }) {
            const { selectedCate, currentPage, courses } = yield select(state => state.classcenter);

            const rst = yield call(getCourseList, selectedCate, currentPage);

            if(!rst.error) {
                const { content, total } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        courses: payload.append ? [...courses, ...content] : content,
                        currentPage: currentPage + 1,
                        total
                    }
                });
            }
        },
        *getCategories(action, { put, call }) {
            const rst = yield call(getCategories);
            if(!rst.error) {
                const { categories, tips } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        categories,
                        tips,
                        selectedCate: categories[0].id
                    }
                });
            }
        },
        *initialize(action, { put, take }) {
            yield put({
                type: 'getCategories'
            });

            yield take('classcenter/getCategories/@@end');

            yield put({
                type: 'getCourseList'
            });
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                if(pathname.startsWith('/classcenter')) {
                    dispatch({
                        type: 'initialize'
                    });
                }
            });
        },
    },
};
