const auth = async (ctx, next) => {
  const { user } = ctx.session;
  if (user && user.role && user.role === "0") await next();
  else ctx.throw(403, "customer invalid");
  await next();
};
