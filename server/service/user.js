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
 * @param {用户名} username
 * @param {密码} password
 */
const checkPassword = async (username, password) => {
  let user = await query(
    formatSql(`select * from user where username = ?`, [username])
  );
  if (user.length) {
    const encrypted = await hashpasssword(username, password);
    user = user[0];
    if (encrypted === user.password) {
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
  } catch (e) {
    console.error(e);
    return e.code && e.msg
      ? e
      : {
          success: false,
          code: 500,
          msg: parseSqlError(e) || "user service: 数据库操作失败",
        };
  }
};
exports.create = create;
/**
 * 登录
 *
 * @param {用户名} username
 * @param {密码} password
 *
 */
const login = async ({ username, password }) => {
  const check = await checkPassword(username, password);
  if (!check.match) return { match: false };
  return check;
};
exports.login = login;
