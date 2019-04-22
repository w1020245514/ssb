import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton,AtFab } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

@inject('counterStore')
@observer
export default class Index extends Component {

	config = {
		navigationBarTitleText: '校园顺手帮'
	}

	componentWillMount() { }

	componentDidMount() {
		
	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	render() {
		const { counterStore } = this.props
		const { counter } = counterStore
		counterStore.getareabyid();
		return (
			<View className='index'>
				<Text>Hello world!</Text>
				<AtButton type='primary'>taro UI 测试</AtButton>
				<View className='at-icon at-icon-settings'></View>
				<AtFab>
					<Text className='at-fab__icon at-icon at-icon-menu'></Text>
				</AtFab>
				<Text>{counter}</Text>
			</View>
		)
	}
}
