import React, {Component} from "react";
import {connect} from 'dva';
import { Icon } from 'antd-mobile';

import person_back from '@assets/person_back.svg';
import styles from './index.less';

@connect(({global}) => ({
    user: global.user
}))
class Mine extends Component{

    tools = [
        {
            src: '#',
            title: '我的订单'
        },
        {
            src: '#',
            title: '优惠券'
        },
        {
            src: '#',
            title: '官方班级群'
        }
    ];
    render(){
        const {user} = this.props;

        return (
            <div className={styles.content} style={{backgroundImage:`url(${person_back})`}}>
                <div className={styles.nickname}>
                    {
                        user.wechatUser && user.wechatUser.nickName
                    }
                    <span className={styles.member}>还不是会员？</span>
                    <span className={styles.beMember}>开通会员&gt;&gt;</span>
                </div>
                <div className={styles.babyCard}>
                    <div className={styles.babyInfo}>
                        <img src={user.wechatUser && user.wechatUser.avatarUrl} className={styles.avatar} />
                        <div className={styles.info}>
                            <div className={styles.babyNik}>宝宝昵称</div>
                            <div className={styles.parameter}>
                                <span className={styles.sex}>性别:</span>
                                <span className={styles.birth}>生日:</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editInfo}>
                        修改宝宝信息 <Icon type="right" size='xs' />
                    </div>
                </div>
                <div className={styles.tools}>
                    {
                        this.tools.map(item => (
                            <div className={styles.tool}>
                                <div className={styles.toolImg}>
                                    <img src={item.src} />
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
