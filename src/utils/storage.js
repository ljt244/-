const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'
// 获取个人信息
export const getInfo = () => {
    const defaultObj = {token:'',userid:''}
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : defaultObj
}
// 存储个人信息
export const setInfo = (obj) => {
    localStorage.setItem(INFO_KEY,JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
    localStorage.removeItem(INFO_KEY)
}
// 获取搜索历史
export const getHistoryList = () => {
    const result = localStorage.getItem(HISTORY_KEY)
    return result ? JSON.parse(result) : []
}
export const setHistoryList = (arr) => { 
   localStorage.setItem(HISTORY_KEY,JSON.stringify(arr))
}
