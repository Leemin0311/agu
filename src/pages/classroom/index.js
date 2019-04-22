import React, {Component} from 'react';
import { Button, PullToRefresh } from 'antd-mobile';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'dva';
import router from 'umi/router';

import emptyPage from '@components/EmptyPage';
import Countdown from '@components/Countdown';
import styles from './index.less';

@connect(({classroom, loading}) => ({
    page: classroom.page,
    courses: classroom.courses,
    loading: loading.effects['classroom/getCourseList'],
}))
class ClassRoom extends Component{
    constructor(props){
        super(props);

        props.dispatch({
            type: 'classroom/getCourseList',
            payload: {
                page: 1
            }
        });
    }

    fetchNewPage = () => {
        const {dispatch, page} = this.props;
        dispatch({
            type: 'classroom/getCourseList',
            payload: {
                page: page,
                append: true
            }
        });
    };

    getAction = (item) => {
        if (item.purchased) {
            return (
                <div className={styles.action}>
                    <div className={styles.timeBlock}>
                        <div className={styles.disc}>已学习{Math.floor((item.progress / item.duration) * 1000) / 10}%</div>
                        <div className={styles.progressbar}>
                            <div
                                className={styles.progress}
                                style={{
                                    width: `${Math.floor((item.progress / item.duration) * 1000) / 10}%`,
                                    borderRadius: `${item.progress === item.duration ? '0.14rem' : '0.14rem 0 0 0.14rem'}`
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        type='primary'
                        className={classNames(styles.buttonPri, styles.study)}
                        onClick={() => {
                            router.push(`/classroom/classlist/${item.id}`);
                        }}
                    >
                        继续学习
                    </Button>
                </div>
            );
        }
        if(item.order && item.order.group && item.order.group.expireTime) {
            return (
                <div className={styles.action}>
                    <div className={styles.timeBlock}>
                        <div className={styles.disc}>拼团仅剩</div>
                        <div className={styles.time}>{<Countdown timeCount={(new Date(item.order.group.expireTime) - moment())} />}</div>
                    </div>
                    <Button
                        type='primary'
                        className={classNames(styles.buttonPri, styles.invitation)}
                        onClick={() => {
                            router.push(`/classcenter/coursedetail/${item.order.group.courseId}`);
                        }}
                    >
                        邀请成团
                    </Button>
                </div>
            );
        }
    };

    render(){
        const {courses, loading} = this.props;
        if(loading) return null;
        return (
            <div className={styles.container}>
                {
                    (courses || []).length > 0 ?
                        <PullToRefresh
                            onRefresh={this.fetchNewPage}
                            direction="up"
                            indicator={{}}
                            damping={60}
                            className={styles.refresh}
                        >
                            {
                                courses.map((item, index) => (
                                    <div className={styles.course} key={index}>
                                        <img src={item.coverImage} className={styles.img} />
                                        <div className={styles.info}>
                                            <div className={styles.title}>
                                                {item.name}
                                            </div>
                                            {
                                                this.getAction(item)
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </PullToRefresh> :
                        emptyPage({content: '暂时没有发现课程哦~'})
                }

            </div>
        );
    }
}

export default ClassRoom;
