const session = require("koa-session");
const koaBody = require("koa-body");
const { resolve } = require("path");
const { mkdirSync } = require("fs");
const redis = require("../service/redis");

const addBodyParser = (app) => {
  app.use(
    koaBody({
      jsonLimit: "10mb",
      formLimit: "4096kb",
      multipart: true,
      formidable: {
        // 初始化项目文件保存位置
        uploadDir: `${resolve(__dirname, "../../dist")}`,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024, // 设置上传文件大小最大限制，50M
      },
      onFileBegin: function () {
        if (!resolve(__dirname, "../../dist")) {
          mkdirSync(resolve(__dirname, "../../dist"));
        }
      },
    })
  );
};
const addsession = (app) => {
  app.keys = ["tools@university"];

  const store = {
    get: async (key, { rolling }) => {
      const value = await redis.get(key);
      if (rolling) {
        await redis.expire(key, CONFIG.maxAge / 1000);
      }
      return JSON.parse(value);
    },
    set: async (key, value, maxAge, { rolling, changed }) => {
      if (rolling || changed) {
        await redis.setex(key, maxAge / 1000, JSON.stringify(value));
      }
      return null;
    },
    destroy: async (key) => {
      await redis.del(key);
      return null;
    },
  };
  const CONFIG = {
    key: "koa:sess",
    maxAge: 86400000,
    overwrite: true,
    httpOnly: false,
    rolling: true,
    signed: true,
    store,
  };
  app.use(session(CONFIG, app));
};

module.exports = {
  addsession,
  addBodyParser,
};
