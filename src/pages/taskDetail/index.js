import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDivider, AtButton, AtCountdown, AtIcon } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('taskDetailStore')
@observer
export default class TaskDeatil extends Component {

	config = {
		navigationBarTitleText: '任务详情'
	}

	componentWillMount() {
		console.log("will mount....")
		const { taskDetailStore } = this.props;
		console.log("任务id：",this.$router.params);
		taskDetailStore.getTask(this.$router.params);
	}

	componentDidMount() {
		console.log("did mount....")
	}

	componentWillUnmount() { }

	componentDidShow() {
		console.log("did show....")
	 }

	componentDidHide() { }

	render() {
		const { taskDetailStore, taskDetailStore: { userflag,taskStatus,doTask,getOpenId } } = this.props;
		return (
			<View className='container'>
				<View style={{ float: 'left' }}>
					<image class="userinfo-avatar" src={taskDetailStore.userImgSrc}></image>
				</View>
				<View style={{ float: 'left', margin: '20rpx' }}>
					<View class="userinfo-nickname"><text >{taskDetailStore.userName}</text></View>
					<View class="userinfo-nickname"><text >XX大学东路小区</text></View>
				</View>
				<View style={{ float: 'right', margin: '20rpx 50rpx' }}>
					<text class="userinfo-nickname">29:30min</text>
				</View>
				<View><AtDivider content='' height={50} /></View>

				<View className='task_info'>
					<View className='at-row at-row__justify--center' style={{ margin: '5% 0' }}>
						<View className='at-col-3 task_info_title'>任务详情：</View>
						<View className='at-col-7 at-col--wrap task_info_content'>{taskDetailStore.taskDescription}</View>
					</View>
					<View className='at-row at-row__justify--center'>
						<View className='at-col-3 task_info_title'>赏金：</View>
						<View className='at-col-7 at-col--wrap task_info_content'>￥{taskDetailStore.money}元</View>
					</View>
					<View className='at-row at-row__justify--center'>
						<View className='at-col-10 task_info_line' />
					</View>
				</View>
				<View className='task_info'>
					<View className='at-row at-row__justify--center' style={{ margin: '5% 0' }}>
						<View className='at-col-3 task_info_title'>任务地点：</View>
						<View className='at-col-7 at-col--wrap task_info_content'>{taskDetailStore.taskPlace}</View>
					</View>
					<View className='at-row at-row__justify--center'>
						<View className='at-col-3 task_info_title'>任务时间：</View>
						<View className='at-col-7 at-col--wrap task_info_content'>{taskDetailStore.taskTime}之前</View>
					</View>
					<View className='at-row at-row__justify--center'>
						<View className='at-col-10 task_info_line' />
					</View>
				</View>
				<View className="task_time">
					<AtCountdown
						isCard
						minutes={1}
						seconds={10}
					/>
				</View>
				{userflag == '1' && taskStatus == 0 && 
					<AtButton className="task_button" type='secondary' size="small" circle={true} onClick={() => doTask()}>抢单</AtButton>
				}
				{userflag == '1' && taskStatus == 1 && 
					<View className='at-row at-row__justify--center task_result'>
						<View className='at-col-3 c1'>
							<View style={{fontSize:'32rpx'}}>5:30</View>
							<View style={{fontSize:'28rpx'}}>2019/0503</View>
						</View>
						<View className='at-col-1 c2'>
							<image src={taskDetailStore.executeUserImgSrc} class="avatar"></image>
						</View>
						<View className='at-col-3 c3'>
							<View style={{paddingLeft:'5rpx'}}>{taskDetailStore.executeUserName}</View>
						</View>
						<View className='at-col-4 c3'>
							<View>正在执行中。。</View>
						</View>
					</View>
				}
				{/* <AtButton className="task_button" type='secondary' size="small" circle={true} onClick={() => getOpenId()}>获取openId</AtButton> */}
			</View>
		)
	}
}
