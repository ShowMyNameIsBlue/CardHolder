const { query, formatSql } = require("../database");
const { parseSqlError } = require("../utils");

/**
 * 创建预约信息
 * @param { userId, shopId, start, end}
 */
const create = async ({
  userId,
  username,
  shopId,
  start,
  end,
  content,
  shopname,
}) => {
  try {
    const _total = await query(
      formatSql(
        `select * from \`order\` where ( start between  ? and ? or  end  between  ? and ?) and shopId = ?`,
        [start, end, start, end, shopId]
      )
    );
    if (_total.length > 0) {
      return { success: true, data: [], code: 1 };
    } else {
      const data = await query(
        formatSql(`insert into \`order\` set ?`, [
          { userId, shopId, start, end, content, username, shopname },
        ])
      );
      return { success: true, data, code: 0 };
    }
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
  try {
    const target = type == 0 ? "userId" : "shopId";
    const data = await query(
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
  try {
    const data = await query(
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

const modOrder = async ({ orderId, detail }) => {
  try {
    const data = await query(
      formatSql(`update \`order\` set ? where id = ?`, [detail, orderId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库修改预约信息操作失败",
        };
  }
};

exports.modOrder = modOrder;
