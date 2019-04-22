export const logError = (name, action, info) => {
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = wx.getSystemInfoSync()
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  let time = formatTime(new Date())
  console.error(time, name, action, info, device)
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}

export const promisify = (func, ctx) => {
    // 返回一个新的function
    return function () {
      // 初始化this作用域
      var ctx = ctx || this;
      // 新方法返回的promise
      return new Promise((resolve, reject) => {
        // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
        func.call(ctx, ...arguments, function () {
          // 将回调函数中的的第一个参数error单独取出
          var args = Array.prototype.map.call(arguments, item => item);
          var err = args.shift();
          // 判断是否有error
          if (err) {
            reject(err)
          } else {
            // 没有error则将后续参数resolve出来
            args = args.length > 1 ? args : args[0];
            resolve(args);
          }
        });
      })
    };
  };

  export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }