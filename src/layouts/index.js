import React from 'react';
import DocumentTitle from 'react-document-title';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import Footer from './Footer';
import styles from './index.less';

@connect(({ global, loading }) => ({
    user: global.user,
}))
class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
    }

    getPageTitle = pathname => {
        return `${pathname} - 阿古早教`;
    };

    render() {
        const {
            children,
            location: { pathname },
        } = this.props;

        return (
            <DocumentTitle title={this.getPageTitle(pathname)}>
                <>
                    <div className={styles.content}>{children}</div>
                    <Footer className={styles.footer} pathname={pathname} />
                </>
            </DocumentTitle>
        );
    }
}

export default BasicLayout;
