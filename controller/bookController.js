const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");
const multer  = require("multer");
let filename = "";
const util = require("../util/util");
const config = require("../config/config");
// prod
// let filepath = config.filepath;
// dev
let filepath = config.filepath;

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// 接收到文件后输出的保存路径（若不存在则需要创建）
		cb(null, filepath);
	},
	filename: function (req, file, cb) {
		console.log(file.originalname, "originname");
		filename = util.getNonceStr() + ".jpg";
		// 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
		cb(null, filename);
	}
});
const upload = multer({ dest: filepath, storage: storage });

router.get("/type/list", (req, res) => {
	bookService.getType(req, res);
});

router.get("/list/all", (req, res) => {
	bookService.getList(req, res);
});

router.post("/list/create", upload.single("file"), (req, res) => {
	bookService.createBook(req, res, filename);
});

router.get("/list/delete", (req, res) => {
	bookService.deleteBook(req, res);
});

router.post("/list/edit", upload.single("file"), (req, res) => {
	bookService.editBook(req, res, filename);
});

router.get("/", (req, res) => {
	res.sendfile("/root/node/public/index.html");
});

module.exports = router;
