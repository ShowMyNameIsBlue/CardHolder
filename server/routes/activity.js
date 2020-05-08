const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Activity = require("../service/activity");
const { ownerAuth } = require("../auth");

router.post("/create", ownerAuth, async (ctx) => {
  required({ body: ["name", "couponId", "shopId", "start", "end"] }, ctx);
  const { name, couponId, shopId, start, end, desc = null } = ctx.request.body;
  const result = await Activity.create({
    name,
    couponId,
    shopId,
    start,
    end,
    desc,
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

router.put("/:id", ownerAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "Id is required");
  const activityId = ctx.params.id;
  const detail = ctx.request.body;
  const result = await Activity.modActivity({ activityId, detail });
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

router.delete("/:id", ownerAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "activityId is required");
  const activityId = ctx.params.id;
  const result = await Activity.delActivity({ activityId });
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
router.get("/actImage", async (ctx) => {
  const activityId = ctx.query.id;
  const result = await Activity.getActImage(activityId);
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

router.get("/count/:id", async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "shopId is required");
  const shopId = ctx.params.id;
  const result = await Activity.getCount({ shopId });
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
  if (!ctx.params.id) ctx.throw(400, "Id is required");
  required({ query: ["type"] }, ctx);
  const { id } = ctx.params;
  const { type } = ctx.query;
  const result = await Activity.getActivity({ id, type });
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
