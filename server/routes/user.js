const Router = require("koa-router");
const router = new Router();
const { required } = require("../utils");
const User = require("../service/user");
const { sessionAuth } = require("../auth");
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
    ctx.body = {
      code: result.code,
      msg: result.msg,
    };
    ctx.throw(result.code, result.msg);
  }
});

/**
 * 登录用户
 */
router.post("/sigin", async (ctx) => {
  if (ctx.session.user) {
    ctx.body = { code: 0, data: ctx.session.user };
    return;
  }
  required(
    {
      body: ["username", "password", "role"],
    },
    ctx
  );
  const { username, password, role } = ctx.request.body;
  const result = await User.login({ username, password, role });
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

router.get("/detail/:id", sessionAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "userId is required");

  const { id } = ctx.params;
  const result = await User.get({ userId: id });
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

/**
 * 获取用户信息
 */

router.get("/:id", sessionAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "userId is required");
  required({ query: ["role"] }, ctx);
  const { id } = ctx.params;
  const { role } = ctx.query;
  const result = await User.getUser({ userId: id, role });
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

/**
 * 修改用户信息
 *
 */

router.put("/changePwd/:id", sessionAuth, async (ctx) => {
  if (!ctx.params.id) ctx.throw(400, "userId is required");
  required({ body: ["username", "oldPwd", "newPwd", "role"] }, ctx);
  const { id } = ctx.params;
  const { username, oldPwd, newPwd, role } = ctx.request.body;
  const result = await User.changePwd({
    userId: id,
    username,
    oldPwd,
    newPwd,
    role,
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

/**
 * 退出登录
 */
router.post("/exit", sessionAuth, async (ctx) => {
  if (ctx.session.user) {
    console.log("ok");
    delete ctx.session.user;
    return { data: "ok", code: 0 };
  } else {
    ctx.throw(401, "用户未登录");
  }
});
