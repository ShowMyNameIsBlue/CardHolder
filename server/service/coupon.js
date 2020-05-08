const { query, formatSql } = require("../database");
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
  try {
    const body = imgPath
      ? { name, number, start, end, count, type, shopId, imgPath }
      : { name, number, start, end, count, type, shopId };
    const data = await query(formatSql(`insert into coupon set ?`, [body]));
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
  try {
    if (JSON.stringify(detail) == "{}")
      return { success: true, data: {}, code: 0 };
    const data = await query(
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
  try {
    const _path = await query(
      formatSql(`select imgPath from coupon where id = ?`, [couponId])
    );
    const { imgPath } = _path[0];
    const data = await query(
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

const getCoupon = async ({ couponId }) => {
  try {
    const data = await query(
      formatSql(`select * from coupon where id = ?`, [couponId])
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

exports.getCoupon = getCoupon;

const getCount = async ({ shopId }) => {
  try {
    const _vip = await query(
      formatSql(
        `select sum(usecount)as total from coupon where shopId = ? and type = 0`,
        [shopId]
      )
    );
    const _coupon = await query(
      formatSql(
        `select sum(usecount)as total from coupon where shopId = ? and type = 1`,
        [shopId]
      )
    );
    return {
      success: true,
      data: {
        vip: _vip[0].total ? _vip[0].total : 0,
        coupon: _coupon[0].total ? _coupon[0].total : 0,
      },
      code: 0,
    };
  } catch (error) {
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取活动信息操作失败",
        };
  }
};

exports.getCount = getCount;
