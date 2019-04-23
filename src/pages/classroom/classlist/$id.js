import React, {Component} from 'react';
import { connect } from 'dva';
import {Tabs} from 'antd-mobile';
import request from "@utils/request";

import Media from '@components/Media';

import styles from './index.less';

@connect(({classroom_list}) => ({
    ...classroom_list
}))
class ClassList extends Component{

    times = null;

    constructor(props) {
        super(props);

        const {match: {params: {id}}} = props;

        props.dispatch({
            type: 'classroom_list/getDetail',
            payload: {
                id
            }
        });

        props.dispatch({
            type: 'classroom_list/getLessons',
            payload: {
                id
            }
        });
    }

    componentDidUpdate() {
        const { isInitial } = this.props;

        if(!isInitial) {
            this.media.showVideo();
            setTimeout(() => this.media.play(), 500);
        }
    }

    componentWillUnmount(){
        window.clearInterval(this.times);
    }

    postLearnt = (id) => {
        request('/api/course/learnt', {
            method: 'POST',
            body: JSON.stringify({
                lessonId: id,
                progress: this.media && this.media.video ? this.media.video.currentTime : 0
            })
        });
    };

    getCount = (count) => {
        if(count >= 10000) {
            return `${Math.ceil(count / 1000) / 10}万人学习`;
        } else {
            return `${count}人学习`;
        }
    };

    handlePlay = (id) => {
        const {dispatch} = this.props;

        dispatch({
            type: 'classroom_list/learn',
            payload: {
                id
            }
        });
    };

    playing = (id) => {
        if(id === 'headmedia'){
            window.clearInterval(this.times);
            return;
        }

        const _this = this;

        if(this.times) window.clearInterval(this.times);
        this.times = setInterval(function(){
            _this.postLearnt(id);
        },10000);
    };

    render(){
        const {playVideo, detailMedia, lessons} = this.props;
        return (
            <div className={styles.container}>
                <Media
                    type={playVideo.type}
                    url={playVideo.thumbnail || playVideo.url}
                    videoUrl={playVideo.url}
                    className={styles.img}
                    controls
                    key={playVideo.id}
                    ref={media => this.media = media}
                    onPlay={() => this.playing(playVideo.id)}
                    onPause={() => {
                        window.clearInterval(this.times);
                    }}
                    onEnded={() => this.postLearnt(playVideo.id)}
                />
                <div
                    style={{
                        height: 'calc(100% - 4.2rem)'
                    }}
                >
                    <Tabs
                        tabs={[
                            { title: '课程详情', tabKey: 'detail' },
                            { title: '课程目录', tabKey: 'outline' },
                        ]}
                        initialPage={0}
                        animated={false}
                        useOnPan
                        onTabClick={this.changeTab}
                        swipeable

                    >
                        <div className={styles.contentItem}>
                            {(detailMedia || []).map(({ type, url, thumbnail }, index) => (
                                <Media
                                    type={type}
                                    url={thumbnail || url}
                                    videoUrl={url}
                                    className={styles.media}
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className={styles.contentItem}>
                            {
                                (lessons || []).map((item, index) => (
                                    <div className={styles.lessonItem} key={index} onClick={() => this.handlePlay(item.id)}>
                                        <div className={styles.content}>
                                            <Media
                                                type='Image'
                                                url={item.cover}
                                                className={styles.cover}
                                                showPlayIcon
                                                playIconStyle={{
                                                    width: '0.5rem',
                                                    height: '0.5rem'
                                                }}
                                            />
                                            <div className={styles.info}>
                                                <div className={styles.title}>{item.name}</div>
                                                <div className={styles.userCount}>
                                                    {
                                                        this.getCount(item.userCount)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ClassList;
