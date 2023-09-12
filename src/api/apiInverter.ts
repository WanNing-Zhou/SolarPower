/**
   * @FileNAme src\api\apiInverter.ts
   * @author 周万宁
   * @create 2023/8/30-21:23
   * @version
   * @description 逆变器报表api
   */
import Request from "@/utils/request.ts";
import {InverterParams,InverterPageParams} from "@/type/request/inverter.ts";
import {InverterParam} from "@/type/inverter.ts"


export function getInverterTableData(params:InverterParams){
     return Request.get('/api/inverter/analyse',{
         params
     })
 }

export function InverterExport(){
    return Request('/api/inverter/export',{
        method: "get",
        responseType: 'blob',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            withCredentials: true,
        }
    })
}


export function invertImport(params:{fildId: string}){
    return Request.get('/api/inverter/import',{
        params
    })
}

//重新计算
export function ReCount(params:InverterParam[]){
    //传递后端为@RequestBody形式对象数组方式
    return Request({
        url:'/api/inverter/factors',
        method: 'post',
        data:params//这是关键

    })

}
//逆变器报表分页查询
export function PageSearch(params:InverterPageParams){
    return Request.get('/api/inverter/page',{
        params
    })
}
