import Taro from '@tarojs/taro'
import { base } from '../const/config'
const token = ''

export default {
	baseOptions(params, method = 'GET') {
		let { url, data } = params
		// let token = getApp().globalData.token
		// if (!token) login()
		let contentType = 'application/json'
		contentType = params.contentType || contentType
		return new Promise((resolve, reject) => {
			Taro.request({
				isShowLoading: false,
				loadingText: '正在加载',
				url: base + url,
				data: data,
				method: method,
				header: { 'content-type': contentType, 'token': token },
				success(res) {
					if (res.statusCode === 200) {
						resolve(res.data)
					} else {
						reject(res)
					}
				},
				fail(res) {
					reject(res);
				}
			})
		})
	},
	get(url, data = '') {
		let option = { url, data }
		return this.baseOptions(option)
	},
	post: function (url, data, contentType) {
		let params = { url, data, contentType }
		return this.baseOptions(params, 'POST')
	}
}
