import React from 'react';
import { connect } from 'dva';
import Tabs from '@components/Tabs';
import { PullToRefresh, Icon } from 'antd-mobile';
import { log } from '@utils/tools';
import Empty from '@assets/empty.png';
import Course from './components/Course';
import styles from './index.less';

@connect(({ classcenter, loading }) => ({
    ...classcenter,
    loading: loading.effects['classcenter/initialize'],
}))
class ClassCenter extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'classcenter/setData',
            payload: {
                currentPage: 1,
                courses: [],
                tabChanged: true
            },
        });
    }

    changeTab = ({ tabKey }) => {
        const { dispatch } = this.props;

        log({ tabKey });

        dispatch({
            type: 'classcenter/setData',
            payload: {
                selectedCate: tabKey,
                currentPage: 1,
                tabChanged: true,
            },
        });

        dispatch({
            type: 'classcenter/getCourseList',
        });
    };

    fetchNewPage = () => {
        const { dispatch, total, courses } = this.props;

        log('fetchNewPage');

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
        const { categories, courses, selectedCate, loading, tabChanged } = this.props;

        if (loading) return null;

        return (
            <div className={styles.container}>
                <Tabs
                    wrapperClassName={styles.tabBar}
                    tabs={categories.map(({ id, name }) => ({ title: name, tabKey: id }))}
                    onChange={this.changeTab}
                    selectedTabKey={selectedCate}
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
                    initialPage={0}
                >
                    {categories.map(({ id }) => (
                        <PullToRefresh
                            direction="up"
                            onRefresh={this.fetchNewPage}
                            key={id}
                            damping={60}
                            indicator={{}}
                        >
                            {!tabChanged ? (
                                <div className={styles.content}>
                                    {!!courses.length &&
                                        courses.map(item => <Course {...item} key={item.id} />)}
                                    {!courses.length && (
                                        <div className={styles.empty}>
                                            <img src={Empty} className={styles.emptyPageImg} />
                                            <span className={styles.emptyText}>暂无该分类课程</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.content}>
                                    <div className={styles.loading}>
                                        <Icon type="loading" size="lg" />
                                        <div className={styles.loadingText}>加载中...</div>
                                    </div>
                                </div>
                            )}
                        </PullToRefresh>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default ClassCenter;
