import React from 'react';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import { modal } from '../Modal';
import styles from './Coupon.less';

class Coupon extends React.Component {
    close = () => {
        const { close } = this.props;

        close();
    };

    junpToCource = id => {
        const { close } = this.props;

        close();

        router.push(`/classcenter/coursedetail/${id}`);
    };

    render() {
        const { coupon = {}, cources } = this.props;
        const { bgImage } = coupon;

        return (
            <div
                className={styles.container}
                style={{ background: `url(${bgImage})`, backgroundSize: 'cover' }}
            >
                <Icon
                    type="cross-circle"
                    color="#FFF"
                    size="sm"
                    style={{
                        position: 'absolute',
                        left: '5.74rem',
                        top: '-0.6rem',
                    }}
                    onClick={this.close}
                />
                <div className={styles.text}>- 本券适用如下课程 -</div>
                <div className={styles.content}>
                    {cources.map(({ id, name, icon }) => (
                        <div className={styles.course} key={id}>
                            <img src={icon} alt="img" className={styles.icon} />
                            <span className={styles.detail}>
                                <div className={styles.name}>{name}</div>
                                <div className={styles.btn} onClick={() => this.junpToCource(id)}>
                                    去使用
                                </div>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const showCoupon = props => {
    const opers = modal({
        width: '5.74rem',
        height: '8.8rem',
        maskClosable: false,
        content: <Coupon {...props} close={() => opers.destroy()} />,
    });
};

export default showCoupon;
