import router from "@/router";
import {ElMessage} from "element-plus";
import {userLogout} from "@/api/user.ts";
import {clearToken} from "@/utils/tokenTool.ts";

export async function  logout() {
    // window.location.href = '/lhogin'

    const res:any = await userLogout()
    if(res.code == 200){
        // 跳转到login页面
        router.push('/login')
        //清除token
        clearToken()
        ElMessage.success('登出成功')
    }

}
