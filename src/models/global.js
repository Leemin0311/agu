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

            const { authUrl, categories, tips } = rst.data;

            if (authUrl && !sessionStorage.authed) {
                if (/wechat/.test(navigator.userAgent)) window.location.href = rst.data.authUrl;
                sessionStorage.authed = true;
            } else {
                yield put({
                    type: 'getUser',
                });
                yield put({
                    type: 'classcenter/setData',
                    payload: {
                        categories,
                        tips,
                        selectedCate: (categories[0] || {}).id,
                    },
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
                dispatch({
                    type: 'auth',
                });
            });
        },
    },
};
