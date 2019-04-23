import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import { AtToast } from "taro-ui"
import Api from '../utils/api'

const loginStore = observable({
    formValue: {
        userName: '',
        password: '',
    }
})


loginStore.login = function (params = {}) {
    if (params.userName == '' || params.password == '') {
        Taro.showToast({
            title: '用户名密码不能为空',
            icon: 'none',
            duration: 1000
        })
        return;
    }
    Api.post('login', JSON.stringify(params)).then(data => {
        if (data.status == '1') {
            Taro.navigateTo({
                url: '../testUI/index'
            })
        } else {
            Taro.showToast({
                title: '用户名密码错误',
                icon: 'none',
                duration: 1000
            })
        }
    })
}

export default loginStore