import { observable } from 'mobx'
import Api from '../utils/api'

const homeStore = observable({
   tasklist: [],
   pageNum : 1
})

/**
 * 获取推荐列表
 */
homeStore.getRecommendList = function(params){
   if(params){
      this.pageNum = 1;
      this.tasklist =[];
   }
   let newParams = {"pageNum":this.pageNum,"pageSize":10,"taskpattern":0}
   Api.post("g/recommendTask",JSON.stringify(newParams)).then(data =>{
      data.list.map((item,index)=>{
         this.tasklist.push(item);
      })
      console.log("tasklist",JSON.stringify(this.tasklist) );
      this.pageNum = data.currentPage+1;
   })
}


/**
 * 获取任务列表
 */
homeStore.getTasksBytype = function(params){
   let newParams = {"pageNum":this.pageNum,"pageSize":10,"tasktype":params}
   Api.post("g/tasksByType",JSON.stringify(newParams)).then(data =>{
      data.list.map((item,index)=>{
         this.tasklist.push(item);
      })
      console.log("tasklist",JSON.stringify(this.tasklist) );
      this.pageNum = data.currentPage+1;
   })
}

homeStore.clsData = function(){
   this.tasklist = [];
   this.pageNum = 1;
}

export default homeStore