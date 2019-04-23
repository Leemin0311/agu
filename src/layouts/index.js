import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { configWxJs, configWxShare } from '@utils/wx';
import { noFooterPages } from '@utils/config';
import { log } from '@utils/tools';
import Footer from './Footer';
import { jsConfig } from '../services/global';
import styles from './index.less';

@connect(({ global, loading }) => ({
    ...global,
    loading: loading.effects['global/getUser'] || loading.effects['global/auth'],
}))
class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
    }

    componentDidMount() {
        window.addEventListener('popstate', this.destroyAllModal);
        window.addEventListener('click', (e) => {
            log({ target: e.target});
        });
    }

    async componentDidUpdate() {
        if (sessionStorage.authed) {
            const rst = await jsConfig();
            if (!rst.error) {
                configWxJs(rst.data, () => {
                    const { shareH5: { shareDesc, shareImage, shareTitle }} = this.props;
                    configWxShare(
                        shareTitle,
                        shareDesc,
                        'https://course.aguzaojiao.com/classcenter',
                        shareImage,
                    );
                });
            }
        }
    }

    componentWillUnmount() {
        sessionStorage.render = false;

        log('layout unmount');
        window.removeEventListener('popstate', this.destroyAllModal);
    }

    destroyAllModal = () => {
        let ele = document.getElementById('pay');
        if(ele) {
            ReactDOM.unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }

        ele = document.getElementById('poster');
        if(ele) {
            ReactDOM.unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }

        ele = document.getElementById('modal');
        if(ele) {
            ReactDOM.unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }
    }

    getPageTitle = pathname => {
        if (pathname.startsWith('/classcenter/coursedetail')) {
            return '课程详情';
        }
        if (pathname.startsWith('/person/info')) {
            return '宝宝信息';
        }
        if (pathname.startsWith('/person/orders')) {
            return '我的订单';
        }
        if (pathname.startsWith('/person/coupon')) {
            return '优惠券';
        }
        if (pathname.startsWith('/person/classes')) {
            return '加入官方班级群';
        }
        if (pathname.startsWith('/person')) {
            return '个人中心';
        }
        if (pathname.startsWith('/classroom/classlist')) {
            return '课程详情';
        }
        if (pathname.startsWith('/classroom')) {
            return '我的课堂';
        }

        return '阿古早教';
    };

    componentDidCatch(error, info) {
        log(info.componentStack);
    }

    render() {
        const {
            children,
            location: { pathname },
            loading,
        } = this.props;

        const noFooter = noFooterPages.some(path => pathname.includes(path));

        return (
            <DocumentTitle title={this.getPageTitle(pathname)}>
                <>
                    {loading || !sessionStorage.authed ? null : (
                        <div
                            className={styles.content}
                            style={{ height: noFooter ? '100%' : 'calc(100% - 0.98rem)' }}
                        >
                            {children}
                        </div>
                    )}
                    {!noFooter && <Footer className={styles.footer} pathname={pathname} />}
                </>
            </DocumentTitle>
        );
    }
}

export default BasicLayout;
