export interface SalaryPortData {
    dailyOperationStatus: string | null //当天运行情况
    dailyPowerGeneration:  number | null // 日发电量
    usageTime:  number | null // 使用时间
    id?:number//报表id
}

export interface DailyReportPhotovoltaicPowerPlantA {
    date: Date | string //日期
    jingdong: SalaryPortData 
    zhongtie: SalaryPortData 
    fuyou: SalaryPortData 
    feierte:SalaryPortData
    edit?: boolean | null
    addedit?:boolean | null
}


export interface DailyReportPhotovoltaicPowerPlantB {
    date?: Date | string  //日期
    pinbai: SalaryPortData
    hewang: SalaryPortData 
    yichang: SalaryPortData 
    erchang: SalaryPortData 
    sanmajia: SalaryPortData
    edit?: boolean | null
    addedit?:boolean | null
}

export interface SalaryPortYearData {
    capacity?: string | number | null //容量
    powerGeneration?: string | number | null //发电量
}

export interface AnnualSummaryPhotovoltaicPowerStations {
    date?: Date | string | number | null //日期
    jingdong?: SalaryPortYearData | null
    zhongtie?: SalaryPortYearData | null
    fuyou?: SalaryPortYearData | null
    feierte?: SalaryPortYearData | null
    baozhuang?: SalaryPortYearData | null
    keji?: SalaryPortYearData | null
    yichang?: SalaryPortYearData | null
    erchang?: SalaryPortData | null
    edit?: boolean | null
}

// 总表的站点数据
export interface PortData {
    name: string // 电站名称
    index: number //序号
    capacity: number //容量
    usageDuration: number[] // 使用时长
    powerGeneration: number[] //发电量
    unit? : string  // 单位
    generationTotal:number;//总容量
    useHoursTotal:number;//总发电量
}


// 电站损失电量统计
export interface StatisticsElectricityLoss {
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
