import React from 'react';
import { configWxJs } from '@utils/wx';
import { jsConfig } from '../services/global';
import styles from './index.less';

export default class BasicLayout extends React.Component {
    async componentWillMount() {
        const rst = await jsConfig();

        configWxJs(rst.data, () => {
            console.info('success');
        });
    }

    render() {
        const { children } = this.props;

        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>Yay! Welcome to umi!</h1>
                {children}
            </div>
        );
    }
}

