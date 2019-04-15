import React from 'react';
import router from 'umi/router';
import styles from './Course.less';

export default class Course extends React.Component {
    junpDetail = () => {
        const { id } = this.props;

        router.push(`/classcenter/coursedetail/${id}`);
    }

    render() {
        const { coverImage, intro } = this.props;
        return (
            <div className={styles.container} onClick={this.junpDetail}>
                <div className={styles.img} style={{background: `url(${coverImage})`, backgroundSize: 'cover'}} />
                <div className={styles.footer}>
                    <span className={styles.introduction}>{intro}</span>
                    <span className={styles.study}>去学习</span>
                </div>
            </div>
        );
    }
}
