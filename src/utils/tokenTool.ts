/**
 * 设置token
 * @param token
 */
export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

/**
 * 获取token
 */
export const getToken = () => {
    return localStorage.getItem('token')
}
