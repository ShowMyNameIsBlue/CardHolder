const Router = require("koa-router");

const { sessionAuth } = require("../auth");

const user = require("./user");

const router = new Router({
  prefix: "/api/v0"
});

router.use("/user", user.routes(), user.allowedMethods());

module.exports = router;
