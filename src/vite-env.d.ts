/// <reference types="vite/client" />
declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
}
// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV:string;//定义提示信息 数据是只读的无法被修改
    //多个变量定义多个...
}
