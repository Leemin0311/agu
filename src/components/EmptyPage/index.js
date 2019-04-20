import React from 'react';
import styles from '@/pages/person/coupon/index.less';
import { Button } from 'antd-mobile';
import router from 'umi/router';
import Empty from '@assets/empty.png';

const emptyPage = ({content}) => {
    return (
        <div className={styles.emptyPage}>
            <img src={Empty} className={styles.emptyPageImg} />
            <div className={styles.text}>{content}</div>
            <div className={styles.text}>去首页看看有什么新课程吧</div>
            <Button
                type='primary'
                className={styles.emptyButtonPri}
                onClick={() => {
                    router.push('/classcenter');
                }}
            >
                去看看
            </Button>
        </div>
    );
};

export default emptyPage;
