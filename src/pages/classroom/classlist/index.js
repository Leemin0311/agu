import React, {Component} from 'react';
import { connect } from 'dva';

import styles from './index.less';

@connect(({classroom_list}) => ({
    ...classroom_list
}))
class ClassList extends Component{
    constructor(props) {
        super(props);

        props.dispatch({
            type: 'classroom_list/getDetail',
            payload: {
                id: '123'
            }
        });
    }

    render(){
        const {headMedia} = this.props;
        console.info(headMedia);
        return (
            <div className={styles.container}>
                {/*<Media*/}
                {/*type={type}*/}
                {/*url={thumbnail || url}*/}
                {/*videoUrl={url}*/}
                {/*className={styles.img}*/}
                {/*key={index}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default ClassList;
