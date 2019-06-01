import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import bg from '../../asset/img/yun2.jpg'
import './index.scss'


export default class Login2 extends Component {
  navigateTo(url) {
    Taro.navigateTo({ url: url })
  }
  render() {
    return (
      <View className="index">
        <Image src={bg} mode="aspectFill" />
        <View className="btn_container">
          <View className="btn_warper" hoverClass="btn_warper_hover">
            <Button className="btn" openType="getUserInfo" onGetUserInfo={this.tobegin}>
              开启精彩
          </Button>
          </View>
        </View>
      </View>
    )
  }

  tobegin = (userInfo) => {
    console.log('userinfo', userInfo)
    if (userInfo.detail.userInfo) {   //同意
      Taro.setStorage({ key: 'userInfo', data: userInfo.detail.userInfo }).then(rst => {  //将用户信息存入缓存中
        // Taro.navigateBack()
        Taro.switchTab({
          url: '/pages/home/index'
        })
      })
    } else { //拒绝,保持当前页面，直到同意 
    }
  }

}
