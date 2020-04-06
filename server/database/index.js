const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const config = require("../config/dev");
const crypto = require("crypto");
const { promisify } = require("util");

// 哈希密码
const hashpasssword = async (username, password) => {
  const cipher = crypto.createCipher("aes192", config.salt);
  cipher.update(String(username) + String(password));
  return cipher.final("hex");
};

const pool = mysql.createPool(config.mysql_config);

const formatSql = (sql, dataArr, silent) => {
  sql = mysql.format(sql, dataArr);
  if (!silent) console.log("FORMAT SQL : ", sql.replace(/\n/g, " "));
  return sql;
};

const query = (sql) => {
  return new Promise((reslove, reject) => {
    pool.getConnection((err, conn) => {
      if (err) return reject(err);
      conn.query(sql, (error, results) => {
        conn.release();
        if (err) {
          console.log("------ error occured ------------");
          console.log(sql);
          console.log("---------------------------------");
          return reject(error);
        }
        reslove(results);
      });
    });
  });
};

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.beginTransactionAsync = promisify(connection.beginTransaction);
      connection.queryAsync = promisify(connection.query);
      connection.rollbackAsync = () => {
        return new Promise((resolve) => {
          connection.rollback(() => {
            connection.release();
            resolve();
          });
        });
      };
      connection.commitAsync = () => {
        return new Promise((resolve, reject) => {
          connection.commit((err) => {
            connection.release();
            if (err) return reject(err);
            resolve();
          });
        });
      };
      resolve(connection);
    });
  });
};

// 初始化数据表
const initTable = async () => {
  const models = fs.readdirSync(path.resolve(__dirname, "./models"));
  for (const i in models) {
    const model = models[i];
    if (model.split(".")[1] === "sql") {
      const sql = fs.readFileSync(
        path.resolve(__dirname, `./models/${model}`),
        "utf-8"
      );
      if (sql.length) await query(sql);
    }
  }
  console.log(`database : tables initialized`);
};

const init = async () => {
  await initTable();
};

module.exports = {
  formatSql,
  query,
  init,
  hashpasssword,
  getConnection,
};
