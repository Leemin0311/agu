import React from 'react';
import { Drawer as AntdDrawer } from 'antd-mobile';
import styles from './Drawer.less';

export default function Drawer(props) {
    return (
        <div className={styles.container}>
            <AntdDrawer contentStyle={{display: 'none'}} {...props} />
        </div>
    );
}
