import { observable } from 'mobx'
import Api from '../utils/api'
import Taro from '@tarojs/taro'

const publicStore = observable({
    aa:11
})

/**
 * 发布任务
 */
publicStore.publicTask = function (params = {}) {
    let userid = '1';
    let newParams = { ...params,'userid':userid,'tasktype':'0' }
    console.log("newParams",newParams)
    Api.post("p/task", JSON.stringify(newParams)).then(data => {
        if(data.api_status=='1'){
            Taro.switchTab({
                url: '../home/index'
            })
        }
    })
}




export default publicStore