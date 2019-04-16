import React from 'react';
import { Icon } from 'antd-mobile';
import Drawer from '@components/Drawer';
import styles from './ServiceIntro.less';

export default class ServiceIntro extends React.Component {
    state = {
        visible: false,
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    hideDrawer = () => {
        this.setState({
            visible: false
        });
    }

    renderContent = () => {
        return (
            <div className={styles.container} id="aaaa">
                <div className={styles.content}>
                    <div className={styles.title}>服务说明</div>
                    <div className={styles.item}>
                        <div>
                            <Icon
                                type="check-circle"
                                color="#FFD631"
                                className={styles.icon}
                                size="xxs"
                            />
                            <span className={styles.name}>关于成团</span>
                        </div>
                        <div className={styles.text}>
                            拼团时间为48小时，48小时内未凑够3人成团，已支付的费用将自动退回。
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <Icon
                                type="check-circle"
                                color="#FFD631"
                                className={styles.icon}
                                size="xxs"
                            />
                            <span className={styles.name}>关于退费</span>
                        </div>
                        <div className={styles.text}>
                            因课程为虚拟原创内容服务，拼团成功或单购成功后无法退款，请您确认无误后购买。
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <Icon
                                type="check-circle"
                                color="#FFD631"
                                className={styles.icon}
                                size="xxs"
                            />
                            <span className={styles.name}>关于退费</span>
                        </div>
                        <div className={styles.text}>
                            本课程一旦单购成功或拼团成功后，可以不限次数、永久回看。
                        </div>
                    </div>
                </div>
                <div className={styles.getIt} onClick={this.hideDrawer}>我知道啦</div>
            </div>
        );
    };

    render() {
        const { children } = this.props;
        const { visible } = this.state;

        return (
            <>
                <div onClick={this.showDrawer}>{children}</div>
                <Drawer position="bottom" open={visible} sidebar={this.renderContent()} contentStyle={{display: 'none'}} />
            </>
        );
    }
}
