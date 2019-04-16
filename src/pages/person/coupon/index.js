import React, {Component} from 'react';

import Tabs from '@components/Tabs';

import { connect } from 'dva';
import styles from './index.less';

@connect()
class Coupon extends Component{

    state = {
        activeTab: 'Valid'
    };

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: 'Valid',
                page: 0
            }
        });

        dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: 'Used',
                page: 0
            }
        });

        dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: 'Expired',
                page: 0
            }
        });
    }

    changeTab = ({ tabKey }) => {
        this.setState({
            activeTab: tabKey,
        });

    };

    render() {
        const {activeTab} = this.state;
        return (
            <div
                className={styles.couponContent}
                ref={content => (this.content = content)}
            >
                <Tabs
                    tabs={[
                        { title: '可使用', tabKey: 'Valid'},
                        { title: '已使用', tabKey: 'Used'},
                        { title: '已过期', tabKey: 'Expired'},
                    ]}
                    initialPage={0}
                    animated
                    onTabClick={this.changeTab}
                    page={activeTab}
                    underlineStyle={{
                        background:
                            'linear-gradient(90deg,rgba(254, 227, 0, 1) 0%,rgba(253, 199, 13, 1) 100%)',
                    }}
                />
                <div style={{ display: activeTab === 'Valid' ? 'block' : 'none' }} className={styles.contentItem}>
                    Content of first tab
                </div>
                <div style={{ display: activeTab === 'Used' ? 'block' : 'none' }} className={styles.contentItem}>
                    Content of second tab
                </div>
                <div style={{ display: activeTab === 'Expired' ? 'block' : 'none' }} className={styles.contentItem}>
                    Content of third tab
                </div>
            </div>
        );
    }
}

export default Coupon;
