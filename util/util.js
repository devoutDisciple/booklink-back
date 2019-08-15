module.exports = {
	// 生成随机字符串
	getNonceStr: function(num) {
		num ? null : num = 32;
		let str = "";
		let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		for(let i = 1; i <= num; i++){
			let random = Math.floor(Math.random()*arr.length);
			str += arr[random];
		}
		return str;
	},
};
