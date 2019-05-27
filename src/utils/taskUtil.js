export default {
	convertTaskStatus(taskStatus){
        if(taskStatus == 0){
            return "未被抢单";
        }
        if(taskStatus == 1){
            return "进行中";
        }
        if(taskStatus == 2){
            return "已完成";
        }
        if(taskStatus == 3){
            return "已过时";
        }
        if(taskStatus == 4){
            return "废弃 ";
        }
    },
    convertTaskType(tasktype){
        if(tasktype == 0){
            return "跑腿";
        }
        if(tasktype == 1){
            return "求助";
        }
        if(tasktype == 2){
            return "资源";
        }
    }
}
