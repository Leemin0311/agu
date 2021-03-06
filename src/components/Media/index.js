import React from 'react';
import play from '@assets/play.svg';
import styles from './Media.less';

export default class Media extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideo: props.showVideo,
        };
    }

    componentDidMount() {
        this.play();
    }

    componentDidUpdate() {
        this.play();
    }

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
        if (this.video && this.video.paused) {
            this.video.play();
        }
    };

    autoPlay = () => {
        const { showVideo } = this.state;

        if(showVideo || !this.playBtn) return;

        this.playBtn.click();
    }

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
                        ref={playBtn => this.playBtn = playBtn}
                    />
                )}
            </div>
        );
    }
}
