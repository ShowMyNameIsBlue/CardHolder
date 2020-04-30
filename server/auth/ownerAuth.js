const auth = async (ctx, next) => {
  // const { user } = ctx.session;
  // if (!user || user.role != 1) ctx.throw(403, "owner invalid");
  await next();
};

module.exports = auth;
