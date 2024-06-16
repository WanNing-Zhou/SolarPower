/****
 * 
 * 
 * 工作单管理请求
 * 
 */
import Request from "@/utils/request.ts";
import {workSheetCondition,deleteWorkSheetCondition,addConditions} from '@/type/request/worksheet'
import {editConditions} from '@/type/request/worksheet'
//查询工作单请求
export function getWorkSheet(params:workSheetCondition | any){
    return Request.get('/api/worksheet/',{
        params
    }
        

    )
}

//删除工作单请求
export function deleteWorkSheet(params:deleteWorkSheetCondition){
    return Request.delete('/api/worksheet/',{
        params
    })
}

//打印工作单的请求
export function printWorkSheet(params:string){
    // 后端为@PathVariable 占位符
    return Request.get('/api/worksheet/print/'+params)
}

//添加工作单的请求
export function addWorkSheet(params:addConditions){

    return Request('/api/worksheet/',{
        method: 'post',

        data: params
    })

}

//修改工作单请求
export function editWorkSheet(params:editConditions){
    return Request('/api/worksheet/',{
        method: 'put',

        data: params
    })

}
