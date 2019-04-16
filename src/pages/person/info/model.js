import { upDateBabyInfo } from './service';

export default {
    namespace: 'person_info',
    state: {
    },
    reducers: {
    },
    effects: {
        *upDateBabyInfo({ payload = {append : false} }, { select, call, put }) {
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
