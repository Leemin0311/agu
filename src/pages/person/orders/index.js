import React, {Component} from 'react';
import { Button } from 'antd-mobile';

import { connect } from 'dva';
import styles from './index.less';

@connect(({person_order}) => ({
    orders: person_order.orders,
}))
class Orders extends Component{

    status = {
        'Created': ['Created'],
        'Finished': ['已完成', '分享课程海报'],
        'Grouping': ['拼团中', '邀请成团'],
        'GroupFailed': ['GroupFailed'],
        'Refunded': ['Refunded']
    };

    colors = {
        'Created': ['#666666'],
        'Finished': ['#666666', 'linear-gradient(90deg,rgba(254,227,0,1) 0%,rgba(253,199,13,1) 100%)', '#343A3E'],
        'Grouping': ['#FF5038', 'linear-gradient(90deg,rgba(255,138,28,1) 0%,rgba(247,77,57,1) 100%)', '#FFFFFF'],
        'GroupFailed': ['#666666'],
        'Refunded': ['#666666']
    };

    componentDidMount(){
        const {dispatch} = this.props;

        dispatch({
            type: 'person_order/getOrderList',
            payload: {
                page: 0
            }
        });
    }


    render() {
        const {orders} = this.props;

        return (
            <div className={styles.orderContent}>
                {
                    (orders || []).map(item => (
                        <div className={styles.order}>
                            <div className={styles.snapshot}>
                                <img src={item.snapshot && item.snapshot.icon} className={styles.orderIcon} />
                                <div className={styles.orderInfo}>
                                    <div className={styles.orderName}>{item.snapshot && item.snapshot.name}</div>
                                    <div className={styles.ortherInfo}>
                                        <span className={styles.status} style={{color: this.colors[item.status][0]}}>
                                            {this.status[item.status][0] || ''}
                                        </span>
                                        <span className={styles.money}>
                                            实付金额：<span style={{color: '#FF5038'}}>¥{Number(item.fee) / 100}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.action}>
                                <div className={styles.time}>
                                    拼团剩余时间
                                </div>
                                {
                                    this.status[item.status][1] &&
                                        <Button type='primary' className={styles.buttonPri} style={{background: this.colors[item.status] && this.colors[item.status][1], color: this.colors[item.status] && this.colors[item.status][2]}}>
                                            {this.status[item.status][1]}
                                        </Button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Orders;
