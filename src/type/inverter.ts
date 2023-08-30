export interface Inverter{
    // 电站名称
    powerStationName:string,
    // 逆变器名称
    inverterName: string,
    // 组串容量
    inverterTotalCapacity: number,
    // 实际发电量
    powerGeneration:number,
    // 计算发电量
    computedPowerGeneration: number,
    // 发电量偏差
    powerGenerationDeviation:number,
    // 发电量偏差百分比
    powerGenerationDeviationRatio: string,
    // 标准容量发电量:
    standPowerGeneration: number;
    // 调整系数
    factors: number;
    // 预留字段
    analysisComment: string,
}






