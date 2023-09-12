import { createStore } from 'vuex'

const store = createStore({
    state()
    {
        return{
            invertParam : [],//重新计算的被调整系数的数组参数
            total:0,//分页总数据
            //重新计算所需要的属性
            //流程大致为：在InverterDataTable中监听flag的变化，然后根据当前页数和页面大小调用后端接口，拿到更改后的数据
            flag:false,//作为重新计算被点击的标志--true/false为被点击
        }
    },
    mutations : {
        //设置被调整系数的数组
        setInvertParam(state:any,invertParam:any)
        {
            state.invertParam = invertParam
        },
        //设置分页总数据
        setTotal(state:any,total:number)
        {
            state.total = total
        },
        //设置重新计算被点击的属性
        setFlag(state:any,flag:boolean)
        {
            state.flag = flag
        }
    }
})


export default store