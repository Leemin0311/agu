
import { log } from '@utils/tools';
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
            log(`authed: ${sessionStorage.authed}`);

            sessionStorage.render = false;
            if (!sessionStorage.authed) {
                const rst = yield call(auth);
                const { authUrl } = rst.data;

                log({
                    authRst: rst
                });

                if (/MicroMessenger/.test(navigator.userAgent) && authUrl) {
                    log(`jump to authUrl ${authUrl}`);
                    window.location.href = authUrl;
                }
                sessionStorage.authed = true;
            } else {
                sessionStorage.render = true;
                yield put({
                    type: 'getUser',
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
                log({
                    pathname,
                    query
                });

                dispatch({
                    type: 'auth',
                });
            });
        },
    },
};
