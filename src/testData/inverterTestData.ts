interface InverterData {
    designName?: string//设备名称
    dedignId?: string//设备ID
    totalStringCapacity?: number //组串总容量
    powerGeneration?: number //发电量
    accumulatedPowerGeneration?: number,//累计发电量
    equivalentPowerGenerationTime?: number//等价发电时
    peakACPower?: number//峰值交流功率
    gridConnectionDuration?: number// 并网时长
    powerRationingLoss?: number// 限电损失量
    averageAbsoluteDeviation?: number|string//平均发电误差
    averageGenPower?: number//平均发电量
    singleGenPower?: number//标转单板日电量
    measurementPointName ?: string //计量点名称
    portName?: string //电站名称
}

export const inverterTestData:Array<InverterData> = [
    {
        designName: 'Z-1',
        dedignId: 'Z-1',
        totalStringCapacity: 31.2,
        powerGeneration: 33,
        accumulatedPowerGeneration: 1024,
        equivalentPowerGenerationTime: 55,
        peakACPower: 21,
        gridConnectionDuration: 523,
        powerRationingLoss: 33,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-2',
        dedignId: 'Z-2',
        totalStringCapacity: 42.7,
        powerGeneration: 38,
        accumulatedPowerGeneration: 1500,
        equivalentPowerGenerationTime: 60,
        peakACPower: 23,
        gridConnectionDuration: 612,
        powerRationingLoss: 42,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-3',
        dedignId: 'Z-3',
        totalStringCapacity: 52.1,
        powerGeneration: 45,
        accumulatedPowerGeneration: 1800,
        equivalentPowerGenerationTime: 70,
        peakACPower: 27,
        gridConnectionDuration: 730,
        powerRationingLoss: 52,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-4',
        dedignId: 'Z-4',
        totalStringCapacity: 62.5,
        powerGeneration: 51,
        accumulatedPowerGeneration: 2200,
        equivalentPowerGenerationTime: 80,
        peakACPower: 31,
        gridConnectionDuration: 850,
        powerRationingLoss: 61,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-5',
        dedignId: 'Z-5',
        totalStringCapacity: 72.9,
        powerGeneration: 59,
        accumulatedPowerGeneration: 2700,
        equivalentPowerGenerationTime: 90,
        peakACPower: 35,
        gridConnectionDuration: 970,
        powerRationingLoss: 71,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-6',
        dedignId: 'Z-6',
        totalStringCapacity: 83.3,
        powerGeneration: 67,
        accumulatedPowerGeneration: 3300,
        equivalentPowerGenerationTime: 100,
        peakACPower: 39,
        gridConnectionDuration: 1090,
        powerRationingLoss: 81,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-7',
        dedignId: 'Z-7',
        totalStringCapacity: 93.7,
        powerGeneration: 75,
        accumulatedPowerGeneration: 4000,
        equivalentPowerGenerationTime: 110,
        peakACPower: 43,
        gridConnectionDuration: 1210,
        powerRationingLoss: 91,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-8',
        dedignId: 'Z-8',
        totalStringCapacity: 104.1,
        powerGeneration: 83,
        accumulatedPowerGeneration: 4800,
        equivalentPowerGenerationTime: 120,
        peakACPower: 47,
        gridConnectionDuration: 1330,
        powerRationingLoss: 101,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-9',
        dedignId: 'Z-9',
        totalStringCapacity: 114.5,
        powerGeneration: 91,
        accumulatedPowerGeneration: 5700,
        equivalentPowerGenerationTime: 130,
        peakACPower: 51,
        gridConnectionDuration: 1450,
        powerRationingLoss: 111,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-10',
        dedignId: 'Z-10',
        totalStringCapacity: 124.9,
        powerGeneration: 99,
        accumulatedPowerGeneration: 6700,
        equivalentPowerGenerationTime: 140,
        peakACPower: 55,
        gridConnectionDuration: 1570,
        powerRationingLoss: 121,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-11',
        dedignId: 'Z-11',
        totalStringCapacity: 135.3,
        powerGeneration: 107,
        accumulatedPowerGeneration: 7800,
        equivalentPowerGenerationTime: 150,
        peakACPower: 59,
        gridConnectionDuration: 1690,
        powerRationingLoss: 131,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-12',
        dedignId: 'Z-12',
        totalStringCapacity: 145.7,
        powerGeneration: 115,
        accumulatedPowerGeneration: 9000,
        equivalentPowerGenerationTime: 160,
        peakACPower: 63,
        gridConnectionDuration: 1810,
        powerRationingLoss: 141,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-13',
        dedignId: 'Z-13',
        totalStringCapacity: 156.1,
        powerGeneration: 123,
        accumulatedPowerGeneration: 10300,
        equivalentPowerGenerationTime: 170,
        peakACPower: 67,
        gridConnectionDuration: 1930,
        powerRationingLoss: 151,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-14',
        dedignId: 'Z-14',
        totalStringCapacity: 166.5,
        powerGeneration: 131,
        accumulatedPowerGeneration: 11700,
        equivalentPowerGenerationTime: 180,
        peakACPower: 71,
        gridConnectionDuration: 2050,
        powerRationingLoss: 161,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-15',
        dedignId: 'Z-15',
        totalStringCapacity: 176.9,
        powerGeneration: 139,
        accumulatedPowerGeneration: 13200,
        equivalentPowerGenerationTime: 190,
        peakACPower: 75,
        gridConnectionDuration: 2170,
        powerRationingLoss: 171,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-16',
        dedignId: 'Z-16',
        totalStringCapacity: 187.3,
        powerGeneration: 147,
        accumulatedPowerGeneration: 14800,
        equivalentPowerGenerationTime: 200,
        peakACPower: 79,
        gridConnectionDuration: 2290,
        powerRationingLoss: 181,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-17',
        dedignId: 'Z-17',
        totalStringCapacity: 197.7,
        powerGeneration: 155,
        accumulatedPowerGeneration: 16500,
        equivalentPowerGenerationTime: 210,
        peakACPower: 83,
        gridConnectionDuration: 2410,
        powerRationingLoss: 191,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-18',
        dedignId: 'Z-18',
        totalStringCapacity: 208.1,
        powerGeneration: 163,
        accumulatedPowerGeneration: 18300,
        equivalentPowerGenerationTime: 220,
        peakACPower: 87,
        gridConnectionDuration: 2530,
        powerRationingLoss: 201,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-19',
        dedignId: 'Z-19',
        totalStringCapacity: 218.5,
        powerGeneration: 171,
        accumulatedPowerGeneration: 20200,
        equivalentPowerGenerationTime: 230,
        peakACPower: 91,
        gridConnectionDuration: 2650,
        powerRationingLoss: 211,
        averageAbsoluteDeviation: ''
    },
    {
        designName: 'Z-20',
        dedignId: 'Z-20',
        totalStringCapacity: 228.9,
        powerGeneration: 179,
        accumulatedPowerGeneration: 22200,
        equivalentPowerGenerationTime: 240,
        peakACPower: 95,
        gridConnectionDuration: 2770,
        powerRationingLoss: 221,
        averageAbsoluteDeviation: ''
    }
]
