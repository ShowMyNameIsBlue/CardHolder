const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const config = require("../config/dev");
const crypto = require("crypto");

// 哈希密码
const hashpasssword = async (username, password) => {
  const cipher = crypto.createCipher("aes192", config.common.salt);
  cipher.update(String(username) + String(password));
  return cipher.final("hex");
};

const connection = mysql.createConnection(config.mysql_config);
const formatSql = (sql, dataArr, silent) => {
  sql = mysql.format(sql, dataArr);
  if (!silent) console.log("FORMAT SQL : ", sql.replace(/\n/g, " "));
  return sql;
};

const query = (sql) => {
  return new Promise((reslove, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.log("------ error occured ------------");
        console.log(sql);
        console.log("---------------------------------");
        return reject(error);
      }
      reslove(results);
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
  connection,
};
