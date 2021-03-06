import React, {Component} from "react";
import {connect} from 'dva';
import { Icon } from 'antd-mobile';
import router from 'umi/router';

import defaultAvatar from '@assets/defaultAvatar.svg';
import person_back from '@assets/person_back.svg';
import order from '@assets/order.png';
import coupon from '@assets/coupon.png';
import classes from '@assets/classes.png';

import styles from './index.less';

@connect(({global}) => ({
    user: global.user
}))
class Mine extends Component{

    tools = [
        {
            src: order,
            title: '我的订单',
            router: '/person/orders'
        },
        {
            src: coupon,
            title: '优惠券',
            router: '/person/coupon'
        },
        {
            src: classes,
            title: '官方班级群',
            router: '/person/classes'
        }
    ];

    changeInfo = () => {
        router.push('/person/info');
    };

    getBirth = (birth) => {
        let res = '';
        let date = new Date(birth);
        res =  res + date.getFullYear();
        res =  res + '.' + Number(Number(date.getMonth()) + 1);
        res = res + '.' + date.getDate();

        return res;
    };

    render(){
        const {user} = this.props;
        const babyInfo = user.babies && user.babies.length > 0 ? user.babies[0] : null;

        return (
            <div className={styles.content} style={{backgroundImage:`url(${person_back})`}}>
                <div className={styles.nickname}>
                    {
                        user.wechatUser && user.wechatUser.nickName
                    }
                    {
                        !user.membership && (
                            <span>
                                <span className={styles.member}>还不是会员？</span>
                                <span
                                    className={styles.beMember}
                                    onClick={() => {
                                        router.push('/vip');
                                    }}
                                >开通会员&gt;&gt;
                                </span>
                            </span>
                        )
                    }
                </div>
                <div className={styles.babyCard}>
                    <div className={styles.babyInfo}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url(${babyInfo && babyInfo.photo ? babyInfo.photo : defaultAvatar})`
                            }}
                        />
                        <div className={styles.info}>
                            <div className={styles.babyNik}>{babyInfo ? babyInfo.name : '宝宝昵称'}</div>
                            <div className={styles.parameter}>
                                <span className={styles.sex}>性别:  {babyInfo ? babyInfo.male ? '男' : '女' : ''}</span>
                                <span className={styles.birth}>生日: {babyInfo ? this.getBirth(babyInfo.birthday) : ''}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.editInfo}
                        onClick={this.changeInfo}
                    >
                        修改宝宝信息 <Icon type="right" size='xs' />
                    </div>
                </div>
                <div className={styles.tools}>
                    {
                        this.tools.map((item, index) => (
                            <div
                                className={styles.tool}
                                key={index}
                                onClick={() => {
                                    router.push(item.router);
                                }}
                            >
                                <div className={styles.toolImg}>
                                    <img src={item.src} className={styles.img} />
                                </div>
                                <div className={styles.toolTitle}>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Mine;
