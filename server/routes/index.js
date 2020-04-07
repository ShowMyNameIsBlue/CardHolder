const Router = require("koa-router");

const { sessionAuth, customerAuth } = require("../auth");

const user = require("./user");

const router = new Router({
  prefix: "/api/v0",
});

router.use("/user", user.routes(), user.allowedMethods());

module.exports = router;
