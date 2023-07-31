/**
 * @MethodName convertDateFormat
 * @Author 周万宁
 * @Description 格式化时间 将Wed Feb 01 2023 00:00:00 GMT+0800 (中国标准时间) => 2023-7
 * @Date 23:27 2023/7/31
 **/

export function convertDateFormat(dateString:string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
}
