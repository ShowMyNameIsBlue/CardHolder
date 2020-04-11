const { getConnection, formatSql } = require("../database");
const { parseSqlError } = require("../utils");
/**
 * 创建用户卡信息
 * @param {userId, cardInfo}
 */
const create = async ({ userId, cardInfo }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`insert into card set ?`, [{ userId, cardInfo }])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库创建卡信息操作失败",
        };
  }
};

exports.create = create;

/**
 * 获取用户卡信息
 * @param {userId}
 */
const getCardInfo = async ({ userId }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`select * from card where userId =  ?`, [userId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取卡信息操作失败",
        };
  }
};

exports.getCardInfo = getCardInfo;
/**
 * 修改卡信息
 * @param {userId, detail}
 */
const modCardInfo = async ({ userId, detail }) => {
  const conn = await getConnection();
  try {
    if (JSON.stringify(detail) == "{}")
      return { success: true, data: {}, code: 0 };
    const data = await conn.queryAsync(
      formatSql(`update card set ? where userId = ?`, [detail, userId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库修改卡信息操作失败",
        };
  }
};

exports.modCardInfo = modCardInfo;
