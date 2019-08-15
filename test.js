const fs = require("fs");
const images = require("images");

fs.readdir("/Users/zhangzhen/program/booklink/booklink-back/public", (err, data) => {
	if(err) console.log(err);
	console.log(data);
	data.map(item => {
		if(item.includes(".jpg")) {
			images(`/Users/zhangzhen/program/booklink/booklink-back/public/${item}`).save(`/Users/zhangzhen/program/booklink/booklink-back/public//${item}`, {
				quality : 20
			});
		}

	});
});
