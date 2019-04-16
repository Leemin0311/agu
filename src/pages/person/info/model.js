import { upDateBabyInfo } from './service';

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
        *upDateBabyInfo({ payload = {append : false} }, { select, call, put, take }) {
            const { user } = yield select(state => state.global);

            const rst = yield call(upDateBabyInfo, payload);
            const newUser = {...user};

            if(!rst.error) {
                yield put({
                    type: 'global/setData',
                    payload: {
                        user: {
                            ...newUser,
                            babies: rst.data.babies,
                        }
                    }
                });
            }
        },
    },
};
