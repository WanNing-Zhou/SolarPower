/**
 * 逆变器报表get请求参数
 */
export interface InverterParams{
    stationName: string; // 站点名称
    startTime ?: string; // 开始时间
    endTime ?: string; // 结束时间
}

export interface InverterPageParams{
    stationName:string,//站点名称
    page?:number, //当前页数
    pageSize?:number//当前页面大小
}