const router = require("express").Router();

router.use("/:tableName", require("./query.route"));
router.use("/auth", require("./auth.route"));
router.use("/pay", require("./razorpay.route"));
router.use("/reminder",require("./reminder.route"))

module.exports = router;
