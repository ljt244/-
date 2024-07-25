import request from '../utils/request'
export const getHomeData = () => {
    // 获取首页数据
    return request.get('/page/detail', 
    {
        params:{
            pageId:0
        }
    })
}
export const getData = () => {
    // 获取首页数据
    return request.get('http://localhost:8080/phpmyadmin/index.php')
}