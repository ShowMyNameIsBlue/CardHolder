const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Card = require("../service/card");

router.post("/create", async (ctx) => {
  required({ body: ["userId", "cardInfo"] }, ctx);
  const { userId, cardInfo } = ctx.request.body;
  const result = await Card.create({ userId, cardInfo });
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
  const userId = ctx.params.id;
  const result = await Card.getCardInfo({ userId });
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

router.put("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "userId is required");
  const { shopId, couponId, cardInfo } = ctx.request.body;
  const userId = ctx.params.id;
  const result = await Card.modCardInfo({
    userId,
    detail: cardInfo,
    shopId,
    couponId,
  });
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
