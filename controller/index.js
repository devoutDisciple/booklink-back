const bookController = require("./bookController");
const router = (app) => {
	app.use("/book", bookController);
};
module.exports = router;
