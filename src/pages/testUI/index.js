import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtSwipeAction, AtList, AtToast } from 'taro-ui'
export default class LoadMorePage extends Taro.Component {

    constructor() {
        super(...arguments)
        this.state = {
            flag:true
        }
    }

    componentDidMount() {
        
    }
    componentDidShow() { 
        let _this = this;
        Taro.getStorage({
            key: 'user',
            success(res) {
                _this.setState({
                    flag: true
                })
            },
            fail(res) {
                _this.setState({
                    flag: false
                })
            }
        })
    }

    login = () => {
        Taro.redirectTo({
            url: '/pages/index/index'
        })

    }

    lgout = () => {
        this.setState({
            flag: false
        })
        Taro.clearStorage();
    }
    render() {
        return (
            <View>
                {!this.state.flag && 
                    <AtButton className="task_button" type='secondary' size="small" circle={true} onClick={this.login}>登录</AtButton>
                }
                {this.state.flag && 
                    <AtButton className="task_button" type='secondary' size="small" circle={true} onClick={this.lgout}>退出登录</AtButton>
                }
                
            </View>
        )
    }
}