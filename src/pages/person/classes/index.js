import React, {Component} from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({person_Classes}) => ({
    classImage: person_Classes.classImage
}))
class Classes extends Component{
    constructor(props){
        super(props);

        props.dispatch({
            type: 'person_Classes/getCategories',
        });
    }
    render(){
        const {classImage} = this.props;
        return (
            <div className={styles.container}>
                {
                    classImage ?  <img src={classImage} className={styles.img} onTouchStart={e => e.preventDefault()} /> : ''
                }
            </div>
        );
    }
}

export default Classes;
