/*
 * @author songchengen
 * @date   2018/9/21
 *
 * @description 全局model，保存系统级数据，如当前用户信息
 */

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
            if(!sessionStorage.authed) {
                const rst = yield call(auth);

                if(rst.data.authUrl && !sessionStorage.authed) {
                    window.location.href = rst.data.authUrl;
                    sessionStorage.authed = true;
                } else {
                    yield put({
                        type: 'getUser'
                    });
                }
            }
        },
        *getUser(action, { put, call }) {
            const rst = yield call(getUser);

            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        user: rst.data
                    }
                });
            }
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                dispatch({
                    type: 'auth'
                });
            });
        },
    },
};
