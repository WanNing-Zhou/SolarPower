//工作单类型
export interface InspectionChecklist {
    comment?: string;//评论
    date?: string;//发生时间
    description?: string;//描述
    id: string;//编号
    photoAndVideo?: string;//图片和视频
    sceneSituation?: string;//现场情况
    type?: string;//类型
    typeCode?: number;//类型编号
    workMan?: string;//工作人
  
  }