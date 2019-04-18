import React from 'react';
import DocumentTitle from 'react-document-title';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { configWxJs } from '@utils/wx';
import { noFooterPages } from '@utils/config';
import Footer from './Footer';
import { jsConfig } from '../services/global';
import styles from './index.less';

@connect(({ global, loading }) => ({
    user: global.user,
    loading: loading.effects['global/getUser'] || loading.effects['global/auth'],
}))
class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
    }

    async componentDidMount() {
        if(sessionStorage.authed) {
            const rst = await jsConfig();
            if (!rst.error) {
                configWxJs(rst.data);
            }
        }
    }

    getPageTitle = pathname => {
        if (pathname.startsWith('/classcenter/coursedetail')) {
            return '课程详情';
        }
        if(pathname.startsWith('/person/info')){
            return '宝宝信息';
        }
        if(pathname.startsWith('/person/orders')){
            return '我的订单';
        }
        if(pathname.startsWith('/person/coupon')){
            return '优惠券';
        }
        if(pathname.startsWith('/person/classes')){
            return '加入官方班级群';
        }
        if(pathname.startsWith('/person')) {
            return '个人中心';
        }
        if(pathname.startsWith('/classroom/classlist')) {
            return '课程详情';
        }
        if(pathname.startsWith('/classroom')) {
            return '我的课堂';
        }

        return '阿古早教';
    };

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
                    {loading ? null : (
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
