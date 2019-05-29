import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import { AtToast } from "taro-ui"
import Api from '../utils/api'

const loginStore = observable({
    formValue: {
        userName: '李四',
        password: '123',
    }
})


loginStore.login = function (params = {}) {
    if (params.userName == '' || params.password == '') {
        Taro.showToast({
            title: '用户名密码不能为空',
            icon: 'none',
            duration: 1000
        })
        // Taro.redirectTo({
        //     url: '../taskDetail/index'
        // })
        return;
    }
    Api.post('login', JSON.stringify(params)).then(data => {
        if (data.status == '1') {
            Taro.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
            })
            Taro.setStorage({
                key: "user",
                data: data.id
            }).then(rst => {  //将用户信息存入缓存中
                Taro.switchTab({
                    url: '/pages/testUI/index'
                })
            })
        } else {
            Taro.showToast({
                title: '用户名密码错误',
                icon: 'none',
                duration: 1000
            })
        }
    }).catch(error => {
        Taro.showToast({
            title: error,
            icon: 'fail',
            duration: 1000
        })
    })
}

// loginStore.getUserInfo = (e) => {
// 	if(e.detail.userInfo){
//         let user = e.detail.userInfo;
//         console.log(user);
//         console.log("已授权");
//     } else {
//         console.log("用户拒绝授权！")
//     }
// }

export default loginStore