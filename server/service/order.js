const { getConnection, formatSql } = require("../database");
const { parseSqlError } = require("../utils");

/**
 * 创建预约信息
 * @param { userId, shopId, start, end}
 */
const create = async ({ userId, shopId, start, end }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`insert into \`order\` set ?`, [{ userId, shopId, start, end }])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库预约信息操作失败",
        };
  }
};

exports.create = create;

const getOrderInfo = async ({ id, type }) => {
  const conn = await getConnection();
  try {
    const target = type == 0 ? "userId" : "shopId";
    const data = await conn.queryAsync(
      formatSql(`select * from \`order\` where ${target} =  ?`, [id])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取预约信息操作失败",
        };
  }
};

exports.getOrderInfo = getOrderInfo;

const delOrder = async ({ orderId }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`delete from \`order\` where id =  ?`, [orderId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库删除预约信息操作失败",
        };
  }
};

exports.delOrder = delOrder;
