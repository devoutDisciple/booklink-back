const resultMessage = require("../util/resultMessage");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = require("../dataSource/MysqlPoolClass");
const BookType = require("../models/book_type");
const BookTypeModel = BookType(sequelize);
const BookList = require("../models/book_list");
const images = require("images");
const config = require("../config/config");
// prod
// const filePath = "/root/node";
// const imgUrl = "https://www.booklink.ltd/";
// dev
const filePath = config.filepath;
const imgUrl = config.imgUrl;

const BookListModel = BookList(sequelize);
module.exports = {

	// 获取书籍种类
	getType: (req, res) => {
		try {
			BookTypeModel.findAll({
				where: {
					is_delete: {
						[Op.not]: ["1"]
					}
				}
			}).then(type => {
				let result = [];
				type.map(item => {
					result.push(item.dataValues);
				});
				res.send(resultMessage.success(result));
			});
		} catch (error) {
			return resultMessage.success([]);
		}
	},

	// 获取书籍列表
	getList: (req, res) => {
		console.log(req.query.name);
		let name = req.query.name || "";
		try {
			BookListModel.findAll( {
				where: {
					is_delete: {
						[Op.not]: ["1"]
					},
					name: {
						[Op.like]: `${name}%`
					}
				},
				order: [
					// will return `name`  DESC 降序  ASC 升序
					["id", "DESC"],
				]
			}).then(books => {
				let result = [];
				books.map((item, index) => {
					if(index > 10) return;
					result.push(item.dataValues);
				});
				res.send(resultMessage.success(result));
			});
		} catch (error) {
			return resultMessage.success([]);
		}
	},

	// 删除书籍
	deleteBook: (req, res) => {
		console.log(req.query.id);
		try {
			let id = req.query.id;
			BookListModel.destroy({
				where: {
					id: id
				}
			}).then((book) => {
				console.log(book);
				res.send(resultMessage.success([]));
			});
		} catch (error) {
			return resultMessage.error([]);
		}
	},

	// 编辑书籍
	editBook: (req, res, filename) => {
		console.log(req.body);
		console.log(filename);
		let body = req.body;
		const params = {
			name: body.name,
			author: body.author,
			desc: body.desc,
			type: body.type,
			price: body.price,
			borrow: body.borrow
		};
		// modify 1-没有传文件 2-修改文件
		body.modify == 2 ? params.url = imgUrl + filename : null;
		try {
			BookListModel.update(params, {
				where: {
					id: req.body.id
				}
			}).then(() => {
				res.send(resultMessage.success([]));
			});
			images(`${filePath}/${filename}`).save(`${filePath}/${filename}`, {
				quality : 20
			});
		} catch (error) {
			return resultMessage.error([]);
		}
	},

	// 增加书籍
	createBook: (req, res, filename) => {
		try {
			const params = {
				name: req.body.name,
				author: req.body.author,
				desc: req.body.desc,
				url: imgUrl + filename,
				type: req.body.type,
				price: req.body.price,
				borrow: req.body.borrow
			};
			BookListModel.create(params).then(books => {
				console.log(books);
				res.send(resultMessage.success([]));
				images(`${filePath}/${filename}`).save(`${filePath}/${filename}`, {
					quality : 20
				});
			});

		} catch (error) {
			return resultMessage.error([]);
		}
	},
};
