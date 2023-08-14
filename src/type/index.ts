
export interface SalaryPortData {
    dailyOperationStatus ?: string | null //当天运行情况
    dailyPowerGeneration ?: string|number | null // 日发电量
    usageTime ?: string | number | null // 使用时间
}

export interface DailyReportPhotovoltaicPowerPlantA{
    date ?:Date | null //日期
    jingdong ?: SalaryPortData | null
    zhongtie ?: SalaryPortData | null
    fuyou ?: SalaryPortData | null
    feierte ?: SalaryPortData | null
    edit ?: boolean | null
}
