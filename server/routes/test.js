const Router = require("koa-router");
const router = new Router();

router.get("/", async ctx => {
  ctx.body = {
    data: {
      msg: "hello world"
    }
  };
});

module.exports = router;
