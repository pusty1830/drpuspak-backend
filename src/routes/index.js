const router = require("express").Router();

router.use("/:tableName", require("./query.route"));
router.use("/auth", require("./auth.route"));
router.use("/pay", require("./razorpay.route"));
router.use("/ask", require("./transcriptionRoutes"));

module.exports = router;
