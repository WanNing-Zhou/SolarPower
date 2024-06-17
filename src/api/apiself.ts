/**
 *
 * 自由上网报表的请求
 */
import Request from "@/utils/request.ts";
import { ChecklistConditions,pscData,deleteSelfConditions,addSelfConditions } from '@/type/request/selfTable'

// 查询请求
export function getSelfTable(params:ChecklistConditions)
{
    return Request.get('/api/selfAndOnGrid/',{
        params
    })
}

//修改请求
export function editSelfTable(params:pscData){
    return Request('/api/selfAndOnGrid/',{
        method: 'put',

        data: params
    })
}

//添加请求
export function addSelfTable(params:addSelfConditions){
    return Request('/api/selfAndOnGrid/',{
        method: 'post',

        data: params
    })
}
//删除请求
export function deleteSelfTable(params:deleteSelfConditions){
    return Request.delete('/api/selfAndOnGrid/',{
        params
    })
}

export type SelfFileParam = {
    stationId: string | number
}


// 下载自用报表
export function getSelfFile(params: SelfFileParam) {
    return Request.get('/api/selfAndOnGrid/export', {
        params
    })
}
