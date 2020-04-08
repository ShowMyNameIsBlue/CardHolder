const Router = require("koa-router");

const { sessionAuth, customerAuth } = require("../auth");

const user = require("./user");
const customer = require("./customer");

const router = new Router({
  prefix: "/api/v0",
});

router.use("/user", user.routes(), user.allowedMethods());
router.use(
  "/customer",
  sessionAuth,
  customerAuth,
  customer.routes(),
  customer.allowedMethods()
);

module.exports = router;
