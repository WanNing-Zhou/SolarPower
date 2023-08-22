export interface SalaryPortData {
    dailyOperationStatus?: string | null //当天运行情况
    dailyPowerGeneration?: string | number | null // 日发电量
    usageTime?: string | number | null // 使用时间
}

export interface DailyReportPhotovoltaicPowerPlantA {
    date?: Date | string //日期
    jingdong?: SalaryPortData | null
    zhongtie?: SalaryPortData | null
    fuyou?: SalaryPortData | null
    feierte?: SalaryPortData | null
    edit?: boolean | null
}


export interface DailyReportPhotovoltaicPowerPlantB {
    date?: Date | string | number | null //日期
    baozhuang?: SalaryPortData | null
    keji?: SalaryPortData | null
    yichang?: SalaryPortData | null
    erchang?: SalaryPortData | null
    sanmajia?: SalaryPortData
    edit?: boolean | null
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
    name?: string // 电站名称
    index?: number //序号
    capacity?: number //容量
    usageDuration?: number[] // 使用时长
    powerGeneration?: number[] //发电量
    unit? : string  // 单位
}


// 电站损失电量统计
export interface StatisticsElectricityLoss {
    portName?: string // 电站名称
    date?: Date | string | number // 停电时间
    powerOutageDuration?: string | number // 停电时长
    lessPowerGeneration?: number // 少发电量
    numberViolations?: number | string // 违章次数
    responseTime?: string | number  //响应时间
    loss?: number | string  // 次生灾害损失
    edit?: boolean // 编辑状态
}
