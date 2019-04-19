import React from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import { modal } from '@components/Modal';
import { Icon } from 'antd-mobile';

const renderShareDom = ({
    bgImage,
    nickName,
    avatarUrl,
    callbackUrl,
    text = '我觉得这个课程超棒，推荐给你！',
}) => {
    return (
        <>
            <img
                src={bgImage}
                alt="img"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                }}
                crossOrigin="anonymous"
            />
            <div style={{ position: 'absolute', top: '0.22rem', left: '0.32rem', zIndex: 1 }}>
                <img
                    src={avatarUrl}
                    alt="img"
                    style={{
                        width: '0.56rem',
                        height: '0.56rem',
                        float: 'left',
                        borderRadius: '0.56rem',
                    }}
                    crossOrigin="anonymous"
                />
                <span
                    style={{
                        fontSize: '0.22rem',
                        fontWeight: 500,
                        color: '#fff',
                        lineHeight: '0.32rem',
                        float: 'left',
                        marginLeft: '0.2rem',
                        zIndex: 1,
                    }}
                >
                    <div>{nickName}</div>
                    <div>{text}</div>
                </span>
            </div>
            <img
                src={`/api/rdt/qrcode?${encodeURIComponent(callbackUrl)}`}
                alt="img"
                style={{
                    position: 'absolute',
                    right: '0.32rem',
                    bottom: '0.32rem',
                    width: '1.33rem',
                    height: '1.33rem',
                }}
                crossOrigin="anonymous"
            />
        </>
    );
};

export const showPoster = (dataUrl, showHeader = true) => {
    const opers = modal({
        width: '4.98rem',
        height: '8.86rem',
        content: (
            <div style={{ width: '4.98rem', height: '8.86rem', position: 'relative' }}>
                <Icon
                    type="cross-circle"
                    color="#FFF"
                    size="sm"
                    style={{
                        position: 'absolute',
                        left: '4.98rem',
                        top: '-0.4rem',
                    }}
                    onClick={() => opers.destroy()}
                />
                <img
                    src={dataUrl}
                    alt="img"
                    style={{ width: '4.98rem', height: '8.86rem' }}
                    onTouchStart={e => e.preventDefault()}
                />
                {showHeader && (
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: '9.28rem',
                            fontSize: '0.34rem',
                            color: '#fff',
                            lineHeight: '0.48rem',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div>96%的家长转发后拼团成功</div>
                        <div>长按保存图片</div>
                        <div>转发给好友即可拼团</div>
                    </div>
                )}
            </div>
        ),
        maskClosable: true,
    });
};

/**
 *
 * @param {*} props
 * {
 *      bgImage,
 *      nickName,
 *      avatarUrl,
 *      callbackUrl: `course.aguzaojiao.com/classcenter`,
 *      onOk: dataUrl => {},    //不传onOk会立即渲染，onOk返回图片url，异步渲染需调用showPoster(dataUrl),
 *      showHeader              //是否显示海报上方的文字，默认显示
 *  }
 */
export const renderShare = props => {
    let ele = document.getElementById('shareDom');
    if (!ele) {
        ele = document.createElement('div');
        ele.style.position = 'relative';
        ele.style.width = `${window.innerWidth}px`;
        ele.style.height = `${window.innerHeight}px`;
        ele.style.top = '100vh';
        document.body.appendChild(ele);
    }

    const { bgImage, onOk } = props;

    let image = new Image();
    image.src = bgImage;
    image.onload = () => {
        ReactDOM.render(renderShareDom(props), ele);

        html2canvas(ele, {
            useCORS: true,
            logging: false,
            proxy: 'https://www.aguzaojiao.com/api/rdt/img',
        })
            .then(canvas => {
                const dataUrl = canvas.toDataURL('image/png');
                // this.shareImage = navigator.userAgent.includes('AppleWebKit') ? dataUrl.replace() : dataUrl;
                (onOk || showPoster)(dataUrl, props.showHeader);
                ReactDOM.unmountComponentAtNode(ele);
                document.body.removeChild(ele);
            })
            .catch(e => {
                console.info(e);
            });
    };
};
