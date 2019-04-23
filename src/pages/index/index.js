import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtIcon } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('loginStore')
@observer
export default class Login extends Component {

	config = {
		navigationBarTitleText: '校园顺手帮'
	}

	componentWillMount() { }

	componentDidMount() {

	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	handleChange(value, event) {
		const { loginStore } = this.props;
		loginStore.formValue[event.currentTarget.id] = value;
		return value
	}

	onSubmit(event) {
		const { loginStore } = this.props;
		loginStore.login(loginStore.formValue);
	}

	render() {
		const { loginStore, loginStore: { formValue } } = this.props;
		const { userName, password } = formValue;
		return (
			<View className='container'>
				<AtForm
					onSubmit={this.onSubmit.bind(this)}
				>
					<View className='at-row'>
						<View className='at-col at-col-10 at-col__offset-1'>
							<AtInput
								className='inputText'
								title='学号'
								name='userName'
								type='text'
								placeholder='请输入学号'
								value={userName}
								onChange={this.handleChange.bind(this)}
							/>
						</View>
					</View>
					<View className='at-row' style={{marginTop:'20px'}}>
						<View className='at-col at-col-10 at-col__offset-1'>
							<AtInput
								className='inputText'
								title="密码"
								name='password'
								type='password'
								placeholder='请输入密码'
								value={password}
								onChange={this.handleChange.bind(this)}
							/>
						</View>
					</View>
					<AtButton type='primary' formType='submit' className="loginBtn">登录</AtButton>
				</AtForm>
			</View>
		)
	}
}
