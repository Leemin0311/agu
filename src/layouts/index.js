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
        const rst = await jsConfig();
        if (!rst.error) {
            configWxJs(rst.data);
        }
    }

    getPageTitle = pathname => {
        if (pathname.startsWith('/classcenter/coursedetail')) {
            return '课程详情';
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
