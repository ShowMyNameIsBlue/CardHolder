const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const Customer = require("../service/customer");

router.post("/create", async (ctx) => {
  required({ body: ["name", "gender", "birthday", "area", "userId"] }, ctx);
  const { name, gender, birthday, area, userId } = ctx.request.body;
  const result = await Customer.create({
    name,
    gender,
    birthday,
    area,
    userId,
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
  if (!ctx.params.id) ctx.throw(400, "customerId is required");
  const detail = ctx.request.body;
  const { id } = ctx.params;
  const result = await Customer.ModCustomer({ customerId: id, detail });
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
