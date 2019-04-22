import React, { Component } from 'react';
import { Button, Icon, PullToRefresh, Tabs } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import get from 'lodash.get';
import emptyPage from '@components/EmptyPage';
import { renderShare, showPoster } from '@components/Poster';
import pay from '@components/Pay';
import Countdown from '@components/Countdown';
import classNames from 'classnames';
import moment from 'moment';
import styles from './index.less';

@connect(({ person_order, global, loading }) => ({
    orders: person_order.orders,
    page: person_order.page,
    couponList: person_order.couponList,
    user: global.user,
    loading: loading.effects['person_order/getOrderList'],
}))
class Orders extends Component {
    rendPoster = false;
    status = {
        Created: ['待付款', '立即付款'],
        Finished: ['已完成', '分享课程海报'],
        Grouping: ['拼团中', '邀请成团'],
        GroupFailed: ['拼团失败', '再次购买'],
    };

    tabs = [
        { title: '全部', tabKey: 'All' },
        { title: '待付款', tabKey: 'Created' },
        { title: '拼团中', tabKey: 'Grouping' },
        { title: '拼团失败', tabKey: 'GroupFailed' },
        { title: '已完成', tabKey: 'Finished' },
    ];

    needLoading = true;

    componentDidMount() {
        this.getNewData('All');
    }

    getNewData = tabKey => {
        this.needLoading = true;

        const { dispatch } = this.props;

        if (tabKey === 'All') {
            dispatch({
                type: 'person_order/getOrderList',
                payload: {
                    page: 1,
                },
            });
        } else {
            dispatch({
                type: 'person_order/getOrderList',
                payload: {
                    status: tabKey,
                    page: 1,
                },
            });
        }
    };

    fetchNewPage = (tabKey, newPage) => {
        this.needLoading = false;
        const { dispatch, page } = this.props;

        if (tabKey === 'All') {
            dispatch({
                type: 'person_order/getOrderList',
                payload: {
                    append: true,
                    page: newPage || page,
                },
            });
        } else {
            dispatch({
                type: 'person_order/getOrderList',
                payload: {
                    append: true,
                    status: tabKey,
                    page: newPage || page,
                },
            });
        }
    };

    payment = order => {
        const { nickName, avatarUrl } = get(this.props, 'user.wechatUser');

        if (order.status === 'Grouping' || order.status === 'GroupFailed') {
            if (get(order, 'snapshot.courseId')) router.push(`/classcenter/coursedetail/${order.courseId}`);
        } else if (order.status === 'Created') {
            pay({
                type: order.type,
                price: order.fee,
                name: order.snapshot.name,
                orderId: order.id,
                onOk: () => {
                    router.push(
                        order.type === 'Course'
                            ? `/classroom/classlist/${order.snapshot.courseId}`
                            : `/classcenter/coursedetail/${order.snapshot.courseId}`,
                    );
                },
            });
        } else if (order.status === 'Finished') {
            if (!this.rendPoster) {
                this.rendPoster = true;
                const _this = this;
                renderShare({
                    bgImage: order.snapshot.bgPoster,
                    nickName,
                    avatarUrl,
                    callbackUrl: order.snapshot.url,
                    showHeader: false,
                    onOk: dataUrl => {
                        showPoster(dataUrl, false);
                        _this.rendPoster = false;
                    },
                    onFail: () => (_this.rendPoster = false),
                });
            }
        }
    };

    render() {
        const { orders, loading } = this.props;

        return (
            <div className={styles.orderContent}>
                <Tabs
                    tabs={this.tabs}
                    initialPage={0}
                    onChange={tab => this.getNewData(tab.tabKey)}
                >
                    {this.tabs.map(item => {
                        if (this.needLoading && loading)
                            return (
                                <div className={styles.content} key={`loading_${item.tabKey}`}>
                                    <div className={styles.loading}>
                                        <Icon type="loading" size="lg" />
                                        <div className={styles.loadingText}>加载中...</div>
                                    </div>
                                </div>
                            );

                        if ((orders || []).length < 1)
                            return (
                                <div key={`empty_${item.tabKey}`} style={{ height: '100%' }}>
                                    {emptyPage({ content: '暂时没有发现订单哦~' })}
                                </div>
                            );
                        return (
                            <PullToRefresh
                                onRefresh={() => this.fetchNewPage(item.tabKey)}
                                direction="up"
                                indicator={{}}
                                damping={60}
                                className={styles.refresh}
                                key={item.tabKey}
                            >
                                {orders.map(order => (
                                    <div
                                        className={classNames({
                                            [styles.order]: true,
                                            [styles[order.status]]: true,
                                        })}
                                        key={order.id}
                                        onClick={() => this.payment(order)}
                                    >
                                        <div
                                            className={classNames({
                                                [styles.snapshot]: true,
                                            })}
                                        >
                                            <img
                                                src={order.snapshot && order.snapshot.icon}
                                                className={styles.orderIcon}
                                            />
                                            <div className={styles.orderInfo}>
                                                <div className={styles.orderName}>
                                                    {order.snapshot && order.snapshot.name}
                                                </div>
                                                <div className={styles.ortherInfo}>
                                                    <span className={styles.status}>
                                                        {this.status[order.status][0] || ''}
                                                    </span>
                                                    <span className={styles.money}>
                                                        实付金额：
                                                        <span style={{ color: '#FF5038' }}>
                                                            ¥{Number(order.fee) / 100}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.action}>
                                            {order.status === 'Grouping' && (
                                                <div className={styles.time}>
                                                    拼团剩余时间:{' '}
                                                    {
                                                        <Countdown
                                                            timeCount={
                                                                get(order, 'group.expireTime') -
                                                                moment()
                                                            }
                                                        />
                                                    }
                                                </div>
                                            )}
                                            {order.status === 'Created' && order.expireTime && (
                                                <div className={styles.time}>
                                                    订单剩余时间:{' '}
                                                    {
                                                        <Countdown
                                                            timeCount={order.expireTime - moment()}
                                                        />
                                                    }
                                                </div>
                                            )}
                                            {this.status[order.status][1] && (
                                                <Button type="primary" className={styles.buttonPri}>
                                                    {this.status[order.status][1]}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </PullToRefresh>
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}

export default Orders;
