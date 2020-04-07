const required = (rules, ctx) => {
  let errors = [];

  const key = Object.keys(rules)[0];
  const value = rules[key];

  let needCheck = ctx.request[key];

  needCheck = Object.assign({}, needCheck);
  errors = value.filter((check) => {
    if (needCheck[check] === undefined) return true;
    return false;
  });

  if (errors.length) {
    ctx.throw(412, `${errors.join(",")} is required`);
  }
};

// 解析sql错误
const parseSqlError = (err) => {
  if (err.sqlMessage) {
    if (err.sqlMessage.includes("Duplicate")) {
      return "唯一性数据冲突";
    } else if (err.sqlMessage.includes("Incorrect")) {
      return "错误的数据类型";
    } else if (err.sqlMessage.includes("Unknown column")) {
      return "需要更新数据库表结构";
    } else if (err.sqlMessage.includes("default value")) {
      return "缺少非空参数";
    }
  }
  return null;
};
module.exports = { required, parseSqlError };
