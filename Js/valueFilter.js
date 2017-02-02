/**
 * Created by Frankie.W on 2016/12/31.
 */
//-------------------------------------------------------------------------
var CValueFilter = {
    // 限制是int格式
    FilterInt: function()
    {
        // 获取当前元素
        var element = document.activeElement;
        // 移除非数字字母
        element.value = element.value.replace(/[^0-9-]/g, "");
        // 移除无效的零
        for (var i = 0; i < element.value.length - 1; i++) {
            var c = element.value.charAt(i);
            if (element.value.charAt(i) == '0') {
                element.value = element.value.replace('0', '');
                i--;
            }
            else if (c != '-') {
                break;
            }
        }
        // 移除额外的负号
        if (element.value.lastIndexOf('-') > 0) {
            var negative = element.value.charAt(0) != '-';
            element.value = element.value.replace(/-/g, "");
            if (negative) {
                element.value = '-' + element.value;
            }
        }
        // 检查为空
        if (element.value.length == 0 ||
            (element.value.length == 1 && element.value.charAt(0) == '-')) {
            element.value += '0';
        }
    },

    // 限制是小数格式
    FilterDouble: function() {
        // 获取元素
        var element = document.activeElement;
        var negative = false;
        var index = -1;
        while ((index = element.value.indexOf("-", index + 1)) >= 0) {
            negative = !negative;
        }
        // 去除非数字
        var filtered = element.value.replace(/[^0-9\.-]/g, "");
        if (filtered != element.value) {
            element.value = filtered;
        }
        // 移除无效的0
        for (var i = 0; i < element.value.length - 1; i++) {
            var c = element.value.charAt(i);
            if (element.value.charAt(i) == '0' && element.value.charAt(i + 1) != '.') {
                element.value = element.value.replace('0', '');
                i--;
            }
            else if (c != '-') {
                break;
            }
        }
        // 移除无效的负号
        if (element.value.lastIndexOf('-') > 0) {
            var negative = element.value.charAt(0) != '-';
            element.value = element.value.replace(/-/g, "");
            if (negative) {
                element.value = '-' + element.value;
            }
        }
        // 补0
        if (element.value.length == 0 || (element.value.length == 1 && element.value == "-")) {
            element.value += '0';
        }
    }
};
//-------------------------------------------------------------------------