import React, {Component} from 'react';
import { Button } from 'antd-mobile';
import moment from 'moment';

import Countdown from '@components/Countdown';
import { connect } from 'dva';
import styles from './index.less';

@connect()
class ClassRoom extends Component{
    render(){
        const courses = [{data: 1}];
        return (
            <div className={styles.container}>
                {
                    courses.map(item => (
                        <div className={styles.course}>
                            <img src='#' className={styles.img} />
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    轻松掌握阅读技巧，畅读世界经典绘本！
                                </div>
                                <div className={styles.action}>
                                    <div className={styles.timeBlock}>
                                        <div className={styles.disc}>拼团仅剩</div>
                                        <div className={styles.time}>{<Countdown timeCount={(new Date('2019-04-30T09:36:34.509Z') - moment())} />}</div>
                                        {/*<div className={styles.disc}>已学习30%</div>*/}
                                        {/*<div className={styles.progressbar}>*/}
                                        {/*<div className={styles.progress} style={{width: '30%'}} />*/}
                                        {/*</div>*/}
                                    </div>
                                    <Button type='primary' className={styles.buttonPri}>
                                        去使用
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ClassRoom;
