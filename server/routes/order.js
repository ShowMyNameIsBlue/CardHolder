const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Order = require("../service/order");
const { customerAuth } = require("../auth");

router.post("/create", customerAuth, async (ctx) => {
  required(
    { body: ["userId", "shopId", "start", "end", "content", "username"] },
    ctx
  );
  const { userId, shopId, start, end, content, username } = ctx.request.body;
  const result = await Order.create({
    userId,
    shopId,
    start,
    end,
    content,
    username,
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

router.get("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "id is required");
  required({ query: ["type"] }, ctx);
  const { id } = ctx.params;
  const { type } = ctx.query;
  const result = await Order.getOrderInfo({ id, type });
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

router.delete("/:id", customerAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "orderId is required");
  const orderId = ctx.params.id;
  const result = await Order.delOrder({ orderId });
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

router.put("/:id", customerAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "orderId is required");
  const orderId = ctx.params.id;
  const detail = ctx.request.body;
  const result = await Order.modOrder({ orderId, detail });
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
