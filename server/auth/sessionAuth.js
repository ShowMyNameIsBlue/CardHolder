// const { HttpError } = require("../utils/error");
// const { query, formatSql } = require("../database");

const auth = async (ctx, next) => {
  // const { user } = ctx.session;
  // if (!user) ctx.throw(401, "login invalid");
  await next();
};

module.exports = auth;
