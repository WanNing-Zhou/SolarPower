import { createStore } from 'vuex'

const store = createStore({
    state()
    {
        return{
            invertParam : []//重新计算的参数
        }
    },
    mutations : {
        setInvertParam(state:any,invertParam:any)
        {
            state.invertParam = invertParam
        }
    }
})


export default store