/* jshint indent: 2 */
const Sequelize = require("sequelize");
module.exports = function(sequelize) {
	return sequelize.define("book_list", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		author: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		url: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		desc: {
			type: Sequelize.STRING(8000),
			allowNull: false
		},
		type: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "8"
		},
		borrow: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			defaultValue: "0"
		},
		price: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		is_delete: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			defaultValue: "0"
		}
	}, {
		tableName: "book_list",
		timestamps: false
	});
};
