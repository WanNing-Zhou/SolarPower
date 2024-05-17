/**
 * 
 *工作单管理的请求参数类型
 * 
 * 
 */

 //工作单查询参数的类型
 export interface workSheetCondition{
    companyNumber:string;//公司编号
    stationNumber:string;//电站编号
    startDate:string;//起始时间
    endDate:string;//结束时间
    page:number;//当前页面
    pageSize:number;//页面大小
    type?:string;//工作类型（选填）
    workman?:string;//工作人（选填）
    filterTime?:string[];//过滤时间
    total?:number;//分页总数

 }

 //工作单删除参数的类型
 export interface deleteWorkSheetCondition{
   companyNumber:string;//公司编号
   stationNumber:string;//电站编号
   id:string;//工作单编号
 }

 //工作单添加参数的类型
 export interface addConditions {
  companyNumber?:string;//公司编号
  stationNumber?:string;//电站编号
  id?:string;//工作单编号
  type?: string; // 工作类型
  date?: string; //发生时间
  man?: string; // man
  description?: string; //内容描述
  sceneSituation?: string; //现场情况
  comment?: string; // 备注
  edit?: boolean; //编辑编辑状态
  photoAndVideo?:string;//图片和视频
}

export interface fileParams{
  file?:any;//文件
  type?:string;//类型
}
// export interface deleteFileParams{
//   type:string;//文件上传的路径
//   id:string;//文件名称
// }

 //工作单编辑参数的类型
 export interface editConditions {
  companyNumber?:string;//公司编号
  stationNumber?:string;//电站编号
  id?:string;//工作单编号
  type?:string // 工作单名称
  typeCode?: string; // 工作类型代码
  date?: string; //发生时间
  workMan?: string; // 工作人
  description?: string; //内容描述
  sceneSituation?: string; //现场情况
  comment?: string; // 备注
  edit?: boolean; //编辑编辑状态
  photoAndVideo?:string;//图片和视频
}