import React from 'react';
import play from '@assets/play.svg';
import { log } from '@utils/tools';
import styles from './Media.less';

export default class Media extends React.Component {
    state = {
        showVideo: false,
    };

    showVideo = () => {
        const { type } = this.props;

        if (type === 'Video') {
            this.setState({
                showVideo: true,
            });
        }
    };

    pause = () => {
        if (this.video && this.video.played) {
            this.video.pause();
        }
    };

    play = () => {
        log({
            video: this.video ? 'hasvalue': 'null',
            paused: this.video ? this.video.paused : 'undefined'
        });

        if (this.video && this.video.paused) {
            this.video.play();

            log('played');
        }
    };

    render() {
        const {
            url,
            videoUrl,
            className,
            type,
            controls = true,
            showPlayIcon,
            playIconStyle,
            autoPlay=true,
            onPlay,
            onPause,
            onEnded
        } = this.props;
        const { showVideo } = this.state;

        return showVideo ? (
            <video
                className={className}
                autoPlay={autoPlay}
                playsInline
                controls={controls}
                ref={video => (this.video = video)}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onEnded}
                preload="auto"
            >
                <source src={videoUrl} type="video/mp4" />
                <track kind="captions" />
            </video>
        ) : (
            <div className={styles.container}>
                <img className={className} src={url} alt="" />
                {(type === 'Video' || showPlayIcon) && (
                    <img
                        src={play}
                        alt=""
                        className={styles.play}
                        onClick={this.showVideo}
                        style={playIconStyle}
                    />
                )}
            </div>
        );
    }
}
