import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { Carousel, Icon } from 'antd-mobile';
import Media from '@components/Media';
import Countdown from '@components/Countdown';
import Tabs from '@components/Tabs';
import { formatPrice } from '@utils/tools';
import moment from 'moment';
import defaultAvatar from '@assets/defaultAvatar.svg';
import backTop from '@assets/backTop.svg';
import html2canvas from 'html2canvas';
import throttle from 'lodash.throttle';
import ServiceIntro from './components/ServiceIntro';
import styles from './index.less';

@connect(({ coursedetail, loading, global }) => ({
    ...global,
    ...coursedetail,
    loading: loading.effects['coursedetail/getDetail'],
}))
class CourseDetail extends React.Component {
    state = {
        activeTab: 'detail',
    };

    constructor(props) {
        super(props);

        this.handleScroll = throttle(this.scroll, 500);
    }

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

    componentDidUpdate() {
        const { loading, id, order } = this.props;

        if (!loading && id) {
            this.detailTop = (this.detail || {}).offsetTop;
            this.outlineTop = (this.outline || {}).offsetTop;
            this.noteTop = (this.note || {}).offsetTop;
            this.groupBottom = (this.group || {}).offsetTop + (this.group || {}).offsetHeight;
            if ((order || {}).group) {
                this.renderShare();
            }
        }
    }

    componentWillUnmount() {
        const ele = document.getElementById('shareDom');
        if (ele) {
            ReactDOM.unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }
    }

    /**
     * 顶部跑马灯、简介
     */
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

    /**
     * 拼团详情，自己发起
     */
    renderGroup = () => {
        const { order } = this.props;

        if (!order) return null;

        const {
            refundTime,
            group: { members },
        } = order;

        const memberToRender = [...members];
        for (let i = 0; i + members.length < 3; i++) {
            memberToRender.push({
                avatar: defaultAvatar,
            });
        }

        return (
            <div className={styles.group} ref={group => (this.group = group)}>
                <div className={styles.groupTip}>
                    仅差<span style={{ color: '#FF4E00' }}>{3 - members.length}</span>人，拼团成功
                </div>
                <div className={styles.lessTime}>
                    剩余
                    <span className={styles.countdownArea}>
                        <Countdown timeCount={+moment(refundTime) - +moment()} />
                    </span>
                </div>
                <div className={styles.avatars}>
                    {memberToRender.map(({ avatar, name }, index) => (
                        <div className={styles.member} key={index}>
                            <img
                                className={styles.memberAvatar}
                                style={{
                                    borderColor: name ? '#429EFD' : '#D3D3D3',
                                }}
                                alt=""
                                src={avatar || defaultAvatar}
                            />
                            {index === 0 && <div className={styles.memberName}>团长</div>}
                        </div>
                    ))}
                </div>
                <div
                    className={styles.inviteBtn}
                    ref={btn => (this.inviteBtn = btn)}
                    onClick={this.share}
                >
                    邀请好友
                </div>
                <div className={styles.sharelink}>领加速海报</div>
            </div>
        );
    };

    /**
     * 价格区域
     */
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
            <ServiceIntro>
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
                        <Icon
                            type="right"
                            color="#6A6A6A"
                            size="xxs"
                            className={styles.rightIcon}
                        />
                    </div>
                </div>
            </ServiceIntro>
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

