const Koa = require("koa");
const router = require("./server/routes");

const { addsession, addBodyParser } = require("./server/middlewares");
const app = new Koa();
addsession(app);
addBodyParser(app);
app.use(router.routes());
module.exports = app;
