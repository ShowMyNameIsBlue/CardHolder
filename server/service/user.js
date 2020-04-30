const {
  query,
  formatSql,
  getConnection,
  hashpasssword,
} = require("../database");
const { parseSqlError } = require("../utils");
const random = require("../utils/random");
// const { common } = require("../config/dev");

/**
 * 验证密码正确性
 *
 * @param {username} 用户名
 * @param {password} 密码
 */
const checkPassword = async (username, password, role) => {
  let user = await query(
    formatSql(`select * from user where username = ? and role = ?`, [
      username,
      role,
    ])
  );
  if (user.length) {
    const encrypted = await hashpasssword(username, password);
    user = user[0];
    if (encrypted === user.password && user.role == role) {
      delete user.password;
      return { match: true, user };
    }
  }
  return { match: false };
};
/**
 * 注册用户
 *
 * @param {user}
 */
const create = async (user) => {
  const conn = await getConnection();
  try {
    const { username, password, role, code } = user;
    const _user = await query(
      formatSql(`select * from user where username =? and role = ?`, [
        username,
        role,
      ])
    );
    if (_user.length) {
      return { success: false, msg: "用户名重复", code: 401 };
    } else {
      const encrypted = await hashpasssword(username, password);
      const uid = random(12, "number");
      const _user = await conn.queryAsync(
        formatSql(`insert into user set ?`, [
          {
            username,
            password: encrypted,
            uid,
            role,
            code,
          },
        ])
      );
      const data = _user;
      return { success: true, data, code: 0 };
    }
  } catch (e) {
    console.error(e);
    return e.code && e.msg
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库注册用户操作失败",
        };
  }
};
exports.create = create;
/**
 * 登录
 *
 * @param {username}  用户名
 * @param {password} 密码
 *
 */
const login = async ({ username, password, role }) => {
  const check = await checkPassword(username, password, role);
  if (!check.match) return { match: false };
  return check;
};
exports.login = login;

/**
 *获取用户信息
 *
 * @param {userId}  用户Id
 * @param {role} 角色
 *
 */
const getUser = async ({ userId, role }) => {
  const conn = await getConnection();
  try {
    const _cardInfo = await conn.queryAsync(
      formatSql(`select cardInfo from card where userId = ?`, [userId])
    );
    const { cardInfo } = _cardInfo[0];
    const cardArr = JSON.parse(cardInfo);
    let _couponInfo;
    if (cardArr.length == 0) {
      _couponInfo = [];
    } else {
      let sqlStr = "";
      cardArr.forEach((e) => {
        sqlStr += `or id = ${e}`;
      });
      sqlStr = sqlStr.replace("or", "");
      _couponInfo = await conn.queryAsync(
        formatSql(`select * from coupon where ${sqlStr}`)
      );
    }
    const user = await conn.queryAsync(
      formatSql(
        `select * from user join customer on user.id = userId where user.id = ? and  user.role = ?`,
        [userId, role]
      )
    );

    const data = { user, couponInfo: _couponInfo };
    return { success: true, data, code: 0 };
  } catch (e) {
    console.error(e);
    return e.code && e.msg
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库获取用户操作失败",
        };
  }
};

exports.getUser = getUser;
/**
 * 修改密码
 * @param {userId, username, oldPwd, newPwd}
 */
const changePwd = async ({ userId, username, oldPwd, newPwd, role }) => {
  const conn = await getConnection();
  try {
    await conn.beginTransactionAsync();
  } catch (e) {
    console.error(e);
    return { success: false, code: 0, msg: "设置修改事务失败" };
  }
  try {
    const result = await checkPassword(username, oldPwd, role);
    const encrypted = await hashpasssword(username, newPwd);
    if (result.match) {
      const data = await conn.queryAsync(
        formatSql(`update user set password = ? where id = ?`, [
          encrypted,
          userId,
        ])
      );
      await conn.commitAsync();
      return { success: true, data, code: 0 };
    } else {
      await conn.rollbackAsync();
      return e.msg && e.code
        ? e
        : parseSqlError(e) || {
            success: false,
            code: 403,
            msg: "密码验证失败",
          };
    }
  } catch (e) {
    console.error(e);
    await conn.rollbackAsync();
    return e.msg && e.code
      ? e
      : parseSqlError(e) || {
          success: false,
          code: 500,
          msg: "修改事务执行失败",
        };
  }
};
exports.changePwd = changePwd;
