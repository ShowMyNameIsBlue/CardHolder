const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Coupon = require("../service/coupon");

router.post("/create", async (ctx) => {
  required({ body: ["name", "start", "end", "count", "type", "shopId"] }, ctx);
  const { name, number, start, end, count, type, shopId } = ctx.request.body;
  const { path } = ctx.request.files[""];
  const result = await Coupon.create({
    name,
    number,
    start,
    end,
    count,
    type,
    shopId,
    imgPath: path,
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

router.put("/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "couponId is required");
  const detail = ctx.request.body;
  const couponId = ctx.params.id;
  const result = await Coupon.modCoupon({ couponId, detail });
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
  if (!ctx.params.id) ctx.throw(400, "couponId is required");
  const couponId = ctx.params.id;
  const result = await Coupon.delCoupon({ couponId });
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
