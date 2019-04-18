import { getCourseList } from './service';

export default {
    namespace: 'classroom',
    state: {
        courses: [],
        page: 0,
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCourseList({ payload = {append : false} }, { select, call, put }) {
            const { courses } = yield select(state => state.classroom);

            const rst = yield call(getCourseList, payload.page);


            if(!rst.error) {
                const { content } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        courses: payload.append ? [...courses, ...content] : content,
                        page: payload.page + 1
                    }
                });
            }
        },
    },
};
