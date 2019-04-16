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

            if (!sessionStorage.authed) {
                const rst = yield call(auth);
                const { authUrl } = rst.data;

                if (/wechat/.test(navigator.userAgent)) window.location.href = authUrl;
                sessionStorage.authed = true;
            } else {
                yield put({
                    type: 'getUser',
                });
            }
        },
        *getUser(action, { put, call, select }) {
            const { user } = yield select(state => state.global);

            if (user && !action.payload.needUpdate) {
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
                dispatch({
                    type: 'auth',
                });
            });
        },
    },
};
