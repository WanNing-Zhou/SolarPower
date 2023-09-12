/**
  * @FileNAme src\type\request\requestType.ts
  * @author 周万宁
  * @create 2023/8/27-16:04
  * @version
  * @description 这里用来存放请求的数据类型
  */


export interface User {
    age: number,
    name: string,
}
//返回数据类型
export interface Res{
  code:number,
  data?:string,
  message?:string

}
