import router from 'umi/router';
import { auth, getUser } from '../services/global';

export default {
    namespace: 'global',
    state: {
        user: null,
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *auth({ payload }, { call, put }) {
            const rst = yield call(auth);
            sessionStorage.render = false;
            if (!sessionStorage.authed) {
                const { authUrl } = rst.data;

                if (authUrl) {
                    window.location.href = authUrl;
                }
                sessionStorage.authed = true;
                sessionStorage.render = true;
                yield put({
                    type: 'getUser',
                });
            } else {
                sessionStorage.render = true;
                yield put({
                    type: 'getUser',
                });
                yield put({
                    type: 'setData',
                    payload: {
                        shareH5: rst.data.shareH5
                    }
                });
            }
        },
        *getUser(action, { put, call, select }) {
            const { user } = yield select(state => state.global);

            if (user) {
                return;
            }

            const rst = yield call(getUser);

            if (!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        user: rst.data,
                    },
                });
            }
        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                if(pathname === '/' ) {
                    router.push('/classcenter');
                }

                dispatch({
                    type: 'auth',
                });
            });
        },
    },
};
