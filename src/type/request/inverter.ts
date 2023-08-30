/**
 * 逆变器报表get请求参数
 */
export interface InverterParams{
    stationName: string; // 站点名称
    startTime ?: string; // 开始时间
    endTime ?: string; // 结束时间
}
