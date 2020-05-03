const { query, formatSql } = require("../database");
const { parseSqlError } = require("../utils");

/**
 * 创建活动
 * @param { name, couponId, shopId, start, end, desc}
 */
const create = async ({ name, couponId, shopId, start, end, desc }) => {
  try {
    const data = await query(
      formatSql(`insert into activity set ?`, [
        { name, couponId, shopId, start, end, desc },
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
          msg: parseSqlError(e) || "user service: 数据库创建活动信息操作失败",
        };
  }
};
exports.create = create;

/**
 * 获取活动信息
 * @param {id, type} 0,1,2 详细信息，商店关信息，卡券信息
 */
const getActivity = async ({ id, type }) => {
  try {
    let target = type == "0" ? "id" : type == "1" ? "shopId" : "couponId";
    const data = await query(
      formatSql(`select * from activity where ${target} = ?`, [id])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取活动信息操作失败",
        };
  }
};

exports.getActivity = getActivity;

/**
 * 修改活动信息
 * @param { activityId, detail}
 */
const modActivity = async ({ activityId, detail }) => {
  try {
    const data = await query(
      formatSql(`update activity set ? where id = ?`, [detail, activityId])
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

exports.modActivity = modActivity;

const delActivity = async ({ activityId }) => {
  try {
    const data = await query(
      formatSql(`delete from activity where id = ?`, [activityId])
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

exports.delActivity = delActivity;

const getActImage = async (activityId) => {
  activityId = activityId ? `where a.id =${activityId}` : "";
  try {
    const data = await query(
      formatSql(
        `select a.id , a.name ,couponId,a.shopId ,a.start,a.end,a.desc,c.imgPath from activity as a join coupon as c on a.couponId = c.id  ${activityId}`
      )
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取活动信息操作失败",
        };
  }
};

exports.getActImage = getActImage;
