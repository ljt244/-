import request from '../utils/request'
export const getCategoryData = () => {
    return request('/category/list')
}