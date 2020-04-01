const session = require("koa-session");

const addsession = app => {
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
    destroy: async key => {
      await redis.del(key);
      return null;
    }
  };
  const CONFIG = {
    key: "koa:sess",
    maxAge: 86400000,
    overwrite: true,
    httpOnly: false,
    rolling: true,
    signed: true,
    store
  };
  app.use(session(CONFIG, app));
};

module.exports = {
  addsession
};
