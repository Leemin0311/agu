import React from 'react';
import { connect } from 'dva';
import Tabs from '@components/Tabs';
import { PullToRefresh } from 'antd-mobile';
import Course from './components/Course';
import styles from './index.less';

@connect(({ classcenter }) => ({
    ...classcenter,
}))
class ClassCenter extends React.Component {
    changeTab = ({ tabKey }) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'classcenter/setData',
            payload: {
                selectedCate: tabKey,
                currentPage: 1,
            },
        });

        dispatch({
            type: 'classcenter/getCourseList',
        });
    };

    fetchNewPage = () => {
        const { dispatch, total, courses } = this.props;

        if (courses.length < total) {
            dispatch({
                type: 'classcenter/getCourseList',
                payload: {
                    append: true,
                },
            });
        }
    };

    render() {
        const { categories, courses, selectedCate } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.tabBar}>
                    <Tabs
                        tabs={categories.map(({ id, name }) => ({ title: name, tabKey: id }))}
                        onTabClick={this.changeTab}
                        page={selectedCate}
                        style={{
                            fontSize: '0.3rem',
                            fontFamily: 'PingFangSC-Regular',
                            fontWeight: 400,
                            color: 'rgba(106, 106, 106, 1)',
                        }}
                        selectedStyle={{
                            fontSize: '0.36rem',
                            fontFamily: 'PingFangSC-Medium',
                            fontWeight: 500,
                            color: 'rgba(52, 58, 62, 1)',
                        }}
                        underlineStyle={{
                            background:
                                'linear-gradient(90deg,rgba(254, 227, 0, 1) 0%,rgba(253, 199, 13, 1) 100%)',
                        }}
                    />
                </div>

                <PullToRefresh
                    direction="up"
                    distanceToRefresh={window.devicePixelRatio * 25}
                    onRefresh={this.fetchNewPage}
                    key={selectedCate}
                >
                    <div className={styles.content}>
                        {courses.map(item => (
                            <Course {...item} key={item.id} />
                        ))}
                    </div>
                </PullToRefresh>
            </div>
        );
    }
}

export default ClassCenter;
