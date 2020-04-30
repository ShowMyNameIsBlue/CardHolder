const Router = require("koa-router");
const router = new Router();
const Path = require("path");
router.post("/upload", async (ctx) => {
  if (ctx.request.files) {
    const { path } = ctx.request.files["file"];
    ctx.body = {
      data: "http://localhost:60010/" + Path.basename(path),
      source: path,
      code: 0,
    };
  } else {
    ctx.body = {
      data: "noChange",
      code: 0,
    };
  }
});

module.exports = router;
