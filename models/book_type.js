/* jshint indent: 2 */
const Sequelize = require("sequelize");
module.exports = function(sequelize	) {
	return sequelize.define("book_type", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		type: {
			type: Sequelize.INTEGER(11),
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		is_delete: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: "0"
		}
	}, {
		tableName: "book_type",
		timestamps: false
	});
};
