import React from 'react';
import { connect } from 'dva';
import { Carousel, Icon, Tabs } from 'antd-mobile';
import Media from '@components/Media';
import Countdown from '@components/Countdown';
import { formatPrice } from '@utils/tools';
import moment from 'moment';
import styles from './index.less';

@connect(({ coursedetail, loading }) => ({
    ...coursedetail,
    loading: loading.effects['coursedetail/getDetail'],
}))
class CourseDetail extends React.Component {
    componentWillMount() {
        const {
            dispatch,
            match: {
                params: { id },
            },
        } = this.props;

        dispatch({
            type: 'coursedetail/getDetail',
            payload: {
                id,
            },
        });
    }

    renderHead = () => {
        const { headMedia, name, intro, theme } = this.props;

        return (
            <>
                <Carousel autoplay={false} infinite>
                    {headMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.img}
                            key={index}
                        />
                    ))}
                </Carousel>
                <div className={styles.brief} style={{ background: theme.bgColor }}>
                    <div className={styles.name} style={{ color: theme.fontColor }}>
                        {name}
                    </div>
                    <div className={styles.intro} style={{ color: theme.fontColor }}>
                        {intro}
                    </div>
                </div>
                {this.renderPrice()}
            </>
        );
    };

    renderPrice = () => {
        const { groupPrice, coupon, purchasers = [], userCount: userCountNum, tags } = this.props;

        const userCount = (
            <span className={styles.userCount}>
                {purchasers.map((url, index) => (
                    <span
                        className={styles.avatar}
                        style={{ background: `url(${url})`, backgroundSize: 'cover' }}
                        key={index}
                    />
                ))}
                <span className={styles.text}>等{userCountNum}人参加</span>
            </span>
        );

        const tag = (
            <div className={styles.tags}>
                <div className={styles.tagsInner}>
                    <div className={styles.tagContent}>
                        {tags.map((tagName, index) => (
                            <span className={styles.tagItem} key={index}>
                                <Icon
                                    type="check-circle"
                                    color="#FFD631"
                                    className={styles.tagIcon}
                                    size="xxs"
                                />
                                <span className={styles.tagName}>{tagName}</span>
                            </span>
                        ))}
                    </div>
                    <Icon type="right" color="#6A6A6A" size="xxs" className={styles.rightIcon} />
                </div>
            </div>
        );

        const price = coupon ? (
            <div className={styles.price}>
                <div className={styles.priceArea}>
                    <span className={styles.priceContent}>
                        <span className={styles.priceNumber}>
                            ¥{formatPrice(groupPrice - coupon.coupon.value)}
                        </span>
                        <span className={styles.oldPriceArea}>
                            <div className={styles.oldPrice}>
                                {'原价 '}
                                <span className={styles.oldPriceNumber}>
                                    ¥{formatPrice(groupPrice)}
                                </span>
                            </div>
                            <div className={styles.tip}>用券立减价</div>
                        </span>
                    </span>
                    <span className={styles.coupon}>
                        <div>距优惠券过期</div>
                        <div>
                            {parseInt((coupon.expireTime - moment()) / 86400000)}天{' '}
                            {<Countdown timeCount={(coupon.expireTime - moment()) % 86400000} />}
                        </div>
                    </span>
                </div>
                <div className={styles.userCountArea}>{userCount}</div>
                {tag}
            </div>
        ) : (
            <div className={styles.price}>
                <div className={styles.priceArea} style={{ paddingLeft: '0.28rem' }}>
                    <span
                        className={styles.priceNumber}
                        style={{ color: '#FF5038', verticalAlign: 'baseline' }}
                    >
                        ¥{formatPrice(groupPrice)}
                    </span>
                    <span
                        style={{
                            fontSize: '0.26rem',
                            color: '#6A6A6A',
                            verticalAlign: 'baseline',
                            marginLeft: '0.08rem',
                        }}
                    >
                        起
                    </span>
                    <span style={{ position: 'absolute', right: '0.28rem' }}>{userCount}</span>
                </div>
                {tag}
            </div>
        );

        return <>{price}</>;
    };

    renderContent = () => {
        const { detailMedia = [], outlineMedia = [], noteMedia = [] } = this.props;

        return (
            <div className={styles.content}>
                <div className={styles.tabs}>
                    <Tabs
                        tabs={[
                            { title: '课程详情', key: 'detail' },
                            { title: '课程目录', key: 'outline' },
                            { title: '购买须知', key: 'note' },
                        ]}
                        initialPage={0}
                        animated={false}
                        useOnPan={false}
                        onTabClick={this.changeTab}
                    />
                </div>
                <div className={styles.detail} ref={detail => this.detail = detail}>
                    {detailMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.img}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.outline} ref={outline => this.outline = outline}>
                    {outlineMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.img}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.note} ref={note => this.note = note}>
                    {noteMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.img}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        );
    };

    changeTab = ({ key }) => {
        const ele = this[key];
        this.content.scrollTo(0, ele.offsetTop);
    };

    render() {
        const { loading, id } = this.props;
        if (loading || !id) return null;

        return (
            <div className={styles.container} ref={content => this.content = content}>
                {this.renderHead()}
                {this.renderContent()}
            </div>
        );
    }
}

export default CourseDetail;
