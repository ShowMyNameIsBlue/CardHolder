const Router = require("koa-router");
const router = new Router();
const Shop = require("../service/shop");
const { required } = require("../utils");

router.post("/create", async (ctx) => {
  required({ body: ["name", "area", "type", "desc", "userId", "path"] }, ctx);
  const { name, area, type, desc, userId, path } = ctx.request.body;
  const result = await Shop.create({ name, area, type, desc, userId, path });
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

router.get("/list", async (ctx) => {
  const result = await Shop.getShoplist();
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
router.get("/search", async (ctx) => {
  required({ query: ["key"] }, ctx);
  const { key } = ctx.query;
  const result = await Shop.shopSearch({ key });
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
  const skip = parseInt(ctx.query.skip, 10) || 0;
  const limit = parseInt(ctx.query.limit, 10) || 10;
  const shopId = ctx.params.id;
  required({ query: ["type"] }, ctx);
  const type = parseInt(ctx.query.type);
  const result = await Shop.getShop({ shopId, type, limit, skip });
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

router.get("/detail/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "shopId is required");
  const shopId = ctx.params.id;
  const result = await Shop.getShopDetail({ shopId });
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
