import React from 'react';
import { Tabs as AntdTabs } from 'antd-mobile';
import classNames from 'classnames';
import styles from './Tabs.less';

/**
 *  重置antd-mobile tabs样式
 *  @reactProps  {array}   [tabs]                  - 必须包含title和id
 *  @reactProps  {string}  [color]                 - 普通文字颜色
 *  @reactProps  {string}  [selectedColor]         - 选中文字颜色
 *  @reactProps  {string}  [underlineColor]        - 下划线颜色
 *  @reactProps  {object}  [style]                 - 普通文字样式
 *  @reactProps  {object}  [selectedStyle]         - 选择文字样式
 *  @reactProps  {object}  [underlineStyle]        - 下划线样式
 *  @reactProps  {object}  [wrapperStyle]          - 容器样式
 *  @reactProps  {object}  [wrapperClassName]      - 容器class
 */
export default class Tabs extends React.Component {
    renderTab = ({ title, tabKey }) => {
        const {
            page,
            color,
            selectedColor,
            underlineColor,
            style,
            selectedStyle,
            underlineStyle,
        } = this.props;
        const selected = tabKey === page;

        return (
            <div
                className={classNames({
                    [styles.tabTitle]: true,
                    [styles.tabSelected]: selected,
                })}
                style={{
                    color: selected ? selectedColor : color,
                    ...(selected ? selectedStyle : style),
                }}
            >
                {<span className={styles.text}>{title}</span>}
                {selected && (
                    <div
                        className={styles.underline}
                        style={{ background: underlineColor, ...underlineStyle }}
                    />
                )}
            </div>
        );
    };

    render = () => {
        const { wrapperStyle, wrapperClassName } = this.props;

        return (
            <div className={classNames(styles.tabs, wrapperClassName)} style={wrapperStyle}>
                <AntdTabs {...this.props} renderTab={this.renderTab} />
            </div>
        );
    };
}
