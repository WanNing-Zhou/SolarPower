/**
 * @MethodName convertDateFormat
 * @Author 周万宁
 * @Description 格式化时间 将Wed Feb 01 2023 00:00:00 GMT+0800 (中国标准时间) => 2023-7
 * @Date 23:27 2023/7/31
 **/

export function convertDateFormat(dateString :string|Date, hasDate:boolean=false):string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() ).padStart(2, '0');
    if(hasDate) return `${year}-${month}-${day}`
    return `${year}-${month}`;

}





/**
 * @MethodName getCurrentDate
 * @Author 周万宁
 * @Description 获取当前 '年-月-日'的时间
 * @Date 23:04 2023/8/3
 **/
export function getCurrentDate(joinChar ='-') {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = year + joinChar + month + joinChar + day;
    return formattedDate;
}
