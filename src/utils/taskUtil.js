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
    },
    convertTaskTypeStyle(tasktype){
        let color = "rgba(255, 64, 129, 1)";

        if(tasktype == 1){
            color = "rgba(3, 169, 244, 1)"; 
        }
        if(tasktype == 2){
            color ="#424242"; 
        }
        let tagstyle = {
            'color':color,
            'border-color':color,
          };
          return tagstyle;
    }
}
