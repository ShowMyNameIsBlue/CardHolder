const auth = async (ctx, next) => {
  const { user } = ctx.session;
  if (!user || user.role != 0) ctx.throw(403, "customer invalid");
  await next();
};

module.exports = auth;
