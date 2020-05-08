const { query, formatSql } = require("../database");
const { parseSqlError } = require("../utils");
/**
 * 创建用户卡信息
 * @param {userId, cardInfo}
 */
const create = async ({ userId, cardInfo }) => {
  try {
    const data = await query(
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
  try {
    const _cards = await query(
      formatSql(`select * from card where userId =  ?`, [userId])
    );
    if (_cards.length) {
      let { cardInfo } = _cards[0];
      cardInfo = JSON.parse(cardInfo);
      let sql = "";
      cardInfo.forEach((e) => {
        sql += `${e},`;
      });
      sql = `(${sql.slice(0, sql.length - 1)})`;
      const data = await query(
        formatSql(`select * from coupon where id in ${sql}`, [])
      );
      return { success: true, data, code: 0 };
    } else {
      return { success: true, data: [], code: 0 };
    }
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
const modCardInfo = async ({ userId, shopId, couponId, detail }) => {
  try {
    const _total = await query(
      formatSql(`select * from card where userId =  ?`, [userId])
    );
    if (_total.length) {
      let { cardInfo } = _total[0];
      cardInfo = JSON.parse(cardInfo);
      if (cardInfo.indexOf(detail) != -1) {
        return { success: true, data: [], code: 1 };
      } else {
        cardInfo.push(detail);
        cardInfo = JSON.stringify(cardInfo);

        const data = await query(
          formatSql(`update card set ? where userId = ?`, [
            { cardInfo },
            userId,
          ])
        );
        await query(
          formatSql(
            `update coupon set usecount=usecount+1 where id =? and shopId=?`,
            [couponId, shopId]
          )
        );
        return { success: true, data, code: 0 };
      }
    } else {
      const data = await query(
        formatSql(`insert into card set ?`, [
          { userId, cardInfo: JSON.stringify([detail]) },
        ])
      );
      await query(
        formatSql(
          `update coupon set usecount=usecount+1 where id =? and shopId=?`,
          [couponId, shopId]
        )
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
          msg: parseSqlError(e) || "user service: 数据库修改卡信息操作失败",
        };
  }
};

exports.modCardInfo = modCardInfo;
