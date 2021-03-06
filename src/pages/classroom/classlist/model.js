import { getCourseDetail, getLearn, getLessons } from './service';

export default {
    namespace: 'classroom_list',
    state: {
        playVideo: {}
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getDetail({payload : { id }}, { put, call, select }) {
            const rst = yield call(getCourseDetail, id);

            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        ...rst.data,
                        playVideo: {...rst.data.headMedia[0], id: 'headmedia'} || {},
                        isInitial: true
                    }
                });
            }
        },
        *learn({payload: {id}}, {put, call}){
            const rst = yield call(getLearn, id);

            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        playVideo: {
                            type: 'Video',
                            thumbnail: rst.data.cover,
                            url: rst.data.video,
                            id: rst.data.id
                        },
                        isInitial: false
                    }
                });
            }
        },
        *getLessons({payload: {id}}, {put, call}){
            const rst = yield call(getLessons, id);

            if(!rst.error) {
                yield put({
                    type: 'setData',
                    payload: {
                        lessons: rst.data
                    }
                });
            }
        }
    },
};
