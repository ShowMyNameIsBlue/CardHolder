const db = require("./server/database");

const initData = async () => {
  try {
    console.log("initializing database ...");
    await db.init();
  } catch (error) {
    console.log(`init database failed`);
    console.log(e);
  }
};

module.exports = initData;
