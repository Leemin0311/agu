import React from 'react';

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
        const { url, videoUrl, className } = this.props;
        const { showVideo } = this.state;

        return showVideo ? (
            <video className={className} autoPlay playsinline="true" webkit-playsinline="true">
                <source src={videoUrl} type="video/mp4" />
                <track kind="captions" />
            </video>
        ) : (
            <img className={className} src={url} alt="" onClick={this.showVideo} />
        );
    }
}
