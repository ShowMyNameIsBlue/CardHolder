const Router = require("koa-router");

const { sessionAuth, customerAuth, ownerAuth } = require("../auth");

const user = require("./user");
const customer = require("./customer");
const card = require("./card");
const coupon = require("./coupon");
const shop = require("./shop");
const comment = require("./comment");
const activity = require("./activity");
const order = require("./order");

const router = new Router({
  prefix: "/api/v0",
});

router.use("/user", user.routes(), user.allowedMethods());
router.use(
  "/customer",
  sessionAuth,
  customerAuth,
  customer.routes(),
  customer.allowedMethods()
);
router.use("/card", sessionAuth, card.routes(), card.allowedMethods());
router.use(
  "/coupon",
  sessionAuth,
  ownerAuth,
  coupon.routes(),
  coupon.allowedMethods()
);
router.use(
  "/shop",
  sessionAuth,
  ownerAuth,
  shop.routes(),
  shop.allowedMethods()
);
router.use("/comment", sessionAuth, comment.routes(), comment.allowedMethods());
router.use(
  "/activity",
  sessionAuth,
  activity.routes(),
  activity.allowedMethods()
);
router.use("/order", sessionAuth, order.routes(), order.allowedMethods());

module.exports = router;
