/**\
 * 电站报表请求
 */

import Request from "@/utils/request.ts";
import {ReportParams,ReportInsertParams,ReportModifyParams,LossQueryParams,LossInsertParams,LossModifyParams,LossDeleteParams} from '@/type/request/report'
//查询请求
export function getReport(params:ReportParams){
    return Request.get('/api/stationReport/',{
        params
    })
}
//添加请求
export function insertReport(params:ReportInsertParams[]){
    return Request({
        url:'/api/stationReport/',
        method:'post',
        data:params

    })
}
//修改请求
export function modifyReport(params:ReportModifyParams[])
{
    return Request({
        url:'/api/stationReport/',
        method:'put',
        data:params
    })
}
//删除请求
export function deleteReport(params:Number[])
{
    return Request({
        url:'/api/stationReport/',
        method:'delete',
        data:params
    })
}

//年总表的查询请求
export function queryYearReport(params:{year:number}){
    return Request.get('/api/stationReport/year',{
        params
    })

}

//损失电量的查询请求
export function queryLossEl(params:LossQueryParams)
{
    return Request.get('/api/stationReport/outage',{
        params
    })
}

//损失电量的添加请求
export function insertLossEL(params:LossModifyParams[])
{
    return Request({
        url:'/api/stationReport/outage',
        method:'post',
        data:params
    })
}

//损失电量的删除请求
export function deleteLossEL(params:LossDeleteParams[])
{
    return Request({
        url:'/api/stationReport/outage',
        method:'delete',
        data:params
    })
}

//损失电量的修改请求
export function modifyLossEL(params:LossModifyParams[])
{
    return Request({
        url:'/api/stationReport/outage',
        method:'put',
        data:params
    })
}
