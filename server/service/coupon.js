const { getConnection, formatSql } = require("../database");
const { parseSqlError } = require("../utils");

/**
 * 创建卡券信息
 * @param {name, number, start, end, count, type, shopId}
 */

const create = async ({
  name,
  number,
  start,
  end,
  count,
  type,
  shopId,
  imgPath,
}) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`insert into coupon set ?`, [
        { name, number, start, end, count, type, shopId, imgPath },
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
          msg: parseSqlError(e) || "user service: 数据库创建卡券信息操作失败",
        };
  }
};

exports.create = create;

/**
 * 修改卡券信息
 * @param { couponId, detail}
 */
const modCoupon = async ({ couponId, detail }) => {
  const conn = await getConnection();
  try {
    if (JSON.stringify(detail) == "{}")
      return { success: true, data: {}, code: 0 };
    const data = await conn.queryAsync(
      formatSql(`update coupon set ? where id = ?`, [detail, couponId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库修改卡券信息操作失败",
        };
  }
};

exports.modCoupon = modCoupon;

/**
 * 删除卡券信息
 * @param { couponId}
 */
const delCoupon = async ({ couponId }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`delete from coupon where id = ?`, [couponId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库删除卡信息操作失败",
        };
  }
};

exports.delCoupon = delCoupon;
