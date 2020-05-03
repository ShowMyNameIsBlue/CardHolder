const { query, formatSql } = require("../database");
const { parseSqlError } = require("../utils");

/**
 * 创建评论
 * @param {shopId,commentInfo}
 */
const create = async ({ shopId, commentInfo }) => {
  try {
    commentInfo = JSON.stringify(commentInfo);
    const data = await query(
      formatSql(`insert into comment set ?`, [{ shopId, commentInfo }])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库创建评论信息操作失败",
        };
  }
};

exports.create = create;

/**
 * 获取商店评论
 * @param {shopId}
 */
const getComment = async ({ shopId }) => {
  try {
    const data = await query(
      formatSql(`select * from comment where id = ?`, [shopId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg:
            parseSqlError(e) || "user service: 数据库获取商店评论信息操作失败",
        };
  }
};

exports.getComment = getComment;
