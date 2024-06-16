import { defineStore } from 'pinia'

type StationState = {
    stationId?: string,
    companyId?: string,
    stationName?: string,
    compName?: string
}

export const useStationStore = defineStore('station', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 电站id
            stationId: '',
            // 公司id
            companyId: '',
            // 电站名称
            stationName: '',
            // 公司名称
            companyName: '',
        }
    },
    actions: {
        setStatus(val: StationState) {
            this.$patch(val)
        }
    }
})
