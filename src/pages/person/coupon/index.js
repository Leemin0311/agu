import React, {Component} from 'react';
import moment from 'moment';
import { Button, PullToRefresh, Modal } from 'antd-mobile';
import classNames from 'classnames';

import Tabs from '@components/Tabs';
import Expired from '@assets/expired.png';
import Empty from '@assets/empty.png';

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
        showModal: false,
        courseList: []
    };

    async componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'person_coupon/getCouponList',
            payload: {
                status: 'Valid',
                page: 0
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
                        page: 0
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

    emptyPage = () => (
        <div className={styles.emptyPage}>
            <img src={Empty} className={styles.emptyPageImg} />
            <div className={styles.text}>暂时没有发现优惠券哦～</div>
            <div className={styles.text}>去首页看看有什么新课程吧</div>
            <Button type='primary' className={styles.emptyButtonPri}>
                去看看
            </Button>
        </div>
    );

    handelShowModal = (courseList) => {
        this.setState({
            showModal: true,
            courseList
        });
    };

    handelCloseModal = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        const {activeTab, showModal, courseList} = this.state;
        const { coupons_Valid, coupons_Used, coupons_Expired,} = this.props;

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

                                    coupons_Valid.map(item => (
                                        <div className={styles.coupon}>
                                            <img src={item.coupon.image} className={styles.couponImg} />
                                            <div className={styles.others}>
                                                <span className={styles.time}>
                                        有效期：{moment(item.expireTime).format('YYYY/MM/DD HH:MM')}
                                                </span>
                                                {
                                                    item.coupon.courses && item.coupon.courses.length > 0 && (
                                                        <span className={styles.info} onClick={() => this.handelShowModal(item.coupon.courses)}>
                                                            使用范围
                                                        </span>
                                                    )
                                                }
                                                <Button type='primary' className={styles.buttonPri}>
                                                    去使用
                                                </Button>
                                            </div>
                                        </div>
                                    ))

                                }
                            </PullToRefresh> :
                            this.emptyPage()
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
                                    coupons_Used.map(item => (
                                        <div className={styles.coupon}>
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
                            this.emptyPage()
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
                                    coupons_Expired.map(item => (
                                        <div className={styles.coupon}>
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
                            this.emptyPage()
                    }
                </div>

                <Modal
                    visible={showModal}
                    onClose={this.handelCloseModal}
                    transparent
                    maskClosable={false}
                    closable
                    className={styles.couponModal}
                >
                    <div className={styles.title}>新课限时立减券</div>
                    <div className={styles.disc}>本券适用如下课程</div>
                    <div className={styles.courseList}>
                        {
                            courseList.map((item, index) => (
                                <div className={styles.courseName}>
                                    <div className={styles.index}>{index+1}</div>{item.name}
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.footerText}>
                        点击相应课程名，即可去使用优惠
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Coupon;
