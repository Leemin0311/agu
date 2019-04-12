const wx = window.wx;

export function configWxJs(data, onReadyCallback) {
    wx.config({
        debug: false,
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: [
            'chooseWXPay',
            'updateAppMessageShareData',
            'updateTimelineShareData',
        ], // 必填，需要使用的JS接口列表
    });
    wx.ready(function() {
        console.info('wx config ready');
        onReadyCallback && onReadyCallback();
    });
    wx.error(function(res) {
        console.error(JSON.stringify(res));
    });
}

export function configWxShare(title, desc, link, imgUrl) {
    // 新的接口success会直接被调用，而不是在用户分享成功后被调用
    wx.updateAppMessageShareData({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function() {
            // 设置成功
            console.info('updateAppMessageShareData success');
        },
    });

    //   新的接口success会直接被调用，而不是在用户分享成功后被调用
    wx.updateTimelineShareData({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function() {
            console.info('updateTimelineShareData success');
        },
    });
}
