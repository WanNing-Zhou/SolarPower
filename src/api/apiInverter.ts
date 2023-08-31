/**
   * @FileNAme src\api\apiInverter.ts
   * @author 周万宁
   * @create 2023/8/30-21:23
   * @version
   * @description 逆变器报表api
   */
import Request from "@/utils/request.ts";
import {InverterParams} from "@/type/request/inverter.ts";


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
