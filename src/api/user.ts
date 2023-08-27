import request from "@/utils/request.ts";
import {User} from "@/type/request/requestType.ts";

/**
 * @MethodName requestUser
 * @Author 周万宁
 * @Description request请求示例
 * @Date 18:16 2023/8/27
 **/
export async function getUser(params:any){
    return request<User>('这里是请求地址',{
        method:'get',
        params: params
    })
}


const usr = await getUser({offset:1,size: 10})

console.log(usr.data.name)

