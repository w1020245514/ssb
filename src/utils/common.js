export const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 对象数组去重
 * @param {待去重数组} arr 
 * @param {去重标志} uniqueFlag 
 */
export function getUniqueArray(arr, uniqueFlag) {
	console.log("getUniqueArray")
	var hash = {};
	return arr.reduce(function (item, next) {
		hash[next[uniqueFlag]] ? '' : hash[next[uniqueFlag]] = true && item.push(next);
		return item;
	}, []);
}

