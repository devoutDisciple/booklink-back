/* jshint indent: 2 */
const Sequelize = require("sequelize");
module.exports = function(sequelize) {
	return sequelize.define("book_list", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		url: {
			type: Sequelize.STRING(256),
			allowNull: false
		},
		desc: {
			type: Sequelize.STRING(512),
			allowNull: false
		},
		type: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "8"
		},
		is_delete: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "0"
		}
	}, {
		tableName: "book_list",
		timestamps: false
	});
};
