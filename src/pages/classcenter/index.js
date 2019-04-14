import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';
import classNames from 'classnames';
import styles from './index.less';

@connect(({classcenter})=>({
    ...classcenter
}))
class ClassCenter extends React.Component {
    renderTab = ({title, key}) => {
        const { selectedCate } = this.props;
        const selected = key === selectedCate;

        return (
            <div className={classNames({
                [styles.tabTitle]: true,
                [styles.tabSelected]: selected
            })}
            >
                {title}
                {
                    selected && <div className={styles.underline} />
                }
            </div>
        );
    }

    changeTab = ({ key }) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'classcenter/setData',
            payload: {
                selectedCate: key
            }
        });

        dispatch({
            type: 'classcenter/getCourseList'
        });
    }

    render() {
        const { categories, courses } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.tabBar}>
                    <Tabs
                        tabs={categories.map(({id, name}) => ({title: name, key: id}))}
                        renderTab={this.renderTab}
                        onTabClick={this.changeTab}
                    />
                </div>
                <div className={styles.content}>
                    {
                        courses.map((item) => (
                            <div>
                                {JSON.stringify(item)}
                            </div>)
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ClassCenter;