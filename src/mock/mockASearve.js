import Mock from 'mockjs';
import money from './money.json'
import address from './address.json'
Mock.mock('/mock/money',{code:200,data:money})
Mock.mock('/mock/address',{code:200,data:address})

