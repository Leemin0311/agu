import React from 'react';
import classNames from 'classnames';
import classcenter_selected from '@assets/classcenter_selected.svg';
import classcenter from '@assets/classcenter.svg';
import classroom_selected from '@assets/classroom_selected.svg';
import classroom from '@assets/classroom.svg';
import person_selected from '@assets/person_selected.svg';
import person from '@assets/person.svg';
import router from 'umi/router';
import styles from './Footer.less';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.data = [
            {
                id: 'classcenter',
                name: '课程中心',
                icon: classcenter,
                icon_selected: classcenter_selected,
            },
            {
                id: 'classroom',
                name: '我的课堂',
                icon: classroom,
                icon_selected: classroom_selected,
            },
            {
                id: 'person',
                name: '个人中心',
                icon: person,
                icon_selected: person_selected,
            },
        ];
    }

    change = id => {
        const { pathname } = this.props;
        if (id !== this.getSelected(pathname)) {
            router.push(`/${id}`);
        }
    };

    getSelected = pathname => {
        if(pathname.startsWith('/classcenter')) {
            return 'classcenter';
        }
        if(pathname.startsWith('/classroom')) {
            return 'classroom';
        }
        if(pathname.startsWith('/person')) {
            return 'person';
        }

        return '';
    };

    render() {
        const { pathname, className } = this.props;
        const selected = this.getSelected(pathname);

        return (
            <div className={className}>
                {this.data.map(({ id, name, icon, icon_selected }) => (
                    <div className={styles.menuItem} key={id} onClick={() => this.change(id)}>
                        <div className={styles.icon}>
                            <img src={selected === id ? icon_selected : icon} alt="" />
                        </div>
                        <div
                            className={classNames({
                                [styles.text]: true,
                                [styles.selected]: selected === id,
                            })}
                        >
                            {name}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
