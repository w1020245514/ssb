import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtSwipeAction, AtList, AtToast } from 'taro-ui'
export default class LoadMorePage extends Taro.Component {
    componentDidMount() {
        
    }
    componentDidShow() { 
// Taro.getStorage("user").then(rst => {  //将用户信息存入缓存中
        //     // Taro.navigateBack()
        //     Taro.switchTab({
        //         url: '/pages/home/index'
        //     })
        // })
        let _Taro = Taro;
        Taro.getStorage({
            key: 'user',
            success(res) {
            },
            fail(res) {
                console.log("还未登录。。。")
                _Taro.navigateTo({
                    url: '/pages/index/index'
                })
            }
        })
    }

    lgout = () => {
        console.log("清楚本地缓存");
        Taro.clearStorage();
    }
    render() {
        return (
            <View>
                个人信息界面
                <AtButton className="task_button" type='secondary' size="small" circle={true} onClick={this.lgout}>退出登录</AtButton>
            </View>
        )
    }
}