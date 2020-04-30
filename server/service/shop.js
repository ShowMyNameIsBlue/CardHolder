const { formatSql, getConnection, query } = require("../database");
const { parseSqlError } = require("../utils");
/**
 * 创建新的商店信息
 * @param {name, area, type, desc, cardInfo, userId}
 */
const create = async ({ name, area, type, desc, userId, path }) => {
  const conn = await getConnection();
  try {
    const data = await conn.queryAsync(
      formatSql(`insert into shop set ?`, [
        { name, area, type, desc, userId, imgPath: path },
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
          msg: parseSqlError(e) || "user service: 数据库创建商店信息操作失败",
        };
  }
};

exports.create = create;
/**
 * 获取商店信息
 * @param {shopId ,limit,skip}
 */
const getShop = async ({ shopId, type, limit, skip }) => {
  const conn = await getConnection();
  try {
    const sql = type == 2 ? "" : `and c.type=${type}`;
    const _total = await conn.queryAsync(
      formatSql(
        `select count(*) as total from  shop as s join coupon as c on s.id = c.shopId where s.id =? ${sql}`,
        [shopId]
      )
    );
    const { total } = _total[0];
    if (total && total > skip) {
      const data = await conn.queryAsync(
        formatSql(
          ` select  s.id as sid,s.name as sname, s.area,s.type as stype,s.desc,userId,s.imgPath simgPath,c.id as cid,c.name as cname,c.start,c.end,count ,c.imgPath as cimgPath,c.type as ctype,c.shopId from shop as s join coupon as c on s.id = c.shopId where s.id = ? ${sql} limit ?, ?`,
          [shopId, skip, limit]
        )
      );
      return { success: true, total, data, skip, limit, code: 0 };
    } else {
      return {
        success: true,
        total,
        data: [],
        skip,
        limit,
        code: 0,
      };
    }
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取商店信息操作失败",
        };
  }
};

exports.getShop = getShop;

/**
 * 修改商店信息
 * @param {shopId,detail}
 */
const modshop = async ({ shopId, detail }) => {
  const conn = await getConnection();
  try {
    if (JSON.stringify(detail) == "{}")
      return { success: true, data: {}, code: 0 };
    const data = await conn.queryAsync(
      formatSql(`update shop set ? where id = ?`, [detail, shopId])
    );
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库修改商店信息操作失败",
        };
  }
};

exports.modshop = modshop;

const delShop = async ({ shopId }) => {
  const conn = await getConnection();
  try {
    await conn.beginTransactionAsync();
    const data = await conn.queryAsync(
      formatSql(`delete from shop where id = ?`, [shopId])
    );
    await conn.queryAsync(
      formatSql(`delete from coupon where shopId = ?`, [shopId])
    );
    await conn.commitAsync();
    return { success: true, data, code: 0 };
  } catch (e) {
    await conn.rollbackAsync();
    console.error(e);
    return e.msg && e.code
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库删除商店信息操作失败",
        };
  }
};

exports.delShop = delShop;
