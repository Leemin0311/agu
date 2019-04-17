import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.less';

export const modal = (props) => {
    const { width, height, content, maskClosable } = props;

    const ele = document.createElement('div');
    document.body.appendChild(ele);

    const destroy = () => {
        ReactDOM.unmountComponentAtNode(ele);
        document.body.removeChild(ele);
    };

    const modalContent = (
        <div className={styles.container}>
            <div className={styles.mask} />
            <div className={styles.content} onClick={maskClosable ? destroy : () => {}}>
                <div className={styles.body} style={{ width, height }} onClick={e => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        </div>
    );

    ReactDOM.render(modalContent, ele);

    return {
        destroy
    };
};
