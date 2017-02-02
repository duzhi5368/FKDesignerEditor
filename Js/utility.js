/**
 * Created by Frankie.W on 2017/1/5.
 */

var FKUtility = {

    // 是否是不支持的浏览器
    IsSupportWebbrowser: function () {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        var isFirefox = typeof InstallTrigger !== 'undefined';      // Firefox 1.0+
        var isChrome = !!window.chrome && !isOpera;                   // Chrome 1+
        var isBadBrowser = !isOpera && !isFirefox && !isChrome;
        return isBadBrowser;
    },

    // 线程Sleep
    Sleep: function (nMS) {
        var currentTime = new Date().getTime();
        while(currentTime + nMS >= new Date().getTime()){

        }
    }
};