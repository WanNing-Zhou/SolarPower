/***
 * 电站报表的请求参数
 */

//查询参数
export interface ReportParams{
    companyNumber?:string;//公司编号
    stationNumber?:string;//电站编号
    reportDate?:string | Date;//日期

}
//添加参数
export interface ReportInsertParams{
    companyNumber?:string;//公司编号
    stationNumber?:string;//电站编号
    reportDate?:string | Date;//日期
    operationStatus?:string;//当天运行情况
    powerGeneration?:number;//当天发电量
    useHours?:number;//当天用电量
}
//修改参数
export interface ReportModifyParams{
    id?:string;//报表编号
    operationStatus?:string;//当天运行情况
    powerGeneration?:number;//当天发电量
    useHours?:number;//当天用电量
}

//损失电量查询参数
export interface LossQueryParams{
    companyNumber?:string;//公司编号
    stationNumber?:string;//电站编号
    filterTime?: Date[]; //过滤时间
    startDate?:string;//开始时间
    endDate?:string;//结束时间
    page:number;//当前页码
    pageSize:number;//页码大小
    total:number;//总数
}
//损失电量添加参数
export interface LossInsertParams{
    id?:number;//报表id
    stationName?:string;//电站名称
    companyNumber?:string;//公司编号
    stationNumber?:string;//电站编号
    date?: Date | string | number // 停电时间
    duration?: string | number // 停电时长
    loss?: number // 少发电量
    violationCount?: number | string // 违章次数
    responseTime?: string | number  //响应时间
    secondaryLoss?: number | string  // 次生灾害损失
    edit?:boolean
    addedit?:boolean
}

//损失电量修改参数
export interface LossModifyParams{
    id?:number;//报表id
    date?: Date | string | number // 停电时间
    duration?: string | number // 停电时长
    loss?: number // 少发电量
    violationCount?: number | string // 违章次数
    responseTime?: string | number  //响应时间
    secondaryLoss?: number | string  // 次生灾害损失
}
//损失电量删除参数
export interface LossDeleteParams{
    id?:number;//报表id
}