import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Icon, Checkbox } from 'antd-mobile';
import { formatPrice, log } from '@utils/tools';
import prod from '@assets/prod.svg';
import couponIcon from '@assets/coupon.svg';
import priceIcon from '@assets/price.svg';
import classNames from 'classnames';
import { chooseWXPay } from '@utils/wx';
import request from '@utils/request';
import styles from './Pay.less';

class Pay extends React.Component {
    state = { showCoupon: false, selected: null, visible: true };

    constructor(props) {
        super(props);

        this.hide = this.hide.bind(this);
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    getPrice = () => {
        const { price, couponList = [] } = this.props;
        const { selected } = this.state;

        const coupon = couponList.find(cou => cou.coupon.id === selected);

        if (!coupon) return formatPrice(price);

        return formatPrice(price - coupon.coupon.value);
    };

    changeCoupon = e => {
        this.setState({
            selected: e.target.checked ? e.target['data-value'] : null,
        });
    };

    toggleCoupon = () => {
        const { showCoupon } = this.state;

        this.setState({
            showCoupon: !showCoupon,
        });
    };

    confirm = async () => {
        const { close, type, groupId, courseId, orderId, onOk, onFail } = this.props;
        const { selected } = this.state;

        const rst = await request('/api/wxpay/prepare', {
            method: 'post',
            body: JSON.stringify({
                type,
                fee: 100 * this.getPrice(),
                groupId,
                courseId,
                orderId,
                couponId: selected || undefined,
            }),
        });

        if (!rst.error) {
            const { timeStamp, ...rest } = rst.data.paymentParams;
            chooseWXPay(
                { ...rest, timestamp: timeStamp },
                res => {
                    close();
                    onOk(res);
                },
                res => {
                    onFail(res);
                },
            );
        } else {
            log(rst.error);
            close();
            onFail();
        }
    };

    close = () => {
        const { close } = this.props;
        close();
    };

    render() {
        const { name, couponList = [] } = this.props;
        const { showCoupon, selected, visible } = this.state;
        const coupon = couponList.find(cou => cou.coupon.id === selected);

        return (
            <Modal
                visible={visible}
                popup
                maskClosable={false}
                animationType="slide-up"
                className={styles.container}
            >
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span>商品详情</span>
                        <span className={styles.close} onClick={this.close}>
                            关闭
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span style={{ float: 'left' }}>
                            <img src={prod} alt="img" className={styles.icon} />
                            <span className={styles.text}>商品名</span>
                        </span>
                        <span className={styles.rightText}>{name}</span>
                    </div>
                    {!!couponList.length && (
                        <div className={styles.item}>
                            <div onClick={this.toggleCoupon} style={{ height: '0.48rem' }}>
                                <span style={{ float: 'left' }}>
                                    <img src={couponIcon} alt="img" className={styles.icon} />
                                    <span className={styles.text}>优惠券抵扣</span>
                                </span>
                                <span className={styles.rightText}>
                                    {coupon ? `-¥${formatPrice(coupon.coupon.value)}` : null}
                                    <Icon
                                        type={showCoupon ? 'down' : 'right'}
                                        size="xxs"
                                        style={{ marginLeft: '0.16rem' }}
                                    />
                                </span>
                            </div>
                            {showCoupon && (
                                <div
                                    className={styles.couponList}
                                    style={{
                                        height: `${((couponList.length + 1) * 0.58).toFixed(2)}rem`,
                                    }}
                                >
                                    {couponList.map(({ coupon: { name, id } }) => (
                                        <div
                                            key={id}
                                            className={classNames({
                                                [styles.checkItem]: true,
                                                [styles.selected]: id === selected,
                                            })}
                                        >
                                            <Checkbox
                                                data-value={id}
                                                onChange={this.changeCoupon}
                                                checked={id === selected}
                                            >
                                                {name}
                                            </Checkbox>
                                        </div>
                                    ))}
                                    <div
                                        className={classNames({
                                            [styles.checkItem]: true,
                                            [styles.selected]: !selected,
                                        })}
                                    >
                                        <Checkbox
                                            data-value={null}
                                            onChange={this.changeCoupon}
                                            checked={!selected}
                                        >
                                            不使用优惠券
                                        </Checkbox>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={styles.item}>
                        <span style={{ float: 'left' }}>
                            <img src={priceIcon} alt="img" className={styles.icon} />
                            <span className={styles.text}>支付总额</span>
                        </span>
                        <span className={classNames(styles.rightText, styles.priceText)}>
                            ¥{this.getPrice()}
                        </span>
                    </div>
                </div>
                <div className={styles.confirm} onClick={this.confirm}>
                    确定支付
                </div>
            </Modal>
        );
    }
}

Pay.defaultProps = {
    onOk: res => {
        log({ ...res, type: 'onOk' });
    },
    onFail: res => {
        log({ ...res, type: 'false' });
    },
};

const pay = props => {
    const ele = document.createElement('div');
    document.body.appendChild(ele);
    let modal = null;

    const close = () => {
        modal.hide();

        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }, 500);
    };

    ReactDOM.render(<Pay {...props} close={close} ref={instance => (modal = instance)} />, ele);
};

export default pay;
