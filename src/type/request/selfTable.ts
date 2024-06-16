/**
 * 
 * 自用和上网报表请求参数的类型
 * 
 */

//查询参数
export  interface ChecklistConditions{
    companyNumber:string;//公司编号
    stationNumber?: string;//电站编号
    filterTime?: Date[]; //过滤时间
    startDate?: string;//开始时间
    endDate?:string;//结束时间
    page?:number;//页码
    pageSize?:number;//页面大小
    total?:number;//总数

}

//修改/返回参数
export interface pscData {
    id?: string; // 报表编号
    saogpId?: number;//报表编号
    companyNumber?: string;//公司编号
    stationNumber?: string;//电站编号
    stationName?: string;//电站名称
    reportDate?: string; // 时间
    date?: string;//日期（年月）
    inverterName?: string;//逆变器名称
    electricityConsumptionTotal?: number;//发电表总发电量
    electricityOnGridTotal?: number;//上网总电量
    onGridPowerPrice?: number;//上网电价
    selfUsePowerPrice?: number;//自用电价
    electricitySelfUseTotal?: number;//自用电量
    scenePicture?: string;//现场照片的文件标识符
    onGridElectricCharge?: number;//上网电费
    selfUseElectricCharge?: number;//自用电费
    // edit?: boolean;//修改/添加判断条件
    // cancelEdit?: boolean;//取消判断条件
    // addEdit?:boolean;//添加判断条件
    onlyEdit?:boolean;//唯一编辑
  
  }

  //删除参数
  export interface deleteSelfConditions{
    saogpId: number;//报表编号
  }

  //添加参数
export interface addSelfConditions
{
    saogpId?: number;//报表编号
    companyNumber?: string;//公司编号
    stationNumber?: string;//电站编号
    date?: string;//日期（年月）
    inverterName?: string;//逆变器名称
    electricityConsumptionTotal?: number;//发电表总发电量
    electricityOnGridTotal?: number;//上网总电量
    onGridPowerPrice?: number;//上网电价
    selfUsePowerPrice?: number;//自用电价
    electricitySelfUseTotal?: number;//自用电量
    scenePicture?: string;//现场照片的文件标识符
    onGridElectricCharge?: number;//上网电费
    selfUseElectricCharge?: number;//自用电费
}

