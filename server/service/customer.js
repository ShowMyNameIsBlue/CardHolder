const { formatSql, query } = require("../database");
const { parseSqlError } = require("../utils");
/**
 * 创建消费者信息
 * @param {name, gender, number, area, userId }
 */
const create = async ({ name, gender, number, area, userId }) => {
  try {
    const data = await query(
      formatSql(`insert into customer set ?`, [
        { name, gender, number, area, userId },
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
          msg: parseSqlError(e) || "user service: 数据库创建消费者信息操作失败",
        };
  }
};

exports.create = create;
/**
 * 修改消费者信息
 * @param {customerId, detail}
 */
const ModCustomer = async ({ customerId, detail }) => {
  try {
    if (JSON.stringify(detail) == "{}")
      return { success: true, data: {}, code: 0 };
    const data = await query(
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
          msg: parseSqlError(e) || "user service: 数据库修改消费者信息操作失败",
        };
  }
};
exports.ModCustomer = ModCustomer;
