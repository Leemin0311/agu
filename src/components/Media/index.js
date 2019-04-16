import React from 'react';
import play from '@assets/play.svg';
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

    render() {
        const { url, videoUrl, className, type } = this.props;
        const { showVideo } = this.state;

        return showVideo ? (
            <video className={className} autoPlay playsinline="true">
                <source src={videoUrl} type="video/mp4" />
                <track kind="captions" />
            </video>
        ) : (
            <div className={styles.container}>
                <img className={className} src={url} alt="" />
                {type === 'Video' && <img src={play} alt="" className={styles.play} onClick={this.showVideo} />}
            </div>
        );
    }
}
