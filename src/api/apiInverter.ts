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
