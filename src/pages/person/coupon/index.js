import React, {Component} from 'react';
import moment from 'moment';
import { Button, PullToRefresh } from 'antd-mobile';
import classNames from 'classnames';
import router from 'umi/router';

import Tabs from '@components/Tabs';
import Expired from '@assets/expired.png';
import showCoupon from '@components/Coupon';
import emptyPage from '@components/EmptyPage';

import { connect } from 'dva';
import styles from './index.less';

@connect(({person_coupon}) => ({
    coupons_Valid: person_coupon.coupons_Valid,
    coupons_Used: person_coupon.coupons_Used,
    coupons_Expired: person_coupon.coupons_Expired,
    page_Valid: person_coupon.page_Valid,
    page_Used: person_coupon.page_Used,
    page_Expired: person_coupon.page_Expired,
}))
class Coupon extends Component{

    state = {
        activeTab: 'Valid',
    };

    emptyContent = '暂时没有发现优惠券哦～';

    async componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: 'Valid',
                page: 1
            }
        });
    }

    changeTab = ({ tabKey }) => {
        this.setState({
            activeTab: tabKey,
        }, () => {
            const { ...props } = this.props;
            if(props[`page_${tabKey}`] === 0) {
                props.dispatch({
                    type: 'person_coupon/getCouponList',
                    payload: {
                        status: tabKey,
                        page: 1
                    }
                });
            }
        });
    };

    fetchNewPage = () => {
        const { ...props } = this.props;
        const { activeTab } = this.state;
        props.dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: activeTab,
                page: props[`page_${activeTab}`],
                append: true
            }
        });

    };



    handelShowModal = (item) => {
        showCoupon(item);
    };

    render() {
        const {activeTab} = this.state;
        const { coupons_Valid, coupons_Used, coupons_Expired,} = this.props;

        return (
            <div
                className={styles.couponContent}
                ref={content => (this.content = content)}
            >
                <div style={{height: '0.78rem'}}>
                    <Tabs
                        tabs={[
                            { title: '可使用', tabKey: 'Valid'},
                            { title: '已使用', tabKey: 'Used'},
                            { title: '已过期', tabKey: 'Expired'},
                        ]}
                        initialPage={0}
                        animated={false}
                        useOnPan
                        onTabClick={this.changeTab}
                        selectedTabKey={activeTab}
                        swipeable
                        underlineStyle={{
                            background:
                            'linear-gradient(90deg,rgba(254, 227, 0, 1) 0%,rgba(253, 199, 13, 1) 100%)',
                        }}
                    />
                </div>
                <div style={{ display: activeTab === 'Valid' ? 'block' : 'none' }} className={styles.contentItem}>
                    {
                        coupons_Valid && coupons_Valid.length > 0 ?
                            <PullToRefresh
                                onRefresh={this.fetchNewPage}
                                direction="up"
                                indicator={{}}
                                damping={60}
                                className={styles.refresh}
                            >
                                {

                                    coupons_Valid.map((item, index) => (
                                        <div className={styles.coupon} key={index}>
                                            <img src={item.coupon.image} className={styles.couponImg} />
                                            <div className={styles.others}>
                                                <span className={styles.time}>
                                        有效期：{moment(item.expireTime).format('YYYY/MM/DD HH:MM')}
                                                </span>
                                                {
                                                    item.courses && item.courses.length > 0 && (
                                                        <span className={styles.info} onClick={() => this.handelShowModal(item)}>
                                                            使用范围
                                                        </span>
                                                    )
                                                }
                                                <Button
                                                    type='primary'
                                                    className={styles.buttonPri}
                                                    onClick={() => {
                                                        router.push('/classcenter?coupon=hide');
                                                    }}
                                                >
                                                    去使用
                                                </Button>
                                            </div>
                                        </div>
                                    ))

                                }
                            </PullToRefresh> :
                            emptyPage({content: this.emptyContent})
                    }
                </div>
                <div style={{ display: activeTab === 'Used' ? 'block' : 'none' }} className={styles.contentItem}>
                    {
                        coupons_Used && coupons_Used.length > 0 ?
                            <PullToRefresh
                                onRefresh={this.fetchNewPage}
                                direction="up"
                                indicator={{}}
                                damping={60}
                                className={styles.refresh}
                            >
                                {
                                    coupons_Used.map((item, index) => (
                                        <div className={styles.coupon} key={index}>
                                            <img src={item.coupon.image} className={styles.couponImg} />
                                            <div className={styles.others}>
                                                <span className={styles.time} style={{color: '#B9B9B9'}}>
                                        有效期：{moment(item.expireTime).format('YYYY/MM/DD HH:MM')}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </PullToRefresh> :
                            emptyPage({content: this.emptyContent})
                    }

                </div>
                <div style={{ display: activeTab === 'Expired' ? 'block' : 'none' }} className={styles.contentItem}>
                    {
                        coupons_Expired && coupons_Expired.length > 0 ?
                            <PullToRefresh
                                onRefresh={this.fetchNewPage}
                                direction="up"
                                indicator={{}}
                                damping={60}
                                className={styles.refresh}
                            >
                                {
                                    coupons_Expired.map((item, index) => (
                                        <div className={styles.coupon} key={index}>
                                            <img
                                                src={item.coupon.image}
                                                className={classNames({
                                                    [styles.gray]: true,
                                                    [styles.couponImg]: true,
                                                })}
                                            />
                                            <img src={Expired} className={styles.expired} />
                                            <div className={styles.others}>
                                                <span className={styles.time} style={{color: '#B9B9B9'}}>
                                        有效期：{moment(item.expireTime).format('YYYY/MM/DD HH:MM')}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </PullToRefresh> :
                            emptyPage({content: this.emptyContent})

                    }
                </div>
            </div>
        );
    }
}

export default Coupon;
