import React, {Component} from "react";
import { List, InputItem, Picker, DatePicker } from 'antd-mobile';
import moment from 'moment';
import router from 'umi/router';
import defaultAvatar from '@assets/defaultAvatar.svg';
import camera from '@assets/camera.svg';

import { connect } from 'dva';
import styles from './index.less';

const wx = window.wx;

@connect(({global}) => ({
    user: global.user
}))
class Info extends Component{

    sex = [
        {
            label: (
                <div>
                    <span>男</span>
                </div>
            ),
            value: 'male',
        },
        {
            label: (
                <div>
                    <span>女</span>
                </div>
            ),
            value: 'female',
        },
    ];

    constructor(props){
        super(props);

        const {user} = props;
        const babyInfo = user.babies && user.babies.length > 0 ? user.babies[0] : null;

        this.state = {
            name: babyInfo ? babyInfo.name : '',
            sexValue: babyInfo ? babyInfo.male ? ['male'] : ['female'] : '',
            birth: babyInfo ? new Date(babyInfo.birthday) : '',
        };
    }


    handleUpload = (e) => {
        //alert("选择图片")
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                // var localIds = res.localIds;
                // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        });
        return false;
    };

    handleChangeName = (v) => {
        this.setState({
            name: v
        });
    };

    handleChangeSex = (sex) => {
        this.setState({
            sexValue: sex
        });
    };

    handleChangeBirth = (data) => {
        this.setState({
            birth: data
        });
    };

    handleSubmit = async () => {
        const {dispatch} = this.props;
        const {birth, sexValue, name} = this.state;
        await dispatch({
            type: 'person_info/upDateBabyInfo' ,
            payload: {
                birthday: moment(birth).format(),
                male: sexValue[0] === 'male' ? '男' : sexValue[0] === 'female' ? '女' : '',
                name
            }
        });

        router.push('/person');

    };

    render(){
        const {sexValue, birth, name} = this.state;

        return (
            <div className={styles.infoContent}>
                <div className={styles.upload} onClick={this.handleUpload}>
                    <img src={defaultAvatar} className={styles.avatar} />
                    <img src={camera} className={styles.camera} />
                </div>

                <div className={styles.inputInfo}>
                    <List>
                        <InputItem
                            placeholder="请输入宝宝昵称"
                            onChange={this.handleChangeName}
                            value={name}
                            className={styles.name}
                            style={{
                                textAlign: 'right',
                                fontSize: '.30rem'
                            }}
                        >
                        宝宝小名
                        </InputItem>
                        <Picker
                            data={this.sex}
                            extra={<span style={{color: '#B9B9B9'}}>请选择宝宝性别</span>}
                            value={sexValue}
                            cols={1}
                            onChange={this.handleChangeSex}
                        >
                            <List.Item>宝宝性别</List.Item>
                        </Picker>
                        <DatePicker
                            mode="date"
                            title="宝宝生日"
                            extra={<span style={{color: '#B9B9B9'}}>请选择宝宝生日</span>}
                            value={birth}
                            onChange={this.handleChangeBirth}
                            locale={{okText: '确定', dismissText: '取消'}}
                        >
                            <List.Item>宝宝生日</List.Item>
                        </DatePicker>
                    </List>
                </div>

                <div
                    className={styles.save}
                    onClick={this.handleSubmit}
                >
                    保存
                </div>
            </div>
        );
    }
}

export default Info;
