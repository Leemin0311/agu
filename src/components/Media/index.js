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
            <video className={className}>
                <source src={videoUrl} type="video/mp4" />
                <track kind="captions" />
            </video>
        ) : (
            <div
                className={className}
                style={{
                    background: `url(${url})`,
                    backgroundSize: 'cover',
                }}
                onClick={this.showVideo}
            />
        );
    }
}
