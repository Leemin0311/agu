import React from 'react';
import DocumentTitle from 'react-document-title';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { configWxJs } from '@utils/wx';
import Footer from './Footer';
import { jsConfig } from '../services/global';
import styles from './index.less';

@connect(({ global, loading }) => ({
    user: global.user,
    loading: loading.effects['global/getUser'] || loading.effects['global/auth']
}))
class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
    }

    async componentDidMount() {
        const rst = await jsConfig();
        if(!rst.error) {
            configWxJs(rst.data);
        }
    }

    getPageTitle = pathname => {
        return `${pathname} - 阿古早教`;
    };

    render() {
        const {
            children,
            location: { pathname },
            loading
        } = this.props;

        return (
            <DocumentTitle title={this.getPageTitle(pathname)}>
                <>
                    {loading ? null : <div className={styles.content}>{children}</div>}
                    <Footer className={styles.footer} pathname={pathname} />
                </>
            </DocumentTitle>
        );
    }
}

export default BasicLayout;
