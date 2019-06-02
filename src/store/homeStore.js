import { observable } from 'mobx'
import Api from '../utils/api'
import Taro from '@tarojs/taro'
import {getUniqueArray} from '../utils/common'

const homeStore = observable({
   tasklist: [],
   pageNum: 1,
   isLastPage: false
})

/**
 * 获取推荐列表
 */
homeStore.getRecommendList = function (params) {
   if (params) {
      this.pageNum = 1;
      this.tasklist = [];
      this.isLastPage = false;
   }
   let newParams = { "pageNum": this.pageNum, "pageSize": 4, "taskpattern": 0 }

   Taro.showLoading({ title: '加载中' })
   Api.post("g/recommendTask", JSON.stringify(newParams)).then(data => {
      Taro.hideLoading()
      this.isLastPage = data.isLastPage && this.tasklist.length >= data.total;//是最后一页并且已经放进去了
      if (!this.isLastPage) {
         data.list.map((item, index) => {
            this.tasklist.push(item);
         })
         this.tasklist = getUniqueArray(this.tasklist,"id");//去重
         this.pageNum = data.currentPage + 1;
      }
   })
}


/**
 * 获取任务列表
 */
homeStore.getTasksBytype = function (params) {
   if (params.flag) {
      this.pageNum = 1;
      this.tasklist = [];
      this.isLastPage = false;
   }
   Taro.showLoading({ title: '加载中' })
   let newParams = { "pageNum": this.pageNum, "pageSize": 10, "tasktype": params.tasktype }
   Api.post("g/tasksByType", JSON.stringify(newParams)).then(data => {
      Taro.hideLoading()
      this.isLastPage = data.isLastPage && this.tasklist.length >= data.total;//是最后一页并且已经放进去了
      if (!this.isLastPage) {
         data.list.map((item, index) => {
               this.tasklist.push(item);
         })
         this.tasklist = getUniqueArray(this.tasklist,"id");//去重
         this.pageNum = data.currentPage + 1;
      }
   })
}

homeStore.clsData = function () {
   this.tasklist = [];
   this.pageNum = 1;
   this.isLastPage = false;
}

export default homeStore