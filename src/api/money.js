import requesrMock from '@/utils/requestmock'

export const getmoney = () => {
    return requesrMock.get('/money')
}