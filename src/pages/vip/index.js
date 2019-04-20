import React from 'react';
import { connect } from 'dva';
import Media from '@components/Media';
import pay from '@components/Pay';
import router from 'umi/router';
import styles from './index.less';

@connect(({ vip }) => ({
    ...vip,
}))
class Vip extends React.Component {
    payment = () => {
        const { price, couponList } = this.props;

        pay({
            type: 'Member',
            price,
            name: '阿古早教会员',
            couponList,
            onOk: () => {
                router.push('/classroom');
            }
        });
    };

    render() {
        const { media } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    {media.map(({ type, thumbnail, url }, index) => (
                        <div key={index}>
                            <Media
                                type={type}
                                url={thumbnail || url}
                                videoUrl={url}
                                className={styles.img}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.footer} onClick={this.payment}>立即开通</div>
            </div>
        );
    }
}

export default Vip;
