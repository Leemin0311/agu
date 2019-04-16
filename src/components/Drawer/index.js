import React from 'react';
import { createPortal } from 'react-dom';
// import { Drawer as AntdDrawer } from 'antd-mobile';
import styles from './Drawer.less';

export default class Drawer extends React.Component {
    maskClick = () => {
        const { maskCloseable, onOpenChange } = this.props;

        if(maskCloseable) {
            onOpenChange(false);
        }
    }

    render() {
        const { visible, children } = this.props;

        return createPortal(
            <div className={styles.container}>
                <div
                    className={styles.mask}
                    style={
                        visible
                            ? { height: '100vh', opacity: '0.5' }
                            : { height: '0', opacity: '0' }
                    }
                    onClick={this.maskClick}
                />
                <div className={styles.content} style={{ bottom: visible ? '0' : '-100vh' }}>
                    {children}
                </div>
            </div>,
            document.body,
        );
    }
}

Drawer.defaultProps = {
    maskCloseable: false,
    onOpenChange: () => {},
};
