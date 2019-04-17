import React from 'react';
import { Modal, Icon, Checkbox } from 'antd-mobile';
import { formatPrice } from '@utils/tools';
import prod from '@assets/prod.svg';
import coupon from '@assets/coupon.svg';
import priceIcon from '@assets/price.svg';
import styles from './Pay.less';

export default class Pay extends React.Component {
    state = { showCoupon: false, selected: null };

    getPrice = () => {
        const { price, coupons = [] } = this.props;
        const { selected } = this.state;

        const coupon = coupons.find(cou => cou.coupon.id === selected);

        if (!coupon) return formatPrice(price);

        return formatPrice(price - coupon.coupon.value);
    };

    render() {
        const { name, coupons = [] } = this.props;
        const { showCoupon, selected } = this.state;

        return (
            <Modal visible popup maskClosable={false}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <span>商品详情</span>
                        <span>关闭</span>
                    </div>
                    <div className={styles.item}>
                        <span style={{ float: 'left' }}>
                            <img src={prod} alt="" className={styles.icon} />
                            <span className={styles.text}>商品名</span>
                        </span>
                        <span className={styles.rightText}>{name}</span>
                    </div>
                    {!!coupons.length && (
                        <div className={styles.item}>
                            <div>
                                <span style={{ float: 'left' }}>
                                    <img src={coupon} alt="" className={styles.icon} />
                                    <span className={styles.text}>商品名</span>
                                </span>
                                <span className={styles.rightText}>
                                    {name}
                                    <Icon type={showCoupon ? 'down' : 'right'} size="xxs" />
                                </span>
                            </div>
                            {showCoupon && (
                                <div className={styles.coupons}>
                                    {coupons.map(({ coupon: { name, id } }) => (
                                        <Checkbox
                                            data-value={id}
                                            onChange={this.changeCoupon}
                                            checked={id === selected}
                                        >
                                            {name}
                                        </Checkbox>
                                    ))}
                                    <Checkbox
                                        data-value={null}
                                        onChange={this.changeCoupon}
                                        checked={!selected}
                                    >
                                        不使用优惠券
                                    </Checkbox>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={styles.item}>
                        <span style={{ float: 'left' }}>
                            <img src={priceIcon} alt="" className={styles.icon} />
                            <span className={styles.text}>支付总额</span>
                        </span>
                        <span className={styles.rightText}>¥{this.getPrice()}</span>
                    </div>
                </div>
            </Modal>
        );
    }
}
