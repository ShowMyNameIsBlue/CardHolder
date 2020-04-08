const { formatSql, query, getConnection } = require("../database");
const { parseSqlError } = require("../utils");
/**
 * 创建消费者信息
 * @param {name, gender, birthday, area, userId }
 */
const create = async ({ name, gender, birthday, area, userId }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`insert into customer set ?`, [
        { name, gender, birthday, area, userId },
      ])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库操作失败",
        };
  }
};

exports.create = create;
/**
 * 修改消费者信息
 * @param {customerId, detail}
 */
const ModCustomer = async ({ customerId, detail }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`update customer set ? where id = ?`, [detail, customerId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库操作失败",
        };
  }
};
exports.ModCustomer = ModCustomer;
