import React from 'react';
import { connect } from 'dva';
import Tabs from '@components/Tabs';
import throttle from 'lodash.throttle';
import Course from './components/Course';
import styles from './index.less';

@connect(({ classcenter }) => ({
    ...classcenter,
}))
class ClassCenter extends React.Component {
    constructor(props) {
        super(props);

        this.handleScroll = throttle(this.scroll, 500);
    }

    componentDidUpdate() {
        this.scrollHeight = (this.content || {}).scrollHeight;
        this.clientHeight = (this.content || {}).clientHeight;
    }

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

        this.content.scrollTo(0, 0);
    };

    fetchNewPage = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'classcenter/getCourseList',
            payload: {
                append: true,
            },
        });
    };

    scroll = e => {
        const { dispatch, total, courses } = this.props;
        const top = e.target.scrollTop;

        if (top + this.clientHeight + 20 >= this.scrollHeight && courses.length < total) {
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
                    <div
                        className={styles.content}
                        onScroll={e => {
                            e.persist();
                            this.handleScroll(e);
                        }}
                        ref={content => (this.content = content)}
                    >
                        {courses.map(item => (
                            <Course {...item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassCenter;
