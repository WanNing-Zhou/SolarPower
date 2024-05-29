import request from "@/utils/request.ts";

/**
 * 管理员用户接口
 */

// 获取用户列表
export function getUserList () {
  return request.get( '/api/user/list')
}

// 删除用户
export function deleteUser (id: string) {
    return request.post('/api/user/delete', {
        id,
    })
}

// 添加用户
export function addUser (param: any){
    return request.post('/api/user/add',param)
}

// 编辑用户
export function updateUser(param: any){
    return request.post('/api/user/update', param)
}

// 用户授权
export function authToUser(param: any) {
    return request.post('/api/user/grantStationPermission', param)
}


// 添加公司
export function addCompany (param: any) {
    return request.post('/api/company/add', param)
}

// 删除公司
export function deleteCompany(id: string){
    return request.post('/api/company/delete',{id})
}

// 更新公司信息
export function updateCompany(param: any){
    return request.post('/api/company/update', param)
}


// 获取公司列表
  export function getCompanyList(param: {
    name: string,
    page: number
    pageSize: number
}){
    return request('/api/company/list',{
        method:'get',
        params: param
    })
}

// 获取公司及电站接口
export function getCompanySearch(){
    return request('/api/company/search')
}
// 获取公司
export function getCompanies() {
    return request('/api/company/companies')
}

// 添加电站
export function addStation(param: any) {
    return request.post('/api/station/add', param)
}

// 删除电站
export function deleteStation(id: string){
    return request.post('/api/station/delete', {id})
}

// 编辑电站信息
export function updateStation(param: any){
    return request.post('/api/station/update', param)
}

// 查询电站列表

export function getStationList(param: any){
    return request('/api/station/search', {
        method: 'get',
        params: param
    })
}
