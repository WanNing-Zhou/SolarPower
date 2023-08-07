/**
 * 格式化日期
 * @param num
 * @param digit
 */
export function formatNumber(num:number,digit:number) {
    // 将数字转换为字符串
    var str = num.toString();

    // 判断数字是否为三位数
    if (str.length === digit) {
        return str;
    } else if (str.length < digit) {
        // 不足三位数时，在数字前面补零
        while (str.length < digit) {
            str = '0' + str;
        }
        return str;
    } else {
        // 如果数字超过三位数，则截取后三位
        return str.slice(-3);
    }
}