    /**
     * 详情
     */
    renderContent = () => {
        const { detailMedia = [], outlineMedia = [], noteMedia = [] } = this.props;
        const { activeTab } = this.state;

        return (
            <div className={styles.content}>
                <div className={styles.tabs}>
                    <Tabs
                        tabs={[
                            { title: '课程详情', tabKey: 'detail' },
                            { title: '课程目录', tabKey: 'outline' },
                            { title: '购买须知', tabKey: 'note' },
                        ]}
                        initialPage={0}
                        animated={false}
                        useOnPan
                        onTabClick={this.changeTab}
                        swipeable
                        page={activeTab}
                    />
                </div>
                <div className={styles.contentItem} ref={detail => (this.detail = detail)}>
                    {detailMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.media}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.contentItem} ref={outline => (this.outline = outline)}>
                    {outlineMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.media}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.contentItem} ref={note => (this.note = note)}>
                    {noteMedia.map(({ type, url, thumbnail }, index) => (
                        <Media
                            type={type}
                            url={thumbnail || url}
                            videoUrl={url}
                            className={styles.media}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        );
    };

    /**
     * 底部购买区域
     */
    renderFooter = () => {
        const { price, groupPrice } = this.props;

        return (
            <div className={styles.footer}>
                <span className={styles.vipBtn}>会员免费</span>
                <span className={styles.singleBtn}>
                    <div className={styles.priceNum}>¥{formatPrice(price)}</div>
                    <div className={styles.priceType}>单独购买价</div>
                </span>
                <span className={styles.groupBtn}>
                    <div className={styles.priceNum}>¥{formatPrice(groupPrice)}</div>
                    <div className={styles.priceType}>三人团</div>
                </span>
            </div>
        );
    };

    changeTab = ({ tabKey }) => {
        this.setState({
            activeTab: tabKey,
        });
        const ele = this[tabKey];
        this.content.scrollTo(0, ele.offsetTop);
    };

    scroll = e => {
        const top = e.target.scrollTop;
        const { activeTab } = this.state;

        if (top > 100) {
            this.backTop.style.display = 'block';
        } else {
            this.backTop.style.display = 'none';
        }

        if (this.noteTop - top < 200) {
            if (activeTab !== 'note') {
                this.setState({
                    activeTab: 'note',
                });
            }
        } else if (this.outlineTop - top < 200) {
            if (activeTab !== 'outline') {
                this.setState({
                    activeTab: 'outline',
                });
            }
        } else {
            if (activeTab !== 'detail') {
                this.setState({
                    activeTab: 'detail',
                });
            }
        }

        if (this.inviteBtn) {
            if (top > this.groupBottom) {
                this.inviteBtn.style.position = 'fixed';
                this.inviteBtn.style.transform = 'translateX(-50%)';
            } else {
                this.inviteBtn.style.position = 'static';
                this.inviteBtn.style.transform = 'unset';
            }
        }
    };

    backToTop = () => {
        this.content.scrollTo(0, 0);
        this.backTop.style.display = 'none';
    };

    renderShareDom = bgImage => {
        const { shareH5, user } = this.props;
        const { qrcode } = shareH5;
        const { nickName, avatarUrl } = user.wechatUser;
        const { width, height, src } = bgImage;

        return (
            <>
                <img
                    src={src}
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '7.5rem',
                        height: (window.innerWidth / width) * height,
                    }}
                />
                <div style={{ position: 'absolute', top: '0.22rem', left: '0.32rem', zIndex: 1 }}>
                    <img
                        src={avatarUrl}
                        alt=""
                        style={{
                            width: '0.56rem',
                            height: '0.56rem',
                            float: 'left',
                            borderRadius: '0.56rem',
                        }}
                    />
                    <span
                        style={{
                            fontSize: '0.22rem',
                            fontWeight: 500,
                            color: '#fff',
                            lineHeight: '0.32rem',
                            float: 'left',
                            marginLeft: '0.2rem',
                            zIndex: 1,
                        }}
                    >
                        <div>{nickName}</div>
                        <div>我觉得这个课程超棒，推荐给你！</div>
                    </span>
                </div>
                <img
                    src={qrcode}
                    alt=""
                    style={{
                        position: 'absolute',
                        right: '0.32rem',
                        bottom: '0.32rem',
                        width: '1.33rem',
                        height: '1.33rem',
                    }}
                />
            </>
        );
    };

    renderShare = () => {
        let ele = document.getElementById('shareDom');
        if (!ele) {
            ele = document.createElement('div');
            ele.id = 'shareDom';
            ele.style.position = 'relative';
            // ele.style.visibility = 'hidden';
            document.body.appendChild(ele);
        }

        const { shareH5 } = this.props;
        const { bgImage } = shareH5;

        const image = new Image();
        image.src = bgImage;
        image.onload = () => {
            const { width, height } = image;
            ele.style.width = '7.5rem';
            ele.style.height = `${(window.innerWidth * height) / width}px`;
            ele.style.background = `url(${bgImage})`;
            ReactDOM.render(this.renderShareDom(image), ele);
        };
    };

    share = () => {
        html2canvas(document.getElementById('shareDom'), {
            useCORS: true,
            allowTaint: true,
        }).then(canvas => {
            const img = new Image();
            img.src = canvas.toDataURL('image/png');
            document.body.appendChild(canvas);
        });
    };

    render() {
        const { loading, id, order } = this.props;
        if (loading || !id) return null;

        const showFooter = !(order || {}).group;

        return (
            <div className={styles.container}>
                <div
                    className={styles.scrollContent}
                    ref={content => (this.content = content)}
                    onScroll={e => {
                        e.persist();
                        this.handleScroll(e);
                    }}
                    style={{
                        height: showFooter ? 'calc(100% - 0.98rem)' : '100%',
                    }}
                >
                    {this.renderGroup()}
                    {this.renderHead()}
                    {this.renderContent()}
                    <img
                        src={backTop}
                        className={styles.backTop}
                        alt=""
                        ref={backTop => (this.backTop = backTop)}
                        onClick={this.backToTop}
                    />
                </div>
                {showFooter && this.renderFooter()}
            </div>
        );
    }
}

export default CourseDetail;
