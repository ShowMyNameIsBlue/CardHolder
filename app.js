const Koa = require("koa");
const router = require("./server/routes");

const { addsession } = require("./server/middlewares");
const app = new Koa();
addsession(app);
app.use(router.routes());
module.exports = app;
