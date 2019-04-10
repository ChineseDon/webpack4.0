var wx = require('weixin-js-sdk')
var website = {
    addr: "https://www.haibingo.com",
};
var wxShare = {
    title: '我发现了经营利器！不用不知道，一用吓一跳！！！', // 分享标题
    link: website.addr + '/hbgStationApply/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    desc: '专业的投注站新零售解决方案，为实体投注站定制一个互联网营销开放平台', // 分享描述
    imgUrl: website.addr + '/hbgStationApply/img/share.png', // 分享图标
    shareScope: function() {
        // 微信分享到朋友圈
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: wxShare.title, // 分享标题
                link: wxShare.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: wxShare.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    showMessage("分享成功");
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: wxShare.title, // 分享标题
                desc: wxShare.desc, // 分享描述
                link: wxShare.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: wxShare.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                    showMessage("分享成功");
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            
            // 分享到QQ
            wx.onMenuShareQQ({
                title: wxShare.title, // 分享标题
                desc: wxShare.desc, // 分享描述
                link: wxShare.link, // 分享链接
                imgUrl: wxShare.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    showMessage("分享成功");
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            
            // 分享到QQ空间
            wx.onMenuShareQZone({
                title: wxShare.title, // 分享标题
                desc: wxShare.desc, // 分享描述
                link: wxShare.link, // 分享链接
                imgUrl: wxShare.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    showMessage("分享成功");
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },
    // 配置
    setWxConfig: function(curUrl) {
        $.ajax({
        	type:"post",
        	url:"/station/WxPay/1/getSign",
        	async:true,
        	data: {
                url: curUrl
            },
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                if(data.success === "0000") {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.data.appId, // 必填，公众号的唯一标识
                        timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                        signature: data.data.signature, // 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareQZone'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wxShare.shareScope();
                } else {
                    showMessage(data.error);
                }
            }
        });
    }
};