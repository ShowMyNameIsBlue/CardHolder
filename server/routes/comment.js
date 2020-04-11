const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Comment = require("../service/comment");

router.post("/create", async (ctx) => {
  required({ body: ["shopId", "commentInfo"] }, ctx);
  const { shopId, commentInfo } = ctx.request.body;
  const result = await Comment.create({ shopId, commentInfo });
  if (result.success) {
    const { data, code } = result;
    ctx.body = { data, code };
  } else {
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
    ctx.throw(result.code, result.msg);
  }
});

router.get("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "userId is required");
  const shopId = ctx.params.id;
  const result = await Comment.getComment({ shopId });
  if (result.success) {
    const { data, code } = result;
    ctx.body = { data, code };
  } else {
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
    ctx.throw(result.code, result.msg);
  }
});

module.exports = router;
