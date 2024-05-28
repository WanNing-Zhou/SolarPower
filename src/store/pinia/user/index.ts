import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {}
    },
})

// export useUserStore;
