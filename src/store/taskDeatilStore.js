import Taro from '@tarojs/taro'
import { observable, action } from 'mobx'
import { AtToast } from "taro-ui"
import Api from '../utils/api'

const taskDetailStore =observable({
	// formValue: {

	//     password: '',
	// }
	taskId:0,
	userid:0, 						//当前用户id
	userName: '',
	userImgSrc: '',
	executeUserName: '',
	executeUserImgSrc: '',
	taskDescription: '',          //任务描述
	taskReward: '',                //赏金
	taskPlace: '',                 //任务地点
	taskTime: '',                   //任务时间  
	userflag: '1',					//用户类型，发布者，抢单者
	taskStatus: 0,					//抢单状态（0:等待抢单 1:已抢单）
	money: 0
})


taskDetailStore.getUserInfo = function (params = {}) {
	Taro.getUserInfo({
		success: res => {
			this.userInfo = res.userInfo
		}
	})
}
taskDetailStore.getTask = function (params = {}) {
	taskDetailStore.taskId = params.id;
	Api.post('g/getTask', JSON.stringify(params)).then(data => {
		this.taskDescription = data.contentPublic;
		this.taskReward = data.money;
		this.taskPlace = data.address;
		this.taskTime = data.deadline;
		this.taskStatus = data.taskStatus;
		this.userName = data.userName
		this.userImgSrc = data.userImgSrc
		this.executeUserName = data.executeUserName
		this.executeUserImgSrc = data.executeUserImgSrc
		this.money = data.money
		Taro.getStorage({
			key: 'user',
			success(res) {
				taskDetailStore.userid = res.data;
			},
		})
	})
}

taskDetailStore.doTask = () => {
	Taro.showModal({
		content: '抢了就要对人家负责(｡•ˇ‸ˇ•｡)',
		success(res) {
			if (res.confirm) {
				console.log("当前userid为：" + taskDetailStore.userid);
				console.log("当前taskid为：" + taskDetailStore.taskId);
				let params = { id: taskDetailStore.taskId,'executeUserid': taskDetailStore.userid};
				console.log("抢单params",params);
				Api.post('g/doTask', JSON.stringify(params)).then(data => {
					if (data.api_status == '1') {
						taskDetailStore.getTask({id:taskDetailStore.taskId});
						Api.get('push');
					} else {
						Taro.showToast({
							title: '抢单失败',
							icon: 'none',
							duration: 1000
						})
					}
				}).catch(error => {
					Taro.showToast({
						title: error,
						icon: 'none',
						duration: 1000
					})
				})
			} else if (res.cancel) {
			}
		}
	})

}
taskDetailStore.getOpenId = () => {
	Taro.login({
		success: function (res) {    //请求自己后台获取用户openid
			Taro.request({
				url: 'https://30paotui.com/user/wechat',
				data: {
					appid: 'wxc2eec0462d6f7fb7',
					secret: '151b802c4b5057b3da823d09b2e4d557',
					code: res.code
				},
				success: function (response) {
					var openid = response.data.openid;
					console.log('请求获取openid:' + openid);
					Taro.setStorageSync('openid', openid);
				}
			})
		}
	})
}

export default taskDetailStore