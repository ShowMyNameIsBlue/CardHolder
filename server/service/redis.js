/* eslint-disable no-shadow */
const Redis = require("ioredis");
const { common } = require("../config/dev");

const redis = new Redis(common.redis);

module.exports = redis;
