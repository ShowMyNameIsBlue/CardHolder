const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const User = require("../service/user");
/**
 * 注册用户
 */
router.post("/siginup", async (ctx) => {
  required(
    {
      body: ["username", "password", "role", "code"],
    },
    ctx
  );
  const { username, password, role, code } = ctx.request.body;
  const result = await User.create({ username, password, role, code });
  if (result.success) {
    const { data, code } = result;
    ctx.body = {
      data,
      code,
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
    ctx.throw(500, result.msg);
  }
});

router.post("/sigin", async (ctx) => {
  if (ctx.session.user) {
    ctx.body = { code: 0, data: ctx.session.user };
    return;
  }
  required(
    {
      body: ["username", "password"],
    },
    ctx
  );
  const { username, password } = ctx.request.body;
  const result = await User.login({ username, password });
  if (result.match) {
    const { user } = result;
    delete user.password;
    ctx.session.user = user;
    ctx.body = { code: 0, data: user };
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      msg: "账号或密码不正确",
    };
  }
});
module.exports = router;
