import React, {Component} from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({person_Classes}) => ({
    image: person_Classes.image
}))
class Classes extends Component{
    render(){
        return (
            <div className={styles.container} />
        );
    }
}

export default Classes;
