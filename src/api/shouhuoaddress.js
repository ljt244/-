import requesrMock from '@/utils/requestmock'

export const getaddress = () => {
    return requesrMock.get('/address')
}