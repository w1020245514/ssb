import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage, AtSwipeAction,AtList,AtToast } from 'taro-ui'
export default class LoadMorePage extends Taro.Component {
    handleClick(type) {
        Taro.atMessage({
            'message': '消息通知',
            'type': type,
        })
    }
    render() {
        return (
            <View>
                <AtToast isOpened text="13246" icon="check"></AtToast>
            </View>
        )
    }
}