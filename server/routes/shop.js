const Router = require("koa-router");
const router = new Router();
const Shop = require("../service/shop");
const { required } = require("../utils");

router.post("/create", async (ctx) => {
  required({ body: ["name", "area", "type", "desc", "userId"] }, ctx);
  const { name, area, type, desc, userId } = ctx.request.body;
  const result = await Shop.create({ name, area, type, desc, userId });
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
  if (!ctx.params.id) ctx.throw(400, "shopId is required");
  const skip = parseInt(ctx.params.skip, 10) || 0;
  const limit = parseInt(ctx.params.limit, 10) || 10;
  const shopId = ctx.params.id;
  const result = await Shop.getShop({ shopId, limit, skip });
  if (result.success) {
    const { total, data, skip, limit, code } = result;
    ctx.body = { total, data, skip, limit, code };
  } else {
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
    ctx.throw(result.code, result.msg);
  }
});

router.put("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "shopId is required");
  const detail = ctx.request.body;
  const shopId = ctx.params.id;
  const result = await Shop.modshop({ shopId, detail });
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

router.delete("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "shopId is required");
  const shopId = ctx.params.id;
  const result = await Shop.delShop({ shopId });
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
