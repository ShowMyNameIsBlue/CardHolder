const Router = require("koa-router");

const { sessionAuth } = require("../auth");

const test = require("./test");

const router = new Router({
  prefix: "/api/v0"
});

router.use("/", test.routes(), test.allowedMethods());

module.exports = router;
