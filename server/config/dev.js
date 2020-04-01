const mysql_config = {
  host: "localhost",
  user: "root",
  password: "qxg123",
  database: "cardholder"
};
const common = {
  port: 60010,
  salt: "tools@university",
  redis: {
    port: 6379,
    host: "127.0.0.1",
    family: 4 /* ipv4 */,
    db: 7
  }
};
module.exports = { mysql_config, common };
