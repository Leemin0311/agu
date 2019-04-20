import { log } from '@utils/tools';
import { getCourseDetail, getCoupon, getGroupDetail, getTips } from './service';

export default {
    namespace: 'coursedetail',
    state: {

    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
        clear() {
            return {};
        }
    },
    effects: {
        *getDetail({payload : { id }}, { put, call, select }) {
            log('get detail');
            const { user } = yield select(state => state.global);
            const { groupId, groupLeaderId } = yield select(state => state.coursedetail);

            if(groupId && user.id !== groupLeaderId) {

                const rst = yield call(getGroupDetail, groupId, groupLeaderId);
                if(!rst.error) {
                    const { user, group } = rst.data;

                    yield put({
                        type: 'setData',
                        payload: {
                            groupLeader: user,
                            groupDetail: group
                        }
                    });
                }
            }

            const rst = yield call(getCourseDetail, id);
            if(!rst.error) {
                const coupon = yield call(getCoupon, id);

                yield put({
                    type: 'setData',
                    payload: {
                        ...rst.data,
                        coupon: coupon.error ? null : coupon.data[0],
                        couponList: coupon.data
                    }
                });
            }

            log({
                detailRst: rst
            });
        },
        *getTips(action, { call, put }) {
            const rst = yield call(getTips);
            if(!rst.error) {
                const { tips } = rst.data;

                yield put({
                    type: 'setData',
                    payload: {
                        tips
                    }
                });
            }
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search, query }) => {
                log({
                    pathname,
                    query
                });

                if(pathname.startsWith('/classcenter/coursedetail')) {
                    dispatch({
                        type: 'setData',
                        payload: {
                            groupId: query.groupId,
                            groupLeaderId: query.userId
                        }
                    });
                    dispatch({
                        type: 'getTips'
                    });
                }
            });
        },
    },
};
